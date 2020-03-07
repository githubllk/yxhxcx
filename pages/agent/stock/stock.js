// pages/agent/stock/stock.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nomore: false,
    pagesize: 10,
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.list()
  },
  list: function () {
    var self = this;
    App.HttpService.getData(App.Config.getKeeperListUrl, {
      page: self.data.page,
      pagesize: self.data.pagesize,
    }).then((ret) => {
      if (ret.code == 0) {
        self.setData({
          list: self.data.list.concat(ret.data)
        })
        if (ret.data.length != 0) {
          self.setData({
            page: self.data.page + 1,
            nomore: false
          })
        } else {
          self.setData({
            nomore: true
          })
        }

      }
    })
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
    wx.navigateBack({
      delta: 1
    })
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
    var self = this;
    self.list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 跳转
  stockjump: function (e) {
    let id = e.currentTarget.dataset.id
    let keeper_name = e.currentTarget.dataset.keeper_name
    wx.navigateTo({
      url: '../stockdetails/stockdetails?id='+id+'&keeper_name='+keeper_name,
    })
  },
  //跳转出入库记录
  stocklogbind: function () {
    wx.navigateTo({
      url: '../stocklog/stocklog',
    })
  },
  //跳转入库
  stockaddbind: function () {
    wx.navigateTo({
      url: '../stockadd/stockadd',
    })
  }
})