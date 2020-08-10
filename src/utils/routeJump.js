import browser from './browser.js'
import wx from 'weixin-js-sdk'

class Router {
  constructor () {
    this.isApp  = browser.isApp()
    if (browser._version.isMini) {
      this.isMini = browser._version.isMini
    } else {
      browser.isMini = () => {
        this.isMini = browser._version.isMini
      }
    }
  }
  push ({miniUrl, appUrl, wapUrl}) {
    if (this.isMini) {
      wx.miniProgram.navigateTo({
        url: miniUrl
      })
    } else if (this.isApp) {

    } else {
      location.href = wapUrl
    }
  }
  replace ({miniUrl, appUrl, wapUrl}) {
    if (this.isMini) {
      wx.miniProgram.reLaunch({
        url: miniUrl,
      })
    } else if (this.isApp) {

    } else {
      location.href = wapUrl
    }
  }
  back (pageNum) {
    if (this.isMini) {
      wx.miniProgram.navigateBack({
        delta: pageNum
      })
    } else if (this.isApp) {

    } else {
      window.history.back(pageNum);
    }
  }
}

export default new Router()
