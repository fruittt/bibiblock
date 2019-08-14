import { RequestService } from './request'

export class Pay {
  /**
   * create by Ashin
   * 自我缴清费用
  */
  static payOrder (orderSn, orderType) {
    return new Promise(function (resolve, reject) {
      RequestService.soeRequest('/', 220, {orderSn: orderSn, orderType: orderType, type: 4, device: 'mini'}).then((res) => {
        // console.log(res)
        if (res.errorCode === 0) {
          let payParam = res.data.mini
          wx.requestPayment({
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              resolve(res)
            },
            'fail': function (res) {
              reject(res)
            },
            'complete': function (res) {
              reject(res)
            }
          })
        } else {
          reject(res)
        }
      })
    })
  }
}
