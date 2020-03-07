// pages/dealer/addrmanage/addrmanage.js
const App = getApp()
const util = require('../../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        address_id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        App.HttpService.getData(App.Config.getAddressListUrl).then(data => {
            if (data.code == 0) {
                this.setData({
                    list: data.data
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    selbind(e) {
        let address_id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        let address = this.data.list[index]
        this.setData({
            address_id: address_id
        })
        setTimeout(function () {
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
            prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                address_id: address_id,
                address: address.province_name + address.city_name + address.region_name + address.detail
            })
            //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
            //最后就是返回上一个页面。
            wx.navigateBack({
                delta: 1  // 返回上一级页面。
            })
        }, 1000);
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
    editbind(e) {
        let id = e.currentTarget.dataset.id
        if (id) {
            wx.navigateTo({
                url: '../addradd/addradd?id=' + id,
            })
        }
    },
    delbind(e) {
        let id = e.currentTarget.dataset.id
        if (id) {
            let param = {}
            param.title = '提示'
            param.content = '是否真的要删除'
            param.showCancel = true
            param.cb_confirm = (res) => { //确定
                App.HttpService.postData(App.Config.delDealerAddressUrl, { 'id': id }).then(data => {
                    if (data.code == 0) {
                        App.HttpService.getData(App.Config.getAddressListUrl).then(data => {
                            if (data.code == 0) {
                                this.setData({
                                    list: data.data
                                })
                            }
                        });
                    }
                });
            }
            param.cb_cancel = (res) => { //取消
            }
            util.tip(param)
        }
    }

})