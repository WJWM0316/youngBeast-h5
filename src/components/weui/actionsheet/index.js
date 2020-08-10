// import "../example.css";
import "./index.css";

 function init () {

  var $iosActionsheet = document.getElementById('iosActionsheet')
  var $iosMask = document.getElementById('iosMask')

  function hideActionSheet() {
    $iosActionsheet.classList.remove('weui-actionsheet_toggle')
    $iosMask.classList.remove('fadeIn')
    $iosMask.classList.add('fadeOut')
  }

  $iosMask.addEventListener('click', hideActionSheet)
  document.getElementById('iosActionsheetCancel').addEventListener('click', hideActionSheet)

  document.getElementById('showIOSActionSheet').addEventListener("click", function(){
    $iosActionsheet.classList.add('weui-actionsheet_toggle')
    $iosMask.classList.remove('fadeOut')
    $iosMask.classList.add('fadeIn')
  })

  let getData = document.getElementsByClassName('selectItem')
  for (let i = 0; i < getData.length; i++) {
    getData[i].addEventListener('click', eval(`(${getData[i].getAttribute('clickFun')})`))
    getData[i].addEventListener('click', hideActionSheet)
  }
}

// 使用document.readyState确保DOM加载完毕后执行
// 注意： 试过window.onload = function () {} 无法执行
function onReady(fn){
  var readyState = document.readyState;
  if(readyState === 'interactive' || readyState === 'complete') {
    fn()
  }else{
      window.addEventListener("DOMContentLoaded",fn);
  }
}

onReady(init)