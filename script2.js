
document.addEventListener("DOMContentLoaded", (event) => {

// 객체 세팅
// - 버킷리스트
var bucketList = document.getElementById('bucketList');
// - 인풋1(text)
var newItemInput = document.getElementById('newItem');
// - 인풋2(imgnum)
var imgNum = document.getElementById('imgNum');
// - 버킷리스트 추가 form
var bucketAddForm = document.getElementById('bucketAddForm');
// 함수실행

let seq = loadSeq();
// - 버킷리스트 로딩 기능 호출
loadItems();

  // 버킷 리스트 아이템 추가 이벤트 핸들러
  bucketAddForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 방지
    var newItemText = newItemInput.value;
    var imgNumText = imgNum.value;
    if (newItemText.trim() !== '') {
      setSeq(seq++);
      addItem(seq, newItemText,imgNumText, false);
      newItemInput.value = ''; // 입력 필드 초기화
    }
  });



// var item = {seq:seq,text:itemText,number :imgNum, toggle:false}
// - 버킷리스트 로딩 기능
function loadItems(){
  // bucketList.innerHTML="";
  var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
  items.forEach(function(item){
    addItem(item.seq,item.text,item.number,item.toggle);
  });
}
// seq조회(로딩할떄만)
function loadSeq(){
  var seq = localStorage.getItem('seq');
  if(seq == undefined){
    return 0;
  }
  return seq;
}


// seq저장()
function setSeq(seq){
  localStorage.setItem("seq",seq);
}

function addItem(seq, itemText, imgNum, toggle){
  var newItem = document.createElement('div');   
    newItem.className += "bucket center";
    newItem.className += " img" + imgNum;
    newItem.innerText = itemText;
    if(toggle){
      newItem.className += " done";
    }
    newItem.addEventListener("click",function(){
      newItem.classList.toggle("done");
      var item = {seq:seq,text:itemText,number :imgNum, toggle:false}
      var tempItems;  
      if (newItem.classList.contains("done")) {
        tempItems = items.map((item)=> {
          if(item.seq === seq){
            return {
              ...item,
              toggle:true,
            };
          }
        });        
      } else {
        tempItems = items.map((item)=> {
          if(item.seq === seq){
            return {
              ...item,
              toggle:false
            };
          }
        });   
      }
      addDelBtn(newItem,seq);
      // items.push(item);
      localStorage.setItem('bucketItems', JSON.stringify(tempItems));
    });
     // 중복 아이템 확인
     var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
     var existingItem = items.findIndex(function(i) {
      return i.seq === seq;
    });
    
    if(existingItem === -1){
      var items = JSON.parse(localStorage.getItem('bucketItems')) || [];

      items.push({seq:seq, text:itemText,number:imgNum, toggle:toggle});
      localStorage.setItem('bucketItems',JSON.stringify(items));
    }
    bucketList.appendChild(newItem);
    
}

function addDelBtn(item, seq){
  var newItem = document.createElement('div');
  newItem.className += delBtn;
  newItem.addEventListener("click", function() {
    var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
    items = items.filter(function(seq) {
      return item.seq !== seq;
  });
  localStorage.setItem('bucketItems', JSON.stringify(items));
  });
  item.appendChild(newItem);
}

});


// 버킷 리스트 삭제
