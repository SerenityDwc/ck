var setting = {
    async: {
        type: 'get',
        enable: true,
        url: contextPath + 'workplan/depart/user',
        autoParam: ["id", "name", "level"],
        otherParam: ["departId", departId, "showUser", "true", "userType", userType],
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
        onClick: _onClick,
        onAsyncSuccess: _onAsyncSuccess
    }
};



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
    //是部门的才进行数据检索12位机构
    if (treeNode.id.length == 12) {

        // $('#departId').val(treeNode.id)
        // $('#departName').val(treeNode.name)


        //alert(treeNode.id + ", " + treeNode.name);


    } else {//点击民警

        // $('#userId').val(treeNode.id)
        // $('#userName').val(treeNode.name)
        $('#userId').val(treeNode.id);

        $('#userName').val(treeNode.name+'('+treeNode.id+')');

        //alert(treeNode.id + ", " + treeNode.name);


    }
}


$(function () {


    //console.log(viewName);

    //console.log('加载数据');
    //工作项字典定义
    var workType = 'WORKTYPE';
    //异步请求工作项字典数据
    httpUtil.getData(
        contextPath+'dict/download/'+workType,
        null,
        null,
        null,
        function(result){
            if(result!=null && result!='{ }'){
                for (var data in result)
                {
                    $('#radio-workType').append('<input type="radio" name="workType" value="'+data+'" title="'+result[data]+'" lay-filter="workType" />');
                }
                layui.form.render();//执行渲染layui

                layui.form.on('radio(workType)', function(data){
                    //console.log(data.elem); //得到radio原始DOM对象
                    //console.log(data.value); //被点击的radio的value值
                    $('#workType').val(data.value);
                });

            }else{
                layer.msg('获取工作项失败!');
            }

        },
        function(XMLHttpRequest, textStatus, errorThrown){
            layer.msg('获取工作项失败!');
        }
    );


    if(viewName === 'people'){

        $('.center-people').css({'width':'0%','display':'none'});
        $('.center-shift').css({'width':'35%','display':'block'});
        $('.center-area').css({'width':'35%','display':'block'});

        //班次类型字典定义
        var shiftType = 'SHIFTTYPE';
        //异步请求班次类型字典数据
        httpUtil.getData(
            contextPath+'dict/download/'+shiftType,
            null,
            null,
            null,
            function(result){
                if(result!=null && result!='{ }'){
                    for (var data in result)
                    {
                        if(data=='98'){//自定义班次 优先
                            $('#select-shiftType').append('<option selected value="'+data+'">'+result[data]+'</option>');
                            $('#shiftName').val('自定义班次');
                        }else{
                            $('#select-shiftType').append('<option value="'+data+'">'+result[data]+'</option>');
                        }
                    }
                    layui.form.render();//执行渲染layui

                    getShiftData('all');


                }else{
                    layer.msg('获取班次类型失败!');
                }

            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取班次类型失败!');
            }
        );

        //岗位类型字典定义
        var areaType = 'AREATYPE';
        //异步请求岗位类型字典数据
        httpUtil.getData(
            contextPath+'dict/download/'+areaType,
            null,
            null,
            null,
            function(result){
                if(result!=null && result!='{ }'){
                    for (var data in result)
                    {
                        $('#select-areaType').append('<option value="'+data+'">'+result[data]+'</option>');
                    }
                    layui.form.render();//执行渲染layui

                    getAreaData('all');

                }else{
                    layer.msg('获取岗位类型失败!');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取岗位类型失败!');
            }
        );
    }else if(viewName === 'shift'){

        $('.center-people').css({'width':'35%','display':'block'});
        $('.center-shift').css({'width':'0%','display':'none'});
        $('.center-area').css({'width':'35%','display':'block'});

        //请求登录用户的机构及下属机构和人员数据
        $.fn.zTree.init($("#watcherList"), setting);

        //岗位类型字典定义
        var areaType = 'AREATYPE';
        //异步请求岗位类型字典数据
        httpUtil.getData(
            contextPath+'dict/download/'+areaType,
            null,
            null,
            null,
            function(result){
                if(result!=null && result!='{ }'){
                    for (var data in result)
                    {
                        $('#select-areaType').append('<option value="'+data+'">'+result[data]+'</option>');
                    }
                    layui.form.render();//执行渲染layui

                    getAreaData('all');

                }else{
                    layer.msg('获取岗位类型失败!');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取岗位类型失败!');
            }
        );

    }else if(viewName === 'position'){


        $('.center-people').css({'width':'35%','display':'block'});
        $('.center-shift').css({'width':'35%','display':'block'});
        $('.center-area').css({'width':'0%','display':'none'});


        //请求登录用户的机构及下属机构和人员数据
        $.fn.zTree.init($("#watcherList"), setting);

        //班次类型字典定义
        var shiftType = 'SHIFTTYPE';
        //异步请求班次类型字典数据
        httpUtil.getData(
            contextPath+'dict/download/'+shiftType,
            null,
            null,
            null,
            function(result){
                if(result!=null && result!='{ }'){
                    for (var data in result)
                    {
                        if(data=='98'){//自定义班次 优先
                            $('#select-shiftType').append('<option selected value="'+data+'">'+result[data]+'</option>');
                            $('#shiftName').val('自定义班次');
                        }else{
                            $('#select-shiftType').append('<option value="'+data+'">'+result[data]+'</option>');
                        }
                    }

                    layui.form.render();//执行渲染layui

                    getShiftData('all');

                }else{
                    layer.msg('获取班次类型失败!');
                }

            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取班次类型失败!');
            }
        );
    }

    layui.form.on('select', function(data){//监听select元素
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        if($(data.elem).attr("id")==='select-shiftType'){
            //console.log('班次类型');
            //将相应的班次信息罗列出来
            //console.log(data.value);
            if(data.value==''){
                return;
            }

            if(data.value =='98'){
                $('#shiftName').val('自定义班次');
                $('#timeRange').css('display','block');
            }else{
                $('#shiftName').val('');
                $('#timeRange').css('display','none');
            }

            getShiftData(data.value);

        }else if($(data.elem).attr("id")==='select-areaType'){

            if(data.value==''){
                return;
            }
            //console.log('岗位类型');
            //将相应的岗位信息罗列出来
            //console.log(data.value);

            getAreaData(data.value);


        }
    });


    layui.laydate.render({
        elem: '#timeRange'
        ,type: 'time'
        ,range: true
        ,format: 'HH:mm' //可任意组合，
        ,done: function(value, date, endDate){
            //console.log(value.trim());
            //分割时间段开始 和  结束
            var times = value.trim().split(' - ');
            // console.log(times[0]);
            var start = times[0];
            var end = times[1];

            if(moment.duration($('#timeBegin').val())>moment.duration($('#timeEnd').val())){
                layer.msg('结束时间段必须大于起始时间段');
                $('#timeRange').val('');
            }else{

                //检测该时间段是否已经存在  类型是 98

                httpUtil.getData(
                    contextPath+'workplan/shift',
                    {
                        'userType':userType,
                        'departId':departId,
                        'timeBegin':$('#timeBegin').val(),
                        'timeEnd':$('#timeEnd').val()
                    },
                    null,
                    null,
                    function(result){
                        //console.log(result.data.list.length);

                        if(result.code==200 && result.data.list.length>0){

                            $('#timeBegin').val('');
                            $('#timeEnd').val('');
                            $('#timeRange').val('');
                            layer.msg('该时段已经存在！请直接选择自定义');



                        }else{
                            $('#timeBegin').val(start);
                            $('#timeEnd').val(end);
                        }
                    },
                    function(XMLHttpRequest, textStatus, errorThrown){

                    }
                );


            }
        }
    });

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-add').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

        //校验是否选择当班领导  那么需要检查 所属机构网格书否存在
        if($('#areaId').val()=='1'){
            var isExistArea = true;
            httpUtil.getData(
                contextPath+'workplan/area/'+departId,
                null,
                null,
                false,
                function(result){
                    if(result.code==200 && (result.data==null || result.data.length==0)){
                        isExistArea = false;
                    }
                },
                function(XMLHttpRequest, textStatus, errorThrown){

                }
            );

            if(!isExistArea){
                layer.msg('当班领导所属机构:'+departName+"("+departId+")不存在机构网格，请先前往 机构-网格 新增然后再排班!");
                return;
            }
        }



        if(viewName === 'people'){


            if(($('#shiftId').val().length==0 && $('#timeRange').val().length==0)  ||  $('#areaId').val().length==0 || $('#workType').val().length==0){
                layer.msg('请选择数据!');
                return ;
            }


            var $td = window.parent.$("td[data-user-id=\""+userId+"\"][data-date=\""+dutyDate+"\"]");

            var eventIsExist = false;
            $td.find('p').each(function (i) {
                var $event = $(this);

                if($event.data('shiftId')==$('#shiftId').val() && $event.data('areaId')==$('#areaId').val()){
                    eventIsExist = true;
                    return false;
                }
            });
            if(eventIsExist){
                layer.msg('排班已经存在,请勿重复排班!');
                return;
            }


            httpUtil.postData(
                contextPath+'workplan/duty',
                {
                    dutyType : $('#workType').val(),
                    shiftId : $('#shiftId').val(),
                    areaId : $('#areaId').val(),
                    bz : $('#bz').val(),
                    userId : userId,
                    dutyDate : dutyDate,

                    submitUser : submitUser,


                    timeBegin:$('#timeBegin').val(),
                    timeEnd:$('#timeEnd').val(),
                    userType:userType,
                    shiftOwner:departId,
                    areaOwner:departId



                },
                '',
                function (res) {
                    //console.log(res.data.dutyId);
                    if(res.code==200){


                        var event = '<p  style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$('#shiftName').val()+'('+$('#timeBegin').val()+'-'+$('#timeEnd').val()+')'+$('#areaName').val()+'" data-duty-id="'+res.data.dutyId+'" data-duty-date="'+dutyDate+'" data-user-id="'+userId+'" data-shift-id="'+res.data.shiftId+'" data-area-id="'+$('#areaId').val()+'"  data-time-begin="'+$('#timeBegin').val()+'" data-time-end="'+$('#timeEnd').val()+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+$('#shiftId').val()+'\',\''+$('#areaId').val()+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$('#shiftName').val()+'('+$('#timeBegin').val()+'-'+$('#timeEnd').val()+')'+$('#areaName').val()+'</p>';

                        window.parent.sortEventAndAppend($td,$('#timeBegin').val(),event);

                        window.parent.getWorkTime(userId,window.parent.days_YMD[0],window.parent.days_YMD[6]);

                        layer.msg('排班成功');

                        //console.log('viewName='+viewName);

                        window.parent.initLeft(viewName);

                        setTimeout(function () {
                            parent.layer.close(index);//关闭弹出的子页面窗口
                        },1000);


                    }else{
                        //错误提示
                        layer.msg('排班失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );
        }else if(viewName === 'shift'){

            if($('#userId').val().length==0  ||  $('#areaId').val().length==0 || $('#workType').val().length==0){
                layer.msg('请选择数据!');
                return ;
            }

            var $td = window.parent.$("td[data-shift-id=\""+shiftId+"\"][data-date=\""+dutyDate+"\"]");

            var eventIsExist = false;
            $td.find('p').each(function (i) {
                var $event = $(this);

                if($event.data('userId')==$('#userId').val() && $event.data('areaId')==$('#areaId').val()){
                    eventIsExist = true;
                    return false;
                }
            });
            if(eventIsExist){
                layer.msg('排班已经存在,请勿重复排班!');
                return;
            }


            httpUtil.postData(
                contextPath+'workplan/duty',
                {
                    dutyType : $('#workType').val(),
                    shiftId : shiftId,
                    areaId : $('#areaId').val(),
                    bz : $('#bz').val(),
                    userId : $('#userId').val(),
                    dutyDate : dutyDate,

                    submitUser : submitUser,
                    areaOwner:departId
                },
                '',
                function (res) {
                    //console.log(res);
                    if(res.code==200){

                        var event = '<p  style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$('#userName').val()+shiftName+'('+timeBegin+'-'+timeEnd+')'+$('#areaName').val()+'"  data-duty-id="'+res.data.dutyId+'"  data-duty-date="'+dutyDate+'" data-user-id="'+$('#userId').val()+'" data-shift-id="'+shiftId+'" data-area-id="'+$('#areaId').val()+'"  data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+shiftId+'\',\''+$('#areaId').val()+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$('#userName').val()+$('#areaName').val()+'</p>';

                        window.parent.sortEventAndAppend($td,timeBegin,event);

                        layer.msg('排班成功');

                        //console.log('viewName='+viewName);

                        window.parent.initLeft(viewName);

                        setTimeout(function () {
                            parent.layer.close(index);//关闭弹出的子页面窗口
                        },1000);

                    }else{
                        //错误提示
                        layer.msg('排班失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );
        }else if(viewName === 'position'){

            if($('#userId').val().length==0  || ($('#shiftId').val().length==0 && $('#timeRange').val().length==0) || $('#workType').val().length==0){
                layer.msg('请选择数据!');
                return ;
            }

            var $td = window.parent.$("td[data-area-id=\""+areaId+"\"][data-date=\""+dutyDate+"\"]");

            var eventIsExist = false;
            $td.find('p').each(function (i) {
                var $event = $(this);

                if($event.data('userId')==$('#userId').val() && $event.data('shiftId')==$('#shiftId').val()){
                    eventIsExist = true;
                    return false;
                }
            });
            if(eventIsExist){
                layer.msg('排班已经存在,请勿重复排班!');
                return;
            }

            httpUtil.postData(
                contextPath+'workplan/duty',
                {
                    dutyType : $('#workType').val(),
                    shiftId : $('#shiftId').val(),
                    areaId : areaId,
                    bz : $('#bz').val(),
                    userId : $('#userId').val(),
                    dutyDate : dutyDate,

                    submitUser : submitUser,



                    timeBegin:$('#timeBegin').val(),
                    timeEnd:$('#timeEnd').val(),
                    userType:userType,
                    shiftOwner:departId
                },
                '',
                function (res) {
                    //console.log(res);
                    if(res.code==200){

                        var event = '<p  style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+res.data.userName+'('+$('#userId').val()+')'+$('#shiftName').val()+'('+$('#timeBegin').val()+'-'+$('#timeEnd').val()+')'+areaName+'"  data-duty-id="'+res.data.dutyId+'"  data-duty-date="'+dutyDate+'" data-user-id="'+$('#userId').val()+'" data-shift-id="'+res.data.shiftId+'" data-area-id="'+areaId+'"  data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+$('#userId').val()+'\',\''+dutyDate+'\',\''+$('#shiftId').val()+'\',\''+$('#areaId').val()+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+res.data.userName+'('+$('#userId').val()+')'+$('#shiftName').val()+'('+$('#timeBegin').val()+'-'+$('#timeEnd').val()+')</p>';

                        layer.msg('排班成功');

                        window.parent.sortEventAndAppend($td,timeBegin,event);

                        //console.log('viewName='+viewName);

                        window.parent.initLeft(viewName);

                        setTimeout(function () {


                            parent.layer.close(index);//关闭弹出的子页面窗口
                        },1000);

                    }else{
                        //错误提示
                        layer.msg('排班失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );
        }



    });
});



function  getShiftData(value){


    //检索该部门下对应类型的数据
    $('#shift').empty();
    httpUtil.getData(
        contextPath+'workplan/shift/'+value+'/'+departId+'/'+userType,
        null,
        null,
        null,
        function(result){
            //console.log(result);
            if(result.data.length>0){
                var html = '';
                result.data.forEach(function($shift,index,array){//循环每个人

                    html+='<input type="radio" name="shiftId" lay-filter="shiftId" value="'+$shift.shiftId+'" title="'+$shift.shiftName+'('+$shift.timeBegin+'-'+$shift.timeEnd+')"  data-time-begin="'+$shift.timeBegin+'" data-time-end="'+$shift.timeEnd+'" data-time-name="'+$shift.shiftName+'">';
                });

                $('#shift').append(html);
                layui.form.render();//执行渲染layui

                layui.form.on('radio(shiftId)', function(data){
                    //console.log(data.elem); //得到radio原始DOM对象
                    //console.log(data.value); //被点击的radio的value值
                    $('#shiftId').val(data.value);

                    $('#shiftName').val($(data.elem).data('timeName'));
                    $('#timeBegin').val($(data.elem).data('timeBegin'));
                    $('#timeEnd').val($(data.elem).data('timeEnd'));

                });

            }else{
                $('#shift').append('<span class="text-center text-danger">没有获取到数据,请到班次管理录入数据</span>');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            layer.msg('获取班次信息失败!');
        }
    );
}


function  getAreaData(value){

//检索该部门下对应类型的数据

    $('#area').empty();
    httpUtil.getData(
        contextPath+'workplan/area/'+value+'/'+departId+'/'+userType,
        null,
        null,
        null,
        function(result){
            //console.log(result);
            if(result.data.length>0){
                var html = '';
                result.data.forEach(function($area,index,array){//循环每个人
                    html+='<input type="radio" name="areaId" lay-filter="areaId" value="'+$area.areaId+'" title="'+$area.areaName+'">';
                });

                $('#area').append(html);
                layui.form.render();//执行渲染layui

                layui.form.on('radio(areaId)', function(data){
                    //console.log(data.elem); //得到radio原始DOM对象
                    //console.log(data.value); //被点击的radio的value值
                    $('#areaId').val(data.value);
                    $('#areaName').val(data.elem.title);
                });
            }else{
                $('#area').append('<span class="text-center text-danger">没有获取到数据,请到岗位管理录入数据</span>');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            layer.msg('获取岗位信息失败!');
        }
    );
}
