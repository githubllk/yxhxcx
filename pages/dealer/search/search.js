// pages/dealer/search/search.js
const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '', //输入的值
        getSearch: wx.getStorageSync('searchData'), //历史记录
        modalHidden: 1,
        name_focus: true, //获取焦点
        keydown_number: 0, //检测input框内是否有内容
        goodlist:[
            {'id':1,'image':'../../images/lll.jpg','price':'1336.10','num':1000,'title':'hhhhhhhhhhhhh'},
            {'id':1,'image':'../../images/lll.jpg','price':'1336.10','num':1000,'title':'hhhhhhhhhhhhh'},
        ]

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
    //获取输入的值
    searchInput: function (e) {
        if(!!e.detail.value){
            this.setData({
                inputValue: e.detail.value
            })
            console.log('bindInput' + this.data.inputValue)
        }
    },
    //点击赋值到input框
    this_value: function (e) {
        this.setData({
            name_focus: true
        })
        let value = e.currentTarget.dataset.text;
        this.setData({
            inputValue: value,
            keydown_number: 1
        })
    },
    //搜索
    searchbind: function () {
        //设置一个空数组,把每次输入的值存进去
        // 判断如果小于等于10就添加进数组, 否则就删除下标为零的值
        if(!!this.data.inputValue){
            var searchData = wx.getStorageSync('searchData') || []
            if (searchData.length <= 10) {
                searchData.push(this.data.inputValue)
            } else {
                searchData.splice(0, 1)
                searchData.push(this.data.inputValue)
            }
            wx.setStorageSync('searchData', searchData)
            this.setData({
                getSearch:searchData,
                modalHidden: true,
            })
        }
        //   let pages = getCurrentPages();//当前页面
        //   let prevPage = pages[pages.length - 2];//上一页面
        //     //把值传入上一搜索主页面
        //   prevPage.setData({
        //     store: e.currentTarget.dataset.store,
        //   });
        //   wx.navigateBack({
        //     delta: 1
        //   })
    },
    //点击赋值到input框
    this_value: function (e) {
        this.setData({
            name_focus: true
        })
        let value = e.currentTarget.dataset.text;
        this.setData({
            inputValue: value,
            keydown_number: 1
        })
    },
    clearsearchbind: function () {
        wx.setStorageSync('searchData', [])
        this.setData({
            getSearch:[]
        })
    },//商品详情页
    gooddetailbind:function(e){
        let goodid = e.currentTarget.dataset.goodid
        wx.navigateTo({
          url: '/pages/dealer/gooddetail/gooddetail?id='+goodid,
        })
    }
})