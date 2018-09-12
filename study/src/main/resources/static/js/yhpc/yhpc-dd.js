/***对象定义***/
var $table = $('#table');
var $search = $('#search');
var $reset = $('#reset');
var $toAdd = $('#toAdd');
var $toAddYh = $('#toAddYh');
var queryParams = {
    pageNumber : 1,
    pageSize : 10
}
var columns = [
    {
        field: 'fxddmc',
        title: '风险地点'
    } ,{
        field: 'ddms',
        title: '地点描述'
    }, {
        field: 'fxxfsj',
        title: '下发时间',
        formatter:function(value,row,index){
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        }

}, {
        field: 'fxys',
        title: '风险因素'
    }


    , {
        field: 'fjSum',
        title: '附件',
        formatter:function(value,row,index){
            if(value > 0){
                return '<span class="badge badge-pill badge-success">'+value+'</span>';
            }else{
                return '<span class="badge badge-pill badge-danger">0</span>';
            }
        }
    }

    ,


    {
        field: 'activitiStateName',
        title: '操作',
        formatter:function(value,row,index){
            var operatorBtn = '';
            if(row.activitiState == 'tj_zd'){
                operatorBtn += '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'tjdd\',\''+row.zdfzr+'\');">提交中队</button>';
            }else if(row.activitiState == 'cl_zd'){
                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'chafou\',\'\');">查否</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'tjdd\',\''+row.ddfzr+'\');">提交大队</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'shtg\',\'\');">通过受理</button>';

            }else if(row.activitiState == 'cl_dd'){
                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'chafou\',\''+row.zdfzr+'\');">查否</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'tjzhid\',\''+row.fxxfr+'\');">提交支队</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'shtg\',\'\');">通过受理</button>';

            }else if(row.activitiState == 'cl_zhid'){
                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'chafou\',\''+row.ddfzr+'\');">查否</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'shtg\',\'\');">通过受理</button>';

            }else if(row.activitiState == 'sh_zd'){
                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'\',\'\');">'+row.activitiStateName+'</button>';

            }else if(row.activitiState == 'nowstate'){
                operatorBtn = row.activitiStateName;

            }else {
                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.id+'\',\'\',\'\');">'+row.activitiStateName+'</button>';
            }

            return operatorBtn;
        }
    }];

$(function () {

    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'yhpc/fxxx2/'+userId,
            sortName: 'id',
            striped: true,
            sidePagination: 'server',
            clickToSlect: true,
            pagination: true,
            cache: false,
            escape: true,
            uniqueId: 'id',
            queryParams: getParam,
            method: 'get',
            toolBar: '#toolBar',
            columns: columns,
            queryParamsType: 'undefined',
            responseHandler: function (result) {
                return {
                    'total': result.data.total,
                    'rows': result.data.list
                }
            }
        });
    });

    $search.click();

    $toAdd.click(function () {
        layer.open({
            id : 'fxxxAdd',
            type : 2,
            title: '风险信息新增',
            shadeClose : true,
            area:['45%','50%'],
            content: contextPath+'yhpc/toAdd?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName
        });
    });


    $toAddYh.click(function () {
        layer.open({
            id : 'yhxxAdd',
            type : 2,
            title: '隐患信息新增',
            shadeClose : true,
            area:['45%','50%'],
            content: contextPath+'yhpc/toAddYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName
        });
    });



});

function cl(activitiState,activitiStateName,taskId,id,state,fzr){


    if(activitiState == 'xf_dd'){
        //弹出选择 选择民警
        layer.open({
            id : 'xf',
            type : 2,
            title: activitiStateName,
            shadeClose : true,
            area:['40%','45%'],
            content: contextPath+'yhpc/toXfDDDepart?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
        });
    }else if(activitiState == 'xf_zd'){
        //弹出选择 选择民警
        layer.open({
            id : 'xf',
            type : 2,
            title: activitiStateName,
            shadeClose : true,
            area:['50%','95%'],
            content: contextPath+'yhpc/toXfZDDepart?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
        });
    }else if(activitiState == 'xf_mj'){
        //弹出选择 选择民警
        layer.open({
            id : 'xf',
            type : 2,
            title: activitiStateName,
            shadeClose : true,
            area:['40%','45%'],
            content: contextPath+'yhpc/toXf?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
        });
        //确定下发提示刷新数据
    }else if(activitiState == 'isYhxx'){//是否属于隐患信息
        layer.confirm('是否属于隐患？', {
            btn: ['属于', '不属于'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : userId,
                    state : 'yes'
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('执行成功,请继续下一步');

                        $search.click();

                    }else{
                        //错误提示
                        layer.msg('执行失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){
            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : departId, //传入机构  后台检索相应的群组进行任务分发
                    state : 'no'
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('执行成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('执行失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );


        });

    }else if(activitiState == 'lrYhxx'){//录入隐患信息

        layer.open({
            id : 'yhxxAdd',
            type : 2,
            title: '隐患信息新增',
            shadeClose : true,
            area:['45%','50%'],
            content: contextPath+'yhpc/toAddYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
        });

    }else if(activitiState == 'tj_zd'){//提交中队

        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : fzr,
                state : state
            },
            null,
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('提交中队成功');

                    $search.click();



                }else{
                    //错误提示
                    layer.msg('提交中队失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );


    }else if(activitiState == 'cl_zd'){//中队处理


        var fzr = fzr==''?userId:fzr;


        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : fzr,
                state : state
            },
            null,
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('操作成功');

                    $search.click();



                }else{
                    //错误提示
                    layer.msg('操作失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );


    }else if(activitiState == 'cl_dd'){//大队处理


        var fzr = fzr==''?userId:fzr;


        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : fzr,
                state : state
            },
            null,
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('操作成功');

                    $search.click();



                }else{
                    //错误提示
                    layer.msg('操作失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );



    }else if(activitiState == 'cl_zhid'){//支队处理

        var fzr = fzr==''?userId:fzr;


        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : fzr,
                state : state
            },
            null,
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('操作成功');

                    $search.click();



                }else{
                    //错误提示
                    layer.msg('操作失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );


    }else if(activitiState == 'lrzl'){//录入治理

        //弹出录入界面
        layer.open({
            id : 'lrzlAdd',
            type : 2,
            title: '录入治理',
            shadeClose : true,
            area:['50%','70%'],
            content: contextPath+'yhpc/toUpdateYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
        });

    }else if(activitiState == 'jagd'){//结案归档
        //完成任务

        layer.confirm('是否结案归档？', {
            btn: ['是', '取消'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : userId
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('执行成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('执行失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){


        });

    }else if(activitiState == 'sh_zd'){
        layer.confirm('是否结案归档？', {
            btn: ['是', '取消'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : userId,
                    state : state
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('执行成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('执行失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){


        });
    }
}

function edit(shiftId){
    layer.open({
        id : 'areaEdit',
        type : 2,
        title: '班次编辑',
        shadeClose : true,
        area:['50%','70%'],
        content: contextPath+'workplan/page/edit/shift/'+shiftId+'?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser
    });
}


function del(shiftId){

    layer.confirm('确定删除该班次,可能会影响已经排班的数据？', {
        btn: ['确定', '取消'] //可以无限个按钮
    }, function(index, layero){
        httpUtil.delData(
            contextPath+'workplan/shift/'+shiftId,
            null,
            null,
            null,
            function(res){
                if(res.code==200){
                    layer.msg('删除成功');
                    $search.click();
                }else{
                    layer.msg('删除失败');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('删除失败');
            }
        );
    }, function(index){
        //关闭弹出询问窗口

    });




}

function getParam(params) {

    queryParams = params;

    return params

}

