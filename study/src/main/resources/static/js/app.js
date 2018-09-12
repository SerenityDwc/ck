/**
 * app应用全局变量定义
 * @type {{host: string, port: string, path: string}}
 * @Author LancCJ
 */
var pro2 = {
    host : "10.35.243.192",
    port : "28080",
    path : "qwgl",
    name : "苏州勤务管理",
    version : "版本号:1.0",
    copyRight : "苏州广立信息科技有限公司",
    map:{
        shuzi: {
            netState:'pro',
            white: "http://50.73.66.8/PGIS_S_TileMapServer/Maps/default",
            blue: "http://50.73.66.8:7003/PGIS_S_TileMapServer_WYL/Maps/default",
            baseCss:"http://50.73.66.24/libs/gm/gl/gl.css",
            baseJs:"http://50.73.66.24/libs/gm/gl/gl.min.js",
            clusterCss:"http://50.73.66.24/libs/gm/cluster/cluster.css",
            clusterJs:"http://50.73.66.24/libs/gm/cluster/cluster.js",
            pluginCss:"http://50.73.66.24/libs/gm/plugin/plugin.css",
            pluginJs:"http://50.73.66.24/libs/gm/plugin/plugin.min.js"
        }
    }
};


var pro = {
    host : "10.35.243.192",
    port : "80",
    path : "qwgl",
    name : "苏州勤务管理",
    version : "版本号:1.0",
    copyRight : "苏州广立信息科技有限公司",
    map:{
        shuzi: {
            netState:'pro',
            white: "http://50.73.66.8/PGIS_S_TileMapServer/Maps/default",
            blue: "http://50.73.66.8:7003/PGIS_S_TileMapServer_WYL/Maps/default",
            baseCss:"http://50.73.66.24/libs/gm/gl/gl.css",
            baseJs:"http://50.73.66.24/libs/gm/gl/gl.min.js",
            clusterCss:"http://50.73.66.24/libs/gm/cluster/cluster.css",
            clusterJs:"http://50.73.66.24/libs/gm/cluster/cluster.js",
            pluginCss:"http://50.73.66.24/libs/gm/plugin/plugin.css",
            pluginJs:"http://50.73.66.24/libs/gm/plugin/plugin.min.js"
        }
    }
};

var zd = {
    host : "10.35.166.182",
    port : "18088",
    path : "qwgl",
    name : "苏州勤务管理",
    version : "版本号:1.0",
    copyRight : "苏州广立信息科技有限公司",
    map:{
        shuzi: {
            netState:'zd',
            white: "http://50.73.66.8/PGIS_S_TileMapServer/Maps/default",
            blue:  "http://50.73.66.8:7003/PGIS_S_TileMapServer_WYL/Maps/default",
            baseCss:"http://50.73.66.24/libs/gm/gl/gl.css",
            baseJs:"http://50.73.66.24/libs/gm/gl/gl.min.js",
            clusterCss:"http://50.73.66.24/libs/gm/cluster/cluster.css",
            clusterJs:"http://50.73.66.24/libs/gm/cluster/cluster.js",
            pluginCss:"http://50.73.66.24/libs/gm/plugin/plugin.css",
            pluginJs:"http://50.73.66.24/libs/gm/plugin/plugin.min.js"
        }
    }
};

var dev = {
    host : "localhost",
    port : "8088",
    path : "study",
    name : "苏州勤务管理",
    version : "版本号:开发版",
    copyRight : "苏州广立信息科技有限公司",
    map:{
        shuzi: {
            netState:'dev',
            white: "http://58.210.98.62:7080/Layers_20170323_WYL/Layers/_alllayers/",
            blue: "http://58.210.98.62:7080/Layers_20170323_WYL/Layers/_alllayers/",
            baseCss:"http://product.sz-map.com/gmap/v1/libs/gm/gl/gl.css",
            baseJs:"http://product.sz-map.com/gmap/v1/libs/gm/gl/gl.min.js",
            clusterCss:"http://product.sz-map.com/gmap/v1/libs/gm/cluster/cluster.css",
            clusterJs:"http://product.sz-map.com/gmap/v1/libs/gm/cluster/cluster.js",
            pluginCss:"http://product.sz-map.com/gmap/v1/libs/gm/plugin/plugin.css",
            pluginJs:"http://product.sz-map.com/gmap/v1/libs/gm/plugin/plugin.min.js"
        }
    }
};

var app = dev;

/**
 * 项目请求路径
 * @type {string}
 * @Author LancCJ
 */
var contextPath = 'http://'+app.host+':'+app.port+'/'+app.path+'/';
var contextHost = 'http://'+app.host+':'+app.port+'/'