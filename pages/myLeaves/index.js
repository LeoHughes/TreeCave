//导入公用方法
const util = require('../../utils/util');

//获得app实例
const app = getApp();

//页码和条数
let end = 5; //结束下标

//根据id获取数据
let getList = function (that) {

  app
    .leaves
    .orderByChild('nickName')
    .equalTo(that.data.nickName)
    .limitToLast(end)
    .on('value', function (snapshot) {

      let list = [];
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
          if (res_data[i]) 
            list.push(res_data[i]);
          }
        }

      that.setData({dataArr: list});

    })


}

Page({
  data: {
    nickName: '',
    dataArr: []
  },
  onLoad: function (option) {
    let that = this;

    //读取用户信息缓存
    let info = wx.getStorageSync('userInfo');

    let nickName = info.nickName;

    if (option.nickName) 
      nickName = option.nickName;
    
    that.setData({nickName: nickName});

  },
  onShow: function () {
    let that = this;
    getList(that);
  },
  onPullDownRefresh: function () {
    end += 10;   

    getList(this);
  },
  //查看详细
  show: function (e) {
    wx.navigateTo({
      url: '/pages/leaf/index?id=' + e.target.dataset.id
    })
  }
});
