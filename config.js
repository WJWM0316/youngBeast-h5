const configENV = (env) => {
	let config = {}
	switch (process.env.NODE_ENV) {
		case 'test':
			config.NODEAPI = 'http://192.168.5.52:3000'
			config.WORKAPI = 'https://work-api.youngbeast.ziwork.com'
			config.CDNPATH = 'http://attach.youngbeast.ziwork.com/artTemplate/'
			break
		case 'development':
			config.NODEAPI = 'https://node.lieduoduo.ziwork.com'
			config.WORKAPI = 'https://work-api.youngbeast.ziwork.com'
			config.CDNPATH = 'http://attach.youngbeast.ziwork.com/artTemplate/'
			break
		case 'production':
			config.NODEAPI= 'https://node.lieduoduo.com'
			config.WORKAPI = 'https://work-api.youngbeast.cn'
			config.CDNPATH = 'https://attach.youngbeast.cn/artTemplate/'
			break
	}
	return config
}

module.exports = configENV()