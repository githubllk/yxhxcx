// pages/agent/index/index.js
var array = require('../common/pickertime.js')

const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 4,
    nomore: false,
    agentarray: {
      array: array.pickertime(),
      option_active: 1,
      isCustomTime: false,
      statistics:{"turnover":0,"place_order":0,"chengjiao":0,"ruku":0,"chuku":0,"shoukuan":0,"not_chuku":0,"shouhuo":0},
      dealer_count:0,
      startDate:'',
      endDate:'',
    },
    array: array.pickertime(),
    option_active: 1,
    isCustomTime: false,
    year: '',
    month: '',
    day: '',
    keeperarray: {
      option_active: 0,
      option_list: [],
      goods_list: []
    },
    dealerarray: {
      option_active: 0,
      option_list: [],
      goods_list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var role = wx.getStorageSync('role')[0]

    if (!role) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return false
    }
    console.log(role)

    wx.hideTabBar()
    this.setData({
      role: role
    })
    App.onTabBar(role);
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
    // -------------------库管------------------------------------
    if (this.data.role == 'keeper') {
      this.keepertongjibind()
      this.setData({
        'listurl': App.Config.getKeeperGoodsListUrl
      })
      this.getoption()
    }
    // -------------------经销商------------------------------------
    else if (this.data.role == 'dealer') {
      this.setData({
        'listurl': App.Config.getDealerGoodsListUrl
      })
      this.getoption()
    }
    // -------------------代理商------------------------------------
    else if (this.data.role == 'agent') {
      this.gettongji({'date_type':1})
      App.HttpService.getData(App.Config.getCountDealerUrl).then(dataa => {
        if (dataa.code == 0) {
          this.setData({
            'agentarray.dealer_count':dataa.data
          })
        }
      });
    }
    // this.getGoodsList()

  },
  d_option_select: function (e) {

    let num = e.currentTarget.dataset.num
    let role = this.data.role
    let option_active = `${role}array.option_active`
    let goods_list = `${role}array.goods_list`
    this.setData({
      page: 1,
      [goods_list]: [],
      nomore: false
    })
    this.getGoodsList(num)
    this.setData({
      [option_active]: num
    })
  },
  getoption() {
    let role = this.data.role
    App.HttpService.getData(App.Config.getCategoryListUrl).then(dataa => {
      if (dataa.code == 0) {
        this.getGoodsList(dataa.data[0].id)
        let option_list = `${role}array.option_list`
        let option_active = `${role}array.option_active`
        this.setData({
          [option_list]: dataa.data,
          [option_active]: dataa.data[0].id,
        })
      }
    });
  },
  getGoodsList(category_id) {
    if (this.data.nomore) {
      return false
    }
    let url = this.data.listurl
    let role = this.data.role
    App.HttpService.getData(url, {
      page: this.data.page,
      limit: this.data.limit,
      category_id: category_id
    }).then(data => {
      if (data.code == 0) {
        let goods_list = `${role}array.goods_list`
        this.setData({
          [goods_list]: this.data[role + 'array'].goods_list.concat(data.data)
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
    if (this.data.role == 'keeper') {

    } else
      // -------------------经销商------------------------------------
      if (this.data.role == 'dealer') {

        let role = this.data.role
        let option_active = this.data[role + 'array'].option_active
        this.getGoodsList(option_active)
      }
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
    }else{
      this.gettongji({'date_type':e.target.dataset.num})
    }
    this.setData({
      'agentarray.option_active': e.target.dataset.num,
      'agentarray.isCustomTime': isCustomTime
    })
  },
  gettongji(param){
    App.HttpService.getData(App.Config.getAgentCountUpUrl,param).then(dataa => {
      if (dataa.code == 0) {
        this.setData({
          'agentarray.statistics':dataa.data
        })
      }
    });
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
        startDatea = newdate.getFullYear() + '-' + 0 + Number(newdate.getMonth() + 1) + '-' + newdate.getDate();
      }
      this.setData({
        'agentarray.startDate': startDatea
      })
    } else if (this.data.agentarray.endDatesel == 1) {
      let endDatea = this.data.agentarray.endDatea
      if (!endDatea) {
        const newdate = new Date();
        endDatea = newdate.getFullYear() + '-' + 0 + Number(newdate.getMonth() + 1) + '-' + newdate.getDate();
      }
      this.setData({
        'agentarray.endDate': endDatea
      })
    }
    // 两个时间选择完发出请求
    let startDate = this.data.agentarray.startDate
    let endDate = this.data.agentarray.endDate
    if (!!endDate&&!!startDate) {
      this.gettongji({'date_type':4,'start_date':startDate,'end_date':endDate})
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
  // d_option_select: function (e) {
  //   this.setData({
  //     'dealerarray.option_active': e.target.dataset.num,
  //   })
  // },
  goodsitembind: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dealer/gooddetail/gooddetail?goods_id=' + id,
    })
  },
  // --------------------------------------- 库管 -----------------------------------------


  goodsitem: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/keeper/stockgsdetails/stockgsdetails?id=' + id,
    })
  },
  //统计
  keepertongjibind() {
    App.HttpService.getData(App.Config.getKeeperCountUpUrl).then(data => {
      if (data.code == 0) {
        this.setData({
          'keeperarray.tongji': data.data
        })
      }
    });
  }
})