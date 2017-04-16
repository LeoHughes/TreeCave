//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();


//获取数据列表
let getList = function (that) {

  let list = that.data.dataArr;

  //页码和条数
  let rows = that.data.rows; //条数
  let start = that.data.start; //开始下标
  let end = that.data.end; //结束下标
  let max = that.data.length;

  if (list.length >= that.data.length) {
    return;
  }

  //loading
  that.setData({hidden: false});

  app
    .leaves
    .orderByChild('number')
    .startAt(start)
    .endAt(end)
    .once('value')
    .then(function (snapshot) {

      let resData = snapshot.val();

      for (let v in resData) {
        list.push(resData[v])
      };

      if (end >= max) {
        end = max;
      } else {
        start = end + 1;
        end = (start + rows) - 1; 
      }

      //过滤重复数据
      list = util.colUnique(list);

      that.setData({
        hidden: true,
        dataArr: list,
        start: start,
        end: end
      });
    })
    .catch(function (err) {
      wx.showModal({
        title: '出错了',
        content: err.toString(),
        showCancel: false
      })
    })

}

Page({
  data: {
    hidden: true,
    scrollHeight: 0,
    dataArr: [],
    length: 0,
    rows: 5,   //条数
    start: 0,  //开始下标
    end: 4     //结束下标
  },
  onLoad: function () {

    let that = this;

    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({scrollHeight: res.windowHeight});
      }
    });

    //获取数据总条数
    app.getLength(function (len) {
      that.setData({ length: len });

      getList(that);
    })

  },
  //下拉刷新数据
  down: function () {
    getList(this);
  },
  //查看详细
  show: function (e) {
    wx.navigateTo({
      url: '/pages/leaf/index?id=' + e.target.dataset.id
    })
  },
  //查看用户
  showUser: function (e) {
    wx.navigateTo({
      url: '/pages/myLeaves/index?nickName=' + e.target.dataset.nickname
    })
  },
  //分享
  onShareAppMessage: function () {
    let that = this;

    return app.sharePage('TreeCave 树洞', `${app.getCurrentPage()._route_}`)
  }
})