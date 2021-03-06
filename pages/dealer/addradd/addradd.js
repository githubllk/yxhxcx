// pages/dealer/addradd/addradd.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qsr: '请输入',
        hiddenn: 1,
        value: [0, 0, 0],
        provincearr: [],
        cityarr: [],
        countyarr: [],
        form: {},
        address: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.id) {
            App.HttpService.getData(App.Config.getAddressDefaultUrl,{'id':options.id}).then(data => {
                if (data.code == 0) {
                    let addr = data.data.detail
                    this.setData({
                        value: addr.value,
                        form:addr,
                        address:data.data.address1
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
    onShow: function () {
        const params = []
        const that = this
        App.HttpService.getData(App.Config.getcitylist).then(data => {
            if (data.code == 0) {
                that.setData({
                    provincearr: data.data.list
                })
            }
        });
        App.HttpService.getData(App.Config.getcitylist, { 'province_id': 1 }).then(data => {
            if (data.code == 0) {
                that.setData({
                    cityarr: data.data.list
                })
            }
        });
        App.HttpService.getData(App.Config.getcitylist, { 'city_id': 2 }).then(data => {
            if (data.code == 0) {
                that.setData({
                    countyarr: data.data.list
                })
            }
        });
    },
    savebind() {
        let form = this.data.form
        App.HttpService.postData(App.Config.addDealerAddressUrl,form).then(data => {
            if (data.code == 0) {
                wx.redirectTo({
                  url: '../addrmanage/addrmanage',
                })
            }
        });
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
    //弹出选项框
    selbind: function (e) {
        this.setData({
            hiddenn: 0,
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
    paickerQuxiao: function () { //取消按钮
        this.setData({
            hiddenn: 1,
        })
    },
    paickerQueding: function () { //确定按钮
        let value = this.data.value
        var provincearr = this.data.provincearr
        var cityarr = this.data.cityarr
        var countyarr = this.data.countyarr
        var provinceNum = value[0]
        var cityNum = value[1]
        var countyNum = value[2]
        let address1 = provincearr[provinceNum].name
        let address2 = cityarr[cityNum].name
        let address3 = countyarr[countyNum].name
        let province_id = provincearr[provinceNum].id
        let city_id = cityarr[cityNum].id
        let county_id = countyarr[countyNum].id

        this.setData({
            hiddenn: 1,
            address: address1 + address2 + address3,
            'form.province_id': province_id,
            'form.city_id': city_id,
            'form.county_id': county_id,
        })
    },
    provincebind: function (e) {
        let val = e.detail.value ? e.detail.value : '[0]'
        const params = []
        const that = this
        params['province_id'] = val
        App.HttpService.getData(App.Config.getcitylist).then(data => {
            if (data.code == 0) {
                that.setData({
                    cityarr: data.data.list
                })
            }
        });
    },
    getcitylist: function (params) {
        App.HttpService.getData(App.Config.getcitylist, params).then(data => {
            return data;
            // if (data.code == 0) {

        });
    },
    inputbind(e) {
        const val = e.detail.value //修改的数据
        const name = e.currentTarget.dataset.name
        let form = {}
        form = `form.${name}`
        console.log(form)
        this.setData({
            [form]: val
        })
    },
    inputVal: function (e) {
        var value = e.detail.value
        var provincearr = this.data.provincearr
        var cityarr = this.data.cityarr
        var countyarr = this.data.countyarr
        var provinceNum = value[0]
        var cityNum = value[1]
        var countyNum = value[2]

        console.log(value)
        // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
        if (this.data.value[0] != provinceNum) {
            var id = provincearr[provinceNum].id

            App.HttpService.getData(App.Config.getcitylist, { 'province_id': id }).then(data => {
                let city_ = data.data.list
                App.HttpService.getData(App.Config.getcitylist, { 'city_id': city_[0].id }).then(data1 => {
                    if (data.code == 0) {
                        this.setData({
                            cityarr: data.data.list,
                            value: [provinceNum, 0, 0],
                            countyarr: data1.data.list,


                        })
                    }
                });


            });

        }
        else if (this.data.value[1] != cityNum) {
            // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据

            var id = cityarr[cityNum].id
            App.HttpService.getData(App.Config.getcitylist, { 'city_id': id }).then(data => {
                if (data.code == 0) {
                    this.setData({
                        countyarr: data.data.list,
                        value: [provinceNum, cityNum, 0],

                    })
                }
            });
        }
        else if (this.data.value[2] != countyNum) {
            // 滑动选择了区

            var id = cityarr[cityNum].id
            this.setData({

            })
        }
        // address = provincearr[provinceNum].name + cityarr[cityNum].name +countyarr[countyNum].name


    }




})