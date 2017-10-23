/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> application -> routers -> videoplay.js
3. 作者：tangxuyang@lifang.com
4. 备注：wkh5 -> 视频播放页路由器
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import express from "express" ;
import VideoPlayDetailRenderer from "../controllers/videoplay/renderer" ;
let router = express.Router() ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/rent/detail的路由规则
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
router.get("/index", function(req, res, next) {   
    new VideoPlayDetailRenderer(req, res, next) ;  
}) ;
export default router ;