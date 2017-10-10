/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> system -> core -> bootstrap -> MakeLogsDirectory.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统启动项 -> 创建日志文件存储目录
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import path from "path" ;
import fs from "fs" ;
import log4js from "log4js" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
定义日志预备类
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class MakeLogsDirectory {
    constructor() {
        
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    定义创建目录并加载配置的方法
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    static mkdir(app) {        
        let logConf = app.locals.confs.log ;
        let appName = app.locals.confs.log.appLogDirName ;        
        let appenders = logConf.appenders ;
        if(appenders === undefined) return ;

        let baseDir = path.join(__dirname, "..", "..", "..", "..", "..", "logs") ;
        if ( ! fs.existsSync(baseDir)) fs.mkdirSync(baseDir) ;
        let logDir = path.join(__dirname, "..", "..", "..", "..", "..", "logs", appName) ;
        if ( ! fs.existsSync(logDir)) fs.mkdirSync(logDir) ;

        for (let a of appenders) {
            if (a.type && a.type == "dateFile") {
                let dir = path.join(__dirname, "..", "..", "..", "..", a.filename) ;
                if (!fs.existsSync(dir)) fs.mkdirSync(dir) ;
            }
        }        
    }
   
}

export default MakeLogsDirectory ;