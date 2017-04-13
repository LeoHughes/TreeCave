//获得app实例
const app = getApp();

//根据id获取数据
let getLeaf = function (that) {  

  app.leaves.orderByChild('id').equalTo(that.data.id).on('value', function (snaphot) {

    let leaf = snaphot.val();

    for (let value of leaf) {
      if (value) {
        that.setData({
          leaf: value
        })
        
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

    that.setData({
      id: option.id
    });

    getLeaf(that)
  }
});


