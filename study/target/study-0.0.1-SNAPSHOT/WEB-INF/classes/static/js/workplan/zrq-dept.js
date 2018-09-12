/***对象定义***/
var $table = $('#table');
var $search = $('#search');
var $reset = $('#reset');
var $toAdd = $('#toAdd');
var queryParams = {
    pageNumber: 1,
    pageSize: 10
}
var columns = [
    {
        field: 'areaName',
        title: '名称'
    }, {
        field: 'disturb',
        title: '误差'
    }, {
        field: 'jgmc',
        title: '所属机构'
    }, {
        field: '操作',
        title: '操作',
        formatter: function (value, row, index) {
            var operatorBtn = '<button type="button" class="btn btn-outline-primary btn-sm" onclick="javascript:edit(' + row.areaId + ');">编辑</button>';
            operatorBtn += ' <button type="button" class="btn btn-outline-danger btn-sm"  onclick="javascript:del(' + row.areaId + ');">删除</button>';
            return operatorBtn;
        }
    }];
$(function () {


    /***对象方法绑定***/
    $search.click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'workplan/zrq/dept',
            sortName: 'id',
            striped: true,
            sidePagination: 'server',
            clickToSlect: true,
            pagination: true,
            escape: true,
            cache: false,
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
            },
            onClickRow:function (row) {
               //console.log(row.areaStr);
                if(row.areaStr.length==0){
                    layer.msg('该机构-网格没有网格数据!');
                    return;
                }
                drawPolygon(row.areaStr);
            }
        });
    });

    $search.click();

    $toAdd.click(function () {
        layer.open({
            id: 'areaWorkAdd',
            type: 2,
            title: '机构网格新增',
            shadeClose: true,
            area: ['70%', '80%'],
            content: contextPath + 'workplan/page/add/zrq/dept?departId=' + departId + '&departName=' + departName + '&userType=' + userType + '&submitUser=' + submitUser
        });
    });


});

function edit(areaId) {
    layer.open({
        id: 'areaWorkEdit',
        type: 2,
        title: '机构网格编辑',
        shadeClose: true,
        area: ['70%', '80%'],
        content: contextPath + 'workplan/page/edit/zrq/dept/' + areaId + '?departId=' + departId + '&departName=' + departName + '&userType=' + userType + '&submitUser=' + submitUser
    });
}


function del(areaId) {
    // console.log(areaId);

    httpUtil.delData(
        contextPath + 'workplan/zrq/dept/' + areaId,
        null,
        null,
        null,
        function (res) {
            if (res.code == 200) {
                layer.msg('删除成功');
                $search.click();
            } else {
                layer.msg('删除失败');
            }
        },
        function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('删除失败');
        }
    );
}

function getParam(params) {

    params['jgbm']=departId;

    queryParams = params;

    return params

}