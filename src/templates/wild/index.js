import "./index.scss"
let configENV = require("CONFIG")
let render = require('./index.art')

let data = {
  cdnPath: configENV.CDNPATH
}

let title = "收到一条新邀请"

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
}