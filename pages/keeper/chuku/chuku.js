// pages/keeper/chuku/chuku.js
var array = require('../../common/pickertime.js')
const App = getApp()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option_active: 0,
    list: [],
    page: 1,
    limit: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar()
    this.setData({
      role: 'keeper'
    })
    app.onTabBar('keeper');
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
    this.getlist(this.data.option_active)
  },
  getlist(status) {
    if (this.data.nomore) {
      return false
    }
    App.HttpService.getData(App.Config.getChukuListUrl, {
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
  chukubind(e) {

    let log_id = e.currentTarget.dataset.log_id
    wx.navigateTo({
      url: '../shipments/shipments?log_id='+log_id,
    })

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
      page: 1,
      list: [],
      nomore: false
    })
    this.getlist(e.target.dataset.num)
    this.setData({
      option_active: e.target.dataset.num
    })
  }
})