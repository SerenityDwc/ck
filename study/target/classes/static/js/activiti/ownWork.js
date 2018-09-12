/***对象定义***/
var $table = $('#table');
var $search = $('#search');
var queryParams = {
    pageNumber: 1,
    pageSize: 15
}
var columns = [
    {
        field: 'id',
        title: '请假序号',
    },
    {
        field: 'qjr',
        title: '请假人'
    },
    {
        field: 'qjsj',
        title: '请假时间',

    },
    {
        field: 'qjyy',
        title: '请假原因',
        // formatter: function (value, row, index) {
        // }
    },
    {
        field: 'qjts',
        title: '请假天数'
    },
    {
        title: '操作',
        formatter:function (value,row,index) {
            button+='<button class="btn btn-outline-warning btn-sm" id="sp" onclick="javascript:sp('+row.id+');">审批</button>&nbsp;';
            button+='<button class="btn btn-outline-primary btn-sm" id="lct" onclick="javascript:lct('+row.id+');">流程图</button>&nbsp;';
            return button;
        }
    }

];


$(function () {

    $('#search').click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'activiti/ownWorklb',
            sortName: 'id',
            striped: true,
            sidePagination: 'server',
            clickToSlect: true,
            pagination: true,
            cache: false,
            escape: true,
            uniqueId: 'id',
            queryParams: getParamsDepart,
            method: 'get',
            toolBar: '#toolBar',
            columns: columns,
            queryParamsType: 'undefined',
            responseHandler: function (result) {
                //有数据那么就显示导出数据按钮
                if(result.data.list.length>0){
                    $('#export').removeClass("d-none");
                }else{
                    $('#export').addClass("d-none");
                }

                return {
                    'total': result.data.total,
                    'rows': result.data.list
                }
            }
        });
    });


    $('#search').click();


    //数据导出
    $('#export').click(function () {
        var params = {};

        params.url = contextPath + 'activiti/qjlb/export';
        params.columns = JSON.stringify(columns);
        exportData.doExport(params)
    });

    function getParamsDepart(params) {

        // $('#toolbar').find('input[name]').each(function () {
        //     if($(this).val()!='' && $(this).attr('name')=='departId'){
        //         params['departId'] = $(this).val();
        //     }else{
        //         params['departId'] = departId;
        //     }
        // });

        //console.log($('#departId').val());
        // params['departId'] = $('#departId').val() == "" || $('#departId').val() == null ? departId : $('#departId').val();
        // params['userType'] = $('#userType').val();
        // params['timeBegin'] = $('#timeBegin').val();
        // params['timeEnd'] = $('#timeEnd').val();

        queryParams = params;

        return params

    }


    $('#insert').click(function () {
        layer.open({
            id : 'areaInsert',
            type : 2,
            title: '新增请假',
            shadeClose : true,
            area: ['40%', '50%'],
            content: contextPath+'activiti/page/insert'
        });
    });
});

function sp(id) {
    alert("点击了审批！");
}

function deleteQj() {
    alert("点击了删除");
}

function qdlc(id) {

    httpUtil.getData(
        contextPath + 'activiti/kqlc/' + id,
        null,
        null,
        null,
        function (res) {
            if (res.code == 200) {
                layer.msg('工作流启动成功');
                $search.click();
            } else {
                layer.msg('工作流启动失败');
            }
        },
        function (XMLHttpRequest, textStatus, errorThrown) {

        }
    );
}

function lct() {
    alert("点击了删除");
}



