function pickertime(){
    const date = new Date()
    const years = []
    const months = []
    const days = []
    const value_ = [9999, 1, 1]
    for (let i = 1990; i <= date.getFullYear() + 20; i++) {
        if (i == date.getFullYear()) {
            value_[0] = date.getFullYear() - 1990; // 获取当前索引值
        }
        years.push(i)
    }
    
    for (let i = 1; i <= 12; i++) {
        if (i-1 == date.getMonth()) {
            value_[1] = i - 1
        }
        months.push(i)
    }
    
    for (let i = 1; i <= 31; i++) {
    
        if (i == date.getDate()) {
            value_[2] = i - 1
        }
        days.push(i)
    }
    return {'years':years,'months':months,'days':days,'value':value_}
}
function inputVal(e) {
        const dataneme = e.target.dataset.name;
        const valname = 'active.' + dataneme
        var activData = e.detail.value
        var active = wx.getStorageSync('active')
        if (!active) { //判断本地缓存是否存在
            console.log(this.data.active)
            active = this.data.active
            wx.setStorage({
                key: "active",
                data: active
            })
        }
        if (dataneme == 'activeTime') {
            const activeTime = []
            activeTime[0] = activData[0] + 1990
            activeTime[1] = activData[1] + 1
            activeTime[2] = activData[2] + 1
            active[dataneme] = activeTime.join('-')
        } else {
            active[dataneme] = activData
        }

        wx.setStorage({
            key: "active",
            data: active
        })
    }
module.exports = {
    pickertime : pickertime,
    inputVal : inputVal
}
