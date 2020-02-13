// pages/agent/index/index.js
var array = require('../common/pickertime.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agentarray: {
      array: array.pickertime(),
      option_active: 1,
      isCustomTime: false,
    },
    array: array.pickertime(),
    option_active: 1,
    isCustomTime: false,
    year: '',
    month: '',
    day: '',
    keeperarray: {
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
      },],
      goodlist:[
        {
          'id':1,
          'good_name':'你好你好你好你好你好你好你好你好你好你好你好你好你好..',
          'pieces':1000,
          'price': 1000.00,
          'image': '/pages/images/lll.jpg',
          'status':1
        },{
          'id':2,
          'good_name':'2小豆子化妆品小豆子化妆品小豆子化妆品小豆子化妆品',
          'pieces':2000,
          'image': '/pages/images/lll.jpg',
          'price': '2000.00',
          'status':8
        },
        {
          'id':3,
          'good_name':'你好你好你好你好你好你好你好你好你好你好你好你好你好..',
          'pieces':1000,
          'price': 1000.00,
          'image': '/pages/images/lll.jpg',
          'status':1
        },{
          'id':4,
          'good_name':'2小豆子化妆品小豆子化妆品小豆子化妆品小豆子化妆品',
          'pieces':2000,
          'image': '/pages/images/lll.jpg',
          'price': '2000.00',
          'status':8
        },
        {
          'id':5,
          'good_name':'2小豆子化妆品小豆子化妆品小豆子化妆品小豆子化妆品',
          'pieces':2000,
          'image': '/pages/images/lll.jpg',
          'price': '2000.00',
          'status':8
        },
      ]
    }
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
  // ------------------------------- 总代理js -------------------------------------//
  option_select: function (e) {
    let isCustomTime;
    isCustomTime = false
    if (e.target.dataset.num == 4) { //自定义时间
      isCustomTime = true
    }
    this.setData({
      'agentarray.option_active': e.target.dataset.num,
      'agentarray.isCustomTime': isCustomTime
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      'agentarray.startDate': e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      'agentarray.endDate': e.detail.value
    })
  },
  // 时间选择开始
  startDatebind: function (e) {
    if (this.data.agentarray.startValue) {
      var startValue = this.data.agentarray.startValue
    } else {
      var startValue = this.data.agentarray.array.value
    }

    this.setData({
      'agentarray.showpickertime': 1,
      'agentarray.startDatesel': 1,
      'agentarray.endDatesel': 0,
      'agentarray.array.value': startValue,
    })
  },
  endDatebind: function (e) {
    if (this.data.agentarray.endValue) {
      var endValue = this.data.agentarray.endValue
    } else {
      var endValue = this.data.agentarray.array.value
    }
    this.setData({
      'agentarray.showpickertime': 1,
      'agentarray.startDatesel': 0,
      'agentarray.endDatesel': 1,
      'agentarray.array.value': endValue
    })
  },
  inputVal: function (e) {
    const val = e.detail.value
    const array = this.data.array
    const year = array.years[val[0]]
    let month = array.months[val[1]]
    let day = array.days[val[2]]
    if (month <= 9) {
      month = "0" + month
    }
    if (day <= 9) {
      day = "0" + day
    }
    if (this.data.agentarray.startDatesel == 1) {
      this.setData({
        'agentarray.startDatea': year + '-' + month + '-' + day,
        'agentarray.startValue': val
      })
    } else if (this.data.agentarray.endDatesel == 1) {
      this.setData({
        'agentarray.endDatea': year + '-' + month + '-' + day,
        'agentarray.endValue': val
      })
    }
  },
  //取消按钮
  paickerQuxiao: function () {
    this.setData({
      'agentarray.showpickertime': 0
    })
  },
  //确定按钮
  paickerQueding: function () {
    if (this.data.agentarray.startDatesel == 1) {
      let startDatea = this.data.agentarray.startDatea
      if (!startDatea) {
        const newdate = new Date();
        startDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
      }
      this.setData({
        'agentarray.startDate': startDatea
      })
    } else if (this.data.agentarray.endDatesel == 1) {
      let endDatea = this.data.agentarray.endDatea
      if (!endDatea) {
        const newdate = new Date();
        endDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
      }
      this.setData({
        'agentarray.endDate': endDatea
      })
    }
    this.setData({
      'agentarray.showpickertime': 0
    })
  },
  stockbind: function (e) {
    let type = e.currentTarget.dataset.type
    let url
    if (type == 1) {
      url = '../agent/stock/stock'
    } else if (type == 2) {
      url = '../agent/goodmanage/goodmanage'
    } else if (type == 3) {
      url = '../agent/ordermanage/ordermanage'
    }
    wx.navigateTo({
      url: url,
    })
  },

  // --------------------------------------- 经销商 -----------------------------------------



  // --------------------------------------- 库管 -----------------------------------------

  goodsitem:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/keeper/stockgsdetails/stockgsdetails?id='+id,
    })
  },
})