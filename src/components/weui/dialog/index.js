import "./index.css"

function init () {
  var js_dialog = document.getElementsByClassName('js_dialog')[0]
  document.getElementById('dialogs').addEventListener('click', function(evnet){
    console.log(0)
    js_dialog.classList.remove('fadeIn')
    js_dialog.classList.add('fadeOut')
    var clickFun = eval(`(${evnet.target.getAttribute('clickFun')})`)
    clickFun()
  })

  document.getElementById('showIOSDialog').addEventListener('click', function(){
    console.log(0)
    js_dialog.classList.remove('fadeOut')
    js_dialog.classList.add('fadeIn')
  })
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