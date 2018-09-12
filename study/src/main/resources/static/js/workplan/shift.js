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
        field: 'shiftType',
        title: '类型',
        formatter:shiftType
    } ,{
        field: 'shiftName',
        title: '班次名称'
    }, {
        field: 'shiftDesc',
        title: '班次描述'
    }, {
        field: 'timeBegin',
        title: '起始时间'
    }, {
        field: 'timeEnd',
        title: '结束时间'
    }, {
        field: '操作',
        title: '操作',
        formatter:function(value,row,index){
            var operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:edit('+row.shiftId+');">编辑</button>';
            operatorBtn += ' <button type="button" class="btn btn-outline-danger btn-sm"  onclick="javascript:del('+row.shiftId+');">删除</button>';
            return operatorBtn;
        }
    }];

$(function () {

    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'workplan/allShift',
            sortName: 'id',
            striped: true,
            sidePagination: 'server',
            clickToSlect: true,
            pagination: true,
            cache: false,
            escape: true,
            uniqueId: 'id',
            queryParams: getParam,
            method: 'post',
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
            id : 'shiftAdd',
            type : 2,
            title: '班次新增',
            shadeClose : true,
            area:['30%','60%'],
            content: contextPath+'workplan/shift/toAdd?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser
        });
    });
});

function edit(shiftId){
    layer.open({
        id : 'areaEdit',
        type : 2,
        title: '班次编辑',
        shadeClose : true,
        area:['30%','60%'],
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

    params['owner']=departId;

    queryParams = params;

    return params

}

