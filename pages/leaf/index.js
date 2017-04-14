//获得app实例
const app = getApp();

//根据id获取数据
let getLeaf = function (that) {

  app
    .leaves
    .orderByChild('id')
    .equalTo(that.data.id)
    .on('value', function (snaphot) {

      let leaf = snaphot.val();

      
      
      for (let v in leaf) {
        if (leaf[v]) {
          that.setData({leaf: leaf[v]})

          return;
        }
      }

    })

}

Page({
  data: {
    id: '',
    leaf: {}
  },
  onLoad: function (option) {
    let that = this;

    that.setData({id: option.id});

    getLeaf(that)
  },
  onShareAppMessage: function () {
    let that = this;

    return app.sharePage(
      `${that.data.leaf.content.substr(0, 10)}...`,
      `${app.getCurrentPage()._route_}?id=${that.data.id}`
    )
  }
});
