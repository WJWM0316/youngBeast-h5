// 微信jssdk mixin
import { getWechatApi } from 'API/common.js'
let wx = null
class WechatSDK  {
  constructor () {
    this.wechatConfig = {
      debug: false,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'chooseWXPay',
        'getLocalImgData',
        'openLocation',
        'getLocation'
      ]
    }
    this.getWechatConfig()
  }
  // 获取微信sdk
  async getWechatConfig () {
    
    const params = {
      url: location.href.split('#')[0],
      jsApiList: this.wechatConfig.jsApiList
    }
    getWechatApi(params).then(res => {
      this.wechatConfig = Object.assign({}, res.data)
      this.setWechatConfig()
    })
  }

  // 配置微信sdk
  async setWechatConfig () {
    if (!wx) wx  = (await import(/* webpackChunkName: "weixin-js-sdk" */ 'weixin-js-sdk'))['default']
    wx.config(this.wechatConfig)
    wx.ready(() => {
      // 微信sdk检测
      wx.checkJsApi({
        jsApiList: this.wechatConfig.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          console.log('客户端允许', res)
        },
        fail: function (e) {
          console.log(e)
        }
      })
    })
  }

  async wechatShare (enter) {
    if (!wx) wx  = (await import(/* webpackChunkName: "weixin-js-sdk" */ 'weixin-js-sdk'))['default']
    wx.ready(() => {
      // 分享到朋友圈
      wx.updateTimelineShareData({
        title: enter.title, // 分享标题
        link: enter.link || window.location.href,
        imgUrl: enter.imgUrl
      })
      // 分享到好友
      wx.updateAppMessageShareData({
        title: enter.titles ? enter.titles : enter.title, // 分享标题
        desc: enter.desc,
        link: enter.link || window.location.href,
        imgUrl: enter.imgUrl
      })
    })
  }

  // 选择图片
  async wechatChooseImage (options = {}) {
    if (!wx) wx  = (await import(/* webpackChunkName: "weixin-js-sdk" */ 'weixin-js-sdk'))['default']
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: options.count || 9, // 默认9
        sizeType: options.sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: options.sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: async function (res) {
          resolve(res.localIds)
        },
        fail: function (e) {
          reject(e)
        }
      })
    })
  }

  // 本地图片转化成base64
  async wechatGetLocalImgData (localId) {
    if (!wx) wx  = (await import(/* webpackChunkName: "weixin-js-sdk" */ 'weixin-js-sdk'))['default']
    return new Promise((resolve, reject) => {
      wx.getLocalImgData({
        localId: localId,//图片的本地ID
        success: function (res) {
          let localData = res.localData;
          if (localData.indexOf('data:image') != 0) {                       
            //判断是否有这样的头部                                               
            localData = 'data:image/jpeg;base64,' +  localData                    
          }                    
          localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg'); // 此处的localData 就是你所需要的base64位
          resolve(localData)            
        }    
      })
    })
  }
}

export default new WechatSDK()