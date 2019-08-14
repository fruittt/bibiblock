import { Tools as tools } from './utils'
var Api = require('./api')

var Session = require('./session')
/**
 * 封装微信request，upload服务
 * */
export class RequestService {
  /**
   * @static
   * @param {String} reqUrl 服务器接口地址
   * @param {Number} pid pid
   * @param {Object} [reqData = {}] 请求的参数(可选)
   * @memberof RequestService
   */
  static async soeRequest (reqUrl, pid, reqData = {}) {
    reqUrl = Api.Api + reqUrl
    reqData.pid = pid
    console.log('发送数据', reqData)
    const method = 'POST'
    let result = await new Promise(function (resolve, reject) {
      wx.request({
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'App-Id': 'ddmini',
          'token': Session.get()
        },
        data: reqData,
        url: reqUrl,
        method: method,
        fail: (res) => {
          reject(res)
          tools.showErrorToast('服务器连接失败')
        },
        complete: (res) => {
          if (res.data.errorCode !== 0) {
            if (res.data.errorCode === -9527) {
              console.log('Token失效或用户不存在')
              tools.showRichToast('您还未登陆，请先登陆')
              reject(res.data)
              setTimeout(() => { wx.navigateTo({ url: '/pages/login/main' }) }, 500)
            } else {
              console.error('数据异常')
              console.log(pid, res)
              tools.showRichToast(res.data.errorMsg)
              reject(res.data)
            }
          } else {
            console.warn('回调成功')
            console.log(pid, res.data)
            resolve(res.data)
          }
        }
      })
    })
    return result
  }

  /**
   * @static
   * @param {String} url 上传文件服务器地址
   * @param {Array} [path=[]] 文件流队列
   * @param {number} [i=0] 文件总数
   * @param {string} [name='file'] 文件对应的 key
   * @memberof RequestService
   */
  static upload (url, path = [], i = 0, name = 'file') {
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: url,
        filePath: path[i],
        name: name,
        header: {
          'token': Session.get()
        },
        formData: {
          imageType: 'avatar'
        },
        fail: (res) => {
          console.log(res)
          reject(res)
          tools.showErrorToast('服务器连接失败')
        },
        complete: (res) => {
          res.data = JSON.parse(res.data)
          if (res.data.errorCode !== 0) {
            if (res.data.errorCode === -9527) {
              console.log('Token失效或用户不存在')
              tools.showRichToast('您还未登陆，请先登陆')
              setTimeout(() => { wx.navigateTo({ url: '/pages/login/main' }) }, 2500)
              reject(res.data)
            } else {
              console.log('数据异常')
              console.log(res)
              reject(res.data)
            }
          } else {
            console.log('回调成功')
            console.log(res)
            resolve(res.data)
          }
        }
      })
    })
  }
}
