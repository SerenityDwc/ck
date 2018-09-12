/***对象定义***/
var $table = $('#table');
var $search = $('#search');
var $reset = $('#reset');
var $toAdd = $('#toAdd');
var queryParams = {
    pageNumber : 1,
    pageSize : 10
}
var columns = [
    {
        field: 'areaName',
        title: '岗位名称'
    }, {
        field: 'areaDesc',
        title: '岗位描述'
    }, {
        field: 'disturb',
        title: '误差'
    }, {
        field: 'areaType',
        title: '岗位类型',
        formatter:areaType
    }, {
        field: '操作',
        title: '操作',
        formatter:function(value,row,index){
            var operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:edit('+row.areaId+');">编辑</button>';
            operatorBtn += ' <button type="button" class="btn btn-outline-danger btn-sm"  onclick="javascript:del('+row.areaId+');">删除</button>';
            return operatorBtn;
        }
    }];

$(function () {


    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url :contextPath+'workplan/area',
            sortName : 'id',
            striped : true,
            sidePagination :'server',
            clickToSlect : true,
            pagination : true,
            escape : true,
            cache: false,
            uniqueId : 'id',
            queryParams : getParam,
            method : 'post',
            toolBar : '#toolBar',
            columns : columns,
            queryParamsType : 'undefined',
            responseHandler : function (result) {
                return {
                    'total' : result.data.total,
                    'rows' : result.data.list
                }
            },
            onClickRow:function (row) {
                //console.log(row.areaStr);
                if(row.areaStr.length==0){
                    layer.msg('该岗位没有网格数据!');
                    return;
                }
                drawPolygon(row.areaStr);
            }
        });
    });

    $search.click();

    $toAdd.click(function () {

        layer.open({
            id : 'areaAdd',
            type : 2,
            title: '岗位新增',
            shadeClose : true,
            area: ['70%', '80%'],
            content: contextPath+'workplan/position/toAdd?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser
        });
    });
});

function edit(areaId){
    layer.open({
        id : 'areaEdit',
        type : 2,
        title: '岗位编辑',
        shadeClose : true,
        area: ['70%', '80%'],
        content: contextPath+'workplan/page/edit/area/'+areaId+'?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser
    });
}


function del(areaId){
    // console.log(areaId);

    layer.confirm('确定删除该岗位,可能会影响已经排班的数据？', {
        btn: ['确定', '取消'] //可以无限个按钮
    }, function(index, layero){
        httpUtil.delData(
            contextPath+'workplan/area/'+areaId,
            null,
            null,
            null,
            function(res){
                if(res.code==200){
                    layer.msg('删除成功');
                    $search.click();
                    vectorLayer.clear();

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

    params['owner']=departId;

    queryParams = params;

    return params

}
