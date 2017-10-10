/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：ares
2. 文件名：src -> system -> core -> bootstrap -> loadMappers.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统启动项 -> 将所有的mapper遍历后保存在app.locals.mappers下，mappers这个目录下不能有子目录
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import loader from "../../libraries/loader" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
模块输出为一个方法，在app.js中执行，把以express创建的应用app当做参数
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default function(app){
    app.locals.mappers = {} ; 
    let mappers = loader.load("application/mappers") ; 
    for(let n in mappers) {
        app.locals.mappers[n] = mappers[n]["default"] ;
    }
} ;