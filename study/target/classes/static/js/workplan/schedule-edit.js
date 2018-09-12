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
                    if(data==$('#workType').val()){
                        $('#radio-workType').append('<input checked type="radio" name="workType" value="'+data+'" title="'+result[data]+'" lay-filter="workType" />');

                    }else{
                        $('#radio-workType').append('<input type="radio" name="workType" value="'+data+'" title="'+result[data]+'" lay-filter="workType" />');

                    }
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

                        if(data==$('#shiftType').val()){
                            $('#select-shiftType').append('<option selected value="'+data+'">'+result[data]+'</option>');

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
                        if(data==$('#areaType').val()){
                            $('#select-areaType').append('<option selected value="'+data+'">'+result[data]+'</option>');

                        }else{
                            $('#select-areaType').append('<option value="'+data+'">'+result[data]+'</option>');

                        }
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

        // $('#userName').val(userName+'('+userId+')');
        // $('#userId').val(userId);

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



                        if(data==$('#areaType').val()){
                            $('#select-areaType').append('<option selected value="'+data+'">'+result[data]+'</option>');

                        }else{
                            $('#select-areaType').append('<option value="'+data+'">'+result[data]+'</option>');

                        }

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
        //
        // $('#userName').val(userName+'('+userId+')');
        // $('#userId').val(userId);


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
                        if(data==$('#shiftType').val()){
                            $('#select-shiftType').append('<option selected value="'+data+'">'+result[data]+'</option>');

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


    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-edit').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

        //验证字段

        //校验是否已经存在

        //进行保存

        if(viewName === 'people'){

            if($('#shiftId').val().length==0  ||  $('#areaId').val().length==0 || $('#workType').val().length==0){
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

            // if(eventIsExist){
            //     layer.msg('排班已经存在,请勿重复排班!');
            //     return;
            // }


            httpUtil.putData(
                contextPath+'workplan/duty',
                {
                    dutyId: $('#dutyId').val(),
                    dutyType : $('#workType').val(),
                    shiftId : $('#shiftId').val(),
                    areaId : $('#areaId').val(),
                    bz : $('#bz').val(),
                    userId : userId,
                    dutyDate : dutyDate,

                    submitUser : submitUser
                },
                '',
                function (res) {
                    //console.log(res);
                    if(res.code==200){

                        window.parent.$("p[data-duty-id=\""+dutyId+"\"]").remove();


                        var event = '<p style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event" title="'+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')'+res.data.areaName+'" data-duty-id="'+res.data.dutyId+'" data-duty-date="'+dutyDate+'" data-user-id="'+userId+'" data-user-name="'+res.data.userName+'" data-shift-id="'+res.data.shiftId+'" data-area-id="'+res.data.areaId+'"  data-time-begin="'+res.data.timeBegin+'" data-time-end="'+res.data.timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+res.data.shiftId+'\',\''+res.data.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')'+res.data.areaName+'</p>';


                        window.parent.sortEventAndAppend($td,res.data.timeBegin,event);

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

            // if(eventIsExist){
            //     layer.msg('排班已经存在,请勿重复排班!');
            //     return;
            // }


            httpUtil.putData(
                contextPath+'workplan/duty',
                {
                    dutyId: $('#dutyId').val(),
                    dutyType : $('#workType').val(),
                    shiftId : shiftId,
                    areaId : $('#areaId').val(),
                    bz : $('#bz').val(),
                    userId : $('#userId').val(),
                    dutyDate : dutyDate,

                    submitUser : submitUser
                },
                '',
                function (res) {
                    //console.log(res);
                    if(res.code==200){


                        window.parent.$("p[data-duty-id=\""+dutyId+"\"]").remove();

                        var event = '<p style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event" title="'+res.data.userName+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')'+res.data.areaName+'"  data-duty-id="'+res.data+'" data-duty-date="'+dutyDate+'"   data-user-id="'+res.data.userId+'"  data-user-name="'+res.data.userName+'" data-shift-id="'+res.data.shiftId+'" data-area-id="'+areaId+'"  data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+res.data.userId+'\',\''+dutyDate+'\',\''+res.data.shiftId+'\',\''+res.data.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+res.data.userName+'('+res.data.userId+')'+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')</p>';



                        window.parent.sortEventAndAppend($td,res.data.timeBegin,event);

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

            if($('#userId').val().length==0  ||  $('#shiftId').val().length==0 || $('#workType').val().length==0){
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

            // if(eventIsExist){
            //     layer.msg('排班已经存在,请勿重复排班!');
            //     return;
            // }

            httpUtil.putData(
                contextPath+'workplan/duty',
                {
                    dutyId: $('#dutyId').val(),
                    dutyType : $('#workType').val(),
                    shiftId : $('#shiftId').val(),
                    areaId : areaId,
                    bz : $('#bz').val(),
                    userId : $('#userId').val(),
                    dutyDate : dutyDate,
                    submitUser : submitUser
                },
                '',
                function (res) {
                    //console.log(res);
                    if(res.code==200){

                        window.parent.$("p[data-duty-id=\""+dutyId+"\"]").remove();

                        var event = '<p style="height:25px;font-size:5px;line-height:25px;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event" title="'+res.data.userName+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')'+res.data.areaName+'"  data-duty-id="'+res.data+'" data-duty-date="'+dutyDate+'"   data-user-id="'+res.data.userId+'"  data-user-name="'+res.data.userName+'" data-shift-id="'+res.data.shiftId+'" data-area-id="'+areaId+'"  data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+res.data.userId+'\',\''+dutyDate+'\',\''+res.data.shiftId+'\',\''+res.data.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+res.data.userName+'('+res.data.userId+')'+res.data.shiftName+'('+res.data.timeBegin+'-'+res.data.timeEnd+')</p>';

                        layer.msg('排班成功');

                        window.parent.sortEventAndAppend($td,res.data.timeBegin,event);

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


    $('.sb_delete_a').each(function () {

       $(this).click(function () {


           $that =  $(this);

           $carItem = $that.parent().parent();

           //console.log($carItem);


           var dutyId = $carItem.data('dutyId');
           var sbNum  = $carItem.data('sbNum');

           //console.log(dutyId);
           //console.log(sbNum);

           layer.confirm('确定删除该装备信息？', {
               btn: ['确定','取消'] //按钮
           },function(index){
               httpUtil.delData(
                   contextPath+'workplan/dutysb/'+dutyId+'/'+sbNum,
                   null,
                   null,
                   null,
                   function(result){
                       if(result.code ==200){
                           //删除界面的DOM重新渲染界面
                           $carItem.remove();

                           layer.close(index);//关闭弹出的子页面窗口

                       }else{
                           layer.msg('删除装备信息失败!');
                       }
                   },
                   function(XMLHttpRequest, textStatus, errorThrown){

                   }
               );
           },function(){

           });

       });
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

                    if($shift.shiftId==$('#shiftId').val()){
                        html+='<input checked type="radio" name="shiftId" lay-filter="shiftId" value="'+$shift.shiftId+'" title="'+$shift.shiftName+'('+$shift.timeBegin+'-'+$shift.timeEnd+')"  data-time-begin="'+$shift.timeBegin+'" data-time-end="'+$shift.timeEnd+'" data-time-name="'+$shift.shiftName+'">';
                    }else{
                        html+='<input type="radio" name="shiftId" lay-filter="shiftId" value="'+$shift.shiftId+'" title="'+$shift.shiftName+'('+$shift.timeBegin+'-'+$shift.timeEnd+')"data-time-begin="'+$shift.timeBegin+'" data-time-end="'+$shift.timeEnd+'" data-time-name="'+$shift.shiftName+'">';
                    }
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


                    if($area.areaId==$('#areaId').val()){
                        html+='<input checked type="radio" name="areaId" lay-filter="areaId" value="'+$area.areaId+'" title="'+$area.areaName+'">';

                    }else{
                        html+='<input type="radio" name="areaId" lay-filter="areaId" value="'+$area.areaId+'" title="'+$area.areaName+'">';

                    }


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


