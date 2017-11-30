/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> application -> routers -> dubbo.js
3. 作者：zhaohuagang@lifang.com
4. 备注：wkh5 -> dubbo接口连接demo模块路由器
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import express from "express" ;
import dubboDemoApiProvider from "../controllers/dubbo/demo/apiProvider" ;
let router = express.Router() ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/rent/detail的路由规则
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
router.get("/dubbo/demo", function( req , res , next ) {   
    new dubboDemoApiProvider(req, res, next) ;  
}) ;

export default router ;