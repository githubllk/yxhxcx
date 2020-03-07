// pages/me/me.js
const app = getApp()
Page({
  data: {
    admin : 0
  },
  onLoad: function (options) {
    var rolearr = wx.getStorageSync('role')
    let role = rolearr[0]
    if(role=='agent'&&rolearr[1]==='soleagent'){
      this.setData({
        admin:'soleagent'
      })
    }
    wx.hideTabBar()
    this.setData({
      role: role,
      admin:this.data.admin
    })
    app.onTabBar(role);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    app.HttpService.getData(app.Config.getCustomItemUrl).then(dataa => {
      if (dataa.code == 0) {
          this.setData({
            custom:dataa.data
          })
      }
    })
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
  logout(){
    wx.reLaunch({
      url: '/pages/login/login'
    })
    wx.clearStorage()
  },

})