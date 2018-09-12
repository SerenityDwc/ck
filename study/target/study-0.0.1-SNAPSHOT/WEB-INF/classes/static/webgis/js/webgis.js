var hostUrl =contextPath; //后端部署地址
// var departId = '320500000000'; // 由页面传过来
// var departName = '苏州交警支队'; // 由页面传过来
var userType = '1'; //默认
// var submitUser = '999999'; // 由页面传过来
var $rPMenu = $('#rPMenu');
var $rCMenu = $('#rCMenu');

var treeSetting;
var zrqtreeSetting;
var highChartsSeriesData_Mj = new Array();
var highChartsSeriesData_Fj = new Array();

$(function(){

   // initMap();

   GL.init(initMap,'./js/conf.json');

    initMouseEvent();
    treeSetting  = {
        view:{
            fontCss:{color:ztreeFontColor}
        },
        async: {
            type: 'get',
            enable: true,
            url: hostUrl + 'workplan/depart/user',
            autoParam: ["id", "name", "level"],
            otherParam: ["departId", departId, "showUser", "false", "userType", userType],
            dataFilter: filter
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        callback: {
            onRightClick: _onRightClick,
            onClick: _onClick,
            onAsyncSuccess: _onAsyncSuccess
        }
    };


    zrqtreeSetting  = {
        view:{
            fontCss:{color:ztreeFontColor}
        },
        async: {
            type: 'get',
            enable: true,
            url: hostUrl + 'workplan/depart/zrq',
            autoParam: ["id", "name", "level"],
            otherParam: ["departId", departId, "showZrq", "true"],
            dataFilter: filter
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        callback: {
            onClick: _onClickZrq,
        }
    };

    //loadGzmjgzl();
    initZtree();

})

// 在ztree上的右击事件
function _onRightClick(event, treeId, treeNode) {

    if (treeNode.id.length == 12) {
        //$('#departId').val(treeNode.id)
        //$('#departName').val(treeNode.name)
        
        departId = treeNode.id; 
		departName =treeNode.name;

        showrRMenu("Parent", event.clientX, event.clientY);
        //console.log('我右键机构:'+treeNode.id+','+treeNode.name);
    } else {
    	alert('民警右键');
        //showrRMenu("Child", event.clientX, event.clientY);
    }

}

//显示右键菜单
function showrRMenu(type, x, y) {
    if (type === 'Parent') {
        $("#rPMenu ul").show();
        $rPMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
        $("body").bind("mousedown", onBodyMouseDown);
    } else if (type === 'Child') {
        // $("#rCMenu ul").show();
        // $rCMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"}); //设置右键菜单的位置、可见
        // $("body").bind("mousedown", onBodyMouseDown);
    }
}

//鼠标按下事件
function onBodyMouseDown(event) {
    if ((event.target.id == "rPMenu" || $(event.target).parents("#rPMenu").length > 0)) {
        $rPMenu.css({"visibility": "hidden"});
    } else if ((event.target.id == "rCMenu" || $(event.target).parents("#rCMenu").length > 0)) {
        $rCMenu.css({"visibility": "hidden"});
    }
}

function goWorkPlan(){
	layer.open({
		title:'排班管理',
		id:'workplan',
		type:2,
		area:['99%','99%'],
		shadeClose:true,
		content:hostUrl+'/workplan?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser
		});
}

function _onAsyncSuccess(event, treeId, treeNode, msg) {
    //加载完毕后默认打开根节点
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var node = zTree.getNodeByParam("id", departId);
    zTree.selectNode(node);
    zTree.expandNode(node, true, false, false);





}

function filter(treeId, parentNode, responseData) {
    var childNodes = responseData.data;
    if (!childNodes) return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
}

function _onClick(event, treeId, treeNode) {


     showmj = true;
     showfj = true;
     showzx = true;
     showdb = true;
     showyj = true;

     showHj = false;


    enabledHj(false);


    //是部门的才进行数据检索12位机构
    if (treeNode.id.length == 12) {
        departId = treeNode.id;
        departName =treeNode.name;

        vectorLayer_ZRQ.clear();
        vectorLayer_trace.clear();
        gpsShow(departId);
        //$('#departId').val(treeNode.id)
        //$('#departName').val(treeNode.name)
        //alert(treeNode.id + ", " + treeNode.name);
        //goWorkPlan();

        //刷新  小峰  首页数据的方法
        // if(typeof(eval(parent.refreshData))=="function"){
        //     parent.refreshData(departId);
        // }



        if(app.map.shuzi.netState != 'dev'){
            if(typeof parent.refreshData === "function"){
                parent.refreshData(departId,'');
                parent.jgbmDs = departId;
                parent.wgid = '';
            }
        }



    } else {//点击民警
        //$('#userId').val(treeNode.id)
        //$('#userName').val(treeNode.name)
        //alert('点击民警');
        //alert(treeNode.id + ", " + treeNode.name);
    }
}

var wg_parent_jgbm = '';//网格上级机构部门

// 机构责任区
function _onClickZrq(event, treeId, treeNode){




    clearOverlAY();

    clearWgys();


    showHj = true;



    enabledHj(true);

    //console.log(treeNode.id);
    var jgbm =treeNode.id;

    selectJgbm = jgbm;
    departId = jgbm;
    //console.log(jgbm);
    // console.log(jgbm.substr(0,6));
    // console.log(jgbm.substr(6));

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

    // 部门责任区数据检索12位机构
    if (treeNode.id.length ==12){

        selectAreaid ="";
        departId = treeNode.id;
        gpsShow(departId);

        if(zrqLevel !='中队'){  //支队   大队  级别   1级二级树
            initDeptArea(departId);
        }else if(zrqLevel =='中队'){
            //应该加载 中队下的民警网格
            initWorkArea(departId,'');
        }

        //刷新  小峰  首页数据的方法
        if(app.map.shuzi.netState != 'dev'){
            if(typeof parent.refreshData === "function"){
                parent.refreshData(departId,'');
                parent.jgbmDs = departId;
                parent.jgbmDs = '';
            }
        }

    } else { // 点点击民警网格加载民警网格数据


        //清空所有图层

        vectorLayer_ZRQ.clear();

        selectAreaid=treeNode.id;
        areaId = treeNode.id;
        // initArea(areaId);
        //console.log('这里直接加载某一个民警网格数据!'+areaId);

        //点击网格的时候获取父节点
//console.log(treeNode.getParentNode().id);
        //刷新  小峰  首页数据的方法
        //console.log(areaId);
        if(app.map.shuzi.netState != 'dev'){
            if(typeof parent.refreshData === "function"){
                parent.refreshData(treeNode.getParentNode().id,areaId);
                parent.jgbmDs = treeNode.getParentNode().id;
                parent.wgid = areaId;

            }
        }

        //把上级中队的所有网格画出来

        initWorkArea(treeNode.getParentNode().id,areaId);
        gpsShowInit(treeNode.getParentNode().id);


        initOneWorkArea(areaId);
        drawWgys(areaId);


    }
}

/**
 * 跳转一人一档
 * @param mjjh
 * @param mjxm
 */
function goYryd(mjjh,mjxm){
    if(app.map.shuzi.netState != 'dev'){
        if(typeof parent.goYryd === "function"){
            parent.goYryd(mjjh,mjxm);
        }
    }
}

// 初始化左侧的在线、当班、越界、离线图表
function initHighChartsDiv(){
    $("#zxmjcntDiv").highcharts({
        chart: {
            type: 'bar',
            backgroundColor: highChartsBackgroundColor
        },
        title: {
            text: ''
        },
        subtitle : {
            text: ''
        },
        xAxis : {
            categories: ['在线', '当班', '越界', '当班<br>离线'],
            title: {
                text: null
            },
            labels:{
                enabled:true,
                style:{
                    color: ztreeFontColor,
                    fontSize: '12px'
                }
            },
            lineWidth:0,
            minorGridLineWidth:0,
            minorTickWidth:0,
            tickWidth:0
        },
        yAxis : {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                enabled: false
            },
            gridLineWidth:0
        },
        tooltip : {
            valueSuffix: ''
        },
        plotOptions : {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                stacking: 'normal',
                pointWidth:25
            }
        },
        legend : {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits : {
            enabled: false
        },

        series : [
            {
                name: '辅警',
                borderWidth: 0,
                data: highChartsSeriesData_Fj
                    /*[{x:0,y:198,name:'在线',color: "#646664"},
                    {x:1,y:247,name:'当班',color:"#646664"},
                    {x:2,y:60,name:'越界',color:"#646664"},
                    {x:3,y:89,name:'当班离线',color:"#646664"}]*/

            },
            {
                name: '民警',
                borderWidth: 0,
                data: highChartsSeriesData_Mj
                    /*[{x:0,y:500,name:'在线',color: "#269997"},
                    {x:1,y:480,name:'当班',color: "#0882c1"},
                    {x:2,y:100,name:'越界',color: "#3a596c"},
                    {x:3,y:80,name:'当班离线',color: "#0882c1"}
                ]*/
            }
        ]
    })
}

// 初始始机构树
function initZtree(){
    // 初始化机构树
    $.fn.zTree.init($("#deptTree"), treeSetting);
    $.fn.zTree.init($("#areaZtree"),zrqtreeSetting);
}

// 查询
function searchDPoint(){
    var flag = false;
    var condition = $("#sole-input").val();			// 根据搜索框内容与当前地图层内容匹配
    if (condition == "") {
        loadToastMsg("请输入民警警号、民警姓名进行搜索!");
        reutrn;
    }
    searchMjPoint(condition,flag);
    if (!flag) {
        loadToastMsg("未找到数据，请重新搜索！");
        return;
    }
}
// 定位到民警点位并居中
function searchMjPoint(condition,flag){
    if(_MapApp!=null){
        var some = _MapApp.getOverlays();
        var some_length = some.length;
        for (var i=0 ; i<some_length; i++){
            if(some[i].id == condition || some[i].name == condition){
                var point = new Point(some[i].lon,some[i].lat);
                _MapApp.centerAtLatLng(point);
                some[i].openInfoWindowHtml();
                flag = true;
                break;
            }
        }
    }
}
function gpsShowInit(departId){
    if(_MapApp == null){
        window.setTimeout("gpsShowInit(departId)", 10000);
        return;
    }else{
        gpsShow(departId);
    }
}


function gpsShowInitJh(departId){
    if(_MapApp == null){
        window.setTimeout("gpsShowInitJh(departId)", 10000);
        return;
    }else{
        gpsShowJh(departId);
    }
}





/**
 * 地图初始化加载警员
 */
function gpsShow(departId){

        httpUtil.getData(
            contextPath+ 'workplan/user/online/gps/' + departId,
            null,
            null,
            null,
            function(json){

                if(json.code==200 && json.data!=null){

                    clearOverlAY();

                    var jsonData = json.data.list;

                    highChartsSeriesData_Mj = [];
                    highChartsSeriesData_Fj = [];
                    //给聚合使用
                    initAddPolicemn(jsonData);
                }
                if(json.data.list.length==0){
                    //showTopRightMesg("未找到GPS数据");
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                showTopRightMesg("点位数据加载异常");

            }
        );

}


function gpsCount(departId){



    var count = '0,0';

    httpUtil.getData(
        contextPath+ 'workplan/user/online/gps/' + departId,
        null,
        null,
        false,
        function(json){
            if(json.code==200 && json.data!=null){
// console.log(json.data.size);
                count =  json.data.size;

                var mj_count = 0;
                var fj_count = 0;

                json.data.list.forEach(function (police,index,array) {
                    //判断民警辅警
                    if(police.userType =='1'){//民警
                        mj_count += 1;
                    }else if(police.userType =='3'){//辅警
                        fj_count += 1;
                    }
                });

                count = mj_count + ',' +fj_count


            }else{
                return count;
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            return count;
        }
    );

    return count;

}



function gpsShowJh(departId){

    httpUtil.getData(
        contextPath+ 'workplan/user/online/gps/' + departId,
        null,
        null,
        null,
        function(json){

            if(json.code==200 && json.data!=null){

                clearOverlAY();

                var jsonData = json.data.list;

                highChartsSeriesData_Mj = [];
                highChartsSeriesData_Fj = [];
                //给聚合使用
                initAddPolicemnJh(jsonData);
            }
            if(json.data.list.length==0){
                //showTopRightMesg("未找到GPS数据");
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            showTopRightMesg("点位数据加载异常");

        }
    );





}
/**
 * 根据警员加载责任区
 * */
function initPoliceArea(police){
    //var json = "120.60205,31.31857,120.6098,31.29806,120.57104,31.29312,120.54608,31.33529,120.60205,31.31857,120.60205,31.31857";


        httpUtil.getData(
            contextPath+ 'workplan/zrq/work/user/' + police.id,
            null,
            null,
            null,
            function(json){
                if(json.code==200 && json.data.list.length>0){
                    reshow(json.data.list[0].areaStr,false);
                }
                if(json.data.list.length==0){
                    showTopRightMesg("该警员未找到网格数据！");
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                showTopRightMesg("网格数据加载异常");
            }
        );





}

var colors = [
    '#FFAEB9',
    '#6633cc',
    '#33ff66',
    '#DAA520',
    '#436EEE',
    '#E9967A',
    '#836FFF',
    '#00CED1',
    '#8B8B00',
    '#CDC9C9',
    '#E0EEE0',
    '#BDB76B',
    '#76EEC6',
    '#76EE00',
    '#EED2EE',
    '#9BCD9B',
    '#CD9B1D',
    '#8B636C',
    '#CD8C95'
];

/**
 * 根据机构加载责任区
 * */
function initDeptArea(departId){
    try{

        httpUtil.getData(
            contextPath+ 'workplan/zrq/depts/' + departId,
            null,
            null,
            null,
            function(json){
                if(json.code==200 && json.data!=null){
                    var json_length = json.data.list.length;

                    if(json_length>0){

                        vectorLayer_ZRQ.clear();
                        vectorLayer_WGYS_SHAPE.clear();


                        var areaStrs = "";

                        for(var i=0;i<json_length;i++){

                            var area = json.data.list[i];


                            //获取每个区域的数量

                            //console.log('shuanlgiang :'+gpsCount(area.jgbm));
                            var total_count = gpsCount(area.jgbm);
                            var mj_count = total_count.split(',')[0];
                            var fj_count = total_count.split(',')[1];
                            var j_imageUrl = contextPath+'webgis/image/icon/j-zx.gif';
                            var f_imageUrl = contextPath+'webgis/image/icon/f-zx.gif';

                            reallshow(area.jgbm,area.areaStr,colors[i],'depart','<div style="color:white;background-color:'+colors[i]+';border-width: 0px;text-align: left;">'+area.areaName+'(<img style="width:20px;height:20px;"  src='+j_imageUrl+'/> '+mj_count+',<img style="width:20px;height:20px;"  src='+f_imageUrl+'/> '+fj_count+')</div>');

                            if(i!=0){
                                areaStrs+=";";
                            }
                            areaStrs+=area.areaStr
                        }

                        //console.log(getAreaPoints(area.areaStr));

                        var centerLng="";
                        var centerLat="";

                        httpUtil.postData(
                            contextPath+'workplan/getCenterPoint400',
                            getAreaPoints(areaStrs),
                            null,
                            function(result){
                                if(result.code==200 && result.data!=""){
                                    centerLng = result.data.longitude;
                                    centerLat = result.data.latitude;
                                }else{//失败的话
                                    //设置第一个点为中心
                                    var firstPoints =(json.data.list[0].areaStr.split(';')[0]).split(',');
                                    centerLng = firstPoints[0];
                                    centerLat = firstPoints[1];
                                }
                                var lngLat = new GL.LngLat([centerLng,centerLat]);
                                _MapApp.setCenter(lngLat);


                            },
                            function(XMLHttpRequest, textStatus, errorThrown){

                            }
                        );


                    }


                }
                if(json.data.list.length==0){
                    showTopRightMesg("该机构下未找到网格！");
                    vectorLayer_ZRQ.clear();
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                showTopRightMesg("网格数据加载异常!");

            }
        );



    }catch(e){
        showTopRightMesg("网格数据加载异常!");
    }
}



function getAreaPoints(areaStr){
    //组装数据
    var areaStr = areaStr.split(";");
    //console.log(areaStr);
    var areaPoints = [];
    for(var i in areaStr){
        //console.log(areaStr[i]);
        var longitude = areaStr[i].split(",")[0];
        var latitude = areaStr[i].split(",")[1];
        areaPoints.push({"longitude":longitude,"latitude":latitude});
    }

    return areaPoints;
}

var zrqLevel = '支队';


/**
 * 查询某一个WORKAREA
 * @param areaId
 */
function initOneWorkArea(areaId){
    httpUtil.getData(
        contextPath+'workplan/zrq/work/'+areaId,
        null,
        null,
        null,
        function(json){
            if(json.code==200 && json.data!=null){

                var area = json.data;

                reallshowShape(area.areaId,area.areaStr,colors[0],'user','<div style="color:white;background-color:'+colors[0]+';border-width: 0px;text-align: left;">'+area.areaName+'</div>',zrqLevel);

                var centerLng="";
                var centerLat="";

                httpUtil.postData(
                    contextPath+'workplan/getCenterPoint400',
                    getAreaPoints(area.areaStr),
                    null,
                    function(result){
                        if(result.code==200 && result.data!=""){
                            centerLng = result.data.longitude;
                            centerLat = result.data.latitude;
                        }else{//失败的话
                            //设置第一个点为中心
                            var firstPoints =(json.data[0].areaStr.split(';')[0]).split(',');
                            centerLng = firstPoints[0];
                            centerLat = firstPoints[1];
                        }
                        var lngLat = new GL.LngLat([centerLng,centerLat]);
                        _MapApp.setCenter(lngLat);

                    },
                    function(XMLHttpRequest, textStatus, errorThrown){

                    }
                );

            }else{
                layer.msg('获取民警网格数据错误!');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}


/**
 * 依据中队机构 加载所有 民警的网格数据
 * @param areaId
 * @param level
 */
function initWorkArea(departId,areaId){

    //console.log('查询中队'+departId);

    httpUtil.getData(
        contextPath+ 'workplan/zrq/works/' + userType ,
        {
            'departId':departId
        },
        null,
        null,
        function(json){
            if(json.code==200 && json.data!=null){

                var json_length = json.data.length;

                if(json_length>0){

                    vectorLayer_ZRQ.clear();
                    vectorLayer_WGYS_SHAPE.clear();

                    var areaStrs="";
                    for(var i=0;i<json_length;i++){

                        var area = json.data[i];

                        //console.log('传进来的民警网格ID'+areaId);


                        if(areaId != ''){
                            if(areaId == area.areaId){

                                //console.log('1');

                                reallshow(area.areaId,area.areaStr,colors[i],'user','<div style="color:white;background-color:'+colors[i]+';border-width: 0px;text-align: left;">'+area.areaName+'</div>',zrqLevel);

                            }else{

                                reallshow(area.areaId,area.areaStr,'transparent','user','<div style="color:white;background-color:'+colors[i]+';border-width: 0px;text-align: left;">'+area.areaName+'</div>',zrqLevel);


                            }
                        }else{
                            reallshow(area.areaId,area.areaStr,colors[i],'user','<div style="color:white;background-color:'+colors[i]+';border-width: 0px;text-align: left;">'+area.areaName+'</div>',zrqLevel);
                        }

                        

                        if(i!=0){
                            areaStrs+=";";
                        }
                        areaStrs+=area.areaStr

                    }

                    var centerLng="";
                    var centerLat="";

                    httpUtil.postData(
                        contextPath+'workplan/getCenterPoint400',
                        getAreaPoints(areaStrs),
                        null,
                        function(result){
                            if(result.code==200 && result.data!=""){
                                centerLng = result.data.longitude;
                                centerLat = result.data.latitude;
                            }else{//失败的话
                                //设置第一个点为中心
                                var firstPoints =(json.data.list[0].areaStr.split(';')[0]).split(',');
                                centerLng = firstPoints[0];
                                centerLat = firstPoints[1];
                            }
                            var lngLat = new GL.LngLat([centerLng,centerLat]);
                            _MapApp.setCenter(lngLat);

                        },
                        function(XMLHttpRequest, textStatus, errorThrown){

                        }
                    );

                }else{
                    //showTopRightMesg("未找到该网格！");

                }
            }
            if(json.data==null){
                //showTopRightMesg("未找到该网格！");
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            showTopRightMesg("网格数据加载异常!");
        }
    );

}



/**
 * 根据责任区 机构部门   加载责任区
 * */
function initArea(areaId){
    httpUtil.getData(
        contextPath+ 'workplan/zrq/dept/' + areaId ,
        null,
        null,
        null,
        function(json){
            if(json.code==200 && json.data!=null){
                reallshow(json.data.areaId,json.data.areaStr,"#941207",false);
                return;
            }
            if(json.data==null){
                showTopRightMesg("未找到该网格！");
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            showTopRightMesg("网格数据加载异常!");
        }
    );
}
/**
 * 根据民警画轨迹
 * */
function queryGjByMj(){
    var mjjh = $("#mjjh").val();
    var mjxm = $("#mjxm").val();
    if (mjjh == '' && mjxm == '') {
        $('#mjjh').addClass('form-control-error');
        $('#mjjh').bind('click', function (e) {
            $('#mjjh').removeClass('form-control-error');
        });
        showTopRightMesg("请输入民警警号或者姓名！");
        return;
    }
    var kssj = $("#kssj").val();
    var jssj = $("#jssj").val();
    var interval = $("#interval").val();
        httpUtil.getData(
            contextPath+'webgis/trace',
            {
                "userId":mjjh,
                "timeBegin":kssj,
                "timeEnd":jssj,
                "timeSeconds":interval
            },
            null,
            null,
            function(result){
                if(result.code==200 && result.data.length>0){

                    huifang(result.data);
                }else {
                    showTopRightMesg("该警员在查询时间段内不存在GPS数据,请核对民警警号！");
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                showTopRightMesg("轨迹数据加载异常，请联系管理员!");

            }
        );
}

/**
 * 快照查询
 * */
function snapshotSearchByArea(){

    if(snapshotAreaStr.length==0){
        showTopRightMesg("请先再地图上面画区域(点击区域选择后可画)！");
        return;
    }


    var kssj = $("#kssj").val();
    var interval = $("#interval").val();
    var areaStr = snapshotAreaStr;
    try{


        httpUtil.getData(
            contextPath+ 'workplan/snapshot/area',
            {
                "snapshottime":kssj,
                "timespace":interval,
                "areapoints":areaStr,
                "departId":departId
            },
            null,
            null,
            function(json){
                if(json.code==200 && json.data.list.length>0){
                    _MapApp.clear();
                    var data = json.data.list;
                    for(var i=0;i<data.length;i++){
                        initAddPoliceman(json[i]);
                    }
                    var html = '<div class="container-fluid"><div class="row" style="padding-left:15px;"><table class="table table-bordered"><thead><tr><th>民警警号</th><th>民警姓名</th></tr></thead><tbody>';
                    var data = json.data.list;
                    for(var i=0;i<data.length;i++){
                        html += '<tr><td>'+data[i].mjjh+'</td><td>'+data[i].mjxm+'</td></tr>';
                    }
                    html +='</tbody></table></div></div>';
                    $(".popup_main_2").html(html);
                    $("#map_popup_2").show();
                }else{
                    showTopRightMesg("选择区域没有警员对象！");
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                showTopRightMesg("快照数据加载异常!");
            }
        );

    }catch(e){
        showTopRightMesg("快照数据加载异常!");
    }
}

/**
 * 加载关注民警工作量
 * */
function loadGzmjgzl(){
    try{
        $.ajax({
            type:'get',
            url: 'gzmj.json',
            success:function(json){
                debugger;
                var html='';
                if(json.code==200 && json.data!=null){
                    //_MapApp.clearOverlays();
                    var data = json.data.list;
                    for(var i=0;i < data.length;i++){
                        html += '<tr><td>'+data[i].jgmc+'</td><td>'+data[i].mjxm+'</td><td>'+data[i].zf+'</td><td>'+data[i].sg+'</td><td>'+data[i].jcj+'</td><td>'+data[i].area+'</td></tr>';
                    }
                }
                if(json.data.list.length==0){
                    html +="<tr><td colspan='6'>无数据！</td></tr>";
                }
                $("#gzmjGzl").html(html);
            },
            error: function(xhr) {
                if (xhr.status == 400 || xhr.getResponseHeader("content-type").indexOf("json") > -1) {
                    showTopRightMesg("点位数据加载异常");
                    return;
                } else {
                    showTopRightMesg("webgis数据库错误，请联系管理员!");
                    return;
                }
            }
        })
    }catch(e){
        showTopRightMesg("关注民警数据加载异常");
    }
}
/**
 * 加载当前民警工作量
 * */
function initPoliceWork(mjjh,mjxm,timeBegin,timeEnd){

    // var lastQuery = '';
    // httpUtil.getData(
    //     contextPath+'/webgis/operation',
    //     {
    //         "mjjh":mjjh
    //     },
    //     null,
    //     false,
    //     function(result){
    //        if(result.code == 200 ){
    //            if(+result.data.length>0){
    //                lastQuery += "最后操作:<font color='red' size=2>"  +result.data[0].queryIdName+ "</font> <br/>";
    //                lastQuery += "操作时间:<font color='red' size=2>"  +moment(result.data[0].logtime).format('YYYY-MM-DD hh:mm:ss')+ "</font> <br/>";
    //            }else{
    //                lastQuery += "最后操作:<font color='red' size=2>无</font> <br/>";
    //                lastQuery += "操作时间:<font color='red' size=2>无</font> <br/>";
    //            }
    //        }
    //     },
    //     function(XMLHttpRequest, textStatus, errorThrown){
    //
    //     }
    // );

    var workNum = '';
    httpUtil.getData(
        contextPath+'webgis/worknum',
        {
            "mjjh":mjjh,
            "timeBegin":timeBegin,
            "timeEnd":timeEnd
        },
        null,
        false,
        function(result){
            if(result.code == 200){
                workNum = "简易处罚：<font color='red' size=4>" + result.data.cntCfts + "</font> 起&#12288;&#12288;&#12288;" +
                    "强制处罚：<font color='red' size=4>" + result.data.cntZfts + "</font> 起<br/>" +
                    "勤务数量：<font color='red' size=4>" + result.data.cntQwts + "</font> 起&#12288;&#12288;&#12288;"+
                    "事故数量：<font color='red' size=4>" + result.data.cntSgts + "</font> 起<br/>"+''
                    //"接警数量：<font color='red' size=4>" + result.data.cntJjts + "</font> 起&#12288;&#12288;&#12288;"
                ;
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

    var title="<b>"+mjxm+":("+mjjh+"）的当天执法情况</b>";
    var content = '<b>'+workNum+'</b>';
    showToastrMesg(content,title);


}
// 加载当前民警工作量
function initPoliceJcjWork(police){
    var title="<b>"+police.name+"：（"+police.id+"）的当天接警情况</b>";
    var content = "<b>接警条数：<font color='red' size=4>" + 10 + "</font> 起<br/>" +
        "处警条数：<font color='red' size=4>" + 4 + "</font> 起<br/></b>";
    showToastrMesg(content,title);
}
//setInterval("gpsShowInit(departId)",60000);

function goPageGis(pageType){
    if(pageType == 'slt'){
        window.location.href = hostUrl+'webgis/white?departId='+departId+'&departName='+departName+'&submitUser='+submitUser+'&isDuty='+isDuty;
    }else if(pageType == 'fst'){
        window.location.href = hostUrl+'webgis/black?departId='+departId+'&departName='+departName+'&submitUser='+submitUser+'&isDuty='+isDuty;
    }
}

function showWgys(jgbm,wgid,wgType){
    //alert('jgbm='+jgbm+',wgid='+wgid+',wgType='+wgType);

    //区分点击机构和点击网格
    if(wgid==''){//点击的机构某个网格元素

        console.log('加载机构为'+jgbm+'下类型为'+wgType+'的网格元素');

        //查询某个机构下的网格元素
        drawOneWgysByDepartId(jgbm,wgType);
    }else{//点击的机构某个网格元素
        console.log('加载网格ID为'+wgid+'下类型为'+wgType+'的网格元素');

        //查询某个网格下的网格元素是
        drawOneWgysByAreaId(wgid,wgType);
    }

}