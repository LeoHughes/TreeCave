//导入敏感词信息
const filterArr = require('../../utils/filterWords');

Page({
  data: {
    userInfo: {},
    inputLen: 0, //当前输入字符长度
    isAnonymous: true //默认匿名 0匿名 1非匿名
  },
  onLoad: function () {

    //读取用户信息缓存
    let info = wx.getStorageSync('userInfo');

    this.setData({
      userInfo: info
    })

    console.log(filterArr);

  },
  //检测输入字符长度
  inputHandle: function (e) {
    this.setData({
      inputLen: e.detail.value.length
    })
  },
  //选择匿名
  isAnonymous: function (e) {
    this.setData({
      isAnonymous: e.detail.value
    })
  },
  //提交
  sumbit: function (e) {
    console.log(e.detail.value);
  },
  //取消
  cancel: function (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
