const configENV = require("CONFIG")
let requestNum = 0
// console.log(configENV, 11111, process.env.NODE_ENV)
const VUE_APP_NODEAPI     = configENV.NODEAPI,
      VUE_APP_WORKAPI     = configENV.WORKAPI,
      VUE_APP_CDNPATH     = configENV.CANPTH

// 默认统计参数
let axios = null,
    addHttpHead = null

export const request = async ({ url, method, params = {}, config }) => {
  if (!axios) {
    axios = await import(/* webpackChunkName: "axios" */ 'axios')
    addHttpHead   = axios.defaults.headers.common
  }
  switch (config.host) {
    case 'node':
      if (axios.defaults.baseURL !== VUE_APP_NODEAPI) axios.defaults.baseURL = VUE_APP_NODEAPI
      break
    case 'work':
      if(axios.defaults.baseURL !== VUE_APP_WORKAPI) axios.defaults.baseURL = VUE_APP_WORKAPI
      break
  }


  return new Promise((resolve, reject) => {
    axios[method](url, method === 'get' ? {params: {...params}} : (params instanceof FormData ? params : {...params}), config).then(res => {
      resolve(res.data)
    }).catch(err => {
      requestNum--
      reject(err.response.data)
    })
  })
}
