// pages/agent/index/index.js
function option_select(e) {
  let isCustomTime;
  isCustomTime = false
  if (e.target.dataset.num == 4) { //自定义时间
    isCustomTime = true
  }
  this.setData({
    option_active: e.target.dataset.num,
    isCustomTime: isCustomTime
  })
}

function bindStartDateChange(e) {
  this.setData({
    startDate: e.detail.value
  })
}

function bindEndDateChange(e) {
  this.setData({
    endDate: e.detail.value
  })
}
// 时间选择开始
function startDatebind(e) {
  if (this.data.startValue) {
    var startValue = this.data.startValue
  } else {
    var startValue = this.data.array.value
  }
  console.log(this.data.startValue)
  this.setData({
    showpickertime: 1,
    startDatesel: 1,
    endDatesel: 0,
    'array.value': startValue,
  })
}

function endDatebind(e) {
  if (this.data.endValue) {
    var endValue = this.data.endValue
  } else {
    var endValue = this.data.array.value
  }
  this.setData({
    showpickertime: 1,
    startDatesel: 0,
    endDatesel: 1,
    'array.value': endValue
  })
}

function inputVal(e) {
  const val = e.detail.value
  const array = this.data.array
  const year = array.years[val[0]]
  let month = array.months[val[1]]
  let day = array.days[val[2]]
  if (month <= 9) {
    month = "0" + month
  }
  if (day <= 9) {
    day = "0" + day
  }
  if (this.data.startDatesel == 1) {
    this.setData({
      startDatea: year + '-' + month + '-' + day,
      startValue: val
    })
  } else if (this.data.endDatesel == 1) {
    this.setData({
      endDatea: year + '-' + month + '-' + day,
      endValue: val
    })
  }
}
//取消按钮
function paickerQuxiao() {
  this.setData({
    showpickertime: 0
  })
}
//确定按钮
function paickerQueding() {
  if (this.data.startDatesel == 1) {
    let startDatea = this.data.startDatea
    if (!startDatea) {
      const newdate = new Date();
      startDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
    }
    this.setData({
      startDate: startDatea
    })
  } else if (this.data.endDatesel == 1) {
    let endDatea = this.data.endDatea
    if (!endDatea) {
      const newdate = new Date();
      endDatea = newdate.getFullYear() + '-' + newdate.getMonth() + 1 + '-' + newdate.getDate();
    }
    this.setData({
      endDate: endDatea
    })
  }
  this.setData({
    showpickertime: 0
  })
}