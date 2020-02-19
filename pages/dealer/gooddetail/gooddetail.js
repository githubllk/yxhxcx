// pages/dealer/gooddetail/gooddetail.js

let animationShowHeight = 300
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [
            "http://img.demaxiya.com/uploads/allimg/160921/10543M564-0.png",
            "http://img.demaxiya.com/uploads/allimg/160921/10543M104-1.png",
            "http://img.demaxiya.com/uploads/allimg/160921/10543M104-1.png",
            "http://img.demaxiya.com/uploads/allimg/160921/10543M104-1.png",
            "http://img.demaxiya.com/uploads/allimg/160921/10543J164-2.png"
        ],
        animationData: "",
        showModalStatus: false,
        num: 1
    },
    
    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(animationShowHeight).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    hideModal: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation;
        animation.translateY(animationShowHeight).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
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
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                animationShowHeight = res.windowHeight;
            }
        })
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
    //数量减函数
    numminus: function () {
        let num = this.data.num
        this.setData({
            num: num - 1,
        });
    },
    //数量加函数
    numadd: function () {
        let num = this.data.num
        this.setData({
            num: num + 1,
        });
    },
    //input直接修改
    inputeditstock: function (e) {
        const editnum = parseInt(e.detail.value) //修改的数据
        this.setData({
            num: editnum,
        });
    },
})