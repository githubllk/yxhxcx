function setinitdate(e,dataval) {
  console.log(dataval)
  this.setData({
    [dataval]: e.detail.value,
  })
}

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments)   //将this和参数传给原函数
          _lastTime = _nowTime
      }
  }
}
function tip(params) {
  var title = params.hasOwnProperty('title') ? params['title'] : '提示';
  var content = params.hasOwnProperty('content') ? params['content'] : '';
  var showCancel = params.hasOwnProperty('showCancel') ? params['showCancel'] : true;
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    success: function(res) {
      if (res.confirm) { //点击确定
        if (params.hasOwnProperty('cb_confirm') && typeof(params.cb_confirm) == "function") {
          params.cb_confirm();
        }
      } else { //点击否
        if (params.hasOwnProperty('cb_cancel') && typeof(params.cb_cancel) == "function") {
          params.cb_cancel();
        }
      }
    }
  })
}
module.exports = {
  setinitdate: setinitdate,
  throttle: throttle,
  tip:tip
};