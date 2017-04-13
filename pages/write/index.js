//导入公用方法
const util = require('../../utils/util');

//提交数据
let rqData = {
  "id": "",
  "content": "",      //发布的内容
  "date": "",         //发布时间
  "isAnonymous": 0,   //发布者类型，0 匿名，1 非匿名
  "nickName": "",     //发布者昵称
  "avatarUrl": ""     //用户头像
};


Page({
  data: {
    userInfo: {},
    infoText: '请不要发布带有敏感词的信息，谢谢。',     //提示文字
    inputLen: 0,      //当前输入字符长度
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
      this.setData({
        infoText: '请输入内容！'
      });

      return;
    }

    rqData.id = util.now();
    
    rqData.content = filterWords(util.filterContent(e.detail.value.content));

    rqData.date = util.getDate() + '' + util.getTimes();

    rqData.isAnonymous = this.data.isAnonymous;

    rqData.nickName = this.data.userInfo.nickName;

    rqData.avatarUrl = this.data.userInfo.avatarUrl;

    console.log(i);

  },
  //取消
  cancel: function (e) {
    wx.switchTab({url: '/pages/index/index'})
  }
})