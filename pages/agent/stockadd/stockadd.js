// pages/agent/stockadd/stockadd.js
const App = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        stocklist: [],
        classify: [],
        attrlist: [{
            'id': 1,
            'name': '补水保湿'
        }, {
            'id': 4,
            'name': '控油洁面'
        }, {
            'id': 5,
            'name': '祛痘保湿'
        },],
        attrlist1: {
            "1": [{
                'id': 1,
                'name': '150g'
            }, {
                'id': 2,
                'name': '100g'
            }, {
                'id': 3,
                'name': '200g'
            },],
            "4": [{
                'id': 4,
                'name': '50g'
            }, {
                'id': 5,
                'name': '100g'
            }, {
                'id': 6,
                'name': '150g'
            },],
            "5": [{
                'id': 7,
                'name': '150g'
            }, {
                'id': 8,
                'name': '100g'
            }, {
                'id': 9,
                'name': '200g'
            },],
        },
        hiddenn: 1,
        val: [0],
        isattr: 0,
        isstock: 0,
        isclassify: 0,
        attritem: [],
        stocktext: '请选择',
        attrtext: '请选择',
        classifytext: '请选择',
        goodtext: '请选择',
        form: { //提交表单
            'stock': [0],
            'attr': [0, 0],
            'classify': [0],
            'num': 0,
            'goodid': 0,
            'goodname': ''
        },
        stockadd: {
            keeper_id: 0
        },
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //商品列表
        this.stocklist()
        //分类列表
        this.classify()
        let stockadd = wx.getStorageSync('stockadd')

        // stockadd = stockadd ? stockadd : this.data.form
        let stocktext = stockadd.stocktext
        let attrtext = stockadd.attrtext //wx.getStorageSync('attrtext')
        let classifytext = stockadd.classifytext //wx.getStorageSync('classifytext')
        let num = stockadd.num 
        if (stocktext) {
            this.setData({
                stocktext: stocktext,
                attrtext: attrtext,
                classifytext: classifytext,
                num: num
            })
        }
        

    },
    //规格列表
    speclist(goods_id) {
        App.HttpService.getData(App.Config.getGoodsSpecListUrl, { 'goods_id': goods_id }).then(data => {
            if (data.code == 0) {
                this.setData({
                    attrlist: data.data.spec_list,
                    attrlist1: data.data.spec_item_list,
                })
            }
        });
    },
    //分类列表
    classify() {
        App.HttpService.getData(App.Config.getCategoryListUrl).then(data => {
            if (data.code == 0) {
                this.setData({
                    classify: data.data
                })
            }
        });
    },
    //仓库列表
    stocklist: function () {
        var self = this;
        App.HttpService.getData(App.Config.getKeeperListUrl).then((ret) => {
            console.log(ret)
            if (ret.code == 0) {
                self.setData({
                    stocklist: ret.data
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

        let stockadd = wx.getStorageSync('stockadd')
        let goods_id = stockadd.goods_id
        let goods_name = stockadd.goods_name
        if (!!goods_id && goods_id != 'undefined') {
            this.setData({
                goods_name: goods_id,
                goods_id: goods_name,
                goodtext: goods_name,
            })
            //规格列表
            this.speclist(goods_id)
        }
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
    inputVal: function (e) {
        const val = e.detail.value ? e.detail.value : [0, 0]
        let stockadd = wx.getStorageSync('stockadd') ? wx.getStorageSync('stockadd') : this.data.form
        if (this.data.isattr == 1) { // 属性选择 
            let aid = this.data.attrlist[val[0]].id
            this.setData({
                attritem: this.data.attrlist1[aid],
                'form.attr': val
            })
            stockadd['attr'] = val

        } else if (this.data.isclassify == 1) { //分类
            this.setData({
                'form.classify': val
            })
            stockadd['classify'] = val

        } else if (this.data.isstock == 1) {
            console.log('stockval')
            console.log(val)

            this.setData({
                'form.stock': val
            })
            stockadd['stock'] = val
        }
        wx.setStorage({
            data: stockadd,
            key: 'stockadd',
        })

        // console.log(val)

    },
    // 仓库选择
    stockselbind: function () {
        console.log(this.data.stocklist)
        this.setData({
            hiddenn: 0,
            array: this.data.stocklist,
            val: [0],
            isattr: 0,
            isstock: 1,
            isclassify: 0,
        })
    },
    // 商品分类选择
    classifyselbind: function () {
        this.setData({
            hiddenn: 0,
            array: this.data.classify,
            val: [0],
            isattr: 0,
            isstock: 0,
            isclassify: 1,
        })
    },
    // 规格选择
    attrselbind: function () {
        let keys = Object.keys(this.data.attrlist1);
        this.setData({
            hiddenn: 0,
            array: this.data.attrlist,
            isattr: 1,
            val: [0],
            isstock: 0,
            isclassify: 0,
            attritem: this.data.attrlist1[keys[0]],
            'form.attr': [0, 0]
        })
    },
    paickerQuxiao: function () { //取消按钮
        this.setData({
            hiddenn: 1,
        })
    },
    goodselbind: function () {
        let stockadd = wx.getStorageSync('stockadd')
        let category_id = stockadd.classify_id
        if (!category_id) {
            wx.showModal({
                title: '提示',
                content: '请先选择分类',
                showCancel: false
            })
        } else {
            wx.navigateTo({
                url: '../goodlist/goodlist?category_id=' + category_id,
            })
        }
    },
    paickerQueding: function () { //确定按钮
        let stockadd = wx.getStorageSync('stockadd')
        stockadd = stockadd ? stockadd : {}
        if (this.data.isattr == 1) {
            const inputval = this.data.form.attr
            const attr1 = this.data.attrlist[inputval[0]] //大分类
            const attr2 = this.data.attrlist1[attr1.id][inputval[1]] //多少克
            const attrtext = attr1.name + ',' + attr2.name
            this.setData({
                attrtext: attrtext
            })
            stockadd.spec_id = attr1.id
            stockadd.spec_item_id = attr2.id

            stockadd.attrtext = attrtext
            wx.setStorage({
                data: stockadd,
                key: 'stockadd',
            })
        } else if (this.data.isclassify == 1) { //分类
            const classifytext = this.data.classify[this.data.form.classify[0]].name
            const classify_id = this.data.classify[this.data.form.classify[0]].id
            this.setData({
                classifytext: classifytext
            })
            stockadd.classify_id = classify_id
            stockadd.classifytext = classifytext
            wx.setStorage({
                data: stockadd,
                key: 'stockadd',
            })
        } else if (this.data.isstock == 1) { //仓库
            let stocktext = this.data.stocklist[this.data.form.stock[0]].keeper_name
            let keeper_id_ = this.data.stocklist[this.data.form.stock[0]].id
            stockadd.keeper_id = keeper_id_
            stockadd.stocktext = stocktext
            this.setData({
                stocktext: stocktext
            })
            wx.setStorage({
                data: stockadd,
                key: 'stockadd',
            })
        }
        this.setData({
            hiddenn: 1,
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
    validateNumber(val) {
        return val.replace(/\D/g, '')
    },
    numinputbind: function (e) {
        let editnum = this.validateNumber(e.detail.value) //修改的数据
        this.setData({
            'form.num': editnum
        })
        let stockadd = wx.getStorageSync('stockadd')
        stockadd['num'] = editnum
        wx.setStorage({
            data: stockadd,
            key: 'stockadd',
        })
    },
    rukubind: function () {
        let stockadd = wx.getStorageSync('stockadd')
        App.HttpService.postData(App.Config.agentAddStockUrl, stockadd).then((ret) => {
            if (ret.code == 0) {
                wx.removeStorageSync('stockadd')
                // wx.setStorage({
                //     data: {},
                //     key: 'stockadd',
                // })
                wx.redirectTo({
                    url: '../stock/stock',
                })
            }
        })


    }
})