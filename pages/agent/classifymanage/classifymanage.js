// pages/agent/classifymanage/classifymanage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'list'
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
  addclassifybind:function(){
    const type = this.data.type
    if (type=='list') {
      this.setData({
        type:'add'
      })
      wx.setNavigationBarTitle({
        title: '添加分类',
      })  
    }else if(type=='add'){
      this.setData({
        type:'list'
      })
      wx.setNavigationBarTitle({
        title: '分类管理',
      })
      //提交数据
    }else if(type=='edit'){
      this.setData({
        type:'list'
      })
      wx.setNavigationBarTitle({
        title: '分类管理',
      })
      //提交数据
    }
  },
  editbind:function(e){
    this.setData({
      type:'edit'
    })
    wx.setNavigationBarTitle({
      title: '编辑分类',
    })
    const classifyid = e.currentTarget.dataset.id
    //获取数据
    this.setData({
      name:'编辑请输入'
    })

  },
  delbind:function(){
    console.log('del')
  }
})