// pages/agent/ordermanage/ordermanage.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option_active: 1,
    list: [],
    page: 1,
    limit: 4,
    nomore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist(this.data.option_active)
  },
  getlist(status) {
    if (this.data.nomore) {
      return false
    }
    App.HttpService.getData(App.Config.getAgentOrderListUrl, {
      page: this.data.page,
      limit: this.data.limit,
      status: status
    }).then(data => {
      if (data.code == 0) {
        this.setData({
          list: this.data.list.concat(data.data)
        })

        if (data.data.length != 0) {
          this.setData({
            page: this.data.page + 1,
            nomore: false
          })
        } else {
          this.setData({
            nomore: true
          })
        }
      }
    });
  },
  yishoukubind(e) {
    let order_id = e.currentTarget.dataset.order_id
    wx.navigateTo({
      url: '../orderdetail/orderdetail?order_id=' + order_id,
    })
  },
  cancelbind(e) {
    let order_id = e.currentTarget.dataset.order_id
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    list.splice(index,1)
    App.HttpService.postData(App.Config.cancelAgentOrderUrl, { 'order_id': order_id }).then(data => {
      if (data.code == 0) {
          this.setData({
            list:list
          })
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
    this.getlist(this.data.option_active)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  option_select: function (e) {
    this.setData({
      'option_active': e.target.dataset.num,
      page: 1,
      list: [],
      nomore: false
    })
    this.getlist(e.target.dataset.num)
  },
})