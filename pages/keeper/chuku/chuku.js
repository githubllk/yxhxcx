// pages/keeper/chuku/chuku.js
var array = require('../../common/pickertime.js')

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      option_active : 1
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
    option_select:function(e){
        this.setData({
            option_active: e.target.dataset.num
        })
    }
})