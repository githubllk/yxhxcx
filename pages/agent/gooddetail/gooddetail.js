// pages/agent/gooddetail/gooddetail.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifytext: '请选择',
    classify: [],
    hiddenn: 1,
    addbannerhide: 0,
    val: [0],
    bannerlist: [{
      'image': '../../images/banner-default.png'
    }],
    arr: {
      'specsname': '',
      'attrlist': [{
        'attrname': '',
        'attrprice': '',
      }]
    },
    specslist: [{
      'specsname': '',
      'attrlist': [{
        'attrname': '',
        'attrprice': '',
      }]
    }],
    form: {
      category_id: 0,
    },
    textare: '请输入',
    form: [],
    coverImage: '../../images/cover-default.png',
    bannerImage: '../../images/banner-default.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    let title = '添加商品'
    if (options.id) {
      title = '编辑商品'
      App.HttpService.getData(App.Config.getGoodDetailtUrl, { 'id': options.id }).then(data => {
        if (data.code == 0) {
          this.setData({
            form: data.data,
            specslist: data.data.specslist,
            classifytext: data.data.classifytext,
            coverImage: data.data.cover_image,
          })
          if (data.data.bannerlist) {
            this.setData({ bannerlist: data.data.bannerlist })
          }
          that.editorCtx.setContents({
            html: data.data.goods_desc
          })
        }
      });
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    App.HttpService.getData(App.Config.getCategoryListUrl).then(data => {
      if (data.code == 0) {
        this.setData({
          classify: data.data
        })
      }
    });
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

  }, // 商品分类选择
  classifyselbind: function () {
    this.setData({
      hiddenn: 0,
      array: this.data.classify,
      val: [0],
      isclassify: 1,
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
    if (this.data.isclassify == 1) { //分类

      let category_id = this.data.category_id ? this.data.category_id : 0

      const classifytext = this.data.classify[category_id].name

      category_id = this.data.classify[category_id].id
      this.setData({
        classifytext: classifytext,
        'form.category_id': category_id
      })
      wx.setStorage({
        data: classifytext,
        key: 'classifytext',
      })
    }
    this.setData({
      hiddenn: 1,
    })
  },
  inputVal: function (e) {
    let val = e.detail.value ? e.detail.value : 0
    if (this.data.isclassify == 1) { //分类
      this.setData({
        'form.category_id': val[0],
        category_id: val[0],
      })

    }
  },
  //添加banner图
  addbanner: function () {
    let bannerlist = this.data.bannerlist

    if (bannerlist.length < 3) {
      if (bannerlist.length == 2) {
        this.setData({
          addbannerhide: 1
        })
      }
      const ban = {
        'image': this.data.bannerImage
      }
      this.setData({
        bannerlist: bannerlist.concat(ban)
      })
    }
  },
  //添加规格
  specsaddbind: function () {
    let that = this
    let arr_ = {
      'specsname': '',
      'attrlist': [{
        'attrname': '',
        'attrprice': '',
      }]
    }
    let specslist = that.data.specslist.concat(arr_)
    console.log('specsadd', specslist)
    that.setData({
      specslist: specslist
    })
  },
  attraddbind: function (e) { //添加属性
    let index = e.currentTarget.dataset.index
    let that = this
    let specslist = that.data.specslist
    let arr_ = {
      'specsname': '',
      'attrlist': [{
        'attrname': '',
        'attrprice': '',
      }]
    }
    let attrlist = specslist[index]['attrlist'].concat(arr_['attrlist'])
    specslist[index]['attrlist'] = attrlist
    that.setData({
      specslist: specslist,
    })
  },
  //删除 规格
  specsdelbind: function (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let spec_id = parseInt(e.currentTarget.dataset.spec_id)
    let goods_id = parseInt(e.currentTarget.dataset.goods_id)
    let that = this
    let specslist = that.data.specslist
    specslist.splice(index, 1)
    if (spec_id) {
      App.HttpService.postData(App.Config.delGoodsSpecHintUrl, { 'spec_id': spec_id, 'goods_id': goods_id }).then(data => {
        if (data.code == 0) {
          if (data.data) {
            wx.showModal({
              title: '提示',
              content: '规格下有属性已经有库存,是否删除',
              confirmText: '是',
              cancelText: '否',
              success(res) {
                if (res.confirm) {
                  App.HttpService.postData(App.Config.delGoodsSpecUrl, { 'spec_id': spec_id, 'goods_id': goods_id }).then(dataa => {
                    if (data.code == 0) {
                      that.setData({
                        'form.specslist': specslist,
                        specslist: specslist
                      })
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            this.setData({
              specslist: specslist,
              'form.specslist': specslist,
            })
          }
        }
      });
    } else {
      that.setData({
        'form.specslist': specslist,
        specslist: specslist
      })
    }
  },
  //删除 属性
  attrdelbind: function (e) {
    let index = e.currentTarget.dataset.index
    let that = this
    let spec_item_id = parseInt(e.currentTarget.dataset.spec_item_id)
    let goods_id = parseInt(e.currentTarget.dataset.goods_id)
    let attrindex = e.currentTarget.dataset.attrindex
    let specslist = that.data.specslist
    let attrlist = specslist[index].attrlist
    attrlist.splice(attrindex, 1)
    if (spec_item_id) {
      App.HttpService.postData(App.Config.delGoodsSpecItemHintUrl, { 'spec_item_id': spec_item_id, 'goods_id': goods_id }).then(data => {
        if (data.code == 0) {
          if (data.data) {
            wx.showModal({
              title: '提示',
              content: '该二级规格已经有库存,是否删除',
              confirmText: '是',
              cancelText: '否',
              success(res) {
                if (res.confirm) {
                  App.HttpService.postData(App.Config.delGoodsSpecItemUrl, { 'spec_item_id': spec_item_id, 'goods_id': goods_id }).then(dataa => {
                    if (data.code == 0) {
                      that.setData({
                        'form.specslist': specslist,
                        specslist: specslist
                      })
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            this.setData({
              specslist: specslist,
              'form.specslist': specslist,
            })
          }

        }
      });
    } else {
      this.setData({
        specslist: specslist,
        'form.specslist': specslist,
      })
    }

  },
  //商品规格 input输入
  numinputbind: function (e) {
    let specs = e.currentTarget.dataset.specs // 是否是规格 一级 1 二级 2
    let index = parseInt(e.currentTarget.dataset.index) // 
    let specsdata
    let specsdata1
    let that = this
    let val = e.detail.value //输入的值
    if (specs == 1) {
      specsdata1 = `form.specslist[${index}].specsname` // 拼接动态属性
      specsdata = `specslist[${index}].specsname` // 拼接动态属性
    } else if (specs == 2) {
      let attrindex = e.currentTarget.dataset.attrindex
      let type = e.currentTarget.dataset.type
      specsdata1 = `form.specslist[${index}].attrlist[${attrindex}].${type}`
      specsdata = `specslist[${index}].attrlist[${attrindex}].${type}`

    }
    that.setData({
      [specsdata1]: val,
      [specsdata]: val,
    })
  },
  //富文本实例化
  onEditorReady() {
    var that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      // that.editorCtx.setContents({
      //   html: '<p wx:nodeid="46">11111</p>'
      // })

    }).exec()
  },
  //插入图片
  insertImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },
  //设置富文本内容方法
  setEditor: function (e) {
    this.setData({
      'form.goods_desc': e.detail.html
    })
    //富文本最终得到的HMTL数据为:this.data.html
  },
  setinputbind(e) {
    const name = e.target.dataset.name
    let value = e.detail.value
    let form
    form = `form.${name}`
    console.log(form)
    this.setData({
      [form]: value
    })
  },
  //编辑器插入图片
  editorjs: function (e) {
    const that = this
    var e = e.currentTarget.dataset
    if (e.bind == 'insertImage') {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          App.HttpService.uploadImage(res.tempFilePaths[0], 201, 0).then(data => {
            if (data.code == 0) {
              that.editorCtx.insertImage({
                src: data.data.image,
                data: {
                  id: 'abcd',
                  role: 'god'
                },
                width: '80%',
                success: function () {

                }
              })
            }
          });
        }
      })
    }
    // editorjs.editorfunction(e)
  },
  uploadimgbind() {
    const _this = this
    wx.chooseImage({
      success: function (res) {
        App.HttpService.uploadImage(res.tempFilePaths[0], 201, 0).then(data => {
          if (data.code == 0) {
            _this.setData({
              'form.cover_image': data.data.image,
              coverImage: res.tempFilePaths[0]
            })
          }
        });
      },
    })
  },
  uploadbimgbind(e) {
    let key = e.currentTarget.dataset.key
    const _this = this
    let bannerlist = _this.data.bannerlist
    wx.chooseImage({
      success: function (res) {
        App.HttpService.uploadImage(res.tempFilePaths[0], 201, 0).then(data => {
          if (data.code == 0) {
            bannerlist[key].image = data.data.image
            _this.setData({
              bannerlist: bannerlist,
              'form.bannerlist': bannerlist
            })
          }
        });
      },
    })
  },
  shangimgbind(e) {
    let key = e.currentTarget.dataset.key
    const _this = this
    let bannerlist = _this.data.bannerlist
    let newarr = []
    let blength = bannerlist.length
    for (let k = 0; bannerlist.length > k; k++) {
      if (key == k) {
        if (k == 1) {
          newarr.push(bannerlist[k])
          newarr.push(bannerlist[k - 1])
          if (blength > 2) {
            newarr.push(bannerlist[k + 1])
          }
        } else {
          for (let i = k; i - 2 >= 0; i--) {
            newarr.push(bannerlist[k - i])
          }
          newarr.push(bannerlist[k])
          newarr.push(bannerlist[k - 1])
        }
        // else if (k == 3) {
        //   newarr.push(bannerlist[k - 3])
        //   newarr.push(bannerlist[k - 2])
        //   newarr.push(bannerlist[k])
        //   newarr.push(bannerlist[k - 1])
        // } else if (k == 4) {
        //   newarr.push(bannerlist[k - 4])
        //   newarr.push(bannerlist[k - 3])
        //   newarr.push(bannerlist[k - 2])
        //   newarr.push(bannerlist[k])
        //   newarr.push(bannerlist[k - 1])
        // }
      }
    }
    _this.setData({
      bannerlist: newarr,
      'form.bannerlist': newarr
    })
  },
  xiaimgbind(e) {
    let key = e.currentTarget.dataset.key
    const _this = this
    let bannerlist = _this.data.bannerlist
    let newarr = []
    let blength = bannerlist.length
    for (let k = 0; bannerlist.length > k; k++) {
      if (key == k) {
        if (k == 0) {
          newarr.push(bannerlist[k + 1])
          newarr.push(bannerlist[k])
          if (blength > 2) {
            newarr.push(bannerlist[k + 2])
          }
        } else {
          for (let i = 0; i < k; i++) {
            newarr.push(bannerlist[i])
          }
          newarr.push(bannerlist[k + 1])
          newarr.push(bannerlist[k])
        }
        // else if (k == 1) {
        //   newarr.push(bannerlist[k - 1])
        //   newarr.push(bannerlist[k + 1])
        //   newarr.push(bannerlist[k])
        // } else if (k == 2) {
        //   newarr.push(bannerlist[k - 2])
        //   newarr.push(bannerlist[k - 1])
        //   newarr.push(bannerlist[k + 1])
        //   newarr.push(bannerlist[k])
        // } else if (k == 3) {
        //   newarr.push(bannerlist[k - 3])
        //   newarr.push(bannerlist[k - 2])
        //   newarr.push(bannerlist[k - 1])
        //   newarr.push(bannerlist[k + 1])
        //   newarr.push(bannerlist[k])
        // } else if (k == 4) {
        //   newarr.push(bannerlist[k - 4])
        //   newarr.push(bannerlist[k - 3])
        //   newarr.push(bannerlist[k - 2])
        //   newarr.push(bannerlist[k - 1])
        //   newarr.push(bannerlist[k + 1])
        //   newarr.push(bannerlist[k])
        // }

      }
    }
    _this.setData({
      bannerlist: newarr,
      'form.bannerlist': newarr
    })
  },
  delimgbind(e) {
    let key = e.currentTarget.dataset.key
    const _this = this
    let bannerlist = _this.data.bannerlist
    bannerlist.splice(key, 1)
    _this.setData({
      bannerlist: bannerlist
    })
  },
  submitbind() {
    let that = this
    let param = that.data.form
    if (Array.isArray(param.bannerlist)) {
      param.bannerlist = JSON.stringify(param.bannerlist)
    }
    if (Array.isArray(param.specslist)) {
      param.specslist = JSON.stringify(param.specslist)
    }
    App.HttpService.postData(App.Config.publishGoodsUrl, param).then(dataa => {
      if (dataa.code == 0) {
        wx.redirectTo({
          url: '../goodmanage/goodmanage',
        })
      }
    });
  },

})