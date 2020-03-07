// pages/dealer/gooddetail/gooddetail.js

let animationShowHeight = 300
var util = require('../../../utils/util.js');
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [],
        animationData: "",
        showModalStatus: false,
        num: 1,
        container: true,
        total_price: '0',
        attr_list: [],
        spec_id: 0,
        spec_item_index: 0,
        discount: 1,
        spec_name: '',
        spec_item_name: '',
        shopping: false,
    },
    
    //立即购买//加入购物车
    showModal: function (e) {
        let shopping = e.currentTarget.dataset.type == 'shopping'?true:false //加入购物车
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
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                container: false,
                showModalStatus: true,
                shopping: shopping,
            })
        }.bind(this), 200)

    },
    shoppingsubmitbind(){
        console.log('shoppingsubmitbind')
    },
    // 规格1
    specbind(e) {
        let that = this
        let spec_id = e.currentTarget.dataset.spec_id
        let spec_index = e.currentTarget.dataset.spec_index

        console.log(spec_index)
        console.log(that.data.detail.spec_list)
        let spec_item = that.data.detail.attr_list
        // let spec_name = that.data.detail.spec_list[spec_id].spec_name
        let spec_name = that.data.detail.spec_list[spec_index].spec_name
        that.setData({
            spec_id: spec_id,
            spec_name: spec_name,
            attr_list: spec_item[spec_id],
            total_price: spec_item[spec_id][0].attrprice,
            spec_item_index: 0,
            num: 1,
        })
    },
    // 规格2
    specitembind(e) {
        let spec_item_index = e.currentTarget.dataset.spec_item_index
        let attr_list = this.data.attr_list
        this.setData({
            total_price: attr_list[spec_item_index].attrprice,
            spec_item_name: attr_list[spec_item_index].attrname,
            num: 1,
            spec_item_index: spec_item_index
        })
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
                showModalStatus: false,
                container: true
            })
        }.bind(this), 200)
    },
    submitbind() {
        // let detail = this.data.detail
        let detail = {}
        detail.goods_id = this.data.detail.id
        detail.cover_image = this.data.detail.cover_image
        detail.goods_name = this.data.detail.goods_name
        detail.spec_id = this.data.detail.spec_id
        detail.spec_item_id = this.data.detail.spec_item_id
        detail.num = this.data.detail.num
        detail.discount = this.data.detail.discount
        detail.price = this.data.detail.price
        detail.price = this.data.total_price
        detail.num = this.data.num
        detail.spec_id = this.data.spec_id
        detail.spec_name = this.data.spec_name

        let spec_item_id = this.data.attr_list[this.data.spec_item_index].id
        detail.spec_item_id = spec_item_id
        detail.spec_item_name = this.data.spec_item_name

        // let price = this.data.total_price
        // let num = this.data.num
        // let detail = this.data.detail.id
        // let spec_id = this.data.spec_id
        // let spec_item_id = this.data.attr_list[this.data.spec_item_index].id
        if (this.data.shopping) {
            detail.selected= true
            let shoppinglist = wx.getStorageSync('shoppinglist')?wx.getStorageSync('shoppinglist'):[]
            let haveid = true
            for (let i = 0; i < shoppinglist.length; i++) {
                if(shoppinglist[i].goods_id==detail.goods_id){
                    haveid = false
                    shoppinglist[i].num +=1
                }
            }
            if (haveid) {
                shoppinglist.push(detail)
            }
            wx.setStorageSync('shoppinglist', shoppinglist)
            wx.switchTab({
              url: '../shopping/shopping',
            })
        }else{
            let orderdetail = []
            orderdetail.push(detail)
            wx.setStorageSync('orderdetail', orderdetail)
            wx.navigateTo({
                url: '../orderdetail/orderdetail',
            })
        }
       
        // App.HttpService.postData(App.Config.createByNowOrdersUrl, {
        //     'goods_id': goods_id,
        //     'num': num,
        //     'price': price,
        //     'spec_id': spec_id,
        //     'spec_item_id': spec_item_id,
        // }).then(data => {
        //     if (data.code == 0) {
        //         wx.navigateTo({
        //             url: '../orderdetail/orderdetail?order_id=' + data.data,
        //         })
        //     }
        // });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let goods_id = options.goods_id
        if (goods_id) {
            App.HttpService.getData(App.Config.getDealerGoodsDetailUrl, { 'goods_id': goods_id }).then(data => {
                let spec_id = data.data.spec_list[0].id
                if (data.code == 0) {
                    this.setData({
                        detail: data.data
                        , discount: data.data.discount
                        , spec_id: spec_id
                        , attr_list: data.data.attr_list[spec_id]
                        , total_price: data.data.attr_list[spec_id][0].attrprice
                        , spec_name: data.data.spec_list[0].spec_name
                        , spec_item_name: data.data.attr_list[spec_id][0].attrname
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
    onShow: function (options) {
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
        let stock_count = this.data.attr_list[this.data.spec_item_index].stock_count
        if (num + 1 > stock_count) {
            let param = {}
            param.title = '提示'
            param.content = '库存不足'
            param.showCancel = false

            util.tip(param)
        } else {
            this.setData({
                num: num + 1,
            });
        }

    },
    //input直接修改
    inputeditstock: function (e) {
        let editnum = parseInt(e.detail.value) //修改的数据
        editnum = Math.abs(editnum);
        let stock_count = this.data.attr_list[this.data.spec_item_index].stock_count
        if (editnum > stock_count) {
            let param = {}
            param.title = '提示'
            param.content = '库存不足'
            param.showCancel = false
            param.cb_confirm = (res) => { //确定
                this.setData({
                    num: stock_count,
                });
            }
            util.tip(param)
        } else {
            this.setData({
                num: editnum,
            });
        }
    }
})