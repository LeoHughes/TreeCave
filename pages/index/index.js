//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();

//页码和条数
let rows = 5; //条数
let start = 0; //开始下标
let end = 4; //结束下标

//获取数据列表
let getList = function (that) {

  if (end >= that.data.length) end = that.data.length;  

  console.log('开始下标:' + start);
  console.log('结束下标:' + end);

  that.setData({hidden: false});

  app
    .leaves
    .orderByChild('date')
    .startAt(start + '')
    .endAt(end + '')
    .on("value", function (snapshot) {

      if (snapshot.val() === null) {

        that.setData({hidden: true});

      } else {

        let list = that.data.dataArr;
        let res_data = snapshot.val();
        console.dir(res_data)
        let len = res_data.length;

        //如果是对象则表明是最后一条
        if (util.isObject(res_data)) {
          for (let i in res_data) {
            list.push(res_data[i]);
          }
        } else {
          let len = res_data.length;

          for (var i = 0; i < len; i++) {
            if (res_data[i]) 
              list.push(res_data[i]);
            }
          }

        that.setData({dataArr: list.reverse()});

        start = end + 1;
        end = (start + rows) - 1;

        that.setData({hidden: true});
      }

    });

}

Page({
  data: {
    hidden: true,
    scrollHeight: 0,
    dataArr: [],
    length: 0
  },
  onLoad: function (options) {

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
      console.log(that.data.length);
      getList(that);
    })

  },
  onShow: function () {
    getList(this);
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