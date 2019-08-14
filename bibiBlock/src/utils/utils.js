var Api = require('./api')
/**
 * @export
 * 工具类及微信api封装
 * @class Tools
 */
export class Tools {
  /**
   * ===================
   *     微信api封装
   * ===================
  */
  /**
   * @static 多文字消息提示
   * @param {String} msg 自定义提示信息
   * @memberof Tools
   */
  static showRichToast (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2500
    })
  }
  /**
   * @static 成功消息提示
   * @param {String} msg 自定义提示信息
   * @memberof Tools
   */
  static showSuccToast (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  }

  /**
   * @static 失败消息提示
   * @param {String} msg 自定义提示信息
   * @memberof Tools
   */
  static showErrorToast (msg) {
    wx.showToast({
      title: msg,
      image: '/static/images/default/error.png',
      duration: 2000
    })
  }

  /**
   * @static 加载模态框
   * @param {String} msg 自定义提示信息
   * @memberof Tools
   */
  static loading (msg) {
    if (!msg) msg = '加载中···'
    wx.showLoading({
      title: msg,
      mask: true
    })
  }

  /**
   * @static 关闭模态框
   * @memberof Tools
   */
  static closeLoading () {
    wx.hideLoading()
  }
  /**
   * @static 模态框
   * @param {String} msg 自定义提示信息
   * @memberof Tools
   */
  static showModal (msg) {
    wx.showModal({
      content: msg,
      showCancel: false
    })
  }
  /**
   * ===================
   *     工具类封装
   * ===================
  */
  /**
   * @static
   * @param {String} url 图片地址
   * @returns
   * @memberof Tools
   */
  static imgUrlHead (url) {
    if (url) {
      if (url.indexOf('http') >= 0) {
        return url
      }
      return Api.imgUrl + url
    } else {
      return 'https://image.ddybw.com/static/mini/weipai/head.png'
    }
  }
  /**
   * @static 隐藏手机号码中间四位
   * @param {Number} tel 手机号码
   * @returns
   * @memberof Tools
   */
  static geTel (tel) {
    var reg = /^(\d{3})\d{4}(\d{4})$/
    return tel.replace(reg, '$1****$2')
  }
  /**
   * @static 验证手机号码
   * @param {Number} tel 手机号码
   * @returns {boolean}
   * @memberof Tools
   */
  static isPhone (tel) {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel))) {
      return false
    } else {
      return true
    }
  }
  /**
   * @static 数字转字符串
   * @param {Number} n
   * @returns {String}
   * @memberof Tools
   */
  static formatNumber (n) {
    let str = n.toString()
    return str[1] ? str : `0${str}`
  }
  // 是否今天
  static isToday (timestamp) {
    if (String(timestamp).length === 10) {
      timestamp *= 1000
    }
    var d = new Date(timestamp)
    var todaysDate = new Date()
    if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
      return true
    } else {
      return false
    }
  }
  /**
   * @static 时间戳转完整时间
   * @param {Number} timestamp 时间戳
   * @param {Number} n 组合选择
   * @returns
   * @memberof Tools
   */
  static formatFullTime (timestamp, n = 1) {
    if (String(timestamp).length === 10) {
      timestamp *= 1000
    }
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    if (n === 1) return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')// yy MM:dd hh:mm
    if (n === 2) return [month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute].map(this.formatNumber).join(':') // MM:dd hh:mm
    if (n === 3) return [hour, minute].map(this.formatNumber).join(':') // hh:mm
  }
  /**
   * 日期 转换为 Unix时间戳
   * @param {string} 2014-01-01 20:20:20  日期格式
   * @return <int>        unix时间戳(秒)
   */
  static DateToUnix (string) {
    var f = string.split(' ', 2)
    var d = (f[0] ? f[0] : '').split('-', 3)
    var t = (f[1] ? f[1] : '').split(':', 3)
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime() / 1000
  }
  /**
   * @static 时间戳转日期
   * @param {Number} timestamp 时间戳
   * @returns
   * @memberof Tools
   */
  static formatDate (timestamp) {
    if (String(timestamp).length === 10) {
      timestamp *= 1000
    }
    let date = new Date(timestamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ''
    return `${Y}${M}${D}`
  }
  /**
   * @static 聊天室时间戳转时间
   * @param {*} timestamp 时间戳
   * @returns
   * @memberof Tools
   */
  static formatTime (timestamp) {
    if (String(timestamp).length === 10) {
      timestamp *= 1000
    }
    let date = new Date(timestamp)
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (hour >= 0 && hour < 6) {
      return '凌晨 ' + [hour, minute].map(this.formatNumber).join(':')
    }
    if (hour >= 6 && hour < 12) {
      return '早上 ' + [hour, minute].map(this.formatNumber).join(':')
    }
    if (hour === 12) {
      return '中午 ' + [hour, minute].map(this.formatNumber).join(':')
    }
    if (hour > 12 && hour < 18) {
      return '下午 ' + [hour, minute].map(this.formatNumber).join(':')
    }
    if (hour >= 18 < hour < 24) {
      return '晚上' + [hour, minute].map(this.formatNumber).join(':')
    }
  }
  /**
   * @static 自定义时间显示方式
   * @param {*} now 目前时间戳
   * @param {*} el 目标时间戳
   * @memberof Tools
   */
  static customTime (now, el) {
    if (now - el < 86400) {
      now = el
      el = this.formatTime(el)
    } else if (now - el < 2592000) {
      let day = (now - el) / 86400
      now = el
      el = `${parseInt(day)}天前`
    } else {
      now = el
      el = this.formatFullTime(el)
    }
    return el
  }
  /**
   * @static 时间戳转发布时长
   * @param {Number} timestamp
   * @returns
   * @memberof Tools
   */
  static timeago (timestamp) {
    var minute = 60
    if (String(timestamp).length === 10) {
      timestamp *= 1000
    }
    var hour = minute * 60
    var day = hour * 24
    var week = day * 7
    // var halfamonth = day * 15
    var month = day * 30
    var now = new Date().getTime()
    console.log(now)
    console.log(timestamp)
    var diffValue = (now - timestamp) / 1000

    if (diffValue < 0) {
      return
    }
    var minC = diffValue / minute
    var hourC = diffValue / hour
    var dayC = diffValue / day
    var weekC = diffValue / week
    var monthC = diffValue / month
    var result
    if (monthC >= 1 && monthC <= 3) {
      result = ' ' + parseInt(monthC) + '月前'
    } else if (weekC >= 1 && weekC <= 3) {
      result = ' ' + parseInt(weekC) + '周前'
    } else if (dayC >= 1 && dayC <= 6) {
      result = ' ' + parseInt(dayC) + '天前'
    } else if (hourC >= 1 && hourC <= 23) {
      result = ' ' + parseInt(hourC) + '小时前'
    } else if (minC >= 1 && minC <= 59) {
      result = ' ' + parseInt(minC) + '分钟前'
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = '刚刚'
    } else {
      var datetime = new Date()
      datetime.setTime(timestamp)
      var Nyear = datetime.getFullYear()
      var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      // var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      // var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      // var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      result = `${Nyear}-${Nmonth}-${Ndate}`
    }
    return result
  }
  /**
   * @static 时间戳格式化
   * @param  {String} date 时间戳
   * @param  {String} fmt 格式 例：yyyy-MM-dd hh:mm:ss
   * @return yyyy-MM-dd hh:mm:ss
   * @memberof Tools
   */
  static formatDateV (date, fmt) {
    if (!date || date <= 0) {
      return 0
    }
    date = new Date(date * 1000)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (!this.isNotEmpty(fmt)) {
      fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  /**
   * @static 是否为空
   * @param {String} str 字段
   * @returns {boolean}
   * @memberof Tools
   */
  static isNotEmpty (str) {
    if (str !== '' && str !== null && typeof str !== 'undefined') {
      return true
    }
    return false
  }
  /**
   * ===================
   *     金融相关封装
   * ===================
  */
  /**
   * @static 价格单位转换(分转元)
   * @param {Number} value 价格
   * @returns
   * @memberof Tools
   */
  static priceFormat (value) {
    if (value === 0) {
      value = Number(value)
      value = value.toFixed(2)
      return value
    }
    if (!value) {
      return '0.00'
    } else {
      value = Number(value)
      value = (value / 100).toFixed(2)
      return value
    }
  }
  /**
   * @static 价格去掉后面多余的两位00
   * @param {Number} value 价格
   * @returns
   * @memberof Tools
   */
  static truePrice (value) {
    if (value === '0' || value === 0) {
      return value
    }
    if (!value) {
      return ''
    } else {
      value = String(value)
      value = value.substring(0, value.length - 2)
      return value
    }
  }
  /**
   * @static PMG钱币单位处理
   * @param {Number} value 价格
   * @returns
   * @memberof Tools
   */
  static CoinUnit (value) {
    if (value >= 1) {
      return `${value}元`
    } else if (value <= 1 && value >= 0.1) {
      return `${value * 10}角`
    } else if (value <= 0.1) {
      return `${value * 100}分`
    }
  }
  /**
   * @static PMG版别单位处理
   * @param {Number} value 版号标签
   * @returns
   * @memberof Tools
   */
  static CoinBanbie (value) {
    switch (value) {
      case 1:
        return '第一版人民币'
      case 2:
        return '第二版人民币'
      case 3:
        return '第三版人民币'
      case 4:
        return '第四版人民币'
      case 5:
        return '第五版人民币'
      case 6:
        return '第六版人民币'
      case 99:
        return '纪念币'
      default:
        return `${value}年`
    }
  }
  /**
   * @static PMG年份处理
   * @param {Number} value 年份
   * @returns
   * @memberof Tools
   */
  static CoinTime (value) {
    let val = Number(value)
    if (val === 1912) {
      return `${val}年(民国元年)`
    } else if (val <= 1949 && val > 1912) {
      return `${val}年(民国${val - 1911}年)`
    } else {
      return `${val}年`
    }
  }
  /**
   * @static 货币三位分隔过滤器
   * @param {*} money 价格
   * @returns
   * @memberof Tools
   */
  static MoneyFormat (money) {
    if (money && money != null) {
      money = String(money)
      let left = money.split('.')[0]
      let right = money.split('.')[1]
      right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : ''
      var temp = left.split('').reverse().join('').match(/(\d{1,3})/g)
      return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right
    } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return money
    } else {
      return ''
    }
  }
}
