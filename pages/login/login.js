// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // bgi:app.Config.fileBasePath+app.Config.static+'login-bgi.png',
        // logo:app.Config.fileBasePath+app.Config.static+'logo.png',
        bgi: 'https://jujiangyivr.oss-cn-beijing.aliyuncs.com/26/sourceimg/login-bgi.png',
        logo: '/pages/images/logo.png',
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
    submit(e) {
        let phone = e.detail.value.phone
        let pwd = e.detail.value.pwd
        let role
        let isgoto = false
        console.log(phone)
        if (phone == '13111111111') {
            role = ['agent','soleagent']
            isgoto = true
        }else if(phone == '13222222222'){
            role = ['agent','0']
            isgoto = true
        }else if(phone == '13333333333'){
            role = ['dealer','0']
            isgoto = true
        }else if(phone == '13444444444'){
            role = ['keeper','0']
            isgoto = true
        }
        if (isgoto) {
            wx.setStorage({
                data: role,
                key: 'role',
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
        }

    }
})