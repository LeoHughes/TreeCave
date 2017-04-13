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

  },
  getLength: function (cb) {
    var that = this;

    if(that.globalData.dataLength){
      typeof cb == "function" && cb(that.globalData.dataLength)
    } else {
      
    //获取数据总条数    
    that.leaves.orderByKey().on('value', function (snapshot) {
      that.globalData.dataLength = snapshot.val().length;
      typeof cb == "function" && cb(that.globalData.dataLength)
    });      
    }   
  },
  globalData:{
    dataLength: 0
  }
})