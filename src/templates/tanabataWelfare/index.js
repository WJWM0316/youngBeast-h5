import "./index.scss"
let configENV = require("CONFIG")
let render = require('./index.art')

let data = {
  cdnPath: configENV.CDNPATH + 'tanabataWelfare/'
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

  // 百度统计
  function baiduTj () {
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?bc17f14d39b856a887a213f5aebf3d4a";
    var s = document.body;
    s.appendChild(hm);
  }

  var readyState = document.readyState
  if(readyState === 'interactive' || readyState === 'complete') {
    baiduTj()
  }else{
      window.addEventListener("DOMContentLoaded", baiduTj)
  }
}