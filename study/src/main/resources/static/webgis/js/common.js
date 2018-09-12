var _MapApp=null;

var vectorLayer_MJ_ZX=null;
var vectorLayer_MJ_DB=null;
var vectorLayer_MJ_YJ=null;
var vectorLayer_MJ_XX=null;

var vectorLayer_FJ_ZX=null;
var vectorLayer_FJ_DB=null;
var vectorLayer_FJ_YJ=null;
var vectorLayer_FJ_XX=null;
var vectorLayer_wgys=null;

var vectorLayer_wgys_pcszy=null;
var vectorLayer_wgys_zdsfld=null;
var vectorLayer_wgys_wmzyz=null;
var vectorLayer_wgys_gfzddw=null;
var vectorLayer_wgys_zdsflk=null;
var vectorLayer_wgys_zdytqy=null;

var vectorLayer_ZRQ=null;

var vectorLayer_WGYS_SHAPE=null;


var vectorLayer_trace=null;

var showmj = true;
var showfj = true;
var showzx = true;
var showdb = true;
var showyj = true;

var showWmzyz = true;
var showGfzddw = true;
var showZdsflk = true;
var showZdytqy = true;
var showPcszy = true;
var showZdsfld = true;

var showHj = true; //汇聚判断

var snapshotAreaStr='';

function clearOverlAY(){
    //关闭
    if(movingMarker !=null){
//inactivate
        GL.enable('playback',false,'map');
        _MapApp.clear();
    }

    vectorLayer_MJ_ZX.clear();
    vectorLayer_MJ_DB.clear();
    vectorLayer_MJ_YJ.clear();
    vectorLayer_MJ_XX.clear();

    vectorLayer_FJ_ZX.clear();
    vectorLayer_FJ_DB.clear();
    vectorLayer_FJ_YJ.clear();
    vectorLayer_FJ_XX.clear();


}


function clearWgys(){


    vectorLayer_wgys.clear();
    vectorLayer_wgys_pcszy.clear();
    vectorLayer_wgys_zdsfld.clear();
    vectorLayer_wgys_wmzyz.clear();
    vectorLayer_wgys_gfzddw.clear();
    vectorLayer_wgys_zdsflk.clear();
    vectorLayer_wgys_zdytqy.clear();

    vectorLayer_WGYS_SHAPE.clear();
}



var highChartsBackgroundColor = $("#highChartsBackgroundColor").val();
var ztreeFontColor = $("#ztreeFontColor").val();
var isonlinestatus = true;
var ismjstatus = true;
var isfjstatus = true;
var isoverlinestatus = true;
var isondutystatus = true;


var mapScale = 4000 ;

// 初始化地图
function initMap() {
    _MapApp = new GL.Map('map',{
        center:[120.60888,31.45458984375],
        zoom:1,
        zoomControl:false,
        scaleControl:true
    });

    var url = app.map.shuzi.white;
    if(mapType == 'blue'){
        url = app.map.shuzi.blue;
    }

    if(app.map.shuzi.netState == 'dev'){
        var orginal4="119.75,32.25";
        var resolutions4 = [9.765664903423653E-4, 4.882832451711827E-4,  2.4414162258559134E-4, 1.2207081129279567E-4, 6.103540564766688E-5,
            3.0517702822564394E-5, 1.5258851412551242E-5, 7.629425705006574E-6,3.814712853772333E-6,1.90735154359766E-6];
        var maxBounds4 = "119.89,30.75;121.406,32.08" ;
        var crs={
            origin:orginal4,
            resolutions:resolutions4,
            code: "4326"
        }

        var baseLayer =  GL.LayerLookup.createGaeaTiledLayer(url, {
            maxBounds: maxBounds4,
            format:'png'
        },crs);

        _MapApp.addBaseLayer(baseLayer)

    }else{
        var opts = {zoomOffset:11};
        var crs = {origin: "0,90",
            resolutions: [
                0.0009765625,
                0.00048828125,
                0.000244140625,
                0.0001220703125,
                0.00006103515625,
                0.000030517578125,
                0.0000152587890625,
                0.00000762939453125,
                0.000003814697265625,
                0.0000019073486328125
            ]};
        var baseLayer = GL.LayerLookup.createPgisTiledLayer(url, opts, crs);
        _MapApp.addBaseLayer(baseLayer);
    }


    vectorLayer_MJ_ZX = new GL.VectorLayer();
    vectorLayer_MJ_DB = new GL.VectorLayer();
    vectorLayer_MJ_YJ = new GL.VectorLayer();
    vectorLayer_MJ_XX = new GL.VectorLayer();


    vectorLayer_FJ_ZX = new GL.VectorLayer();
    vectorLayer_FJ_DB = new GL.VectorLayer();
    vectorLayer_FJ_YJ = new GL.VectorLayer();
    vectorLayer_FJ_XX = new GL.VectorLayer();
    vectorLayer_wgys = new GL.VectorLayer();


    vectorLayer_wgys_pcszy = new GL.VectorLayer();
    vectorLayer_wgys_zdsfld = new GL.VectorLayer();
    vectorLayer_wgys_wmzyz = new GL.VectorLayer();
    vectorLayer_wgys_gfzddw = new GL.VectorLayer();
    vectorLayer_wgys_zdsflk = new GL.VectorLayer();
    vectorLayer_wgys_zdytqy = new GL.VectorLayer();

    vectorLayer_ZRQ = new GL.VectorLayer();
    vectorLayer_WGYS_SHAPE = new GL.VectorLayer();

    _MapApp.addLayer(vectorLayer_MJ_ZX);
    _MapApp.addLayer(vectorLayer_MJ_DB);
    _MapApp.addLayer(vectorLayer_MJ_YJ);
    _MapApp.addLayer(vectorLayer_MJ_XX);

    _MapApp.addLayer(vectorLayer_FJ_ZX);
    _MapApp.addLayer(vectorLayer_FJ_DB);
    _MapApp.addLayer(vectorLayer_FJ_YJ);
    _MapApp.addLayer(vectorLayer_FJ_XX);
    _MapApp.addLayer(vectorLayer_wgys);

    _MapApp.addLayer(vectorLayer_wgys_pcszy);
    _MapApp.addLayer(vectorLayer_wgys_zdsfld);
    _MapApp.addLayer(vectorLayer_wgys_wmzyz);
    _MapApp.addLayer(vectorLayer_wgys_gfzddw);
    _MapApp.addLayer(vectorLayer_wgys_zdsflk);
    _MapApp.addLayer(vectorLayer_wgys_zdytqy);


    _MapApp.addLayer(vectorLayer_ZRQ);
    _MapApp.addLayer(vectorLayer_WGYS_SHAPE);

    vectorLayer_trace = new GL.VectorLayer();
    _MapApp.addLayer(vectorLayer_trace);
    //
    // draw('Polygon');

    //setTimeout("gpsShowInit(departId)",3000);
    //gpsShowInit(departId);

    var a=0;

    if(a==0){
        a++;
        //只有第一次需要加
        if(zrqLevel !='中队'){  //支队   大队  级别   1级二级树
            initDeptArea(departId);
        }else if(jgbm.length==12){
            //应该加载 中队下的民警网格
            initWorkArea(departId,'');
        }else{
            //TODO
            console.log('加载具体的网格数据');
        }
    }


    enabledHj(showHj);
}


function enabledHj(hj){
    if(hj){


        //console.log('监听');
        //缩放监听
        _MapApp.on('zoomend', function (e) {
            //查询比例尺
            //console.log('比例尺:'+_MapApp.getScale());

            if(_MapApp.getScale()>mapScale){//显示民警
                //console.log('显示民警');
                showHj = false;

            }else{//显示汇聚
                showHj = true;
                //console.log('显示汇聚');

            }

            gpsShowInit(departId);

        });

    }else{

        //console.log('不监听');

        _MapApp.on('zoomend', function (e) {showHj = false;});

        gpsShowInit(departId);
    }
}

var area_str;

function draw(type) {
    GL.DrawTool.activate(_MapApp, type, function(e) {
        if (e.status === 'created') {
            vectorLayer_trace.addOverlay(e.feature);

            // console.log(e.feature._latlngs[0]);

            var ary = e.feature._latlngs[0];

            for(var index in ary ){
                if(index!=0)area_str+=';'
                //console.log(ary[index]);
                var pot = ary[index];

                //console.log(pot.lng+','+pot.lat);

                area_str+=pot.lng+','+pot.lat

            }

            snapshotAreaStr =area_str;

            //area_str
            //console.log(area_str);

        }
    }, this);
}


/**
 * 添加民警点集合
 * @param arry
 */
function initAddPolicemn(polices){

    var vectorLayer_MJ_ZX_points =[];
    var vectorLayer_MJ_DB_points =[];
    var vectorLayer_MJ_YJ_points =[];
    var vectorLayer_MJ_XX_points =[];


    var vectorLayer_FJ_ZX_points =[];
    var vectorLayer_FJ_DB_points =[];
    var vectorLayer_FJ_YJ_points =[];
    var vectorLayer_FJ_XX_points =[];


    //区分人员的类型
    //console.log(polices);

    polices.forEach(function (police,index,array) {
        //判断民警辅警
        if(police.userType =='1'){//民警
            if(police.overline == 1){//越界
                vectorLayer_MJ_YJ_points.push(police);
            }else if(police.onduty == 1){//当班
                vectorLayer_MJ_DB_points.push(police);
            }else if(police.timeout == 1){//下线
                vectorLayer_MJ_XX_points.push(police);
            }else{//在线
                vectorLayer_MJ_ZX_points.push(police);
            }
        }else if(police.userType =='3'){//辅警
            if(police.overline == 1){//越界
                vectorLayer_FJ_YJ_points.push(police);
            }else if(police.onduty == 1){//当班
                vectorLayer_FJ_DB_points.push(police);
            }else if(police.timeout == 1){//下线
                vectorLayer_FJ_XX_points.push(police);
            }else{//在线
                vectorLayer_FJ_ZX_points.push(police);
            }
        }
    });

    var imgExt = '.gif';// gif  老图标   png 新图标

    if(showmj && !showHj){
        if(showyj){
            drawUserPoints(vectorLayer_MJ_YJ_points,'j-yj'+imgExt,vectorLayer_MJ_YJ);
        }
        if(showdb) {
            drawUserPoints(vectorLayer_MJ_DB_points, 'j-db'+imgExt, vectorLayer_MJ_DB);
        }
        drawUserPoints(vectorLayer_MJ_XX_points,'j-xx'+imgExt,vectorLayer_MJ_XX);
        if(showzx) {
            drawUserPoints(vectorLayer_MJ_ZX_points, 'j-zx'+imgExt, vectorLayer_MJ_ZX);
        }
    }

    if(showfj && !showHj){
        if(showyj){
        drawUserPoints(vectorLayer_FJ_YJ_points,'f-yj'+imgExt,vectorLayer_FJ_YJ);
        }
        if(showdb) {
        drawUserPoints(vectorLayer_FJ_DB_points,'f-db'+imgExt,vectorLayer_FJ_DB);
        }
        drawUserPoints(vectorLayer_FJ_XX_points,'f-xx'+imgExt,vectorLayer_FJ_XX);
            if(showzx) {
        drawUserPoints(vectorLayer_FJ_ZX_points,'f-zx'+imgExt,vectorLayer_FJ_ZX);
            }
    }

}

function initAddPolicemnJh(polices){

    var vectorLayer_MJ_ZX_points =[];
    var vectorLayer_MJ_DB_points =[];
    var vectorLayer_MJ_YJ_points =[];
    var vectorLayer_MJ_XX_points =[];


    var vectorLayer_FJ_ZX_points =[];
    var vectorLayer_FJ_DB_points =[];
    var vectorLayer_FJ_YJ_points =[];
    var vectorLayer_FJ_XX_points =[];


    //区分人员的类型
    //console.log(polices);

    polices.forEach(function (police,index,array) {
        //判断民警辅警
        if(police.userType =='1'){//民警
            if(police.overline == 1){//越界
                vectorLayer_MJ_YJ_points.push(police);
            }else if(police.onduty == 1){//当班
                vectorLayer_MJ_DB_points.push(police);
            }else if(police.timeout == 1){//下线
                vectorLayer_MJ_XX_points.push(police);
            }else{//在线
                vectorLayer_MJ_ZX_points.push(police);
            }
        }else if(police.userType =='3'){//辅警
            if(police.overline == 1){//越界
                vectorLayer_FJ_YJ_points.push(police);
            }else if(police.onduty == 1){//当班
                vectorLayer_FJ_DB_points.push(police);
            }else if(police.timeout == 1){//下线
                vectorLayer_FJ_XX_points.push(police);
            }else{//在线
                vectorLayer_FJ_ZX_points.push(police);
            }
        }
    });

    var imgExt = '.gif';// gif  老图标   png 新图标

    if(showmj && !showHj){
        if(showyj){
            drawUserPoints(vectorLayer_MJ_YJ_points,'j-yj'+imgExt,vectorLayer_MJ_YJ);
        }
        if(showdb) {
            drawUserPoints(vectorLayer_MJ_DB_points, 'j-db'+imgExt, vectorLayer_MJ_DB);
        }
        drawUserPoints(vectorLayer_MJ_XX_points,'j-xx'+imgExt,vectorLayer_MJ_XX);
        if(showzx) {
            drawUserPoints(vectorLayer_MJ_ZX_points, 'j-zx'+imgExt, vectorLayer_MJ_ZX);
        }
    }

    if(showfj && !showHj){
        if(showyj){
            drawUserPoints(vectorLayer_FJ_YJ_points,'f-yj'+imgExt,vectorLayer_FJ_YJ);
        }
        if(showdb) {
            drawUserPoints(vectorLayer_FJ_DB_points,'f-db'+imgExt,vectorLayer_FJ_DB);
        }
        drawUserPoints(vectorLayer_FJ_XX_points,'f-xx'+imgExt,vectorLayer_FJ_XX);
        if(showzx) {
            drawUserPoints(vectorLayer_FJ_ZX_points,'f-zx'+imgExt,vectorLayer_FJ_ZX);
        }
    }

}

function drawUserPoints(polices,img,overLayer){

    var  a= -1;
    var points = generate(polices).map(function(lnglat) {

        a++;
        var imageUrl = contextPath+'webgis/image/icon/'+img;

        if(mapType == 'white'){
            return new GL.Point(lnglat,new GL.Icon.Div('<div style="width:50px;height:50px;color:black;text-align: center;"><p style="widht:100%;color:black;">'+polices[a].mjxm+'</p><img style="width:24px;height:30px;"  src='+imageUrl+'/></div>','customerIcon',50));

        }else{
            return new GL.Point(lnglat,new GL.Icon.Div('<div style="width:50px;height:50px;color:white;text-align: center;"><p style="widht:100%;color:white;">'+polices[a].mjxm+'</p><img style="width:24px;height:30px;"  src='+imageUrl+'/></div>','customerIcon',50));

        }

    });

    overLayer.addOverlays(points);

    //给点位信息添加点击事件
    //console.log(points);
    points.map(function (point,index) {
        var _point = point;

        var police = polices[index];
        var policeman = new Policeman(police.mjjh,police.mjxm,police.lon,police.lat,0,police.jgmc,police.gpstime,police.zdlx,police.onduty,police.overline,police.timeout,police.sjhm,police.imei,police.userType,1);
        _point.bindPopup(policeman.getPoliceInfo());

        point.on('click',function(e){

            //_point.openPopup();

            // var lngLat = new GL.LngLat([police.lon,police.lat]);
            //
            // _MapApp.setCenter(lngLat);//设置为中心
            //
            var timeBegin = moment().format('YYYY-MM-DD 00:00:00');
            var timeEnd = moment().format('YYYY-MM-DD 23:59:59');

            // 显示当前民警的工作情况  处罚   强制   勤务  事故  接处警
            initPoliceWork(police.mjjh,police.mjxm,timeBegin,timeEnd);
            // 显示当前民警的责任区
            initPoliceWorkArea(police.mjjh);
        })

        if(img=='f-yj.gif' || img=='j-yj.gif'){
            _point.highlight('#DE334B');

        }
    });

}


function initPoliceWorkArea(mjjh){
    httpUtil.getData(
        contextPath+'workplan/zrq/work/user/'+mjjh,
        null,
        null,
        null,
        function(result){
            if(result.code == 200){
                //vectorLayer_ZRQ.clear();
                if(result.data.list.length>0){

                    vectorLayer_ZRQ.clear();

                    //循环画画出区域
                    var areas = result.data.list;
                    areas.forEach(function (area,index,arry) {
                        var areaStr = area.areaStr;

                        if(areaStr!=null && areaStr.length!=0){
                            //console.log(areaStr);
                            //判断是否是正确的坐标
                            //偶数个坐标
                            //是否使用;分开
                            var finalLngLat = webgis.convertLngLat(areaStr);

                            if(finalLngLat.length>0){
                                //画区域
                                //console.log(finalLngLat);


                                drawPolygon(finalLngLat,'',colors[index],mjjh,'user','');

                            }else{
                                showTopRightMesg("该民警网格数据("+areaStr+")不正确,请正确配置!");
                            }
                        }


                    });

                }else{
                    showTopRightMesg("未找到该民警网格数据!");
                }
            }else{
                showTopRightMesg("未找到该民警网格数据!");
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            showTopRightMesg("未找到该民警网格数据!");
        }
    );
}




function generate(polices) {
    var list = [];
    for (var i = 0; i < polices.length; i++) {
       var  lng= polices[i].lon;
       var  lat= polices[i].lat;
       list.push([lng, lat]);
    }
    return list;
}

/**
 * 添加警员
 * @param {Object} police
 * 		警员 GPS 数据
 */
function initAddPoliceman(police,isVisible){
    //debugger;
    var policeman = new Policeman(police.mjjh,police.mjxm,police.lon,police.lat,0,police.jgmc,police.gpstime,police.zdlx,police.onduty,police.overline,police.timeout,police.sjhm,police.imei,police.userType,1);
    if(_MapApp==null){
        return;
    }

    var man = new GL.Point([police.lon,police.lat], new GL.Icon.Smart('image/policeman/policeman.gif',[40,40]));
    vectorLayer_MJ.addOverlay(man);

    vectorLayer_MJ.cluster();

    man.on('click',function(e){
            policeman.openInfoWindowHtml();
            //var point = new Point(police.lon,police.lat);
            //_MapApp.centerAtLatLng(point);
    });



    //
    // policeman.addListener("click",function(){
    //     policeman.openInfoWindowHtml();
    //     //var point = new Point(police.lon,police.lat);
    //     //_MapApp.centerAtLatLng(point);
    // });
    // if(isVisible==false){
    //
    //     policeman.bIsDisplay = false;
    //     policeman.bIsVisable();
    //     policeman.hideTitle();
    // }
}
/**
 * 删除多边形
 * @param {Object} mbr
 */
function clearPolygon(){
    var some = _MapApp.getOverlays();
    for(var i=0; i<some.length; i++){
        try {
            if(some[i].getGeometryType() == "polygon" && some[i].getFillColor()=="blue"){
                _MapApp.removeOverlay(some[i]);
                break;
            }}catch(e){ continue;}
    }
}

/**
 * 构造多边型
 */
function reshow(area, reflag, lon, lat){
    var strPoints=area;
    var pPolygon=new Polygon(strPoints,"#ff00FF", 3,0.5,"blue");
    var mbr = pPolygon.getMBR();
    if(lon && lat) {
        mbr = MBR.union(mbr, new MBR(lon, lat, lon, lat));
    }
    centerarea(mbr);
    _MapApp.addOverlay(pPolygon);
    pPolygon.flash();
    /*var tesret1 = "120.60205,31.31857,120.6098";
    var uLine = new Polyline(tesret1,"#ff0000", 3,1);// 构造一个多义线对象
    _MapApp.addListener("click",function(){uLine.openInfoWindowHtml("一个Polyline");});// 添加点击事件的响应
    _MapApp.addOverlay(uLine);
    _MapApp.centerAtLatLng(uLine.getPoints()[0]);*/

   /* var testPoint = "120.60205,31.31857,120.6098,31.29806,120.57104,31.29312,120.54608,31.33529,120.60205,31.31857,120.60205,31.31857";
    var uPoly = new Polygon(testPoint,"ff00FF", 3,0.5,"green");// 构造一个多边形对象
    uPoly.addListener("click",function(){uPoly.openInfoWindowHtml("一个Polygon");});// 添加点击事件的响应
    _MapApp.addOverlay(uPoly);
    _MapApp.centerAtLatLng(uPoly.getPoints()[0]);*/
}

/**
 * 构造多边形，按照不同的颜色
 * @param {Object} areaid
 * @param {Object} area
 * @param {Object} sc
 * @param {Object} reflag
 */
function reallshow(areajgbm,areaStr,sc,reflag,label){

    var finalLngLat = webgis.convertLngLat(areaStr);

    //console.log(finalLngLat);

    if(finalLngLat.length>0){
        //画区域
        //console.log(finalLngLat);
        drawPolygon(finalLngLat,label,sc,areajgbm,reflag);
    }else{
        showTopRightMesg("该机构网格数据("+areaStr+")不正确,请正确配置!");
    }

}



function reallshowShape(areajgbm,areaStr,sc,reflag,label){

    var finalLngLat = webgis.convertLngLat(areaStr);

    //console.log(finalLngLat);

    if(finalLngLat.length>0){
        //画区域
        //console.log(finalLngLat);
        drawline(finalLngLat,label,sc,areajgbm,reflag);
    }else{
        showTopRightMesg("该机构网格数据("+areaStr+")不正确,请正确配置!");
    }

}


function reallshowShape2(areajgbm,areaStr,sc,reflag,label){

    var finalLngLat = webgis.convertLngLat(areaStr);

    //console.log(finalLngLat);

    if(finalLngLat.length>0){
        //画区域
        //console.log(finalLngLat);
        drawline2(finalLngLat,label,sc,areajgbm,reflag);
    }else{
        showTopRightMesg("该机构网格数据("+areaStr+")不正确,请正确配置!");
    }

}

var selectJgbm='';
var selectAreaid='';

function drawline(points,label,color,areaid,type){
    // console.log(points.split(';')[0]);
    vectorLayer_WGYS_SHAPE.clear();

    var polyline = new GL.Polyline(points+';'+points.split(';')[0], new GL.Style({ color: '#D1A154',weight:'3',opacity:1 }, false));

    vectorLayer_WGYS_SHAPE.addOverlay(polyline);

}


function drawline2(points,label,color,areaid,type){
    // console.log(points.split(';')[0]);
    vectorLayer_WGYS_SHAPE.clear();

    var polyline = new GL.Polyline(points+';'+points.split(';')[0], new GL.Style({ color: '#6DE847',weight:'3',opacity:1 }, true));

    vectorLayer_WGYS_SHAPE.addOverlay(polyline);

}

function drawPolygon(points,label,color,areaid,type){

    var polygon = new GL.Polygon(points, new GL.Style.Fill({
        fillColor: color
    }, true));

    //console.log(polygon);
    if(label.length!=0){
        polygon.bindLabel(label,{
            'className':'mapLabel'
        });
    }

    vectorLayer_ZRQ.addOverlay(polygon);

    if(type == 'depart'){//只有机构才能下钻
        polygon.on('dblclick', function (e) {

            if(app.map.shuzi.netState != 'dev'){
                if(typeof parent.refreshData === "function"){
                    parent.refreshData(areaid,'');
                    parent.jgbmDs = areaid;
                    parent.wgid = '';
                }
            }

            var jgbm =areaid;

            selectJgbm =jgbm;
            departId =jgbm;

            if(jgbm.length==12){
                if(jgbm == '320500000000'){
                    zrqLevel = '支队';
                }else if((jgbm.substr(0,6)!='320500')  && (jgbm.substr(6)=='000000') ){
                    //大队
                    zrqLevel = '大队';
                }else{
                    //中队
                    zrqLevel = '中队';
                }
            }else{
                zrqLevel = '网格';
            }


            if(zrqLevel!='中队'){
                initDeptArea(areaid);
                gpsShowInit(areaid);
            }else if(zrqLevel=='中队'){
                initWorkArea(areaid,'');
                gpsShowInit(areaid);

                wg_parent_jgbm = areaid;

                console.log('勾选的中队'+wg_parent_jgbm);

            }else{
                vectorLayer_ZRQ.clear();
                showTopRightMesg("没有网格数据加载!");
            }



            //同时选中相应的节点
            var zTree = $.fn.zTree.getZTreeObj("areaZtree");

            if(zTree!=null){
                var selectNode = zTree.getNodeByParam("id", selectJgbm);
                zTree.expandNode(selectNode, true, false);//指定选中ID节点展开
                var pNode = zTree.getNodeByParam("id", areaid);
                zTree.selectNode(pNode);
            }


            //_MapApp.setZoom(2);

            selectAreaid="";
        });
    }else{
        polygon.on('dblclick', function (e) {//双击某一个网格 画区域虚线

            initWorkArea(wg_parent_jgbm,areaid);
            gpsShowInit(wg_parent_jgbm);

            selectAreaid = areaid;

            initOneWorkArea(areaid);

            drawWgys(areaid);

            //_MapApp.setZoom(3);


            if(app.map.shuzi.netState != 'dev'){
                if(typeof parent.refreshData === "function"){
                    parent.refreshData(wg_parent_jgbm,areaid);
                    parent.jgbmDs = departId;
                    parent.wgid = areaid;
                }
            }


        });
    }

}

//画某一个民警网格里面的一种网格元素
function drawOneWgysByAreaId(areaid,wgType){
    //查询民警网格内所有网格元素

    vectorLayer_wgys.clear();
    vectorLayer_wgys_pcszy.clear();
    vectorLayer_wgys_zdsfld .clear();
    vectorLayer_wgys_wmzyz.clear();
    vectorLayer_wgys_gfzddw.clear();
    vectorLayer_wgys_zdsflk.clear();
    vectorLayer_wgys_zdytqy .clear();


    //查询网格元素 然后进行标注
    httpUtil.getData(
        contextPath+'workplan/wgys',
        {
            "areaId":areaid
        },
        null,
        null,
        function(result){
            if(result.code ==200 && result.data.length>0){
                for(var i in result.data){//画已经存在的网格元素

                    var wgys =result.data[i];


                    if(wgys.type == 1 ||  wgys.type == 5){
                        continue;
                    }

                    var point;
                    if(wgys.areaType == 'Point'){

                        if(wgys.areaStr.length==0){
                            continue;
                        }

                        if(wgys.type == 1){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img class="wgysIcon" style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;" data-id="'+wgys.ysId+'"  id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/wmzyz.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }


                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='志愿者姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysZqsj.length!=0){
                                str+='执勤时间:'+wgys.ysZqsj+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='负责人:'+wgys.ysFzr+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);

                            if(showZdsfld){
                                vectorLayer_wgys.addOverlay(polyline);

                                vectorLayer_wgys_zdsfld.addOverlay(point);

                            }





                            if(wgType== 1){
                                vectorLayer_wgys_wmzyz.addOverlay(point);

                            }


                        }else if(wgys.type == 2){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/gfzddw.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }
                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='单位名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='派出所民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系电话:'+wgys.ysLxfs+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);

                            if(wgType== 2){
                                vectorLayer_wgys_gfzddw.addOverlay(point);

                            }


                        }else if(wgys.type == 3){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  src="/'+app.path+'/img/workplan/wgys/active/zdsflk.png"  />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='路口名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='高峰警力数:'+wgys.ysGfjls+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);


                            // point.bindPopup(
                            //     '<div>' +
                            //     '路口名称:'+wgys.ysMc+'<br>' +
                            //     '责任民警:'+wgys.ysXm+'<br>' +
                            //     '高峰警力数:'+wgys.ysGfjls+'<br>' +
                            //     '</div>'
                            // );

                            if(wgType== 3){
                                vectorLayer_wgys_zdsflk.addOverlay(point);

                            }



                        }else if(wgys.type == 4){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdytqy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }
                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='企业名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='企业地址:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='企业负责人:'+wgys.ysFzr+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysSsxz.length!=0){
                                str+='所属性质:'+wgys.ysSsxz+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);

                            if(wgType== 4){
                                vectorLayer_wgys_zdytqy.addOverlay(point);

                            }



                        }else if(wgys.type == 5){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'"data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/pcszy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysZydw.length!=0){
                                str+='增援单位:'+wgys.ysZydw+'<br>';
                            }


                            str += '</div>';

                            point.bindPopup(str);


                            if(wgType== 5){
                                vectorLayer_wgys_pcszy.addOverlay(point);

                            }



                        }



                    }else if(wgys.areaType == 'Polyline'){

                        if(wgys.areaStr.length==0){
                            continue;
                        }

                        var polyline = new GL.Polyline(wgys.areaStr, new GL.Style({ color: '#ff0000' }, true));


                        if(wgys.type == 6){//路段的画 除了画线段  还要一个图标标注  点的话依据线段的第一个点

                            point = new GL.Point(wgys.areaStr.split(';')[0],new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdsfld.png"  />'));


                            if(point.getTooltip()==null){
                                if(wgys.ysLdfw.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysLdfw+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysLdfw.length!=0){
                                str+='路段范围:'+wgys.ysLdfw+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            console.log(wgys.ysXljls.length);
                            if(wgys.ysXljls.length!=0){
                                str+='巡逻警力数:'+wgys.ysXljls+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);


                            if(wgType== 6){
                                vectorLayer_wgys.addOverlay(polyline);

                                vectorLayer_wgys_zdsfld.addOverlay(point);

                            }
                        }

                    }
                }
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

}


//画某一个机构里面的一种网格元素
function drawOneWgysByDepartId(jgbm,wgType){


    //查询民警网格内所有网格元素

    vectorLayer_wgys.clear();
    vectorLayer_wgys_pcszy.clear();
    vectorLayer_wgys_zdsfld .clear();
    vectorLayer_wgys_wmzyz.clear();
    vectorLayer_wgys_gfzddw.clear();
    vectorLayer_wgys_zdsflk.clear();
    vectorLayer_wgys_zdytqy .clear();

    //查询网格元素 然后进行标注
    httpUtil.getData(
        contextPath+'workplan/wgys/depart',
        {
            "jgbm":jgbm
        },
        null,
        null,
        function(result){
            if(result.code ==200 && result.data.length>0){



                for(var i in result.data){//画已经存在的网格元素

                    var wgys =result.data[i];


                    console.log(wgys);
                    console.log(wgys.type);

                    if(wgys.type == 1 ||  wgys.type == 5){
                        continue;
                    }



                    var point;
                    if(wgys.areaType == 'Point'){



                        if(wgys.areaStr.length==0){
                            continue;
                        }


                        if(wgys.type == 1){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img class="wgysIcon" style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;" data-id="'+wgys.ysId+'"  id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/wmzyz.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='志愿者姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysZqsj.length!=0){
                                str+='执勤时间:'+wgys.ysZqsj+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='负责人:'+wgys.ysFzr+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);

                            if(wgType== 1){
                                vectorLayer_wgys_wmzyz.addOverlay(point);

                            }


                        }else if(wgys.type == 2){

                            console.log('hello');

                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/gfzddw.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='单位名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='派出所民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系电话:'+wgys.ysLxfs+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);


                            if(wgType== 2){
                                vectorLayer_wgys_gfzddw.addOverlay(point);

                            }


                        }else if(wgys.type == 3){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  src="/'+app.path+'/img/workplan/wgys/active/zdsflk.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='路口名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='高峰警力数:'+wgys.ysGfjls+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);
                            if(wgType== 3){
                                vectorLayer_wgys_zdsflk.addOverlay(point);

                            }

                        }else if(wgys.type == 4){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdytqy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='企业名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='企业地址:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='企业负责人:'+wgys.ysFzr+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysSsxz.length!=0){
                                str+='所属性质:'+wgys.ysSsxz+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);

                            if(wgType== 4){
                                vectorLayer_wgys_zdytqy.addOverlay(point);

                            }



                        }else if(wgys.type == 5){


                            console.log('55555');

                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'"data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/pcszy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysZydw.length!=0){
                                str+='增援单位:'+wgys.ysZydw+'<br>';
                            }


                            str += '</div>';

                            point.bindPopup(str);


                            if(wgType== 5){
                                vectorLayer_wgys_pcszy.addOverlay(point);

                            }



                        }



                    }else if(wgys.areaType == 'Polyline'){

                        if(wgys.areaStr.length==0){
                            continue;
                        }

                        var polyline = new GL.Polyline(wgys.areaStr, new GL.Style({ color: '#ff0000' }, true));


                        if(wgys.type == 6){//路段的画 除了画线段  还要一个图标标注  点的话依据线段的第一个点


                            console.log('66666');


                            point = new GL.Point(wgys.areaStr.split(';')[0],new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdsfld.png"  />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysLdfw.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysLdfw+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysLdfw.length!=0){
                                str+='路段范围:'+wgys.ysLdfw+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            //console.log(wgys.ysXljls.length);
                            if(wgys.ysXljls.length!=0){
                                str+='巡逻警力数:'+wgys.ysXljls+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);

                            if(wgType== 6){
                                vectorLayer_wgys.addOverlay(polyline);

                                vectorLayer_wgys_zdsfld.addOverlay(point);

                            }
                        }

                    }
                }
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

}



function drawWgys(areaid){
//alert('下钻网格属性,查询网格数据就行了'+areaid);
    vectorLayer_wgys.clear();


    vectorLayer_wgys_pcszy.clear();
    vectorLayer_wgys_zdsfld .clear();
    vectorLayer_wgys_wmzyz.clear();
    vectorLayer_wgys_gfzddw.clear();
    vectorLayer_wgys_zdsflk.clear();
    vectorLayer_wgys_zdytqy .clear();


    //查询网格元素 然后进行标注
    httpUtil.getData(
        contextPath+'workplan/wgys',
        {
            "areaId":areaid
        },
        null,
        null,
        function(result){
            if(result.code ==200 && result.data.length>0){
                for(var i in result.data){//画已经存在的网格元素

                    var wgys =result.data[i];


                    if(wgys.type == 1 ||  wgys.type == 5){
                        continue;
                    }



                    // console.log(wgys.areaStr);
                    // console.log(wgys.areaStr);
                    var point;
                    if(wgys.areaType == 'Point'){

                        if(wgys.areaStr.length==0){
                            continue;
                        }

                        if(wgys.type == 1){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img class="wgysIcon" style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;" data-id="'+wgys.ysId+'"  id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/wmzyz.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='志愿者姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysZqsj.length!=0){
                                str+='执勤时间:'+wgys.ysZqsj+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='负责人:'+wgys.ysFzr+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);


                            if(showWmzyz){
                                vectorLayer_wgys_wmzyz.addOverlay(point);

                            }


                        }else if(wgys.type == 2){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/gfzddw.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }


                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='单位名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='派出所民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系电话:'+wgys.ysLxfs+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);


                            // point.bindPopup(
                            //     '<div>' +
                            //     '单位名称:'+wgys.ysMc+'<br>' +
                            //     '派出所民警:'+wgys.ysXm+'<br>' +
                            //     '联系电话:'+wgys.ysLxfs+'<br>' +
                            //     '</div>'
                            // );

                            if(showGfzddw){
                                vectorLayer_wgys_gfzddw.addOverlay(point);

                            }


                        }else if(wgys.type == 3){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  src="/'+app.path+'/img/workplan/wgys/active/zdsflk.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='路口名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='高峰警力数:'+wgys.ysGfjls+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);

                            if(showZdsflk){
                                vectorLayer_wgys_zdsflk.addOverlay(point);

                            }



                        }else if(wgys.type == 4){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdytqy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysMc.length!=0){
                                str+='企业名称:'+wgys.ysMc+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='企业地址:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysFzr.length!=0){
                                str+='企业负责人:'+wgys.ysFzr+'<br>';
                            }
                            if(wgys.ysLxfs.length!=0){
                                str+='联系方式:'+wgys.ysLxfs+'<br>';
                            }
                            if(wgys.ysSsxz.length!=0){
                                str+='所属性质:'+wgys.ysSsxz+'<br>';
                            }

                            str += '</div>';

                            point.bindPopup(str);




                            if(showZdytqy){
                                vectorLayer_wgys_zdytqy.addOverlay(point);

                            }



                        }else if(wgys.type == 5){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'"data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/pcszy.png"  />'));
                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysXm.length!=0){
                                str+='姓名:'+wgys.ysXm+'<br>';
                            }
                            if(wgys.ysDd.length!=0){
                                str+='执勤地点:'+wgys.ysDd+'<br>';
                            }
                            if(wgys.ysZydw.length!=0){
                                str+='增援单位:'+wgys.ysZydw+'<br>';
                            }


                            str += '</div>';

                            point.bindPopup(str);

                            if(showPcszy){
                                vectorLayer_wgys_pcszy.addOverlay(point);

                            }



                        }



                    }else if(wgys.areaType == 'Polyline'){

                        if(wgys.areaStr.length==0){
                            continue;
                        }

                        var polyline = new GL.Polyline(wgys.areaStr, new GL.Style({ color: '#ff0000' }, true));


                        if(wgys.type == 6){//路段的画 除了画线段  还要一个图标标注  点的话依据线段的第一个点

                            point = new GL.Point(wgys.areaStr.split(';')[0],new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" src="/'+app.path+'/img/workplan/wgys/active/zdsfld.png"  />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysLdfw.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysLdfw+')');
                                }
                            }

                            var str = '<div>';
                            if(wgys.ysLdfw.length!=0){
                                str+='路段范围:'+wgys.ysLdfw+'<br>';
                            }
                            if(wgys.ysXm.length!=0){
                                str+='责任民警:'+wgys.ysXm+'<br>';
                            }
                            console.log(wgys.ysXljls.length);
                            if(wgys.ysXljls.length!=0){
                                str+='巡逻警力数:'+wgys.ysXljls+'<br>';
                            }
                            str += '</div>';

                            point.bindPopup(str);

                            if(showZdsfld){
                                vectorLayer_wgys.addOverlay(polyline);

                                vectorLayer_wgys_zdsfld.addOverlay(point);

                            }
                        }

                    }
                }
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}

/**
 * 居中
 * */
function centerarea(mbr){
    var pMbr = mbr;
    _MapApp.centerAtMBR(pMbr.minX, pMbr.minY, pMbr.maxX, pMbr.maxY);
    _MapApp.zoomOut() ;
}

var movingMarker;
var track;
function huifang(points){
    



    var lngLat = new GL.LngLat([points[0].lon,points[0].lat]);

    _MapApp.setCenter(lngLat);//设置为中心




    clearOverlAY();
    vectorLayer_ZRQ.clear();
    vectorLayer_trace.clear();

    this.playback2(points);

    GL.enable('playback', true, 'map');

     track = this.playback2.getTrack('track');
    movingMarker = track.getMarker();
    movingMarker.bindLabel($('#mjxm').val());

    //修改空间位置

    $('.leaflet-bottom').css('right','320px');

}

function generate2(num) {
    var list = [];
    for (var i = 0; i < num; i++) {
        var lng = 120.58105869 + Math.random() * 0.5;
        var lat = 31.30115627 + Math.random() * 0.5;
        list.push([lng, lat]);
    }
    return list;
}

function playback2(points) {

    var nTracks = [];
    var nTrack = new GL.Polyline(generate(points)).getLngLats();

    nTrack = {
        lngLats: nTrack,
        id: 'track' ,
        marker: new GL.Proxy.getIcon()
    };

    nTracks.push(nTrack);

    this.playback2= new GL.Playback(_MapApp, nTracks, function (cursor,tracks) {
        // console.log(cursor);
        // console.log(tracks);
    });

}












function playback(points) {
    var nTracks = [];
    var nTrack = new GL.Polyline(generate(points)).getLngLats();

    nTrack = {
        lngLats: nTrack,
        id: 'track-mj' ,
        marker: new GL.Proxy.getIcon()
    };


    nTracks.push(nTrack);



      this.playback= new GL.Playback(_MapApp, nTracks, function (cursor,tracks) {
        // console.log(cursor);
        // console.log(tracks);
    });


}



function generate(points) {
    var list = [];

    points.forEach(function (value,index,array) {
        var lng = value.lon;
        var lat =value.lat;
        list.push([lng, lat]);

    });

    return list;
}






/**
 * 民警轨迹回放
 * */
function huifang2(points){
    // TODO
    //清空地图
    //clearAllRedLine();
    clearOverlAY();
    vectorLayer_trace.clear();
    vectorLayer_ZRQ.clear();


    this.playback(points);

    GL.enable('playback', true, 'map');

    var track = this.playback.getTrack('track-1');
    var movingMarker = track.getMarker();
    movingMarker.bindLabel(new Date().toString());

//console.log(message);
    //循环数据

   // var pointStr = '';
   //  points.forEach(function (value,index,array) {
   //      //console.log(value);
   //      if(index!=0)pointStr += ';';
   //      pointStr += value.lon+','+value.lat;
   //  });

    //先画一条线吧
    //var polyline = new GL.Polyline(pointStr, new GL.Style({color: '#ff0000'}, true))
    //
    // var vectorLayer=new GL.VectorLayer();
    //
    // _MapApp.addLayer(vectorLayer);
    // vectorLayer.addOverlay(polyline);

    //console.log(pointStr);

    // this.playback(points);
    //
    // GL.enable('playback', true, 'map');
    //
    // var track =playback.getTrack('track-mj');
    // var movingMarker = track.getMarker();
    // movingMarker.bindLabel(new Date().toString());

    // var strPoint="";
    // var flon, flat;
    // var pointState  = 0;
    // for(var j=0;j<message.length;j++){
    //     flon = message[j].lon;
    //     flat = message[j].lat;
    //     strPoint = strPoint+ flon+","+flat+",";
    //     if(j==0){
    //         pointState=1;
    //     }else if(j>0 && j<message.length-1){
    //         pointState=2;
    //     }else{
    //         pointState=3;
    //     }
    //     drawpoint(message[j].mjjh,flon,flat, message[j].gpstime,pointState);
    // }
    // strPoint=strPoint.substring(0,strPoint.length-1);
    // var pLine=new Polyline(strPoint,'red', 2,1,1);
    // pLine.setColor("blue");
    // pLine.setLineStyle('none');
    // pLine.setZIndex(122);
    //
    // //自适应轨迹线条的大小
    // var mbr = pLine.getMBR();
    // centerarea(mbr);
    //
    // _MapApp.addOverlay(pLine);
    //
    // //当超过一个的时候，需要描述民警轨迹的走向
    // if(message.length > 1){
    //     amckshow(message);
    // }
}

/**
 * 清除所有红色的线条
 */
function clearAllRedLine(){
    var some = _MapApp.getOverlays();
    for(var i=0; i<some.length; i++){
        try {
            if(some[i].getGeometryType() == "polyline" && some[i].getColor()=='red'){
                _MapApp.removeOverlay(some[i]);
            }
        } catch(e) {
            continue;
        }
    }
    some = null;
}

/**
 * 画点
 */
function drawpoint(uid,lon, lat, time,pointState){
    var pp = new Point(parseFloat(lon),parseFloat(lat));
    var pIcon=new Icon();
    var minfo = "<br>"+"\n"+"警员警号："+uid+"<br>"+"\n"+"所处时间："+time;
    if(pointState==1){
        pIcon.image="image/policeman/gj_start_end.gif";
    }else if(pointState==2){
        pIcon.image="image/policeman/gj.gif";
    }else{
        pIcon.image="image/policeman/gj_start_end.gif";
    }
    pIcon.height=15;
    pIcon.width=15;
    pIcon.topOffset=0;
    pIcon.leftOffset=0;
    var marker = new Marker(pp,pIcon,new Title(" ",12,pp,"宋体",null,null,"blue","0"));
    marker.name='ptr'+uid;
    marker.addListener("click",function(){
        marker.openInfoWindowHtml(minfo);
    });
    marker.setZIndex(122);
    _MapApp.addOverlay(marker);
}
var px;
var py;
var kp;
var ls;
var psd;
/**
 * 用红线描述轨迹
 *
 * @param {Object} points
 */
function amckshow(points){
    px = new Array();
    py = new Array();
    kp = new Array();
    ls = 0;
    psd = 200;

    for(var i=0; i<points.length-1; i++){
        var x1 = parseFloat(points[i].lon);
        var x2 = parseFloat(points[i+1].lon);
        var y1 = parseFloat(points[i].lat);
        var y2 = parseFloat(points[i+1].lat);
        if(x2*1000-x1*1000 == 0){
            a=0;
        }else{
            a = (y2*1000 - y1*1000)/(x2*1000 - x1*1000);
        }
        var b = y1 -x1 * a;
        getPs(a, b, x1, x2, y1, y2);
        px[ls] = 0;
        py[ls] = 0;
        ls++;
    }

    kp[kp.length]=ls-1;
    ls = 1;
}
/**
 * 计算获取点
 *
 * @param {Object} a
 * @param {Object} b
 * @param {Object} x1
 * @param {Object} x2
 * @param {Object} y1
 * @param {Object} y2
 */
function getPs(a, b, x1, x2, y1, y2){
    var x, y;  var htm;  var kpi=kp.length;
    var inter=1;
    var strPoint=x1+","+y1+","+x2+","+y2;
    var kLine=new Polyline(strPoint,"#ff0000", 2,1,1);
    var len = kLine.getLength();
    if(len<=100){ inter=1;}
    else{inter = Math.floor(len /100) +1;}
    px[ls] = x1;
    py[ls] = y1;
    kp[kpi] = ls;
    ls++;
    for(var i=1; i<inter+1; i++){
        x = (Math.abs(x2*1000-x1*1000)/inter) * i;
        if(x2>x1){ x=x1+x/1000; }
        else{ x = x1-x/1000; }
        if( a==0 && b==0){
            y=(Math.abs(y2*1000-y1*1000)/inter) * i;
            if(y2>y1){ y=y1+y/1000; }
            else{ y = y1-y/1000; }
        }else{
            y = a*x+b;
        }
        x = x.toFixed(6);
        y = y.toFixed(6);
        px[ls] = x;
        py[ls] = y;
        ls++;
    }
}

/**
 *
 * 快照区域选择
 * */
function drawSnapshotArea(){

    draw('Polygon');

    //_MapApp.changeDragMode('drawPolygon',qaInputx,qaInputy,selsarea);
    //_MapApp.changeDragMode('drawPolygon');
}
function selsarea(str){
    _MapApp.changeDragMode('pan',qaInputx,qaInputy,selsarea);
    $("#areaSnapshotValue").val(str);
    /*$("#map").style.cursor = "default";*/
}
/**
 * 快照区域清除
 * */
function clearSnapshotArea(){
    vectorLayer_trace.clear();
}

// 地图缩放事件监听
function mapZoomChange(){
    _MapApp.addEventListener(EzEvent.MAP_ZOOMCHANGE,function(){
        $(".BMap_IW_right").mousedown("click",function(){
            $(".BMap_pop").hide();
        });
    })
}

/**
 * 根据警员类别民警勾选过滤
 * */
function mjstatus(obj){
    if(obj.checked==true){
        showmj=true;
    }else{
        showmj=false;

    }
    gpsShowInit(departId);

}
/**
 * 根据警员类别辅警勾选过滤
 * */
function fjstatus(obj){
    if(obj.checked==true){
        showfj=true;
    }else{
        showfj=false;
    }
    gpsShowInit(departId);
}
/**
 * 根据警员状态在线勾选过滤
 * */
function onlinestatus(obj){
    if(obj.checked==true){
        showzx = true;
    }else{
        showzx = false;
    }
    gpsShowInit(departId);
}



function zdsfldstatus(obj){
    if(obj.checked==true){
        showZdsfld = true;
    }else{
        showZdsfld = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }

}

function pcszystatus(obj){
    if(obj.checked==true){
        showPcszy = true;
    }else{
        showPcszy = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }
}

function wmzyzstatus(obj){
    if(obj.checked==true){
        showWmzyz = true;
    }else{
        showWmzyz = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }
}

function zdsflkstatus(obj){
    if(obj.checked==true){
        showZdsflk = true;
    }else{
        showZdsflk = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }
}

function zdytqystatus(obj){
    if(obj.checked==true){
        showZdytqy = true;
    }else{
        showZdytqy = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }
}

function gfzddwstatus(obj){
    if(obj.checked==true){
        showGfzddw = true;
    }else{
        showGfzddw = false;
    }
    if(selectAreaid.length!=0){
        initOneWorkArea(selectAreaid);
        drawWgys(selectAreaid);
    }
}



/**
 * 根据警员状态当班勾选过滤
 * */
function ondutystatus(obj){
    if(obj.checked==true){
        showdb = true;
    }else{
        showdb = false;
    }
    gpsShowInit(departId);
}
/**
 * 根据警员状态越界勾选过滤
 * */
function overlinestatus(obj){
    if(obj.checked==true){
        showyj = true;
    }else{
        showyj = false;
    }

    gpsShowInit(departId);
}
/**
 * 民警点击轨迹复用数据
 * */
function queryGj(mjjh,mjxm) {
    initToolBarGjDiv();
    $("#map_popup").show();
    initDatePicker();
    $("#mjjh").val(mjjh);
    $("#mjxm").val(mjxm);
}
/**
 * 民警点击快照复用数据
 * */
function querySnapshot(mjjh,mjxm){
    initToolBarSnapshotDiv();
    $("#map_popup").show();
    initDatePicker();
    $("#mjjh").val(mjjh);
    $("#mjxm").val(mjxm);
}
// 控制鼠标事件
function initMouseEvent(){
    $('#sole-input').bind('keydown',function(e){
        $('.input-clear').show();
    });
    $("#searchbox_hidden").click(function(){
        if($(".cardlist:not(#cards-level2)").is(":visible")){
            $(".cardlist:not(#cards-level2)").hide();
            $(this).removeClass();
            $(this).addClass("searchbox-content-button right-button route-button-disable");
        }else{
            $(".cardlist:not(#cards-level2)").show();
            $(this).removeClass();
            $(this).addClass("searchbox-content-button right-button route-button");
        }
    });
    // 点击清除符号时置搜索框为空
    $('.input-clear').bind('click',function(e){
        $('#sole-input').val('');
        $(this).hide();
    })
    // 实时在线民警/辅警人数（在线、当班、越界、不在线）
    $("#zxmjcntDiv").bind("mouseover", function () {
        $("#zxmjcntTable").show();
    });
    $("#box_dept").mouseover(function(){
        $("#map_popup").hide();
        $(".detail-box").hide();
        initToolBarDeptDiv();
        $("#map_popup").show();
        initZtree();
    })
    $("#box_layer").mouseover(function(){
        $("#map_popup").hide();
        $(".detail-box").hide();
        initToolBarLayDiv();       // 初始化图层下拉框的内容
        $("#map_popup").show();
        initZtree();
    })
    $("#box_tool").mouseover(function(){
        $(".detail-box").show();
        $("#map_popup").hide();
    })
    $("#box_duty").mousedown(function(){
        $(".detail-box").hide();
        $("#map_popup").hide();
        goWorkPlan();
    })

    $("#box_dept").click(function(){
        $("#map_popup").hide();
        $(".detail-box").hide();
    })

    $("#box_layer").click(function(){
        $("#map_popup").hide();
        $(".detail-box").hide();
    })

    $("#box_tool").click(function(){
        $(".detail-box").hide();
        $("#map_popup").hide();
    })

    // 轨迹点击事件
    $("#box_gj").bind("click", function (e) {
        $(".detail-box").hide();
        initToolBarGjDiv();
        $("#map_popup").show();
        initDatePicker();
    });
    // 快照点击事件
    $("#box_zf").bind("click", function () {
        $(".detail-box").hide();
        $("#map_popup").hide();
        initToolBarSnapshotDiv();
        $("#map_popup").show();
        initDatePicker();
    });
    $("#map").mouseover(function(){
        ///$("#map_popup").hide();
        //mapZoomChange();
    })
}
// 初始化时间
function initDatePicker(){
    var dateT = new Date();
    var startDateT;
    startDateT = new Date(dateT.getFullYear() + '-' + (dateT.getMonth() + 1) + '-' + dateT.getDate() + ' 07:00:00');

    var laydate = layui.laydate;

    laydate.render({
        elem: '#kssj'
        ,type: 'datetime',
        value:startDateT
        ,done: function(value, date, endDate){
            //console.log(value.trim());
        }
    });

    laydate.render({
        elem: '#jssj'
        ,type: 'datetime',
        value:moment().format('YYYY-MM-DD hh:mm:ss')
        ,done: function(value, date, endDate){
            //console.log(value.trim());
        }
    });

}
// 显示右下角警员当时工作查询
function showToastrMesg(content,title){
    var options = {
        "closeButton":true,
        "debug":false,
        "progressBar":false,
        "positionClass":"toast-bottom-right",
        "onclick":null,
        "showDuration":0,
        "hideDuration":0,
        "timeOut":5000,
        "extendedTimeOut":1000,
        "showEasing":"swing",
        "hideEasing":"linear",
        "showMethod":"fadeIn",
        "hideMethod":"fadeOut"
    }
    toastr.info(content,title,options);
}
// 显示右上角警告框
function showTopRightMesg(content,title){
    var options = {
        "closeButton":true,
        "debug":false,
        "progressBar":false,
        "positionClass":"toast-top-right",
        "onclick":null,
        "showDuration":0,
        "hideDuration":0,
        "timeOut":5000,
        "extendedTimeOut":1000,
        "showEasing":"swing",
        "hideEasing":"linear",
        "showMethod":"fadeIn",
        "hideMethod":"fadeOut"
    }
    toastr.error(content,title,options);
}
// 显示提示框
function loadToastMsg(contentText){
    $("#toast-wrapper").addClass("active");
    $(".info-tip-text").html(contentText);
    setTimeout(function () {
        $("#toast-wrapper").removeClass("active");
    }, 3000);
}

// 初始化机构下拉框
function initToolBarDeptDiv(){
    $(".popup_main").html();
    var html = "";
    html +='<div class="content" style="height:600px;overflow-y:auto;"><ul id="deptTree" class="ztree"></ul></div>';
    $(".popup_main").html(html);
    $("#map_popup").removeClass("map_popup_small_x");
    $("#map_popup").removeClass("map_popup_small");
    $("#map_popup").addClass("map_popup");
}
// 初始化图层下拉框
function initToolBarLayDiv(){
    $(".popup_main").html();
    var html = "";
    html +='<div class="content" style="height:600px;overflow-y:auto;">\n' +
        '                            <blockquote style="border-left:5px solid #1b809e;font-size:14px;padding:5px 0px;margin:0 0 5px;">\n' +
        '                                <div class="container-fluid">\n' +
        '                                    <div class="row">\n' +
        '                                        <div class="col-sm-4" style="padding-right:0px;padding-left:10px;">警员类别：</div>\n' +
        '                                        <div class="col-sm-8">\n' +
        '                                            <input type="checkbox" id="police_mj" checked="checked" onclick="mjstatus(this);">民警 &nbsp;\n' +
        '                                            <input type="checkbox" id="police_fj" checked="checked" onclick="fjstatus(this);">辅警\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </blockquote>\n' +
        '                            <blockquote style="border-left:5px solid #1b809e;font-size:14px;padding:5px 0px;margin:0 0 5px;">\n' +
        '                                <div class="container-fluid">\n' +
        '                                    <div class="row">\n' +
        '                                        <div class="col-sm-4" style="padding-right:0px;padding-left:10px;">警员状态：</div>\n' +
        '                                        <div class="col-sm-8">\n' +
        '                                            <input type="checkbox" id="online_status" checked="checked" onclick="onlinestatus(this);"/>在线'+
        '                                            <input type="checkbox" id="onduty_status" checked="checked" onclick="ondutystatus(this);" />当班'+
        '                                            <input type="checkbox" id="overline_status" checked="checked" onclick="overlinestatus(this);"/>越界'+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </blockquote>\n' +
        '                            <blockquote style="border-left:5px solid #1b809e;font-size:14px;padding:5px 0px;margin:0 0 5px;display: none;">\n' +
        '                                <div class="container-fluid">\n' +
        '                                    <div class="row">\n' +
        '                                        <div class="col-sm-4" style="padding-right:0px;padding-left:10px;">网格元素：</div>\n' +
        '                                        <div class="col-sm-8">\n' +
        '                                            <input type="checkbox" id="online_status" checked="checked" onclick="zdsfldstatus(this);"/>路段'+
        '                                            <input type="checkbox" id="onduty_status" checked="checked" onclick="pcszystatus(this);" />增援'+
        '                                            <input type="checkbox" id="overline_status" checked="checked" onclick="wmzyzstatus(this);"/>志愿者'+
        '                                        </div>\n' +
        '                                   </div>\n' +
        '                                    <div class="row">\n' +
        '                                        <div class="col-sm-4" style="padding-right:0px;padding-left:10px;"></div>\n' +
        '                                        <div class="col-sm-8">\n' +
        '                                            <input type="checkbox" id="online_status" checked="checked" onclick="zdsflkstatus(this);"/>路口'+
        '                                            <input type="checkbox" id="onduty_status" checked="checked" onclick="zdytqystatus(this);" />企业'+
        '                                            <input type="checkbox" id="overline_status" checked="checked" onclick="gfzddwstatus(this);"/>重点单位'+
        '                                        </div>\n' +
        '                                   </div>\n' +
        '                                </div>\n' +
        '                            </blockquote>\n' +
        '                            <blockquote style="border-left:5px solid #1b809e;font-size:14px;padding:5px 0px;margin:0 0 5px;">\n' +
        '                                <div style="padding-right:0px;padding-left:10px;">岗位图层：</div>\n' +
        '                            </blockquote>\n' +
        '                            <ul id="areaZtree" class="ztree"></ul>\n' +
        '                        </div>';
    $(".popup_main").html(html);
    $("#map_popup").removeClass("map_popup_small_x");
    $("#map_popup").removeClass("map_popup_small");
    $("#map_popup").addClass("map_popup");
}
// 显示轨迹查询框
function initToolBarGjDiv(){
    $(".popup_main").html();
    var html= "";
    html +='<div class="content" style="height:280px;overflow-y: auto; padding:15px;">' +
            '<form class="form-horizontal"><div class="form-group" style="margin-bottom: 5px;">\n' +
            '                 <label class="col-md-4 control-label">民警警号：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="mjjh" class="form-control input-sm" placeholder="民警警号"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4 control-label">民警姓名：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="mjxm" class="form-control input-sm" placeholder="民警姓名"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4 control-label">开始时间：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="kssj" class="date_beg form-control input-sm" placeholder="开始时间"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4 control-label">结束时间：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="jssj" class="date_end form-control input-sm" placeholder="结束时间"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4  control-label">时间间隔：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="interval" class="form-control input-sm" placeholder="时间间隔(秒)"\n' +
        '                                               value="300"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <button type="button" class="btn btn-info btn-sm btn-block" onclick="queryGjByMj()">\n' +
        '                                    查询\n' +
        '                                </button>\n' +
        // '                                <button type="button" class="btn btn-info btn-sm btn-block" id="hf" disabled\n' +
        // '                                        onclick="huifang();">回放\n' +
        // '                                </button>\n' +
        '                            </form></div>';
    $(".popup_main").html(html);
    $("#map_popup").removeClass("map_popup");
    $("#map_popup").removeClass("map_popup_small_x");
    $("#map_popup").addClass("map_popup_small");

}
// 初始化快照查询框
function initToolBarSnapshotDiv(){
    $(".popup_main").html();
    var html= "";
    html +='<div class="content" style="height:200px;overflow-y: auto; padding:15px;"><form class="form-horizontal">\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4 control-label">开始时间：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="kssj" class="date_beg form-control input-sm" placeholder="开始时间"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="form-group" style="margin-bottom: 5px;">\n' +
        '                                    <label class="col-md-4  control-label">时间间隔：</label>\n' +
        '                                    <div class="col-md-8 ">\n' +
        '                                        <input id="interval" class="form-control input-sm" placeholder="时间间隔(秒)"\n' +
        '                                               value="300"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="btn-group btn-group-justified" role="group"><div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block "\n' +
        '                                        onclick="clearSnapshotArea()">\n' +
        '                                    清除\n' +
        '                                </button></div>\n' +
        '                                <div class="btn-group" role="group"><button id="drawSnapshot" type="button" class="btn btn-info btn-sm btn-block"\n' +
        '                                        onclick="drawSnapshotArea()">\n' +
        '                                    区域选择\n' +
        '                                </button></div></div>\n' +
        '                                <button type="button" class="btn btn-success btn-sm btn-block" style="margin-top: 5px;"' +
        '                                        onclick="snapshotSearchByArea()">\n' +
        '                                    查询\n' +
        '                                </button>\n' +
        '                            </form></div>';
    $(".popup_main").html(html);
    $("#map_popup").removeClass("map_popup");
    $("#map_popup").removeClass("map_popup_small");
    $("#map_popup").addClass("map_popup_small_x");
}