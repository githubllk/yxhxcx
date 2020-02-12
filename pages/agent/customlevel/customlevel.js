// pages/agent/customlevel/customlevel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 'list',
        qsr: '请输入',
        hiddenn: 1,
        val: [0],
        leveltext: '',
        arrlist: [],
        levelarr: [{
            'name': '7折',
            'id': 1
        }, {
            'name': '7.5折',
            'id': 2
        }, {
            'name': '8折',
            'id': 3
        }, {
            'name': '8.5折',
            'id': 4
        }, {
            'name': '9折',
            'id': 5
        }, {
            'name': '9.5折',
            'id': 6
        },],
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
    adduserlevelbind: function () {
        this.setData({
            type: 'edit'
        })
    },
    //弹出选项框
    selbind: function (e) {
        let arr = this.data.levelarr

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
        let leveltext = this.data.levelarr[val[0]].name
        this.setData({
            levelval: val,
            leveltext: leveltext,
        })
    },
})