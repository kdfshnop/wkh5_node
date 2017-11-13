/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> system -> core -> bootstrap ->index.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统启动项 -> 对启动项的整合
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import loadConfs from "./loadConfs" ;
import loadMappers from "./loadMappers" ;
import MakeLogsDirectory from "./makeLogsDirectory" ;
import viewEngine from "./viewEngine" ;
import globalMiddlewares from "./globalMiddlewares" ;
import routerRegister from "./routerRegister" ;
import exception from "./exception" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
模块输出为一个方法，在app.js中执行，把以express创建的应用app当做参数
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default function(app) {
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    读取应用配置到app.locals.confs下
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    loadConfs(app) ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    读取mapper类到app.locals.mappers下
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    loadMappers(app) ;    
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    当前阶段环境存到app.locals.stage_env下
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    app.locals.stage_env = process.env.STAGE_ENV ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    创建日志目录
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    MakeLogsDirectory.mkdir(app) ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    模板目录以及引擎设置
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    viewEngine(app) ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    全局中间件注册
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    globalMiddlewares(app) ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    路由自动注册
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    routerRegister(app) ;
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    根据app配置决定是否需要连接zookeeper注册中心
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    if(app.locals.confs.app.dubbo) {
        const Service = require("node-zookeeper-dubbo") ;
        let dubboConfs = app.locals.confs.dubbo ;
        dubboConfs.register = dubboConfs.register[app.locals.stage_env] ;
        app.locals.SOAServices = new Service(dubboConfs) ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    错误处理
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/ 
    exception(app) ;
} ;