// pages/agent/stockdetails/stockdetails.js
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    option_active: 0,
    option_list: [],
    goodlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.HttpService.getData(App.Config.getCategoryListUrl).then(dataa => {
      if (dataa.code == 0) {
        this.getgoodslist(dataa.data[0].id)
        this.setData({
          option_list: dataa.data,
          option_active: dataa.data[0].id
        })
      }
    });

  },
  getgoodslist(category_id) {
    App.HttpService.getData(App.Config.getGoodsListUrl, { 'category_id': category_id }).then(data => {
      if (data.code == 0) {
        this.setData({
          goodlist: data.data,
        })
      }
    });
  },
  editbind(e) {
    wx.navigateTo({
      url: '../gooddetail/gooddetail?id=' + e.currentTarget.dataset.id,
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
  option_select: function (e) {

    this.setData({
      option_active: e.target.dataset.num
    })
    this.getgoodslist(e.target.dataset.num)
  },
  goodsitem: function () {
    wx.navigateTo({
      url: '../stockgsdetails/stockgsdetails',
    })
  },
  jiabind: function (e) {
    let index = e.currentTarget.dataset.index
    let goodid = e.currentTarget.dataset.goodid
    let goodlist = this.data.goodlist
    var status = 0
    for (let i in goodlist) {
      if (i == index) {
        if (goodlist[i].status == 1) {
          status = 8
          goodlist[i].status = 8
        } else {
          goodlist[i].status = 1
          status = 1
        }
      }
    }
    App.HttpService.postData(App.Config.goodChangeUpUrl, { 'id': goodid, 'status': status }).then(data => {
      if (data.code == 0) {
        this.setData({
          goodlist: goodlist,
        })
      }
    });
  },
  delbind: function (e) {
    let index = e.currentTarget.dataset.index
    let goodid = e.currentTarget.dataset.goodid
    let that = this
    let goodlist = that.data.goodlist
    wx.showModal({
      title: '提示',
      content: '是否删除此商品',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          goodlist.splice(index, 1)
          App.HttpService.postData(App.Config.goodChangeUpUrl, { 'id': goodid, 'status': 9 }).then(data => {
            if (data.code == 0) {
              that.setData({
                goodlist: goodlist,
              })
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  classifymanagebind: function () {
    wx.navigateTo({
      url: '../classifymanage/classifymanage',
    })
  },
  addgoodbind: function () {
    wx.navigateTo({
      url: '../gooddetail/gooddetail',
    })
  },


})