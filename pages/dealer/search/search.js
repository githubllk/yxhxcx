// pages/dealer/search/search.js
const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        limit: 4,
        nomore: false,
        searchData: [],
        inputValue: '', //输入的值
        getSearch: wx.getStorageSync('searchData'), //历史记录
        modalHidden: 0,
        name_focus: true, //获取焦点
        keydown_number: 0, //检测input框内是否有内容
        goods_list: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let this_ = this
        //读取缓存历史搜索记录
        wx.getStorage({
            key: 'searchData',
            success: function (res) {
                this_.setData({
                    searchData: res.data
                })
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
    //获取输入的值
    searchInput: function (e) {
        if (!!e.detail.value) {
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
        searchbind()
    },
    //搜索
    searchbind: function () {
        //设置一个空数组,把每次输入的值存进去
        // 判断如果小于等于10就添加进数组, 否则就删除下标为零的值
        if (!!this.data.inputValue) {
            let arr = this.data.searchData;
            console.log('进来第一个')
            let arr_num = arr.indexOf(this.data.inputValue);
            console.log(arr.indexOf(this.data.inputValue));
            if (arr_num != -1) {
                arr.splice(arr_num, 1)
                arr.unshift(this.data.inputValue);
            } else {
                arr.unshift(this.data.inputValue);
            }
            this.setData({
                page: 1,
                goods_list: [],
                nomore: false
            })
            this.getGoodsList(this.data.inputValue)
            wx.setStorageSync('searchData', arr)
            this.setData({
                getSearch: arr,
                modalHidden: true,
            })
        }
    },
    delbind(e) {
        let index = e.currentTarget.dataset.index
        let getSearch = this.data.getSearch
        getSearch.splice(index, 1)
        wx.setStorageSync('searchData', getSearch)
        this.setData({
            getSearch: getSearch,
        })
    },
    getGoodsList(search) {
        if (this.data.nomore) {
            return false
        }
        App.HttpService.getData(App.Config.getDealerGoodsListUrl, {
            page: this.data.page,
            limit: this.data.limit,
            search: search
        }).then(data => {
            if (data.code == 0) {
                this.setData({
                    goods_list: this.data.goods_list.concat(data.data)
                })

                if (data.data.length != 0) {
                    this.setData({
                        page: this.data.page + 1,
                        nomore: false
                    })
                } else {
                    this.setData({
                        nomore: true
                    })
                }
            }
        });
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
            getSearch: []
        })
    },//商品详情页
    gooddetailbind: function (e) {
        let goodid = e.currentTarget.dataset.goodid
        wx.navigateTo({
            url: '/pages/dealer/gooddetail/gooddetail?goods_id=' + goodid,
        })
    }
})