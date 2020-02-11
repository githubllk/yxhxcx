// pages/agent/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifytext: '请选择',
    classify: [{
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
    },],
    hiddenn: 1,
    addbannerhide: 0,
    val: [0],
    bannerlist: [{
      'image': '../../images/banner-default.png'
    }],
    arr: { 'specsname': '', 'attrlist': [{ 'attrname': '', 'attrprice': '', }] },
    specslist: [{ 'specsname': '', 'attrlist': [{ 'attrname': '', 'attrprice': '', }] }],
    form: {
      classifyid: [0],
    },
    textare: '请输入'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加商品',
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
      const classifytext = this.data.classify[this.data.form.classifyid[0]].name
      this.setData({
        classifytext: classifytext
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
    const val = e.detail.value ? e.detail.value : [0, 0]
    if (this.data.isclassify == 1) { //分类
      this.setData({
        'form.classifyid': val
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
        'image': '../../images/banner-default.png'
      }
      this.setData({
        bannerlist: bannerlist.concat(ban)
      })
    }
  },
  //添加规格
  specsaddbind: function () {
    let that = this
    let arr_ = { 'specsname': '', 'attrlist': [{ 'attrname': '', 'attrprice': '', }] }
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
    let arr_ = { 'specsname': '', 'attrlist': [{ 'attrname': '', 'attrprice': '', }] }
    let attrlist = specslist[index]['attrlist'].concat(arr_['attrlist'])
    specslist[index]['attrlist'] = attrlist
    that.setData({
      specslist: specslist,
    })
  },
  //删除 规格
  specsdelbind: function (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let that = this
    let specslist = that.data.specslist
    specslist.splice(index, 1)

    that.setData({
      specslist: specslist
    })
  },
  //删除 属性
  attrdelbind: function (e) {
    let index = e.currentTarget.dataset.index
    let that = this
    let attrindex = e.currentTarget.dataset.attrindex
    let specslist = that.data.specslist
    let attrlist = specslist[index].attrlist
    attrlist.splice(attrindex, 1)
    this.setData({
      specslist: specslist
    })
  },
  //商品规格 input输入
  numinputbind: function (e) {
    let specs = e.currentTarget.dataset.specs // 是否是规格 一级 1 二级 2
    let index = parseInt(e.currentTarget.dataset.index) // 
    let specsdata
    let that = this
    let val = e.detail.value //输入的值
    if (specs == 1) {
      specsdata = `specslist[${index}].specsname` // 拼接动态属性
    } else if (specs == 2) {
      let attrindex = e.currentTarget.dataset.attrindex
      let type = e.currentTarget.dataset.type
      specsdata = `specslist[${index}].attrlist[${attrindex}].${type}`

    }
    that.setData({
      [specsdata]: val
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
      editorhtml: e.detail.html
    })
    //富文本最终得到的HMTL数据为:this.data.html
  },
})