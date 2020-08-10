import "./index.css"
import $ from 'jquery';
$(function(){

  $('#dialogs').on('click', '.weui-dialog__btn', function(){
      $(this).parents('.js_dialog').fadeOut(200);
      let clickFun = eval(`(${$(this).attr('clickFun')})`)
      clickFun()
  });

  $('#showIOSDialog').on('click', function(){
    $('.js_dialog').fadeIn(200);

  });
});
