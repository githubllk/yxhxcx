// pages/keeper/shipments/shipments.js
var util = require('../../../utils/util.js')
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expressarr: [],
        hiddenn: 1,
        val: [0],
        expresstext: '请选择',
        form: {
            express_id: 0,
            express_no: 0,
            company: '',
            log_id: 0
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const log_id = options.log_id
        App.HttpService.getData(App.Config.keeperShipmentsItemUrl, {
            log_id: log_id
        }).then(data => {
            if (data.code == 0) {
                this.setData({
                    detail: data.data
                    , 'form.log_id': log_id
                })
            }
        });
        App.HttpService.getData(App.Config.getExpressListUrl).then(data => {
            if (data.code == 0) {
                this.setData({
                    expressarr: data.data
                })
            }
        });

    },
    affirmchukubind() {
        App.HttpService.postData(App.Config.chukuUpdateUrl, this.data.form).then(data => {
            if (data.code == 0) {
                wx.switchTab({
                    url: '../chuku/chuku',
                    success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                    }

                })
            }
        })
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
        // let arr = this.data.expressarr
        this.setData({
            hiddenn: 0,
            // arr: arr,
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
        let val = this.data.val ? this.data.val : '[0]'
        let expresstext = this.data.expressarr[val[0]].express_name
        let express_id = this.data.expressarr[val[0]].express_id
        console.log(this.data.val)
        this.setData({
            hiddenn: 1,
            'form.express_id': express_id,
            'form.company': expresstext,
        })
    },
    inputVal: function (e) {
        let val = e.detail.value ? e.detail.value : '[0]'
        // let expresstext = this.data.expressarr[val[0]].express_name
        // let express_id = this.data.expressarr[val[0]].express_id
        console.log(val)
        this.setData({
            val: val
        })
    },
    numinputbind: function (e) {
        let express_no = e.detail.value //修改的数据
        this.setData({
            'form.express_no': express_no
        })

    },
})