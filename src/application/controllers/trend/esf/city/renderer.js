/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> application -> controllers -> trend -> esf -> city -> renderer.js
3. 作者：liyang@lifang.com
4. 备注：二手房价格行情区域页面渲染器
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppRendererControllerBasic from "../../../renderer";
import ApiDataFilter from "../../../../../system/libraries/apiDataFilter";

class Renderer extends AppRendererControllerBasic {
    constructor(req,res,next){
        super(req, res, next);
        this.renders()
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders(){
        let modulePathArray = [ "trend" , "esf" , "city" ] ;
        let apiPathArray = [ "trend" , "esf" , "basePriceTrend" ] ;
        try{
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            调用接口获取数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let adf = new ApiDataFilter(this.req.app);
            let cityId = this.req.params.regionId || 43; // 城市Id
            let apiData = await adf.request({
                "apiPath" : apiPathArray.join(".") ,
                "method":"post",
                "contentType":"application/json",
                "data" : { "regionId" : cityId ,"regionType":1}
            }) ;
            let item = apiData.data;
            item.cityPinYin = this.req.cookies.pinyin || this.req.cookies.location_cityPinyin || "shanghai";
            item.channel = "";
            // 额外的脚本样式
            let  extraJavascript = [this.templateData.utilStaticPrefix+'/wkzf/js/util/echarts/echarts.3.2.3.min.js'];
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "title" : "租房-悟空找房" ,
                "keywords" :  "租房，真实房屋出租" ,
                "description" : "悟空找房网为您提供" ,
                "matchStylesheetPath" : modulePathArray.join("/") ,
                "controllerJavascriptPath" : modulePathArray.join("/") ,
                "extraJavascripts" : extraJavascript ,
                "item": item
            }) ;

            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            渲染模板
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            this.render(modulePathArray.join("/")) ;
        }catch (ex){
            this.next(ex) ;
        }
    }
}
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
最后将render暴露出去
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default Renderer;