// pages/agent/stockdetails/stockdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option_active: 0,
    option_list: [{
      'id': 1,
      'name': '折扣系列',
    }, {
      'id': 2,
      'name': '新品上市',
    }, {
      'id': 3,
      'name': '高级系列',
    }, {
      'id': 4,
      'name': '青铜系列',
    }, {
      'id': 5,
      'name': '钻石上市',
    }, ],
    goodlist:[
      {
        'id':1,
        'good_name':'1小豆子化妆品小豆子化妆品小豆子化妆品小豆子化妆品',
        'pieces':1000,
        'price': 1000.00,
        'image': '../../images/lll.jpg',
        'status':1
      },{
        'id':2,
        'good_name':'2小豆子化妆品小豆子化妆品小豆子化妆品小豆子化妆品',
        'pieces':2000,
        'image': '../../images/lll.jpg',
        'price': '2000.00',
        'status':8
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  option_select: function (e) {
    this.setData({
      option_active: e.target.dataset.num
    })
  },
  goodsitem: function () {
    wx.navigateTo({
      url: '../stockgsdetails/stockgsdetails',
    })
  },
  jiabind: function (e) {
      let index = e.currentTarget.dataset.index
      let goodid = e.currentTarget.dataset.goodid
      let goodlist = this.data.goodlist
      for(let i in goodlist){
        if(i==index){
          if(goodlist[i].status==1){
            goodlist[i].status = 8
          }else{
            goodlist[i].status = 1
          }
        }
      }
      this.setData({
        goodlist:goodlist
      })
  },
  classifymanagebind:function(){
    wx.navigateTo({
      url: '../classifymanage/classifymanage',
    })
  },
  addgoodbind:function(){
    wx.navigateTo({
      url: '../gooddetail/gooddetail',
    })
  }

})