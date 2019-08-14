import { RequestService } from './request'
import { Tools } from './utils'
var Session = require('./session')
var constants = require('./constants')
var ACCOUNT_KEY = constants.ACCOUNT_KEY
export class loginService {
  /**
  * 调用微信登录
  */
  static login () {
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  static loginByWeixin () {
    const that = this
    var pid = 21
    Tools.loading()
    return new Promise(function (resolve, reject) {
      return that.login()
        .then((res) => {
          return res.code
        })
        .then((code) => {
          // 登录远程服务器
          RequestService.soeRequest('/', pid, {
            jsCode: code
          })
            .then((res) => {
              if (res.errorCode === 0) {
                // 存储token
                wx.setStorageSync(ACCOUNT_KEY, res.data.AccountToken)
                Session.set(res.data.Token)
                resolve(res.data)
              } else {
                reject(res)
                console.log('接收登录信息异常')
              }
            })
            .catch((err) => {
              if (err.errorCode === 1) { // 首次登陆未绑定
                console.log('首次登陆未绑定')
                resolve(err.data)
              } else {
                console.log('服务器登录失败')
                reject(err)
              }
            })
        })
        .catch((err) => {
          console.log('本地登录失败')
          reject(err)
        })
        .finally(() => {
          Tools.closeLoading()
        })
    })
  }
}
