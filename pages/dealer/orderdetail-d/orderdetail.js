// pages/agent/orderdetail/orderdetail.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenn: 1,
        val: [0],
        form: {
            'stockid': [0]
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
        //获取默认收货地址
        App.HttpService.getData(App.Config.getDealerOrderItemUrl, { 'order_id': order_id }).then(data => {
            if (data.code == 0) {
                let order_detail = data.data
                this.setData({
                    order_detail: order_detail,
                })
                if (this.getTimeLeft(order_detail.create_time+' GMT+0800')&&order_detail.order_status == 0) {
                    this.data.timer = setInterval(() => { //注意箭头函数！！
                        let timeLeft = this.getTimeLeft(order_detail.create_time+' GMT+0800')//使用了util.getTimeLeft
                        console.log(timeLeft)
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
    //取消订单
    cancelorderbind(){
        this.updatestatus(8)
    },
    //支付订单
    confirmoneybind(){
        this.updatestatus(1)
    },
    updatestatus(status){
        let url
        if (status==1) {
           url = App.Config.payNowDealerOrderUrl
        }else if(status==4){
           url = App.Config.receivingDealerOrderUrl
        }else if(status==8){
            url = App.Config.cancelDealerOrderUrl
         }
        App.HttpService.postData(url, { 'order_id': this.data.order_detail.id }).then(data => {
            if (data.code == 0) {
                this.onLoad({'order_id':this.data.order_detail.id})
            }
        })
    },
    //确认收货
    querenshouhuobind(){
        this.updatestatus(4)
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
    //已付款
    confirmorderbind(e) {
        console.log('已付款')
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