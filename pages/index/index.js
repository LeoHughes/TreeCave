//获得app实例
const app = getApp();

//页码和条数
let s_index = 0;
let e_index = 4;

//获取数据列表
let getList = function (that) {

  that.setData({
    hidden: false
  });

  app.leaves.orderByKey().startAt(s_index + '').endAt(e_index + '').on("value", function (snapshot) {

    if (snapshot.val() === null || that.data.dataArr.length >= that.data.length) {

      that.setData({
        hidden: true
      });      

      wx.showModal({
        title: '提示',
        content: '已加载完毕',
        showCancel: false
      })

    } else {
      
      let list = that.data.dataArr;
      let res_data = snapshot.val();
      let len = res_data.length;

      for (var i = 0; i < len; i++) {
        if(res_data[i]) list.push(res_data[i]);
      }

      that.setData({
        dataArr: list
      });

      s_index = e_index + 1;

      e_index = s_index + e_index;

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
    app.leaves.orderByKey().on('value', function (snapshot) {
      that.setData({
        length: snapshot.val().length
      })
    });

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