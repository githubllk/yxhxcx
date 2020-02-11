// pages/agent/stockdetails/stockdetails.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option_active : 0,
        option_list:[{
                'id':1,
                'name':'折扣系列',
            },{
                'id':2,
                'name':'新品上市',
            },{
                'id':3,
                'name':'高级系列',
            },{
                'id':4,
                'name':'青铜系列',
            },{
                'id':5,
                'name':'钻石上市',
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '北京仓库'
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
    option_select: function(e){
        this.setData({
            option_active: e.target.dataset.num
        })
    },
    goodsitem: function(){
        wx.navigateTo({
          url: '../stockgsdetails/stockgsdetails',
        })
    }
})