/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> application -> controllers -> esf -> detail -> renderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：二手房详情页面渲染器
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppRendererControllerBasic from "../../renderer" ;
import ApiDataFilter from "../../../../system/libraries/apiDataFilter" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个渲染器实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class Renderer extends AppRendererControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        渲染模板
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/       
        this.renders() ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders() {
        let modulePathArray = [ "esf" , "detail" ] ;
        try {
            let adf = new ApiDataFilter(this.req.app) ;   
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            获取houseId
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
            let houseId = this.req.params.houseId || "" ;
            // 获取city
             let city = this.req.params.city || "" ;
             let apiData = require("../../../mock/esf/esf")["default"].data ;
             let item = apiData;
            // 地图跳转路径
            item['mapUrl'] = this.templateData.domain + '/esf/map.html?longitude=' + item.longitude + '&latitude=' + item.latitude + '&houseName=' + item.subEstateName + '&houseAddress=' + item.estateAddr;
            // 计算器URL
            item['calculatorUrl'] = this.templateData.domain +'/houseLoanCalculator.html?totalPrice='+item.totalPrice;
            // 经纪人路径跳转URL
            item.houseAgent['url'] = '/';
            // 小区详情URL
            item['estateUrl'] = this.templateData.domain +'/'+city+'/community/'+item.subEstateId+'.html';
            // 相似房源更多的Url
            item['similarHousesUrl'] = this.templateData.domain +'/esf/similarList.html?enCryptHouseId='+houseId;
            // 额外的脚本样式
            let  extraJavascript = ['//dev01.fe.wkzf/fe_public_library/wkzf/js/util/echarts/echarts.js','//dev01.fe.wkzf/wkh5_fe/js/components/album.min.js'];
            // 相册的视频和图片的数据的组装处理
            let imgList = [];
            if(item.houseVideos){
                item.houseVideos['isVideo'] = true ;
                item.houseVideos['url'] = item.houseVideos.videoUrl;
                item.houseVideos['videoPlayUrl'] = "/" + this.req.params.city + '/videoplay/index?src=' + encodeURIComponent(item.houseVideos.videoUrl);
                imgList.push(item.houseVideos)
            }
            if (item.houseImages){
                item.houseImages.forEach(function (eachItem) {
                    imgList.push({
                        isVideo:false,
                        url:eachItem
                    })
                })
            }
            item['imgList'] = imgList ;
            // 给相似房源添加埋点和点击调往页面的Url
            if (item.similarHouses){
                item.similarHouses.forEach(function (eachItem,index) {
                    item.similarHouses[index]['bigDataParams'] = {};
                    item.similarHouses[index]['url'] = this.templateData.domain +'/'+city+'/esf/'+eachItem.encryptHouseId+'.html' ;
                })
            }
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板api数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
         /*   let apiData = await adf.request({
                "apiPath" : modulePathArray.join(".") ,
                "data" : { "houseId" : houseId }
            }) ; */



            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "title" :"二手房详情" ,
                "matchStylesheetPath" : modulePathArray.join("/") ,
                "controllerJavascriptPath" : modulePathArray.join("/"),
                "extraJavascripts" : extraJavascript ,
                "item" : item ,
            }) ;
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            渲染模板
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/        
            this.render(modulePathArray.join("/")) ; 
        }
        catch(ex){
            this.next(ex) ;
        }
    }
}
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
最后将render暴露出去
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default Renderer ;