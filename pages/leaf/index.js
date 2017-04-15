//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();

//根据id获取数据
let getLeaf = function (that) {

  app
    .leaves
    .orderByChild('id')
    .equalTo(that.data.id)
    .once('value')
    .then(function (snaphot) {
      let leaf = snaphot.val();

      for (let v in leaf) {
        if (leaf[v]) {
          that.setData({leaf: leaf[v]})

          return;
        }
      }
    })
    .then(function () {
      getComments(that);

      setTimeout(function() {
        wx.hideNavigationBarLoading();
      }, 800);      
    })

};

//根据开始结束下标获取评论数据
let getComments = function (that) {
  //拉取评论数据
  app
    .comments
    .child(that.data.id)
    .limitToLast(that.data.end)
    .on('value', function (snaphot) {
      
      let data = snaphot.val();

      that.setData({
        comments: data
      })

    })
};

Page({
  data: {
    id: '',
    leaf: {},
    start: 0,     //开始下标
    end: 5,       //结束下标
    comments: [], //评论数据
    inputLen: 0,  //当前输入字符长度
  },
  onLoad: function (option) {
    let that = this;

    that.setData({id: option.id});

    //loading
    wx.showNavigationBarLoading();

    getLeaf(that)
  },
  //检测输入字符长度
  inputHandle: function (e) {
    this.setData({inputLen: e.detail.value.length})
  },
  onPullDownRefresh: function () {
    let end = this.data.end + 10;

    this.setData({ end: end });

    getComments(this);
  }
});
