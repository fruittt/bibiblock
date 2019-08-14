var Api = require('./api')
export class Websocket {
  /**
   * @static WebSocket 任务
   * @returns
   * @memberof Websocket
   */
  static sockTask () {
    var sockTask = wx.connectSocket({
      url: Api.Api,
      header: {'content-type': 'application/json'},
      method: 'GET',
      protocols: [], // 基础库 1.4.0
      tcpNoDelay: false, // 基础库2.4.0
      success: () => {
        console.log('信道连接成功')
      },
      fail: () => {
        console.log('信道连接失败')
      }
    })
    return sockTask // 基础库1.7.0
  }
}
