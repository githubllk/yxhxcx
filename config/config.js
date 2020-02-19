export default {
    basePath: 'http://192.168.1.152',
    fileBasePath: 'http://192.168.1.1.152',
    static:'/static/xcx_image/',//登陆页面背景图片
    title: 'ceshi',
    //腾讯地图 key
    map_key : 'IYVBZ-ZDHWP-74ZDG-L2XND-SJUNQ-PVB4X',
    debug: true,
    //首页链接
    indexUrl: '/api/v2/index',
    getRegionlistUrl: '/api/xcx/region/getregionlist',//获取地址列表
    getcitylist: '/common/tool/getcitylist',//三级联动
    ptUploadImage: '/common/image_upload/uploadpic', //普通上传图片
    ossUPloadImage: '/common/image_upload/uploadosspic', //oss上传图片
    loginUrl: "/api/common/login/xcxsignin",
}