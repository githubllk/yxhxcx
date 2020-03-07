// pages/agent/classifymanage/classifymanage.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'list',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.HttpService.getData(App.Config.getCategoryManageListUrl).then(dataa => {
      if (dataa.code == 0) {
        this.setData({
          list: dataa.data,
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

  },
  addclassifybind: function () {
    const type = this.data.type
    if (type == 'list') {
      this.setData({
        type: 'add'
      })
      wx.setNavigationBarTitle({
        title: '添加分类',
      })
    } else if (type == 'add') {
      let name = this.data.name
      if (!!name) {
        App.HttpService.postData(App.Config.getCategoryDetailUrl, { 'name':name }).then(dataa => {
          if (dataa.code == 0) {
            this.setData({
              detail: dataa.data,
            })
            wx.redirectTo({
              url: './classifymanage',
            })
          }
        });
      }
      //提交数据
    } else if (type == 'edit') {
      let id = this.data.detail.id
      let name = this.data.name?this.data.name:this.data.detail.name
      App.HttpService.postData(App.Config.getCategoryDetailUrl, { 'id': id,'name':name }).then(dataa => {
        if (dataa.code == 0) {
          this.setData({
            detail: dataa.data,
          })
          wx.redirectTo({
            url: './classifymanage',
          })
         
        }
      });
    }
  },
  editbind: function (e) {
    let id = e.currentTarget.dataset.id
    App.HttpService.getData(App.Config.getCategoryDetailUrl, { 'id': id }).then(dataa => {
      if (dataa.code == 0) {
        this.setData({
          detail: dataa.data,
          type: 'edit'
        })
        wx.setNavigationBarTitle({
          title: '编辑分类',
        })
      }
    });
    //获取数据
    this.setData({
      name: '编辑请输入'
    })

  },
  delbind: function (e) {
    let count = e.currentTarget.dataset.count
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    if (count) {
      wx.showModal({
        title: '提示',
        content: '该分类下还有商品',
        confirmText:'确定',
        success (res) {
        
        }
      })          
    }else{
      App.HttpService.postData(App.Config.delCategoryUrl, { 'id': id }).then(dataa => {
        if (dataa.code == 0) {
          let list = this.data.list 
          list.splice(index, 1)
          this.setData({
            list: list,
          })
        }
      });
      
    }
    console.log('del')
  },
  inputbind(e){
    const name = e.detail.value //修改的数据
    this.setData({
        'name': name
    })
  }
})