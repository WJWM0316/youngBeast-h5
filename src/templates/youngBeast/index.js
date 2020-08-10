import "./index.scss"
import Swiper from 'swiper'
import wechatSDK from 'UTILS/wechat.js'
import localStorage from 'UTILS/localstorage.js'

let render = require('./index.art')
let configENV = require("CONFIG")

guideConfig()

let data = {
    cdnPath: configENV.PICKMECDNPATH + 'youngBeast/',
    page: localStorage.get('page') || 0
}

let title = '在人海独自穿行，还好有你气味相投'

let html = render(data)
if (typeof document === 'object') {
  document.body.innerHTML = html
  document.title = title
  var link = document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = `${data.cdnPath}favicon.ico`
  document.getElementsByTagName('head')[0].appendChild(link)

  window.onload = function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction : 'vertical', // 纵向切换
        nested: true, // 不连续滚动多个
        loop: false, // 不循环滚动
        longSwipesRatio: 0.2, // 0.3便触发切换
        speed: 500,
        initialSlide: data.page, // 初始化页面
        lazy: {
            loadPrevNext: true, // 开启懒加载
        },
        on: {
            slideChangeTransitionEnd: function () {
                data.page = this.activeIndex
            }
        }
    })
    
    localStorage.remove('page')

    var musicIcon = document.getElementsByClassName('music-icon')[0]
    var audio = document.getElementById('audio')

    // 自动播放背景音乐
    function audioAutoPlay() {
            audio.play()
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play()
        }, false)
        // if (!audio.paused){
            musicIcon.classList.add('music-go')
        // }
    }
    audioAutoPlay()

    // 监听播放状态
    musicIcon.onclick = function watchMusicState () {
        
        if (audio.paused) {
            audio.play()
            musicIcon.classList.add('music-go')
            
        } else {
            audio.pause()
            musicIcon.classList.remove('music-go')
        }
    }
    // 跳转有赞官网
    function toWebSite () {
        localStorage.set('page', data.page)
        window.location = "https://shop90718142.m.youzan.com/v2/showcase/homepage?alias=Zh2TkTBYPF"
    }

    document.getElementsByClassName('fourth-img')[0].onclick = toWebSite
    document.getElementsByClassName('seventh-toWebSite')[0].onclick = toWebSite
    document.getElementsByClassName('seventh-toWebSite')[1].onclick = toWebSite

    // 百度统计
    function baiduTj () {
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d3c0d2c9e795a3fdc3d6e1c2f658626c";
        var s = document.body;
        s.appendChild(hm);
    }
    baiduTj()
 }
}

wechatSDK.wechatShare({
    title: '在人海独自穿行，还好有你气味相投（内有彩蛋）',
    desc: '2020 感谢身边每个气味相投的你',
    link: window.location.href,
    imgUrl: `${data.cdnPath}fx-img.png?a=1`,
    success: function() {
        // 设置成功
        console.log('配置成功')
    }
})



export default render