import "./shareComponent.less";
import $ from 'jquery';
import wx from 'weixin-js-sdk'
$(function() {
	$('.clo').on('click', function() {
		$('.choseBox').hide()
	})
	$('.sharePop').on('click', function() {
		$(this).hide()
	})
	$('.share .sharePoster').on('click', function() {
		$('.choseBox').show()
	})
	$('#share_friend').on('click', function() {
		$('.choseBox').hide()
		$('.sharePop').show()
	})
	$('#share_save-poster').on('click', function() {
		$('.choseBox').hide()
		let imgUrl = encodeURIComponent($(this).attr('posterUrl'))
 		wx.miniProgram.navigateTo({
      url: `/page/common/pages/poster/saveImg/saveImg?url=${imgUrl}`
    })
	})
	$('.backHome').on('click', function() {
		wx.miniProgram.reLaunch({
      url: '/page/applicant/pages/index/index'
    })
	})
})