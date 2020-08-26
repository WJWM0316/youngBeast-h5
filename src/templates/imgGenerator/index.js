import "./index.scss"
let render = require('./index.art')

import wechatSDK from 'UTILS/wechat.js'
import 'cropperjs/dist/cropper.min.css'
import {createPosrer} from 'API/poster.js'
let configENV = require("CONFIG")
let data = {
  cdnPath: `${configENV.CDNPATH}YouthLifeHome/`,
  sms: {}
}
let $ = null,
    Cropper = null
wechatSDK.wechatShare({
  title: '追梦青年们集合啦！【点击定制】你的趣味宣言海报',
  desc: '2020 我们一起勇敢向前',
  link: window.location.href,
  imgUrl: `${data.cdnPath}fengmian.png`,
  success: function() {
      // 设置成功
      console.log('配置成功')
  }
})

import {manImg, womanImg} from './staticImg.js'
let html = render(data)
const title = "追梦青年们集合啦！【点击定制】你的趣味宣言海报"
if (typeof document === 'object') {
  document.body.innerHTML = html
  document.title = title
}
window.onload = async () => {
  function toWebSite () {
    window.location = "https://shop90718142.m.youzan.com/v2/showcase/homepage?alias=Zh2TkTBYPF"
  }
  if (!$)  $ = (await import(/* webpackChunkName: "jquery" */ 'jquery'))['default']
  // 裁剪
  const wrap = document.getElementById('cropper-mainbg')
  var cropper = null
  let cropperGo = async(toBlob) => {
    if (cropper) {
      cropper.destroy()
      cropper = null
      $('#cropper-mainbg').html('')
    }
    const image = document.createElement('img')
    if (!image.src) wrap.appendChild(image)
    image.src = toBlob
    image.classList.add('img-crpper')
    
    $('.cropper-wrap').show()
    $('.sms').hide()
    if (!Cropper) Cropper = (await import(/* webpackChunkName: "cropperjs" */ 'cropperjs'))['default']
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      highlight: false
    })
    
  }
  $('.succuess').click(function () {
    let canvas = cropper.getCroppedCanvas()
    data.sms.img = canvas.toDataURL();
    $('.sms-Upload-img').html(`<img class="toBlob-img" src="${data.sms.img}">`)
    $('.camera').hide()
    $('.cropper-wrap').hide()
    $('.sms').show()
  })

  $('.close').click(function () {
    $('.cropper-wrap').hide()
    $('.sms').show()
  })
  // 上传图片
  $('.sms-Upload-img').click(function () {
    $('.camera-pop').show()
  })

  // 选择自己的头像
  $('.camera-pop-top').on('click', function () {
    $('.camera-pop').hide()
    wechatSDK.wechatChooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album']
    }).then(res => {
      wechatSDK.wechatGetLocalImgData(res[0]).then(
        res1 => {
          cropperGo(res1)
        }
      )
    }).catch(e => {
      alert(e.errMsg)
    })
    $('.camera-pop').hide()
  })

  // 关闭弹窗
  $('.camera-pop-close, .camera-pop .bg').click(function () {
    $('.camera-pop').hide()
  })
  // 提交按钮
  $('#generate-poster').click(function () {
    let input = $('input')
    if (input.eq(0).val()){
      data.sms.name = input.eq(0).val()
    }
    if (input.eq(1).val()){
      data.sms.disc = input.eq(1).val()
    }
    if (input.eq(2).val()){
      data.sms.fineOneth = input.eq(2).val()
    }
    if (input.eq(3).val()){
      data.sms.fineTowth = input.eq(3).val()
    }
    if (input.eq(4).val()){
      data.sms.fineThird = input.eq(4).val()
    }
    if (input.eq(5).val()){
      data.sms.fineWant = input.eq(5).val()
    }
    if (!data.sms.img) {
      toast()
      return
    }
    for (let i = 0; i < input.length; i++) {
      if (input.eq(i).val()) {
        data.sms[i] = input.eq(i).val()
      } else {
        toast()
        return
      }
    }
    const formData = new FormData();
    // Pass the image file name as the third parameter if necessary.
    formData.append('img', data.sms.img);
    formData.append('name', data.sms.name);
    formData.append('introduce', data.sms.disc);
    formData.append('desc1', data.sms.fineOneth);
    formData.append('desc2', data.sms.fineTowth);
    formData.append('desc3', data.sms.fineThird);
    formData.append('desc4', data.sms.fineWant);
    $("#loadingToast").show()
    createPosrer(formData).then(res => {
      $('.poster-inner .img').attr('src', res.data.url)
      $('.poster').show()
      $("#loadingToast").hide()
    }).catch(e => {
      $("#loadingToast").hide()
    })
  })

  // 选择默认男
  $(".chooseMan").click(function () {
    $('.camera-pop').hide()
    $('.sms-Upload-img').html(`<img class="toBlob-img" src="${manImg}">`)
    data.sms.img = manImg // base64ToBlob(manImg)
  })

  // 选择默认女
  $(".chooseWoman").click(function () {
    $('.camera-pop').hide()
    $('.sms-Upload-img').html(`<img class="toBlob-img" src="${womanImg}">`)
    data.sms.img = womanImg // base64ToBlob(womanImg)
  })

  $('.index-text, .poster-btn').click(toWebSite)

  $('.poster-close ').click(function () {
    $('.poster').hide()
  })

  $('#custom-immediately').click(function () {
    $('.sms').show()
    $('.index').hide()
  })

  // 百度统计
  function baiduTj () {
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?95617c9cfe1a844ee5bc7ce245cf1f82";
    var s = document.body;
    s.appendChild(hm);
  }
  baiduTj()

}

// base64转化成blob
function base64ToBlob (base64) {
  var base64Arr = base64.split(',');
  var imgtype = '';
  var base64String = '';
  if(base64Arr.length > 1){
      //如果是图片base64，去掉头信息
      base64String = base64Arr[1];
      imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
    // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);
  
  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
  }
  
  // 生成Blob对象（文件对象）
  return new Blob( [bytesCode] , {type : imgtype});
}

function toast () {
  $(".toast").show()
  setTimeout(() => {
    $(".toast").hide()
  }, 2000);
}
export default render;