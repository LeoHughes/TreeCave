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

  }
})