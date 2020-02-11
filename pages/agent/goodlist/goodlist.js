// pages/agent/goodlist/goodlist.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goodlist: [
            {
                'id': '1',
                'name': '1小小小我西欧奥西欧小熊艾奥小嘻嘻嘻我嘻嘻嘻嘻嘻嘻嘻',
                'image': '/pages/images/lll.jpg'
            }, {
                'id': '2',
                'name': '2小小小我西欧奥西欧小熊艾奥小嘻嘻嘻我嘻嘻嘻嘻嘻嘻嘻',
                'image': '/pages/images/lll.jpg'
            }, {
                'id': '3',
                'name': '3小小小我西欧奥西欧小熊艾奥小嘻嘻嘻我嘻嘻嘻嘻嘻嘻嘻',
                'image': '/pages/images/lll.jpg'
            },
        ],
        xuan: '/pages/images/xuan.png',
        xuanzhong: '/pages/images/xuanzhong.png'
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
        wx.navigateTo({
            url: '../stockadd/stockadd?goodid=' + good.id + '&goodname=' + good.name,
        })
    }
})