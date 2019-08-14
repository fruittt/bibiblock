var constants = require('./constants')
var SESSION_KEY = constants.SESSION_KEY

var Session = {
  get: function () {
    return wx.getStorageSync(SESSION_KEY) || null
  },
  set: function (session) {
    wx.setStorageSync(SESSION_KEY, session)
  },
  clear: function () {
    wx.removeStorageSync(SESSION_KEY)
  }
}

module.exports = Session
