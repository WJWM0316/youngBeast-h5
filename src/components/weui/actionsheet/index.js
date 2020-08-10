// import "../example.css";
import "./index.css";
import $ from 'jquery';

$(function () {
  var $iosActionsheet = $('#iosActionsheet');
  var $iosMask = $('#iosMask');

  function hideActionSheet() {
      $iosActionsheet.removeClass('weui-actionsheet_toggle');
      $iosMask.fadeOut(200);
  }

  $iosMask.on('click', hideActionSheet);
  $('#iosActionsheetCancel').on('click', hideActionSheet);

  $("#showIOSActionSheet").on("click", function(){
      $iosActionsheet.addClass('weui-actionsheet_toggle');
      $iosMask.fadeIn(200);
  });

  let getData = document.getElementsByClassName('selectItem')
  for (let i = 0; i < getData.length; i++) {
    getData[i].addEventListener('click', eval(`(${getData[i].getAttribute('clickFun')})`))
    getData[i].addEventListener('click', hideActionSheet)
  }
})