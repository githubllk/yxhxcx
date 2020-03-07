// pages/agent/stockgsdetails/stockgsdetails.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isedit: 0, //是否是修改页面
        goods_spec: [
            // {
            //     'id': 1,
            //     'name': '补水保湿',
            //     'num': 100,
            //     'attr': [
            //         {
            //             'id': 20,
            //             'num': 99,
            //             'name': '100g'
            //         }, {
            //             'id': 21,
            //             'num': 1,
            //             'name': '50g'
            //         },
            //     ]
            // }, {
            //     'id': 2,
            //     'name': '祛痘控油',
            //     'num': 100,
            //     'attr': [
            //         {
            //             'id': 22,
            //             'num': 51,
            //             'name': '100g'
            //         }, {
            //             'id': 23,
            //             'num': 49,
            //             'name': '50g'
            //         },
            //     ]
            // },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let goods_id = options.goods_id
        let keeper_id = options.keeper_id
        App.HttpService.getData(App.Config.keeperGoodsStockDetailUrl, {
            goods_id: goods_id,
            keeper_id: keeper_id,
        }).then((ret) => {
            if (ret.code == 0) {
                this.setData({
                    goods_detail: ret.data.goods_detail,
                    goods_spec: ret.data.goods_spec,
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
    editbind: function () {
        if (this.data.isedit == 0) {
            this.setData({
                isedit: 1
            })
        } else {
            //保存修改提交数据
            App.HttpService.postData(App.Config.editGoodsStockUrl, {
                goods_spec: JSON.stringify(this.data.goods_spec),
            }).then((ret) => {
                if (ret.code == 0) {
                    this.setData({
                        isedit: 0
                    })
                }
            })
        }
    },
    //数量减函数
    numminus: function (e) {
        const good_key = e.currentTarget.dataset.good_key;
        const attr_key = e.currentTarget.dataset.attr_key;
        let goodslist_ = this.data.goods_spec
        let num = goodslist_[good_key].spec_item[attr_key].stock_count;
        if (num <= 0) { return false; }
        if (num <= 1) {
            goodslist_[good_key].spec_item[attr_key].stock_count = 0;
            goodslist_[good_key].spec_stock = goodslist_[good_key].spec_stock - 1;
            this.setData({
                goods_spec: goodslist_,
            });
        } else {
            num = num - 1;
            goodslist_[good_key].spec_stock = goodslist_[good_key].spec_stock - 1;
            goodslist_[good_key].spec_item[attr_key].stock_count = num;
            this.setData({
                goods_spec: goodslist_,
            });
        }

    },
    //数量加函数
    numadd: function (e) {
        const good_key = e.currentTarget.dataset.good_key;
        const attr_key = e.currentTarget.dataset.attr_key;
        let goodslist_ = this.data.goods_spec
        let num = goodslist_[good_key].spec_item[attr_key].stock_count;
        goodslist_[good_key].spec_stock = goodslist_[good_key].spec_stock + 1;
        num = Number(num) + 1;
        goodslist_[good_key].spec_item[attr_key].stock_count = num;
        this.setData({
            goods_spec: goodslist_,
        });
    },
    //input直接修改
    inputeditstock: function (e) {
        const good_key = e.currentTarget.dataset.good_key;
        const attr_key = e.currentTarget.dataset.attr_key;
        let goodslist_ = this.data.goods_spec
        const editnum = e.detail.value //修改的数据
        let goodsstock = goodslist_[good_key].spec_stock - goodslist_[good_key].spec_item[attr_key].stock_count; //计算剩余属性的总库存值
        goodslist_[good_key].spec_item[attr_key].stock_count = editnum;
        goodslist_[good_key].spec_stock = Number(goodsstock) + Number(editnum);
        this.setData({
            goods_spec: goodslist_,
        });
    },

})