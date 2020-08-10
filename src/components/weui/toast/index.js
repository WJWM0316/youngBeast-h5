import "./index.css"

window.onload = function () {
  var $toast = document.getElementsByClassName('toastWrap')[0]
  document.getElementById('showToast').addEventListener("click", function(){
    if ($toast.style.display != 'none') return
    $toast.classList.remove('fadeOut')
    $toast.classList.add('fadeIn')
    setTimeout(function () {
      $toast.classList.remove('fadeIn')
      $toast.classList.add('fadeOut')
    }, 2000)
  })
}
