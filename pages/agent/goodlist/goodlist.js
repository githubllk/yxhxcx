// pages/agent/goodlist/goodlist.js
const App = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goodlist: [],
        xuan: '/pages/images/xuan.png',
        xuanzhong: '/pages/images/xuanzhong.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.category_id == 'undefined' || !options.category_id) {
            wx.showModal({
                title: '提示',
                content: '请先选择分类',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        }
        App.HttpService.getData(App.Config.getGoodsListUrl, {
            'category_id': options.category_id,
        }).then(data => {
            if (data.code == 0) {
                this.setData({
                    goodlist: data.data
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

    },
    xuanbind: function (e) {
        let index = e.detail.value;
        const goodlist = this.data.goodlist
        let selgood = goodlist[index]
        this.setData({
            'selgood': selgood
        })

    },
    quedingbind: function () {
        let good = this.data.selgood
        let stockadd = wx.getStorageSync('stockadd')
        stockadd['goods_id'] = good.id
        stockadd['goods_name'] = good.goods_name
        stockadd['cover_image'] = good.cover_image
            wx.setStorage({
                data: stockadd,
                key: 'stockadd',
            })
        // 返回上一页
        wx.navigateBack({
            delta: 1
        })
    }
})