//导入公用方法
const util = require('./utils/util');

//导入数据
let baseData = require('./utils/data')

//app.js
App({
  onLaunch: function () {

    //调用登录接口
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {

            wx.setStorageSync('userInfo', res.userInfo);
          }
        })
      }
    })

    this.leaves = baseData.getref();

    this.comments = baseData.getCommentsRef();

  },
  //获取数据总条数
  getLength: function (cb) {
    var that = this;

    if (that.globalData.dataLength) {
      typeof cb == "function" && cb(that.globalData.dataLength)
    } else {

      that
        .leaves
        .orderByKey()
        .on('value', function (snapshot) {
          let leavesData = snapshot.val();

          leavesData === null ? (leavesData = {}) : leavesData;

          that.globalData.dataLength = util.size(leavesData);
          typeof cb == "function" && cb(that.globalData.dataLength)
        });
    }
  },
  //分享
  sharePage: function (title, path, cb) {
    return {title: title, path: path, success: function (res) {
      wx.showModal({
        title: '提示',
        content: '分享成功',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            typeof cb == 'function' && cb()
          }
        }
        })
      }, fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '分享失败',
          showCancel: false
          })
      }}
  },
  globalData: {
    dataLength: 0
  }
})