// pages/agent/orderdetail/orderdetail.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stockarr: [],
        hiddenn: 1,
        val: [0],
        form:{
            'stockid':[0]
        },
        datetimeTo: "", 
        timeLeft: "" ,   // 剩下的时间（天时分秒）,
        datetime:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const order_id = options.order_id
        if (!options.order_id) {
            wx.navigateBack({
              detail:1
            })
        }
        App.HttpService.getData(App.Config.getKeeperListUrl).then((ret) => {
            if (ret.code == 0) {
                this.setData({
                    stockarr: ret.data
                })
            }
        })
        //获取默认收货地址
        App.HttpService.getData(App.Config.getAgentOrderItemUrl, { 'order_id': order_id }).then(data => {
            if (data.code == 0) {
                let order_detail = data.data
                this.setData({
                    order_detail: order_detail,
                })
                if (this.getTimeLeft(order_detail.create_time+' GMT+0800')&&(order_detail.status == 1||order_detail.status == 0)) {
                    this.data.timer = setInterval(() => { //注意箭头函数！！
                        let timeLeft = this.getTimeLeft(order_detail.create_time+' GMT+0800')//使用了util.getTimeLeft
                        if (timeLeft) {
                            this.setData({
                                timeLeft: timeLeft
                            });
                        }else{
                            this.setData({
                                timeLeft:"0天0时0分0秒",
                                datetime: false
                            });
                        }
                        if (this.data.timeLeft == "0天0时0分0秒") {
                            clearInterval(this.data.timer);
                        }
                    }, 1000);
                }else{
                    this.setData({
                        timeLeft:"0天0时0分0秒",
                        datetime: false
                    });
                }
                
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
    //已收款
    confirmorderbind: function (e) {
        this.setData({
            hiddenn: 0,
            stockarr: this.data.stockarr,
            val: [0],
            isclassify: 1,
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
        console.log(this.data.form.stockid[0])
        let stockid = this.data.form.stockid[0]
        let stockarr = this.data.stockarr
        let keeper_id = stockarr[stockid].id
        let order_id = this.data.order_detail.id
        this.setData({
            hiddenn: 1,
        })
        App.HttpService.postData(App.Config.affirmAgentOrderMoneyUrl, { 'order_id': order_id,'keeper_id':keeper_id }).then(data => {
            if (data.code == 0) {
                this.onLoad({'order_id':order_id})
            }
        });
    },
    inputVal: function (e) {
        let val = e.detail.value ? e.detail.value : '[0]'
        console.log(val)
        this.setData({
            'form.stockid': val
        })
    },
    getTimeLeft: function (datetimeTo) {
        // 计算目标与现在时间差（毫秒）
        let time1 = new Date(datetimeTo).getTime()+3600*24000;
        let time2 = new Date().getTime();
        let mss = time1 - time2;
        if (mss<=0) {
            return false
        }
        // 将时间差（毫秒）格式为：天时分秒
        let days = parseInt(mss / (1000 * 60 * 60 * 24));
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((mss % (1000 * 60)) / 1000);

        return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
    }
})