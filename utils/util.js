function setinitdate(e,dataval) {
  console.log(dataval)
  this.setData({
    [dataval]: e.detail.value,
  })
}


module.exports = {
  setinitdate: setinitdate
};