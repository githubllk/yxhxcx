// pages/agent/stockgsdetails/stockgsdetails.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isedit: 0, //是否是修改页面
        goodslist: [
            {
                'id': 1,
                'name': '补水保湿',
                'num': 100,
                'attr': [
                    {
                        'id': 20,
                        'num': 99,
                        'name': '100g'
                    }, {
                        'id': 21,
                        'num': 1,
                        'name': '50g'
                    },
                ]
            }, {
                'id': 2,
                'name': '祛痘控油',
                'num': 100,
                'attr': [
                    {
                        'id': 22,
                        'num': 51,
                        'name': '100g'
                    }, {
                        'id': 23,
                        'num': 49,
                        'name': '50g'
                    },
                ]
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
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
    
    
})