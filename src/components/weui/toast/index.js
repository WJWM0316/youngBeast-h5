import "./index.css";
import $ from 'jquery';

// toast
$(function(){
  var $toast = $('.toastWrap');
  $('#showToast').on('click', function(){
      if ($toast.css('display') != 'none') return;
      $toast.fadeIn(100);
      setTimeout(function () {
          $toast.fadeOut(100);
      }, 2000);
  });
});
