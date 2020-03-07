// pages/dealer/orderdetail/orderdetail.js
const App = getApp()
const util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderdetail: [],
        address_id: 0,
        address: '',
        type:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var orderdetail = []
        if (options.type=='shopping') {
            orderdetail = wx.getStorageSync('shoppinglist')
            for (let i = 0; i < orderdetail.length; i++) {
                if(!orderdetail[i].selected){
                    orderdetail.splice(i,1)
                }
            }
        }else{
            orderdetail = wx.getStorageSync('orderdetail')
        }
        var total_money = 0
        for (let i = 0; i < orderdetail.length; i++) {
            total_money += orderdetail[i].price * orderdetail[i].discount / 10 * orderdetail[i].num
        }
        this.setData({
            orderdetail: orderdetail,
            total_money: total_money.toFixed(2),
            type:'shopping'
        })
        //获取默认收货地址
        App.HttpService.getData(App.Config.getAddressDefaultUrl).then(data => {
            if (data.code == 0) {
                if (data.data.address_id) {
                    this.setData({
                        address_id: data.data.address_id,
                        address: data.data.address
                    })
                }
            }
        });
    },
    buybind() {
        // let orderdetail = wx.getStorageSync('orderdetail')  //修改应该 取this.data.orderdetail
        let orderdetail = this.data.orderdetail
        if (Array.isArray(orderdetail)) {
            orderdetail = JSON.stringify(orderdetail)
            orderdetail = encodeURIComponent(orderdetail)
        }
        let address_id = this.data.address_id
        if (!address_id) {
            let param = {}
            param.title = '提示'
            param.content = '选择收货地址'
            param.showCancel = false
            util.tip(param)
            return false
        }
        App.HttpService.postData(App.Config.createByNowOrdersUrl, { 'orders': orderdetail, 'address_id': this.data.address_id }).then(data => {
            if (data.code == 0) {
                if (this.data.type=='shopping') {
                    let shoppinglist = wx.getStorageSync('shoppinglist')
                    for (let i = 0; i < shoppinglist.length; i++) {
                        if(shoppinglist[i].selected){
                            shoppinglist.splice(i,1)
                        }
                    } 
                    wx.setStorageSync('shoppinglist', shoppinglist)
                }else{
                    wx.removeStorage({
                        key: 'orderdetail',
                    })
                }
                wx.redirectTo({
                    url: '../orderdetail-d/orderdetail?order_id=' + data.data,
                })
            }
        });
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

    }
})