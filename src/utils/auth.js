let configENV = require("CONFIG")
import localStorage from './localstorage.js'
import {getPathQuery, splicingLink} from './index.js'
export function setAuthLogin (el, className) {
	let query = getPathQuery()
  let path = location.href
  if (query.access_id) {
  	localStorage.set('access_id', query.access_id)
  	delete query.access_id
  	path = path.split('?')[0]
  	window.location.href = splicingLink(path, query)
  }
  if (query.sessionToken) {
    localStorage.set('sessionToken', query.sessionToken)
  }
  if (query.token) {
    localStorage.set('token', query.token)
  }
  if (query.official_token) {
    localStorage.set('official_token', query.official_token)
    delete query.official_token
  	let path = path.split('?')[0]
  	window.location.href = splicingLink(path, query)
  }
}
export function toWxAuth () {
	localStorage.remove('access_id')
  let path = location.href
  location.href = `${host}/wechat/official/auth?redirect_url=${encodeURIComponent(path)}`
}

