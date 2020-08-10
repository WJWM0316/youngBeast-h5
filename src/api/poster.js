
import { request } from './index.js'

export const createPosrer = (params) => request({
	url: '/frontEnd/youngBeast_act',
	method: 'post',
	params,
	config: {host: 'node'}
})