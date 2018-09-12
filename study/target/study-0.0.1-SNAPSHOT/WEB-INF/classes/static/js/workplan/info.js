$(function () {
    //日期范围
    layui.laydate.render({
        elem: '#timeRange'
        ,range: true
    });




    /***对象定义***/
    var $table = $('#table');
    var queryParams = {
        pageNumber: 1,
        pageSize: 15
    }
    var columns = [
        {
            field: 'dutyDate',
            title: '值班日期',
            formatter: function (value, row, index) {
                return moment(value).format('YYYY-MM-DD');
            }
        },
        {
            field: 'areaName',
            title: '值班岗位'
        },
        {
            field: 'shiftName',
            title: '值班班次'
        },
        {
            field: 'userName',
            title: '值班人员',
            formatter: function (value, row, index) {
                return row.userName+'('+row.userId+')';
            }
        },
        {
            field: 'bz',
            title: '备注'
        }
    ];


    $table.bootstrapTable({
        url: contextPath + 'workplan/info',
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
        showExport: true,  //是否显示导出按钮
        buttonsAlign:"right",  //按钮位置
        exportTypes:['excel'],  //导出文件类型
        queryParamsType: 'undefined',
        responseHandler: function (result) {
            return {
                'total': result.data.total,
                'rows': result.data.list
            }
        }
    });

    // var params = queryParams;
    // params.url = contextPath + 'workplan/export/info';
    // params.type = 'excel';
    // params.columns = JSON.stringify(columns);
    // exportData.doExport(params)

});

function getParam(params) {

    queryParams = params;

    return params

}


