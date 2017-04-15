//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();

class commentData {
  constructor(content, nickName, avatarUrl) {
    this.date = util.getDate() + ' ' + util.getTimes();
    this.content = util.filterContent(content); //发布的内容
    this.nickName = nickName; //发布者昵称
    this.avatarUrl = avatarUrl; //发布者头像
  }
}

Page({
  data: {
    id: '', //当前leaf id
    userInfo: {},
    infoText: '请不要填写有敏感信息的评论', //提示文字
    inputLen: 0 //当前输入字符长度
  },
  onLoad: function (option) {

    this.setData({id: option.id});

    //读取用户信息缓存
    let info = wx.getStorageSync('userInfo');

    this.setData({userInfo: info})

  },
  //检测输入字符长度
  inputHandle: function (e) {
    this.setData({inputLen: e.detail.value.length})
  },
  //提交
  sumbit: function (e) {

    let that = this;

    if (that.data.inputLen === 0) {
      that.setData({infoText: '请输入内容！'});

      return;
    }

    let commentObj = new commentData(e.detail.value.content, that.data.userInfo.nickName, that.data.userInfo.avatarUrl);

    app
      .comments
      .child(that.data.id)
      .push(commentObj)
      .then(function () {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          complete: function () {
            setTimeout(function() {
              wx.navigateBack();
            }, 1000);
          }
        })
      })
      .catch(function () {
        wx.showToast({
          title: '提交失败!',
          icon: 'loading',
          complete: function () {
            wx.navigateBack();
          }
        })
      })

  },
  //取消
  cancel: function () {
    wx.navigateBack();
  }
})