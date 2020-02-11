// pages/agent/stockadd/stockadd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stocklist: [
            {
                'name': '北京仓库',
                'id': 1
            }, {
                'name': '上海仓库',
                'id': 2
            }, {
                'name': '天津仓库',
                'id': 3
            },
        ],
        classify: [
            {
                'name': '新品上线',
                'id': 1
            }, {
                'name': '折扣系列',
                'id': 2
            }, {
                'name': '高级系列',
                'id': 3
            }, {
                'name': '钻石系列',
                'id': 4
            },
        ],
        attrlist: [
            {
                'id': 1,
                'name': '补水保湿'
            }, {
                'id': 4,
                'name': '控油洁面'
            }, {
                'id': 5,
                'name': '祛痘保湿'
            },
        ],
        attrlist1: {
            "1": [
                {
                    'id': 1,
                    'name': '150g'
                }, {
                    'id': 2,
                    'name': '100g'
                }, {
                    'id': 3,
                    'name': '200g'
                },
            ], "4": [
                {
                    'id': 4,
                    'name': '50g'
                }, {
                    'id': 5,
                    'name': '100g'
                }, {
                    'id': 6,
                    'name': '150g'
                },
            ], "5": [
                {
                    'id': 7,
                    'name': '150g'
                }, {
                    'id': 8,
                    'name': '100g'
                }, {
                    'id': 9,
                    'name': '200g'
                },
            ],
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
        form: {  //提交表单
            'stock': [0],
            'attr': [0, 0],
            'classify': [0],
            'num': 0,
            'goodid': 0,
            'goodname': ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let goodid = options.goodid
        if (goodid) {
            stockadd['goodid'] = goodid
            stockadd['goodname'] = options.goodname
            this.setData({
                form: stockadd,
                goodtext: options.goodname ? options.goodname : '',
            })
        }

        let stockadd = wx.getStorageSync('stockadd')
        stockadd = stockadd ? stockadd : this.data.form
        let stocktext = wx.getStorageSync('stocktext')
        let attrtext = wx.getStorageSync('attrtext')
        let classifytext = wx.getStorageSync('classifytext')
        if (stocktext) {
            this.setData({
                stocktext: stocktext
            })
        }
        if (attrtext) {
            this.setData({
                attrtext: attrtext
            })
        }
        if (classifytext) {
            this.setData({
                classifytext: classifytext
            })
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
        wx.navigateTo({
            url: '../goodlist/goodlist',
        })
    },
    paickerQueding: function () { //确定按钮

        if (this.data.isattr == 1) {
            const inputval = this.data.form.attr
            const attr1 = this.data.attrlist[inputval[0]]//大分类
            const attr2 = this.data.attrlist1[attr1.id][inputval[1]]//多少克
            const attrtext = attr1.name + ',' + attr2.name
            this.setData({
                attrtext: attrtext
            })
            wx.setStorage({
                data: attrtext,
                key: 'attrtext',
            })
        } else if (this.data.isclassify == 1) { //分类
            const classifytext = this.data.classify[this.data.form.classify[0]].name
            this.setData({
                classifytext: classifytext
            })
            wx.setStorage({
                data: classifytext,
                key: 'classifytext',
            })
        } else if (this.data.isstock == 1) { //仓库
            let stocktext = this.data.stocklist[this.data.form.stock[0]].name
            console.log(stocktext)

            this.setData({
                stocktext: stocktext
            })
            wx.setStorage({
                data: stocktext,
                key: 'stocktext',
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
    numinputbind: function (e) {
        const editnum = e.detail.value //修改的数据
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
        console.log(this.data.form)
        //提交成功清除缓存
        wx.setStorage({
            data: [],
            key: 'stockadd',
        })
        wx.setStorage({ data: '', key: 'stocktext' })
        wx.setStorage({ data: '', key: 'attrtext', })
        wx.setStorage({ data: '', key: 'goodtext', })
        wx.setStorage({ data: '', key: 'classifytext', })
        wx.redirectTo({
          url: '../stock/stock',
        })
        
    }
})