// pages/agent/orderdetail/orderdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stockarr: [{
            'name': '北京仓库',
            'id': 1
        }, {
            'name': '河北仓库',
            'id': 2
        }, {
            'name': '上海仓库',
            'id': 3
        }, {
            'name': '天津仓库',
            'id': 4
        },],
        hiddenn: 1,
        val: [0],
        form:{
            'stockid':[0]
        },
        datetimeTo: "2020/02/22 18:30:00 GMT+0800", // 秒杀开始时间
        timeLeft: ""    // 剩下的时间（天时分秒）
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.timer = setInterval(() =>{ //注意箭头函数！！
            this.setData({
              timeLeft: this.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
            });
            if (this.data.timeLeft == "0天0时0分0秒") {
              clearInterval(this.data.timer);
            }
          }, 1000);
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
    confirmorderbind: function (e) {
        console.log('已付款')
    },
    getTimeLeft:function(datetimeTo){
        // 计算目标与现在时间差（毫秒）
        let time1 = new Date(datetimeTo).getTime();
        let time2 = new Date().getTime();
        let mss = time1 - time2;
         
        // 将时间差（毫秒）格式为：天时分秒
        let days = parseInt(mss / (1000 * 60 * 60 * 24));
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((mss % (1000 * 60)) / 1000);
         
        return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
      }
    
})