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

    , {
        field: 'xfzt',
        title: '状态',
        formatter:function(value,row,index){
            if(value == '0'){
                return "录入未下发";
            }else if(value == '1'){
                return "下发到大队";
            }else if(value == '2'){
                return "下发到中队";
            }else if(value == '3'){
                return "下发到民警";
            }else if(value == '4'){
                return "确定为隐患";
            }else if(value == '9'){
                return "结案归档";
            }else if(value == '10'){
                return "不属于隐患";
            }
        }
    }];

$(function () {

    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'yhpc/fxxx',
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


    if(activitiState == 'xf_dd' || activitiState == 'xf_zd' || activitiState == 'xf_mj'){
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
                    mjjh : userId,
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

