//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();


class leafData {
  constructor(content, isAnonymous, nickName, avatarUrl, index) {
    this.id = util.now();
    this.date = util.getDate() + ' ' + util.getTimes();
    this.content = util.filterContent(content); //发布的内容
    this.isAnonymous = isAnonymous;             //发布者类型，0 匿名，1 非匿名
    this.nickName = nickName;                   //发布者昵称
    this.avatarUrl = avatarUrl;                 //发布者头像
    this.number = index;                         //数据下标，用于分页处理
  }
}

Page({
  data: {
    userInfo: {},
    infoText: '把所有的不安情绪都仍进这树洞里，任它腐烂新生发芽。', //提示文字
    inputLen: 0, //当前输入字符长度
    isAnonymous: true, //默认匿名 0匿名 1非匿名
    index: null  //数据下标
  },
  onLoad: function () {

    let that = this;

    //获取下标
    app.getLength(function (len) {
      that.setData({ index: len });
    })

    //读取用户信息缓存
    let info = wx.getStorageSync('userInfo');

    that.setData({userInfo: info})

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

    let that = this;

    if (that.data.inputLen === 0) {
      that.setData({infoText: '请输入内容！'});

      return;
    }

    let rqData = new leafData(e.detail.value.content, that.data.isAnonymous, that.data.userInfo.nickName, that.data.userInfo.avatarUrl, that.data.index);


    app
      .leaves
      .push(rqData)
      .then(function () {

        //添加对应的评论节点
        app.comments.child(rqData.id).set({date: rqData.date})

        wx.showToast({
          title: '提交成功',
          icon: 'success',
          complete: function () {
            setTimeout(function() {
              wx.switchTab({url: '/pages/index/index'})
            }, 1000);
          }
        })
      })
      .catch(function () {
        wx.showToast({
          title: '提交失败，请检查网络状态!',
          icon: 'loading'
        })
      })
    
  },
  reset: function () {
    
  },
  //取消
  cancel: function (e) {
    wx.switchTab({ url: '/pages/index/index' });
  }
})