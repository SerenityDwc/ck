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
        field: 'yhddmc',
        title: '隐患地点'
    } ,{
        field: 'ddms',
        title: '地点描述'
    },{
        field: 'yhlx',
        title: '隐患类型',
        formatter:yhlx
    },{
        field: 'cr',
        title: 'CR值',
        formatter:cr
    },{
        field: 'zlqk',
        title: '治理情况'
    }, {
        field: 'cjsj',
        title: '采集时间',
        formatter:function(value,row,index){
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        }

}, {
        field: 'activitiStateName',
        title: '操作',
        formatter:function(value,row,index){
            var operatorBtn = '';
            if(row.activitiState == 'cl_zd'){

                if(row.zdChaFou==0){//直接录入的可以查否  下发的不行
                    operatorBtn = '<button type="button" class="btn btn-outline-danger btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'chafou\',\''+departId+'\');">查否</button>';
                }

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjdd\',\''+departId+'\');">提交大队</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-success btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'shtg\',\''+departId+'\');">录入治理</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-warning btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjznbm\',\''+departId+'\');">提交职能部门</button>';

            }else if(row.activitiState == 'cl_dd'){

                operatorBtn = '<button type="button" class="btn btn-outline-danger btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'chafou\',\''+departId+'\');">查否</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjywbm\',\''+departId+'\');">提交业务部门</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-success btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'shtg\',\''+departId+'\');">录入治理</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-warning btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjznbm\',\''+departId+'\');">提交职能部门</button>';

            }else if(row.activitiState == 'cl_zhid'){
                operatorBtn = '<button type="button" class="btn btn-outline-danger btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'chafou\',\''+departId+'\');">查否</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-success btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'shtg\',\''+departId+'\');">通过受理</button>';

                operatorBtn += ' <button type="button" class="btn btn-outline-warning btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjznbm\',\''+departId+'\');">提交职能部门</button>';

            }else if(row.activitiState == 'lrzl_zd'){

                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'\',\''+departId+'\');">'+row.activitiStateName+'</button>';

                    operatorBtn += ' <button type="button" class="btn btn-outline-warning btn-sm" onclick="javascript:cl(\'cl_zd\',\'中队处理\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjznbm\',\''+departId+'\');">提交职能部门</button>';
            }else if(row.activitiState == 'lrzl_dd'){

                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'\',\''+departId+'\');">'+row.activitiStateName+'</button>';

                if(2==2){//查否回来的需要多一个  提交职能部门
                    operatorBtn += ' <button type="button" class="btn btn-outline-warning btn-sm" onclick="javascript:cl(\'cl_dd\',\'大队处理\',\''+row.taskId+'\',\''+row.yhbh+'\',\'tjznbm\',\''+departId+'\');">提交职能部门</button>';
                }
            }else{

                operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:cl(\''+row.activitiState+'\',\''+row.activitiStateName+'\',\''+row.taskId+'\',\''+row.yhbh+'\',\'\',\''+departId+'\');">'+row.activitiStateName+'</button>';
            }

            return operatorBtn;
        }
    }];

$(function () {

    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'yhpc/yhxx/'+userId,
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
            content: contextPath+'yhpc/toAddYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&onlyLr=true'
        });
    });


//alert(departId.substr(6,6)=='000000');


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
                        layer.msg('新增成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('新增失败');
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
            content: contextPath+'yhpc/toAddYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id+'&onlyLr=true'
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

        if('shtg' == state){


            //改成 录入治理

            //弹出录入界面
            layer.open({
                id : 'lrzlAdd',
                type : 2,
                title: '录入治理',
                shadeClose : true,
                area:['30%','40%'],
                content: contextPath+'yhpc/toUpdateYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
            });


            // layer.confirm('是否审核通过？', {
            //     btn: ['是', '取消'] //可以无限个按钮
            // }, function(index, layero){
            //
            //     httpUtil.getData(
            //         contextPath+'yhpc/task',
            //         {
            //             id : id,
            //             activitiState : activitiState,
            //             taskId : taskId,
            //             mjjh : fzr,
            //             state :state
            //         },
            //         null,
            //         null,
            //         function (res) {
            //             //console.log(res);
            //             if(res.code==200){
            //                 //关闭弹窗 刷新父页面
            //                 layer.msg('审核成功');
            //
            //                 $search.click();
            //
            //
            //
            //             }else{
            //                 //错误提示
            //                 layer.msg('审核失败');
            //             }
            //         },
            //         function (XMLHttpRequest, textStatus, errorThrown) {
            //
            //         }
            //     );
            //
            // }, function(index){
            //
            //
            // });
        }else{
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
        }

    }else if(activitiState == 'cl_dd'){//大队处理


        var fzr = fzr==''?userId:fzr;




        if('shtg' == state){

            //改成 录入治理

            //弹出录入界面
            layer.open({
                id : 'lrzlAdd',
                type : 2,
                title: '录入治理',
                shadeClose : true,
                area:['30%','40%'],
                content: contextPath+'yhpc/toUpdateYh?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
            });


            // layer.confirm('是否审核通过？', {
            //     btn: ['是', '取消'] //可以无限个按钮
            // }, function(index, layero){
            //
            //     httpUtil.getData(
            //         contextPath+'yhpc/task',
            //         {
            //             id : id,
            //             activitiState : activitiState,
            //             taskId : taskId,
            //             mjjh : fzr,
            //             state :state
            //         },
            //         null,
            //         null,
            //         function (res) {
            //             //console.log(res);
            //             if(res.code==200){
            //                 //关闭弹窗 刷新父页面
            //                 layer.msg('审核成功');
            //
            //                 $search.click();
            //
            //
            //
            //             }else{
            //                 //错误提示
            //                 layer.msg('审核失败');
            //             }
            //         },
            //         function (XMLHttpRequest, textStatus, errorThrown) {
            //
            //         }
            //     );
            //
            // }, function(index){
            //
            //
            // });
        }else if('tjywbm' == state){//提交业务部门tjywbm
            //弹出业务部门选择页面
            layer.open({
                id : 'xf',
                type : 2,
                title: activitiStateName,
                shadeClose : true,
                area:['40%','45%'],
                content: contextPath+'yhpc/yhxx/tjznbm?departId='+departId+'&departName='+departName+'&userId='+userId+'&userName='+userName+'&activitiState='+activitiState+'&taskId='+taskId+'&id='+id
            });

        }else{
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
        }





    }else if(activitiState == 'cl_zhid'){//支队处理

        var fzr = fzr==''?userId:fzr;

        if('shtg' == state){
            layer.confirm('是否审核通过？', {
                btn: ['是', '取消'] //可以无限个按钮
            }, function(index, layero){

                httpUtil.getData(
                    contextPath+'yhpc/task',
                    {
                        id : id,
                        activitiState : activitiState,
                        taskId : taskId,
                        mjjh : fzr,
                        state :state
                    },
                    null,
                    null,
                    function (res) {
                        //console.log(res);
                        if(res.code==200){
                            //关闭弹窗 刷新父页面
                            layer.msg('审核成功');

                            $search.click();



                        }else{
                            //错误提示
                            layer.msg('审核失败');
                        }
                    },
                    function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                );

            }, function(index){


            });
        }else{
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
        }

    }else if(activitiState == 'lrzl'  || activitiState == 'lrzl_zd'  ||activitiState == 'lrzl_dd' || activitiState == 'lrzl_zhid'){//录入治理

        //弹出录入界面
        layer.open({
            id : 'lrzlAdd',
            type : 2,
            title: '录入治理',
            shadeClose : true,
            area:['30%','40%'],
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
                    mjjh : departId
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('结案归档成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('结案归档失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){


        });

    }else if(activitiState == 'tj_zwh'){//提交安委会

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


    }else if(activitiState == 'ws_zd'){
        layer.confirm('是否制作文书，目前只是按钮？', {
            btn: ['是', '取消'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : fzr
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('制作成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('制作失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){


        });
    }else if(activitiState == 'ws_dd'){
        layer.confirm('是否制作文书，目前只是按钮？', {
            btn: ['是', '取消'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : fzr
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('制作成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('制作失败');
                    }
                },
                function (XMLHttpRequest, textStatus, errorThrown) {

                }
            );

        }, function(index){


        });
    }else if(activitiState == 'ws_zhid'){
        layer.confirm('是否制作文书，目前只是按钮？', {
            btn: ['是', '取消'] //可以无限个按钮
        }, function(index, layero){

            httpUtil.getData(
                contextPath+'yhpc/task',
                {
                    id : id,
                    activitiState : activitiState,
                    taskId : taskId,
                    mjjh : fzr
                },
                null,
                null,
                function (res) {
                    //console.log(res);
                    if(res.code==200){
                        //关闭弹窗 刷新父页面
                        layer.msg('制作成功');

                        $search.click();



                    }else{
                        //错误提示
                        layer.msg('制作失败');
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

