// pages/agent/orderdetail/orderdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stockarr: [{
            'name': '北京仓库',
            'id': 1
        }, {
            'name': '河北仓库',
            'id': 2
        }, {
            'name': '上海仓库',
            'id': 3
        }, {
            'name': '天津仓库',
            'id': 4
        },],
        hiddenn: 1,
        val: [0],
        form:{
            'stockid':[0]
        }
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
    //已收款
    confirmorderbind: function (e) {
        this.setData({
            hiddenn: 0,
            stockarr: this.data.stockarr,
            val: [0],
            isclassify: 1,
        })
    },
    // 阴影层消失
    shadowbind: function () {
        if (this.data.hiddenn == 0) {
            this.setData({
                hiddenn: 1,
            })
        }
    },
    paickerQuxiao: function () { //取消按钮

        this.setData({
            hiddenn: 1,
        })
    },
    paickerQueding: function () { //确定按钮
        console.log(this.data.form.stockid[0])
        this.setData({
            hiddenn: 1,
        })
    },
    inputVal: function (e) {
        let val = e.detail.value ? e.detail.value : '[0]'
        console.log(val)
        this.setData({
            'form.stockid': val
        })
    },
})