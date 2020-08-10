import { request } from './index.js'


// 获取微信sdk配置
export const getWechatApi = (params) => request({
	url: '/wechat/official/jssdk',
	method: 'post',
	config: {
		host: 'work'
	},
	params
})

// 获取公众号用户授权信息
export const getUSerAuthMsgApi = (params) => request({
	url: '/wechat/official/user',
	method: 'post',
	config: {
		host: 'work'
	},
	params
})
