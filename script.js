var images = ["Bucket01.png", "Bucket02.png", "Bucket03.png", "Bucket04.png", "Bucket05.png", "Bucket06.png"];





// 페이지 로드 시 이전 상태 복원
document.addEventListener("DOMContentLoaded", (event) => {
  const buckets = document.querySelectorAll(".bucket");
  var bucketForm = document.getElementById('bucketForm');
  var newItemInput = document.getElementById('newItem');
  var imgNum = document.getElementById('imgNum');
  var bucketList = document.getElementById('bucketList');

  loadItems();

  // 버킷 리스트 아이템 추가 이벤트 핸들러
  bucketForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 방지
    var newItemText = newItemInput.value;
    var imgNumText = imgNum.value;
    if (newItemText.trim() !== '') {
      addItem(newItemText,imgNumText, false);
      newItemInput.value = ''; // 입력 필드 초기화
    }
  });

   // 버킷 리스트 아이템 추가 함수
 function addItem(itemText,imgNum,completed) {
  var newItem = document.createElement('div');
  newItem.className = 'bucket img' + imgNum;
  
  // 아이템 텍스트
  newItem.textContent = itemText;

  bucketList.appendChild(newItem);

  newItem.addEventListener("click", function () {
    // 클래스 토글
    newItem.classList.toggle("done");

    // 로컬 스토리지에 상태 저장
    if (bucketList.classList.contains("done")) {
      localStorage.setItem("bucket" + index, "done");
    } else {
      localStorage.setItem("bucket" + index, "");
    }
  });

    // localStorage에 항목 추가
    var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
    items.push({ text: itemText, number: imgNum, completed: false });
    localStorage.setItem('bucketItems', JSON.stringify(items));
 }

 
  function loadItems() {
    bucketList
    var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
    items.forEach(function(item) {
        addItem(item.text, item.number, item.completed);
        if (item.completed) {
            var newItem = bucketList.lastChild;
            newItem.classList.add('completed');
        }
    });
  }

  
// localStorage에서 저장된 아이템 로드 함수 (페이지가 로드될 때만 호출)


// 버킷 리스트 아이템 삭제 함수
function deleteItem(item) {
  var items = JSON.parse(localStorage.getItem('bucketItems')) || [];
  var itemText = item.textContent.trim().split(' (Number: ')[0];
  var index = items.findIndex(function(i) {
      return i.text === itemText;
  });
  if (index !== -1) {
      items.splice(index, 1);
      localStorage.setItem('bucketItems', JSON.stringify(items));
      item.remove();
  }
}
});





 




