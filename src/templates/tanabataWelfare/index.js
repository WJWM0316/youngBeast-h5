import "./index.scss"
let configENV = require("CONFIG")
let render = require('./index.art')

let data = {
  cdnPath: configENV.CDNPATH + 'wild/'
}

let title = "七夕福利进群免费领！"

let html = render(data)
if (typeof document === 'object') {
  document.body.innerHTML = html
  document.title = title
  var link = document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = `${data.cdnPath}favicon.ico`
  document.getElementsByTagName('head')[0].appendChild(link)
  
  var wildPop = document.getElementsByClassName('wild-pop')[0]

  document.getElementsByClassName('wild-icon')[0].addEventListener('click', function () {
    console.log(0)
    wildPop.style.display = 'block'
  })

  document.getElementsByClassName('wild-buttom')[0].addEventListener('click', function () {
    wildPop.style.display = 'none'
  })

  // 百度统计
  // function baiduTj () {
  //   var _hmt = _hmt || [];
  //   var hm = document.createElement("script");
  //   hm.src = "https://hm.baidu.com/hm.js?985c2b2be27d55f20a267ba7dddd290a";
  //   var s = document.body;
  //   s.appendChild(hm);
  // }

  // var readyState = document.readyState
  // if(readyState === 'interactive' || readyState === 'complete') {
  //   baiduTj()
  // }else{
  //     window.addEventListener("DOMContentLoaded", baiduTj)
  // }
}