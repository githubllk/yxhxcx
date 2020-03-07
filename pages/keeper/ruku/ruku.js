// pages/keeper/ruku/ruku.js
var array = require('../../common/pickertime.js')
var util = require('../../../utils/util.js')
const App = getApp()
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
    App.onTabBar('keeper');
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
    App.HttpService.getData(App.Config.getRukuListUrl, {
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
  //入库按钮
  rukubind(e) {
    let param = {}
    param.title = '提示'
    param.content = '确定入库?'
    param.showCancel = true
    param.cb_confirm = (res) => { //确定
      let log_id = e.currentTarget.dataset.log_id
      App.HttpService.postData(App.Config.rukuUpdateUrl, { 'log_id': log_id }).then(data => {
        if (data.code == 0) {
          this.setData({
            page: 1,
            list: [],
            nomore: false,
            option_active: 1,
          })
          this.getlist(1)
        }
      });
    }
    param.cb_cancel = (res) => { //取消

    }
    util.tip(param)

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