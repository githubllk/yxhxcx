import HttpResource from 'helpers/HttpResource'
import HttpService from 'helpers/HttpService'
// import WxService from 'helpers/WxService'
// import Tools from 'helpers/Tools'
import Config from './config/config'
var util = require('./utils/util.js');

App({
  onLaunch() {
    if (!wx.getStorageSync("token")||!wx.getStorageSync("role")) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    wx.hideTabBar()
    // this.isLogin()
  },
  onShow() {
    console.log('onShowq')
  },
  globalData: {
    isLogin:false
  },
  onHide() {
    console.log('onHide')
  },
  // getUserInfo() {
  //   return this.WxService.login()
  //     .then(data => {
  //       console.log(data)
  //       return this.WxService.getUserInfo()
  //     })
  //     .then(data => {
  //       console.log(data)
  //       this.globalData.userInfo = data.userInfo
  //       return this.globalData.userInfo
  //     })
  // },
  // 自定义显示tabbar
  logout(){
    wx.reLaunch({
      url: '/pages/login/login'
    })
    wx.clearStorage()
  },
  onTabBar: function (key) {

    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.tabBarData[key];

    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true; // 根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  tabBarData: {
    userInfo: null,
    pop: 2,
    num: 0,
    user: {
      "color": "#515050",
      "selectedColor": "#B79547",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/index/index",//pages/images/index.png
          "text": "消息",
          "iconPath": "/pages/images/index.png",
          "selectedIconPath": "/pages/images/index-active.png",
          "clas": "tabbar-item",
          "active": true
        },
        {
          "pagePath": "/pages/me/me",
          "text": "我的",
          "iconPath": "/pages/images/my.png",
          "selectedIconPath": "/pages/images/my-active.png",
          "clas": "tabbar-item",
          "active": true
        }
      ]
    },
    keeper: {  //库管
      "color": "#515050",
      "selectedColor": "#B79547",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/pages/images/index.png",
          "selectedIconPath": "/pages/images/index-active.png",
          "clas": "tabbar-item",
          "active": true

        }, {
          "pagePath": "/pages/keeper/ruku/ruku",
          "text": "入库",
          "iconPath": "/pages/images/ruku.png",
          "selectedIconPath": "/pages/images/ruku-active.png",
          "clas": "tabbar-item",
          "active": true
        }, {
          "pagePath": "/pages/keeper/chuku/chuku",
          "text": "出库",
          "iconPath": "/pages/images/chuku.png",
          "selectedIconPath": "/pages/images/chuku-active.png",
          "clas": "tabbar-item",
          "active": true
        },
        {
          "pagePath": "/pages/me/me",
          "text": "我的",
          "iconPath": "/pages/images/my.png",
          "selectedIconPath": "/pages/images/my-active.png",
          "clas": "tabbar-item",
          "active": true
        }
      ]
    },
    dealer: {  //经销商
      "color": "#515050",
      "selectedColor": "#B79547",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/pages/images/index.png",
          "selectedIconPath": "/pages/images/index-active.png",
          "active": false

        },
        {
          "pagePath": "/pages/dealer/shopping/shopping",
          "text": "购物车",
          "iconPath": "/pages/images/shoppingcart.png",
          "selectedIconPath": "/pages/images/shoppingcart-active.png",
          "active": true
        },
        {
          "pagePath": "/pages/me/me",
          "text": "我的",
          "iconPath": "/pages/images/my.png",
          "selectedIconPath": "/pages/images/my-active.png",
          "active": false
        }
      ]
    },
    agent: {
      "color": "#515050",
      "selectedColor": "#B79547",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/pages/images/index.png",
          "selectedIconPath": "/pages/images/index-active.png",
          "active": true

        },
        {
          "pagePath": "/pages/me/me",
          "text": "用户管理",
          "iconPath": "/pages/images/my.png",
          "selectedIconPath": "/pages/images/my-active.png",
          "active": true
        }
      ]
    },

  },
  isLogin: util.throttle(function () {
    var self = this;
    if (!self.globalData.isLogin) {
      self.globalData.isLogin = true
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return false
    }
  }, 1000),

  // WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService,
  //   WxService: new WxService,
  // Tools: new Tools,
  Config: Config,
})