// pages/agent/dealercountd/dealercountd.js
var array = require('../../common/pickertime.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: array.pickertime(),
        option_active: 1,
        isCustomTime: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    option_select: function (e) {
        let isCustomTime;
        isCustomTime = false
        if (e.target.dataset.num == 4) { //自定义时间
          isCustomTime = true
        }
        this.setData({
          'option_active': e.target.dataset.num,
          'isCustomTime': isCustomTime
        })
      },
      bindStartDateChange: function (e) {
        this.setData({
          'startDate': e.detail.value
        })
      },
      bindEndDateChange: function (e) {
        this.setData({
          'endDate': e.detail.value
        })
      },
      // 时间选择开始
      startDatebind: function (e) {
        if (this.data.startValue) {
          var startValue = this.data.startValue
        } else {
          var startValue = this.data.array.value
        }
    
        this.setData({
          'showpickertime': 1,
          'startDatesel': 1,
          'endDatesel': 0,
          'array.value': startValue,
        })
      },
      endDatebind: function (e) {
        if (this.data.endValue) {
          var endValue = this.data.endValue
        } else {
          var endValue = this.data.array.value
        }
        this.setData({
          'showpickertime': 1,
          'startDatesel': 0,
          'endDatesel': 1,
          'array.value': endValue
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
        if (this.data.startDatesel == 1) {
          this.setData({
            'startDatea': year + '-' + month + '-' + day,
            'startValue': val
          })
        } else if (this.data.endDatesel == 1) {
          this.setData({
            'endDatea': year + '-' + month + '-' + day,
            'endValue': val
          })
        }
      },
      //取消按钮
      paickerQuxiao: function () {
        this.setData({
          'showpickertime': 0
        })
      },
      //确定按钮
      paickerQueding: function () {
        if (this.data.startDatesel == 1) {
          let startDatea = this.data.startDatea
          if (!startDatea) {
            const newdate = new Date();
            startDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
          }
          this.setData({
            'startDate': startDatea
          })
        } else if (this.data.endDatesel == 1) {
          let endDatea = this.data.endDatea
          if (!endDatea) {
            const newdate = new Date();
            endDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
          }
          this.setData({
            'endDate': endDatea
          })
        }
        this.setData({
          'showpickertime': 0
        })
      },
})