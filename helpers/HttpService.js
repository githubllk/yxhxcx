import ServiceBase from 'ServiceBase'
import __config from '../config/config'
class Service extends ServiceBase {
    constructor() {
        super()
        this.$$prefix = ''
        this.$$path = {
            wechatSignUp: '/index/wechatSignUp',
            wechatSignIn: '/index/wechatSignIn',
            decryptData: '/index/decryptData',
            signIn: '/index/signIn',
            signOut: '/index/signOut',
            data: '/index/data',
            detail: '/index/detail',
            add: '/index/add',
            del: '/index/del',
            update: '/index/update'
        }
    }

    wechatSignUp(params) {
        return this.postRequest(this.$$path.wechatSignUp, params)
    }

    wechatSignIn(params) {
        return this.postRequest(this.$$path.wechatSignIn, params)
    }

    wechatDecryptData(params) {
        return this.postRequest(this.$$path.decryptData, params)
    }


    signIn(params) {
        return this.postRequest(this.$$path.signIn, params)
    }

    signOut() {
        return this.postRequest(this.$$path.signOut)
    }

    //获取数据
    getData(url, params, header = {'Accept': 'application/json'}, dataType = 'json') {
        return this.getRequest(url, params, header, dataType)
    }
    //抛数据
    postData(url, params, header = { 'Accept': 'application/json' }, dataType = 'json') {
        return this.postRequest(url, params, header, dataType)
    }


    //获取单条数据
    getDetail(params) {
        return this.getRequest(this.$$path.detail, params)
    }

    //新增数据
    addData(params) {
        return this.postRequest(this.$$path.add, params)
    }

    //删除数据
    delData(params) {
        return this.getRequest(this.$$path.del, params)
    }

    //更新数据
    updateData(params) {
        return this.getRequest(this.$$path.update, params)
    }
    
    /**
     * 上传普通图片
     * url  string 地址
     * use  int  应用场景 0未使用 101-199后台类型
     * type int  图片类型 0普通 其他详见switch case
     * side string  身份证正反面类型:face/back
     */
    uploadImage(url = '', use = '', type = '', side = '', options = {}) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: __config.basePath + __config.ptUploadImage, //此处换上你的接口地址
                filePath: url,
                name: 'image',
                header: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': wx.getStorageSync("token") //若有token，此处换上你的token，没有的话省略
                },
                formData: {
                    //其他额外的formdata，可不写
                    'type': type,
                    'use': use,
                    'source': 1,
                    'token': wx.getStorageSync("token"),
                    'side': side
                },
                success: function(res) {
                    var data = res.data;
                    var ll = JSON.parse(data)
                    if (ll.code == 40101) {
                        wx.showToast({
                            title: '禁止传色情图片',
                            icon: 'none',
                            duration: 2000
                        })
                        reject(false)
                    }
                    resolve(ll)
                },
                fail: function(res) {
                    wx.showToast({
                        title: '上传图片请求超时',
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: function() { // 接口调用结束的回调函数（调用成功、失败都会执行）
                    

                }
            })
        })
    }
    //上传Oss图片
    uploadOssImage(url, params) {
        return this.uploadOssImage
    }

}

export default Service