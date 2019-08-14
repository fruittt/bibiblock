// const BASE = 'http://192.168.1.5:90/api' // 测试服务器
const BASE = 'https://api.ddybw.com/api' // 生产服务器
const IMAGE = BASE === 'http://192.168.1.5:90/api' ? 'http://192.168.1.5:89' : 'https://image.ddybw.com'// 图片服务器
const WEBSOCKET = '' // 通信服务器

module.exports = {
  Api: BASE,
  imgUrl: IMAGE,
  websocket: WEBSOCKET
}
