//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();


class leafData {
  constructor(content, isAnonymous, nickName, avatarUrl) {
    this.id = util.now();
    this.date = util.getDate() + ' ' + util.getTimes();
    this.content = util.filterContent(content); //发布的内容
    this.isAnonymous = isAnonymous;             //发布者类型，0 匿名，1 非匿名
    this.nickName = nickName;                   //发布者昵称
    this.avatarUrl = avatarUrl;                 //发布者头像
  }
}

Page({
  data: {
    userInfo: {},
    infoText: '把所有的不安情绪都仍进这树洞里，任它腐烂新生发芽。', //提示文字
    inputLen: 0, //当前输入字符长度
    isAnonymous: true //默认匿名 0匿名 1非匿名
  },
  onLoad: function () {

    //读取用户信息缓存
    let info = wx.getStorageSync('userInfo');

    this.setData({userInfo: info})

  },
  //检测输入字符长度
  inputHandle: function (e) {
    this.setData({inputLen: e.detail.value.length})
  },
  //选择匿名
  isAnonymous: function (e) {
    this.setData({isAnonymous: e.detail.value})
  },
  //提交
  sumbit: function (e) {

    if (this.data.inputLen === 0) {
      this.setData({infoText: '请输入内容！'});

      return;
    }

    let rqData = new leafData(e.detail.value.content, this.data.isAnonymous, this.data.userInfo.nickName, this.data.userInfo.avatarUrl);

    app.getLength(function (len) {
      app.leaves.child(len).set(rqData, function (err) {
        if (!err) {
          wx.showModal({
            title: '提示',
            content: '提交成功',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.switchTab({url: '/pages/index/index'})
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '提交失败，请检查网络状态',
            showCancel: false
          })
        }
      })
    })
    
  },
  reset: function () {
    
  },
  //取消
  cancel: function (e) {
    // wx.switchTab({url: '/pages/index/index'})
  }
})