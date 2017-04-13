//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();

//页码和条数
let rows = 5;     //条数
let start = 0;  //开始下标
let end = 4;  //结束下标

//获取数据列表
let getList = function (that) {

  that.setData({
    hidden: false
  });

  app.leaves.orderByKey().startAt(start + '').endAt(end + '').on("value", function (snapshot) {

    if (snapshot.val() === null) {

      that.setData({
        hidden: true
      });      

      // wx.showModal({
      //   title: '提示',
      //   content: '已加载完毕',
      //   showCancel: false
      // })

    } else {
      
      let list = that.data.dataArr;
      let res_data = snapshot.val();
      let len = res_data.length;
      
      //如果是对象则表明是最后一条      
      if (util.isObject(res_data)) {
        for (let i in res_data) {
          list.push(res_data[i]);
        }
      } else {
        let len = res_data.length;

        for (var i = 0; i < len; i++) {
          if(res_data[i]) list.push(res_data[i]);
        }
      }

      that.setData({
        dataArr: list
      });

      start = end + 1;
      end = (start + rows) - 1;

      that.setData({
        hidden: true
      });
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
  onLoad: function () {

    let that = this;

    //获取系统信息    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    //获取数据总条数   
    app.getLength(function (len) {
      that.setData({
        length: len
      })      
    })

  },
  onShow: function () {
    let that = this;
    getList(that);
  },
  //下拉刷新数据
  down: function () {
    let that = this;
    getList(that);
  },
  //查看详细
  show: function (e) {
    wx.navigateTo({
      url: '/pages/leaf/index?id='+e.target.dataset.id
    })
  }
})