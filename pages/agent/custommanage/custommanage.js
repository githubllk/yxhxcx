// pages/agent/custommanage/custommanage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        agentarr: [{
            'name': '北京总代理',
            'id': 1
        }, {
            'name': '河北总代理',
            'id': 2
        }, {
            'name': '上海总代理',
            'id': 3
        }, {
            'name': '天津总代理',
            'id': 4
        },],
        userarr: [{
            'name': '白银',
            'id': 1
        }, {
            'name': '黄金',
            'id': 2
        }, {
            'name': '钻石',
            'id': 3
        }],
        qsr: '请输入',
        hiddenn: 1,
        val: [0],
        agentext: '',
        usertext: '',
        arrlist: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type ? parseInt(options.type) : 3
        let type_ = 0
        this.setData({
            type: type
        })
        let title
        switch (type) {
            case 1:
                title = '新建代理商'
                break;
            case 2:
                title = '新建库管'
                break;
            case 3:
                title = '新建经销商'
                break;
            case 4:
                title = '总代理管理'
                type_ = 1
                this.setData({
                    arrlist: [
                        { 'name': '北京总代理', 'id': '1', 'phone': '12323232323', },
                        { 'name': '河北总代理', 'id': '2', 'phone': '15555555555', }
                    ]
                })
                break;
            case 5:
                title = '库管管理'
                type_ = 2
                this.setData({
                    arrlist: [
                        { 'name': '北京库管', 'id': '1', 'phone': '12323232323', },
                        { 'name': '河北库管', 'id': '2', 'phone': '15555555555', }
                    ]
                })
                break;
            case 6:
                title = '经销商管理'
                type_ = 3
                this.setData({
                    arrlist: [
                        { 'name': '北京经销商', 'id': '1', 'phone': '12323232323', },
                        { 'name': '河北经销商', 'id': '2', 'phone': '15555555555', }
                    ]
                })
                break;
            default:
                break;
        }
        console.log(title)
        this.setData({
            type_: type_
        })
        wx.setNavigationBarTitle({
            title: title,
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
        let type = e.currentTarget.dataset.type
        let arr
        let isagent
        console.log(type)
        if (type == 'agent') {
            arr = this.data.agentarr
            isagent = 1
        } else {
            arr = this.data.userarr
            isagent = 0

        }
        this.setData({
            hiddenn: 0,
            arr: arr,
            val: [0],
            isagent: isagent,
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
        let isagent = this.data.isagent
        let agenttext
        let usertext
        if (isagent) {
            agenttext = this.data.agentarr[val[0]].name
            this.setData({
                agentval: val,
                agenttext: agenttext,
            })
        } else {
            usertext = this.data.userarr[val[0]].name
            this.setData({
                userval: val,
                usertext: usertext,
            })
        }

    },
    //管理列表 点击事件
    managebind: function (e) {
        console.log(e)
        let type = e.currentTarget.dataset.type
        let id = e.currentTarget.dataset.id
        this.setData({
            type: type
        })
    }
})