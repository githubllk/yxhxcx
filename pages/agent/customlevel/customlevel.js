// pages/agent/customlevel/customlevel.js
const App = getApp()
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
        levelarr: [],
        list: [],
        detail: false,
        id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        if (!!options.id) {
            App.HttpService.getData(App.Config.customLevelDiscountlUrl).then(data => {
                if (data.code == 0) {
                    this.setData({
                        levelarr: data.data,
                        arr: data.data,
                        id: options.id
                    })
                    App.HttpService.getData(App.Config.customLeveldetailUrl, { 'id': options.id }).then(dataa => {
                        let levelarr = data.data
                        let detail = dataa.data
                        let val
                        if (data.code == 0) {
                            for (var i = 0; i < levelarr.length; i++) {
                                if (levelarr[i].name == detail.discount) {
                                    val = [i]
                                }
                            }
                            this.setData({
                                detail: detail,
                                type: 'edit',
                                val: val,
                                leveltext: detail.discount + '折'
                            })
                        }
                    });
                }
            });
        } else {
            App.HttpService.getData(App.Config.customLevelUrl).then(data => {
                if (data.code == 0) {
                    this.setData({
                        list: data.data
                    })
                }
            });
        }

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
        if (!this.data.id) {
            App.HttpService.getData(App.Config.customLevelDiscountlUrl).then(data => {
                if (data.code == 0) {
                    this.setData({
                        arr: data.data
                        , levelarr: data.data
                    })
                }
            });
        }

        this.setData({
            hiddenn: 0,
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
            leveltext: leveltext + '折',
        })
    },
    submit() {
        let param = []
        if (this.data.id) {
            param.id = this.data.id
        }
        param.discount = this.data.levelval? this.data.levelval[0]:this.data.detail.discount
        param.name = this.data.levelname?this.data.levelname:this.data.detail.name
        console.log(param)
        App.HttpService.postData(App.Config.customLevelEditlUrl, param).then(data => {
            if (data.code == 0) {
                wx.switchTab({
                    url:'/pages/me/me',
                })
            }
        });
    },
    detailbind(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../customlevel/customlevel?id=' + id,
        })
    },
    inputbind(e){
        const name = e.detail.value //修改的数据
        this.setData({
            'levelname': name
        })
    }
})