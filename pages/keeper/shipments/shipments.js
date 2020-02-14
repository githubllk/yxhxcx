// pages/keeper/shipments/shipments.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expressarr: [{
            'name': '申通快递',
            'id': 1
        }, {
            'name': '圆通快递',
            'id': 2
        }, {
            'name': '顺丰快递',
            'id': 3
        }, {
            'name': '中通快递',
            'id': 4
        },],
        hiddenn: 1,
        val: [0],
        expresstext: '请选择',
        
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
    //弹出选项框
    selbind: function (e) {
        let arr = this.data.expressarr
        this.setData({
            hiddenn: 0,
            arr: arr,
            val: [0],
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
        console.log(this.data.val)
        this.setData({
            hiddenn: 1,
        })
    },
    inputVal: function (e) {
        let val = e.detail.value ? e.detail.value : '[0]'
        let expresstext = this.data.expressarr[val[0]].name
        this.setData({
            expressval: val,
            expresstext: expresstext,
        })
    },
})