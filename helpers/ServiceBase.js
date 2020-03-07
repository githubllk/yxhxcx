import __config from '../config/config'
// import es6 from '../assets/plugins/es6-promise'

class ServiceBase {
    constructor() {
        Object.assign(this, {
            $$basePath: __config.basePath
        })
        this.__init()
    }

    /**
     * __init
     */
    __init() {
        this.__initDefaults()
        this.__initMethods()
    }

    /**
     * __initDefaults
     */
    __initDefaults() {
        // 方法名后缀字符串
        this.suffix = 'Request'

        // 发起请求所支持的方法
        this.instanceSource = {
            method: [
                'OPTIONS',
                'GET',
                'HEAD',
                'POST',
                'PUT',
                'DELETE',
                'TRACE',
                'CONNECT',
            ]
        }
    }

    /**
     * 遍历对象构造方法，方法名以小写字母+后缀名
     */
    __initMethods() {
        for (let key in this.instanceSource) {
            this.instanceSource[key].forEach((method, index) => {
                this[method.toLowerCase() + this.suffix] = (...args) => this.__defaultRequest(method, ...args)

            })
        }
    }

    /**
     * 以wx.request作为底层方法
     * @param {String} method 请求方法
     * @param {String} url    接口地址
     * @param {Object} params 请求参数
     * @param {Object} header 设置请求的 header
     * @param {String} dataType 请求的数据类型
     */
    __defaultRequest(method = '', url = '', params = {}, header = {}, dataType = 'json') {
        const $$header = Object.assign({}, this.setHeaders(), header)
        const $$url = this.setUrl(url)

        // 注入拦截器
        const chainInterceptors = (promise, interceptors) => {
            for (let i = 0, ii = interceptors.length; i < ii;) {
                let thenFn = interceptors[i++]
                let rejectFn = interceptors[i++]
                promise = promise.then(thenFn, rejectFn)
            }
            return promise
        }
        const app = getApp();
        const pages = getCurrentPages()
        const route = pages[pages.length - 1].route
        // 判断是否登录
        if ((wx.getStorageSync('token') == null || wx.getStorageSync('token') == '') && !app.globalData.isLogin && route != 'pages/login/login') {
            console.log("需要登录")
            // 需重新登录
            app.isLogin()
            
        }
        // 如果有token 将token塞入data
        if ((wx.getStorageSync('token') != null && wx.getStorageSync('token') != '') && route != 'pages/login/login') {
            params.token = wx.getStorageSync('token');
        }


        // 签名

        params.source = '1';
        params.xcx_version = '1.0.25';
        var tmp = Date.parse(new Date()).toString();
        tmp = tmp.substr(0, 10);
        params.timestamp = tmp
        params = objKeySort(params); // 数据拼接字符串
        let dataStr = urlEncode(params);

        if (dataStr !== '') {
            if (dataStr.indexOf('&') === 0) {
                dataStr = dataStr.substr(1, dataStr.length);
            }

            params.signature = hex_sha1(dataStr + 'xcx_jilianclub');

        }
        var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
        var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
        /**
         * param    将要转为URL参数字符串的对象
         * key      URL参数字符串的前缀
         * encode   true/false 是否进行URL编码,默认为true
         *
         * return   URL参数字符串
         */
        function urlEncode(param = {}, key = null, encode = true) {
            if (param == null) {
                return '';
            }

            function URLdecode(str) {
                var ret = "";
                for (var i = 0; i < str.length; i++) {
                    var chr = str.charAt(i);
                    if (chr == "+") {
                        ret += " ";
                    } else if (chr == "%") {
                        var asc = str.substring(i + 1, i + 3);
                        if (parseInt("0x" + asc) > 0x7f) {
                            ret += decodeURI("%" + str.substring(i + 1, i + 9));
                            i += 8;
                        } else {
                            ret += String.fromCharCode(parseInt("0x" + asc));
                            i += 2;
                        }
                    } else {
                        ret += chr;
                    }
                }
                return ret;
            }

            let paramStr = '';
            let t = typeof (param);
            if ((t == 'string' && param != '') || t == 'number' || t == 'boolean') {
                if (t == 'number') {
                    param = param.toString();
                }
                // paramStr += '&' + key + '=' + ((encode == null || encode) ? URLdecode(param) : param);
                paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
            } else {
                // var a=[]
                // console.log(typeof (param[0])+param)
                // if(param[0]=='undefind')
                // {   console.log(typeof(param))
                //     paramStr += '&' + key + '=' + ((encode == null || encode) ? param : param);
                // }
                // else{
                for (let i in param) {
                    let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    paramStr += urlEncode(param[i], k, encode);
                    // }
                }
            }

            // console.log('这是啥' + encode)
            return paramStr;
        }

        // 签名算法
        function objKeySort(arys) {
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newkey = Object.keys(arys).sort();
            // console.log('newkey='+newkey);
            var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) {
                //遍历newkey数组
                newObj[newkey[i]] = arys[newkey[i]];
                //向新创建的对象中按照排好的顺序依次增加键值对

            }

            return newObj; //返回排好序的新对象
        }

        function hex_sha1(s) {

            return binb2hex(core_sha1(AlignSHA1(s)));

        }
        /*
         *
         * Calculate the SHA-1 of an array of big-endian words, and a bit length
         *
         */
        function core_sha1(blockArray) {

            var x = blockArray; // append padding
            var w = Array(80);

            var a = 1732584193;

            var b = -271733879;

            var c = -1732584194;

            var d = 271733878;

            var e = -1009589776;

            for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
            {

                var olda = a;

                var oldb = b;

                var oldc = c;

                var oldd = d;

                var olde = e;

                for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
                {

                    if (j < 16)
                        w[j] = x[i + j];

                    else
                        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

                    var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));

                    e = d;

                    d = c;

                    c = rol(b, 30);

                    b = a;

                    a = t;

                }

                a = safe_add(a, olda);

                b = safe_add(b, oldb);

                c = safe_add(c, oldc);

                d = safe_add(d, oldd);

                e = safe_add(e, olde);

            }

            return new Array(a, b, c, d, e);

        }
        /*
         *
         * The standard SHA1 needs the input string to fit into a block
         *
         * This function align the input string to meet the requirement
         *
         */
        function AlignSHA1(str) {

            var nblk = ((str.length + 8) >> 6) + 1,
                blks = new Array(nblk * 16);

            for (var i = 0; i < nblk * 16; i++)
                blks[i] = 0;

            for (i = 0; i < str.length; i++)

                blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);

            blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);

            blks[nblk * 16 - 1] = str.length * 8;

            return blks;

        }
        /*
         *
         * Convert an array of big-endian words to a hex string.
         *
         */
        function binb2hex(binarray) {

            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";

            var str = "";

            for (var i = 0; i < binarray.length * 4; i++) {

                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +

                    hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);

            }


            return str;

        }
        /*
         *
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         *
         * to work around bugs in some JS interpreters.
         *
         * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
         *
         */
        function safe_add(x, y) {

            var lsw = (x & 0xFFFF) + (y & 0xFFFF);

            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);

            return (msw << 16) | (lsw & 0xFFFF);

        }
        /*
                 *
                 * Bitwise rotate a 32-bit number to the left.
                 *
                 * 32位二进制数循环左移
                 *
                 */
        function rol(num, cnt) {

            return (num << cnt) | (num >>> (32 - cnt));

        }
        /*
         *
         * Perform the appropriate triplet combination function for the current
         * iteration
         *
         * 返回对应F函数的值
         *
         */
        function sha1_ft(t, b, c, d) {

            if (t < 20)
                return (b & c) | ((~b) & d);

            if (t < 40)
                return b ^ c ^ d;

            if (t < 60)
                return (b & c) | (b & d) | (c & d);

            return b ^ c ^ d; // t<80
        }
        /*
         *
         * Determine the appropriate additive constant for the current iteration
         *
         * 返回对应的Kt值
         *
         */
        function sha1_kt(t) {

            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;

        }

        // 参数拼接

        // 请求参数配置
        const $$config = {
            url: $$url,
            data: params,
            header: $$header,
            method: method,
            dataType: dataType,
        }

        let requestInterceptors = []
        let responseInterceptors = []
        let reversedInterceptors = this.setInterceptors()
        let promise = this.__resolve($$config)

        // 缓存拦截器
        reversedInterceptors.forEach((n, i) => {
            if (n.request || n.requestError) {
                requestInterceptors.push(n.request, n.requestError)
            }
            if (n.response || n.responseError) {
                responseInterceptors.unshift(n.response, n.responseError)
            }
        })

        // 注入请求拦截器
        promise = chainInterceptors(promise, requestInterceptors)

        // 发起HTTPS请求
        promise = promise.then(this.__http)

        // 注入响应拦截器
        promise = chainInterceptors(promise, responseInterceptors)

        // 接口调用成功，res = {data: '开发者服务器返回的内容'}
        promise = promise.then(res => res.data, err => err)

        return promise
    }

    /**
     * __http - wx.request
     */
    __http(obj) {
        return new Promise((resolve, reject) => {
            obj.success = (res) => resolve(res)
            obj.fail = (res) => reject(res)
            wx.request(obj)
        })
    }

    /**
     * __resolve
     */
    __resolve(res) {
        return new Promise((resolve, reject) => {
            resolve(res)
        })
    }

    /**
     * __reject
     */
    __reject(res) {
        return new Promise((resolve, reject) => {
            reject(res)
        })
    }

    /**
     * 设置请求路径
     */
    setUrl(url) {
        return `${this.$$basePath}${this.$$prefix}${url}`
    }

    /**
     * 设置请求的 header , header 中不能设置 Referer
     */
    setHeaders() {
        return {
            // 'Accept': 'application/json', 
            // 'Content-type': 'application/json', 
            'Authorization': 'Bearer ' + wx.getStorageSync('openId'),
        }
    }

    /**
     * 设置request拦截器
     */
    setInterceptors() {
        return [{
            request: (request) => {
                request.header = request.header || {}
                request.requestTimestamp = new Date().getTime()
                if (request.url.indexOf('/api') !== -1 && wx.getStorageSync('openId')) {
                    request.header.Authorization = 'Bearer ' + wx.getStorageSync('openId')
                }
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 100,
                    mask: !0,
                })
                return request
            },
            requestError: (requestError) => {
                wx.hideToast()
                return requestError
            },
            response: (response) => {
                response.responseTimestamp = new Date().getTime()
                
                if (response.data.code === '-1') {
                    // 接口异常
                    console.log('服务端错误 联系管理员');
                }
                if (response.data.code == 40001) {
                    console.log('app_key错误');
                }
                if (response.data.code == 40002) {
                    console.log('sign签名错误');
                }
                if (response.data.code == 40007) {
                    wx.showToast({
                        title: '未设置定位',
                        icon: 'none',
                        duration: 2000
                    })
                }
                if (response.data.code == 40000) {
                    console.log(response.data.msg)
                    wx.showToast({
                        title: response.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
                if (response.data.code == 40003) {
                    let app = getApp()
                    app.globalData.user = {};
                    wx.removeStorageSync('token');
                    console.log('token验证失败');
                    app.globalData.isLogin = false
                    if (!app.globalData.isLogin) {
                        app.isLogin();
                    }
                    else {
                        console.log(3333)
                    }
                    console.log(app.globalData.isLogin)
                    return false
                }
                if (response.data.code == 30402) {
                    console.log(response.data.msg)
                    wx.showToast({
                        title: response.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    let app = getApp();
                    setTimeout(function () {
                        app.logout();
                    }, 1000);
                }
                
                

                if (response.data.code == 40004) {
                    wx.hideLoading();
                    console.log('API接口参数错误');
                }
                if (response.data.code == 40099) {
                    console.log('请求方式有误');
                    wx.showToast({
                        title: response.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
                if (response.data.code == 40005) {
                    wx.hideLoading();
                    console.log('数据不存在 例如404');
                }
                if (response.statusCode === 401) {
                    wx.removeStorageSync('openId')
                    wx.redirectTo({
                        url: '/pages/login/index'
                    })
                }
                // wx.hideToast()
                return response
            },
            responseError: (responseError) => {
                wx.hideToast()
                return responseError
            },
        }]
    }

}


export default ServiceBase