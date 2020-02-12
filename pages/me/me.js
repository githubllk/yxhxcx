// pages/me/me.js
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    wx.hideTabBar()
    this.setData({
      role: 'soleagentme'
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
  },
  // 总代理
  agentbind: function (e) {
    let type = e.currentTarget.dataset.type
    // 1 新建总代理 2 ...
    let url = '/pages/agent/custommanage/custommanage?type=' + type
    wx.navigateTo({
      url: url,
    })
  },
  
  //end

})