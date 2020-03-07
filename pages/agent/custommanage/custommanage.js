// pages/agent/custommanage/custommanage.js
const App = getApp()
var util = require('../../../utils/util.js');
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
        agentval: [0],
        userval: [0],
        edit: 0
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
                break;
            case 5:
                title = '库管管理'
                type_ = 2
                break;
            case 6:
                title = '经销商管理'
                type_ = 3

                break;
            default:
                break;
        }
        if (type_ == 1 || type_ == 2 || type_ == 3) {
            App.HttpService.getData(App.Config.customListUrl, { 'type': type_ }).then(data => {
                if (data.code == 0) {
                    this.setData({
                        arrlist: data.data
                    })
                }
            });
        }
        if (type == 3 || type == 6) {
            App.HttpService.getData(App.Config.customListUrl, { 'type': 1, 'issel': 1 }).then(data => {
                if (data.code == 0) {
                    this.setData({
                        agentarr: data.data
                    })
                }
            });
            App.HttpService.getData(App.Config.customLevelUrl).then(data => {
                if (data.code == 0) {
                    this.setData({
                        userarr: data.data
                    })
                }
            });
        }
        this.setData({
            type_: type_,
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


        let isagent = this.data.isagent
        let agenttext
        let usertext
        if (isagent) {
            let val = this.data.agentval ? this.data.agentval : [0]
            agenttext = this.data.agentarr[val[0]].username
            this.setData({
                agentval: val,
                agenttext: agenttext,
            })
        } else {
            let val = this.data.userval ? this.data.userval : [0]
            usertext = this.data.userarr[val[0]].name
            this.setData({
                userval: val,
                usertext: usertext,
            })
        }
        this.setData({
            hiddenn: 1,
        })
    },
    inputVal: function (e) {
        let val = e.detail.value ? e.detail.value : [0]
        let isagent = this.data.isagent
        let agenttext
        let usertext
        if (isagent) {
            agenttext = this.data.agentarr[val[0]].username
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
        let type = e.currentTarget.dataset.type
        let admin_id = e.currentTarget.dataset.id
        //获取详情
        let param = []
        param.admin_id = admin_id
        param.type = type
        App.HttpService.getData(App.Config.customDetailUrl, param).then(data => {
            if (data.code == 0) {
                if (type == 3) {
                    this.setData({
                        userval: [data.data.userval],
                        usertext: data.data.grade_name,
                        agentval: [data.data.agentval],
                        agenttext: data.data.username,
                    })
                }
                this.setData({
                    type: type,
                    admin_id: admin_id,
                    detail: data.data,
                    edit: 1
                })
            }
        });

    },
    //新建/修改按钮
    formSubmit(e) {
        const that = this
        const type = that.data.type
        let param = []
        param = e.detail.value
        let url
        if (type == 1) { //总代理
            url = 4
        } else if (type == 2) { // 库管
            url = 5
        } else if (type == 3) { // 经销商
            url = 6
            param.pid = that.data.agentarr[that.data.agentval[0]].id
            param.grade_id = that.data.userarr[that.data.userval[0]].id
        }
        let url_ = App.Config.addCustomUrl
        if (that.data.edit) {
            url_ = App.Config.customEditlUrl
            param.id = that.data.detail.id
        }
        param.type = type
        App.HttpService.postData(url_, param).then(data => {

            if (data.code == 0) {
                // wx.navigateTo({
                //     url: '/pages/agent/custommanage/custommanage?type=' + url,
                // })
                wx.switchTab({
                    url: '/pages/me/me',
                })
            }
        });
    },
    delbind(e) {
        let param = {}
        param.title = '提示'
        param.content = '是否真的要删除'
        param.showCancel = true
        param.cb_confirm = (res) => { //确定
            App.HttpService.postData(App.Config.customDelUrl, {'id':this.data.detail.id}).then(data => {
                if (data.code == 0) {
                    wx.switchTab({
                        url: '/pages/me/me',
                    })
                }
            });
        }
        param.cb_cancel = (res) => { //取消

        }

        util.tip(param)
    },
    
})