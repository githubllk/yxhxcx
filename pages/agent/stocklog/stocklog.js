// pages/agent/stocklog/stocklog.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option_active: 1
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
    getstocklog(type) {
        App.HttpService.getData(App.Config.getStockLogUrl, {
            type: type,
        }).then((ret) => {
            if (ret.code == 0) {
                this.setData({
                    list: ret.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getstocklog(this.data.option_active)
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
        this.getstocklog(e.target.dataset.num)
        this.setData({
            option_active: e.target.dataset.num
        })
    }
})