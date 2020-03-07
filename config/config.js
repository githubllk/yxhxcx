export default {
    basePath: 'http://jilian.qicp.vip',
    fileBasePath: 'http://jilian.qicp.vip',
    static:'/static/xcx_image/',//登陆页面背景图片
    title: 'ceshi',
    debug: true,
    // ----------------------------代理商-----------------------------------
    getAgentCountUpUrl: '/api/xcx/order/getagentcountUp',//首页统计
    getCountDealerUrl:"/api/xcx/custom/getcountdealer",//经销商数量
    getAgentDealerListUrl:"/api/xcx/custom/getagentdealerlist",//经销商列表
    getDealerCountUrl:"/api/xcx/order/getdealercount",//经销商统计
    getRegionlistUrl: '/api/xcx/region/getregionlist',//获取地址列表
    getcitylist: '/common/tool/getcitylist',//三级联动
    ptUploadImage: '/common/image_upload/uploadpic', //普通上传图片
    ossUPloadImage: '/common/image_upload/uploadosspic', //oss上传图片
    loginUrl: "/api/common/login/mobileSignIn", // 登陆
    addCustomUrl: "/api/xcx/custom/addcustom", // 新建角色
    customListUrl: "/api/xcx/custom/customlist", // 角色列表
    customLevelUrl: "/api/xcx/custom/customlevel", // 会员等级
    customDetailUrl: "/api/xcx/custom/customdetail", // 会员详情
    customEditlUrl: "/api/xcx/custom/customedit", // 会员修改
    customLevelEditlUrl: "/api/xcx/custom/customleveledit", // 等级管理
    customLevelDiscountlUrl: "/api/xcx/custom/customleveldiscount", // 折扣列表
    customLeveldetailUrl:"/api/xcx/custom/customleveldetail", //等级详情
    getCategoryListUrl:"/api/xcx/goods/getcategorylist" //商品分类列表
    ,publishGoodsUrl:"/api/xcx/goods/publishgoods" //商品添加
    ,getGoodsListUrl:"/api/xcx/goods/getgoodslist" //商品列表
    ,getGoodDetailtUrl:"/api/xcx/goods/getgoodsdetail" //商品列表
    ,delGoodsSpecHintUrl:"/api/xcx/goods/delGoodsSpecHint" //规格删除提示
    ,delGoodsSpecUrl:"/api/xcx/goods/delGoodsSpec" //规格删除
    ,delGoodsSpecItemHintUrl:"/api/xcx/goods/delGoodsSpecItemHint" //规格属性删除提示
    ,delGoodsSpecItemUrl:"/api/xcx/goods/delGoodsSpecItem" //规格属性删除
    ,getCategoryManageListUrl:"/api/xcx/goods/getCategoryManageList" //分类管理列表
    ,getCategoryDetailUrl:"/api/xcx/goods/getCategoryDetail" //分类管理详情
    ,delCategoryUrl:"/api/xcx/goods/delCategory" //分类管理详情
    ,goodChangeUpUrl:"/api/xcx/goods/goodchangeup" //商品状态管理
    ,getKeeperListUrl:"/api/xcx/stock/getkeeperlist" //库存管理列表
    ,getKeeperGoodsListUrl:"/api/xcx/stock/getkeepergoodslist" //库管商品列表
    ,keeperGoodsStockDetailUrl:"/api/xcx/stock/keepergoodsstockdetail" //商品库存详情
    ,editGoodsStockUrl:"/api/xcx/stock/editgoodsstock" //修改商品库存
    ,getGoodsSpecListUrl:"/api/xcx/goods/getgoodsspeclist" //商品规格列表
    ,agentAddStockUrl:"/api/xcx/stock/agentaddstock" //商品入库
    ,getStockLogUrl:"/api/xcx/stock/getstocklog" //出入库记录
    ,customDelUrl:"/api/xcx/custom/customdel" //出入库记录
    ,getAgentOrderListUrl:"/api/xcx/order/getagentorderlist" //订单列表
    ,getAgentOrderItemUrl:"/api/xcx/order/getagentorderitem" //订单详情
    ,cancelAgentOrderUrl:"/api/xcx/order/cancelagentorder" //取消订单
    ,affirmAgentOrderMoneyUrl:"/api/xcx/order/affirmagentordermoney" //已收款
    // ----------------------------库管-----------------------------------
    ,getKeeperCountUpUrl:"/api/xcx/keeper/getkeepercountup" //库管首页统计
    ,getKeeperGoodsListUrl:"/api/xcx/keeper/getkeepergoodslist" //库管首页商品列表
    ,getRukuListUrl:"/api/xcx/keeper/getrukulist" //入库列表
    ,getChukuListUrl:"/api/xcx/keeper/getchukuList" //入库列表
    ,rukuUpdateUrl:"/api/xcx/keeper/rukuUpdate" //确认入库
    ,chukuUpdateUrl:"/api/xcx/keeper/chukuUpdate" //确认入库
    ,keeperShipmentsItemUrl:"/api/xcx/keeper/keepershipmentsitem" //发货详情页面
    ,getExpressListUrl:"/api/xcx/keeper/getexpresslist" //物流公司列表
    //-----------------------------经销商-----------------------------------
    ,getDealerGoodsListUrl:"/api/xcx/dealer/getdealergoodslist" //经销商首页商品列表
    ,getDealerGoodsDetailUrl:"/api/xcx/dealer/getdealergoodsdetail" //经销商商品详情
    ,createByNowOrdersUrl:"/api/xcx/dealer/createbynoworders" //立即购买创建订单
    ,getAddressDefaultUrl:"/api/xcx/dealer/getaddressdefault" //获取默认收货地址
    ,getAddressListUrl:"/api/xcx/dealer/getaddresslist" //获取收货列表
    ,addDealerAddressUrl:"/api/xcx/dealer/adddealeraddress" //添加修改收货列表
    ,delDealerAddressUrl:"/api/xcx/dealer/deldealeraddress" //删除收货地址
    ,getDealerOrderListUrl:"/api/xcx/dealer/getdealerorderlist" //订单列表
    ,getDealerOrderItemUrl:"/api/xcx/dealer/getdealerorderitem" //订单详情
    ,cancelDealerOrderUrl:"/api/xcx/dealer/canceldealerorder" //取消订单
    ,payNowDealerOrderUrl:"/api/xcx/dealer/paynowdealerorder" //已付款
    ,receivingDealerOrderUrl:"/api/xcx/dealer/receivingdealerorder" //已收货
    //-----------------------------公共-----------------------------------
    ,editPasswordUrl:"/api/xcx/custom/editpassword" //修改密码
    ,getCustomItemUrl:"/api/xcx/custom/getcustomitem" //获取详情


}