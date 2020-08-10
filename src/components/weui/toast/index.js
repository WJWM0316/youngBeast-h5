import "./index.css"

window.onload = function () {
  var $toast = document.getElementsByClassName('toastWrap')[0]
  document.getElementById('showToast').addEventListener("click", function(){
    if ($toast.style.display != 'none') return
    $toast.classList.remove('fadeOutToast')
    $toast.classList.add('fadeInToast')
    setTimeout(function () {
      $toast.classList.remove('fadeInToast')
      $toast.classList.add('fadeOutToast')
    }, 2000)
  })
}
