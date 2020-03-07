// pages/agent/stockdetails/stockdetails.js
const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        option_active: 0,
        option_list: [],
        nomore: false,
        pagesize: 10,
        page: 1,
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let keeper_id = options.id
        let keeper_name = options.keeper_name

        App.HttpService.getData(App.Config.getCategoryListUrl).then(dataa => {
            if (dataa.code == 0) {
                this.getgoodslist(keeper_id, dataa.data[0].id)
                this.setData({
                    option_list: dataa.data,
                    option_active: dataa.data[0].id,
                    keeper_id: keeper_id,
                })
            }
        });

        wx.setNavigationBarTitle({
            title: keeper_name
        })
    },
    getgoodslist(keeper_id, category_id,switch_op=1) {
        const self= this
        App.HttpService.getData(App.Config.getKeeperGoodsListUrl, {
            keeper_id: keeper_id,
            category_id: category_id,
            page: self.data.page,
            pagesize: self.data.pagesize,
        }).then((ret) => {
            if (ret.code == 0) {
                if (switch_op) {
                    self.setData({
                        list: ret.data.list
                    }) 
                }else{
                    self.setData({
                        list: self.data.list.concat(ret.data.list)
                    })
                    if (ret.data.list.length != 0) {
                        self.setData({
                            page: self.data.page + 1,
                            nomore: false
                        })
                    } else {
                        self.setData({
                            nomore: true
                        })
                    }
                }
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
    option_select: function (e) {
        let num = e.currentTarget.dataset.num
        this.getgoodslist(this.data.keeper_id,num,1)
        this.setData({
            option_active: num
        })
    },
    goodsitem: function (e) {
        let keeper_id = this.data.keeper_id
        let goods_id = e.currentTarget.dataset.goods_id

        wx.navigateTo({
            url: '../stockgsdetails/stockgsdetails?keeper_id='+keeper_id+'&goods_id='+goods_id,
        })
    }
})