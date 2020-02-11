// pages/me/me.js
const app = getApp()
Page({
  data: {
   
  },
  onLoad: function (options) {
    wx.hideTabBar()
    this.setData({
      role: 'agent'
    })
    app.onTabBar('agent');

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})