var installUrl = '';
var $rPMenu = $('#rPMenu');
var $rCMenu = $('#rCMenu');

var weekOfday = moment().format('E');//计算今天是这周第几天
var last_monday = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD');
var last_sunday = moment().subtract(-(7-weekOfday), 'days').format('YYYY-MM-DD');

$('#timeBegin').val(last_monday);
$('#timeEnd').val(last_sunday);

var setting = {
    async: {
        type: 'get',
        enable: true,
        url: contextPath + 'workplan/depart/user',
        autoParam: ["id", "name", "level"],
        otherParam: ["departId", departId, "showUser", "true", "userType", $('#userType').val()],
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
        onRightClick: _onRightClick,
        onClick: _onClick,
        onAsyncSuccess: _onAsyncSuccess
    }
};


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
        title: '值班班次',
        formatter: function (value, row, index) {
            return row.shiftName+'('+row.timeBegin+'-'+row.timeEnd+')';
        }
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

$(function () {



    if(userType=='3'){
        $('#userTypeName').html('辅警');
        $('#userType').val('3');

    }else{
        $('#userTypeName').html('民警')
        $('#userType').val('1');

    }



    // console.log(last_monday);
    // console.log(last_sunday);


    $('#jgbm').val(departId);
    $('#jgmc').val(departName);

    //日期范围
    layui.laydate.render({
        elem: '#timeRange'
        ,range: true
        ,value: last_monday+' - '+last_sunday //必须遵循format参数设定的格式
        ,done: function(value, date){
            //console.log(value.split(' - ')[0]);
            //console.log(value.split(' - ')[1]);

            $('#timeBegin').val(value.split(' - ')[0]);
            $('#timeEnd').val(value.split(' - ')[1]);

        }
    });


    //请求登录用户的机构及下属机构和人员数据
    $.fn.zTree.init($("#watcherList"), setting);

    $('#search').click(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'workplan/duty',
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


    //依据userType的状态修改右上角的状态
    $('#userType').val(userType);
    if(userType==1){
        $('#userTypeName').html('民警');
    }else{
        $('#userTypeName').html('辅警');
    }

    //数据导出
    $('#export').click(function () {
        var params = {};

        if($('#mjjh').val().length>0){
            params['userId'] = $('#mjjh').val();
            params['departId'] = '';
            params['userType'] = '';

        }else{
            params['userId'] = '';
            params['departId'] = departId;
            params['userType'] = $('#userType').val();
            // params['departName'] = departName;

        }

        params['timeBegin'] = $('#timeBegin').val();
        params['timeEnd'] = $('#timeEnd').val();

        params.url = contextPath + 'workplan/duty/export';
        params.columns = JSON.stringify(columns);
        exportData.doExport(params)
    });

});

function _onClick(event, treeId, treeNode) {


    var weekOfday = moment().format('E');//计算今天是这周第几天
    var last_monday = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD');
    var last_sunday = moment().subtract(-(7-weekOfday), 'days').format('YYYY-MM-DD');

    $('#timeBegin').val(last_monday);
    $('#timeEnd').val(last_sunday);


    //是部门的才进行数据检索12位机构
    if (treeNode.id.length == 12) {


        $('#departId').val(treeNode.id)
        $('#departName').val(treeNode.name)

        $('#jgbm').val(treeNode.id);
        $('#jgmc').val(treeNode.name);

        $('#userId').val('');
        $('#userName').val('');

        $('#mjjh').val('');
        $('#mjxm').val('');

        $('#jg').removeClass('d-none');
        $('#mj').addClass('d-none');

        //alert(treeNode.id + ", " + treeNode.name);
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'workplan/duty',
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
                return {
                    'total': result.data.total,
                    'rows': result.data.list
                }
            }
        });

    } else {//点击民警

        $('#userId').val(treeNode.id);
        $('#userName').val(treeNode.name);

        $('#mjjh').val(treeNode.id);
        $('#mjxm').val(treeNode.name);




        $('#departId').val('');
        $('#departName').val('');

        $('#jgbm').val('');
        $('#jgmc').val('');

        $('#mj').removeClass('d-none');
        $('#jg').addClass('d-none');

        //alert(treeNode.id + ", " + treeNode.name);
        $table.bootstrapTable('destroy').bootstrapTable({
            url: contextPath + 'workplan/duty/user',
            sortName: 'id',
            striped: true,
            sidePagination: 'server',
            clickToSlect: true,
            pagination: true,
            cache: false,
            escape: true,
            uniqueId: 'id',
            queryParams: getParamsUser,
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

    }
}

function getParamsUser(params) {

    params['userId'] = $('#userId').val();

    params['timeBegin'] = $('#timeBegin').val();
    params['timeEnd'] = $('#timeEnd').val();

    queryParams = params;

    return params

}

function getParamsDepart(params) {

    // $('#toolbar').find('input[name]').each(function () {
    //     if($(this).val()!='' && $(this).attr('name')=='departId'){
    //         params['departId'] = $(this).val();
    //     }else{
    //         params['departId'] = departId;
    //     }
    // });

    //console.log($('#departId').val());
    params['departId'] = $('#departId').val() == "" || $('#departId').val() == null ? departId : $('#departId').val();
    params['userType'] = $('#userType').val();
    params['timeBegin'] = $('#timeBegin').val();
    params['timeEnd'] = $('#timeEnd').val();

    queryParams = params;

    return params

}


// 在ztree上的右击事件
function _onRightClick(event, treeId, treeNode) {

    if (treeNode.id.length == 12) {
        $('#departId').val(treeNode.id)
        $('#departName').val(treeNode.name)
        showrRMenu("Parent", event.clientX, event.clientY);
    } else {
        showrRMenu("Child", event.clientX, event.clientY);
    }

}

//显示右键菜单
function showrRMenu(type, x, y) {
    if (type === 'Parent') {
        $("#rPMenu ul").show();
        $rPMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
        $("body").bind("mousedown", onBodyMouseDown);
    } else if (type === 'Child') {
        // $("#rCMenu ul").show();
        // $rCMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"}); //设置右键菜单的位置、可见
        // $("body").bind("mousedown", onBodyMouseDown);
    }
}

//鼠标按下事件
function onBodyMouseDown(event) {
    if ((event.target.id == "rPMenu" || $(event.target).parents("#rPMenu").length > 0)) {
        $rPMenu.css({"visibility": "hidden"});
    } else if ((event.target.id == "rCMenu" || $(event.target).parents("#rCMenu").length > 0)) {
        $rCMenu.css({"visibility": "hidden"});
    }
}

function goWorkPlan() {
    window.location.href = contextPath + 'workplan/schedule/index?rootDepartId='+departId+'&departId=' + $('#departId').val() + '&departName=' + $('#departName').val() + '&userType=' + $('#userType').val() + '&submitUser=' + submitUser;

}

function goShift() {
    //alert('goShift');
    window.location.href = contextPath + 'workplan/shift/index?departId='+departId+'&departName='+departName+'&userType='+$('#userType').val()+'&submitUser='+submitUser ;
}

function goArea() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/position/index?departId='+departId+'&departName='+departName+'&userType='+$('#userType').val()+'&submitUser='+submitUser ;
}

function goZrqWork() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/page/index/zrq/work?departId='+departId+'&departName='+departName+'&userType='+$('#userType').val()+'&submitUser='+submitUser ;
}

function goZrqDept() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/page/index/zrq/dept?departId='+departId+'&departName='+departName+'&userType='+$('#userType').val()+'&submitUser='+submitUser ;
}

function toggleUserType(){
    var userTypeName = $('#userTypeName').html();




    //console.log(userTypeName);
    if(userTypeName=='民警'){
        $('#userTypeName').html('辅警');
        $('#userType').val('3');
        $('#search').click();

    }else{
        $('#userTypeName').html('民警')
        $('#userType').val('1');
        $('#search').click();

    }


    //console.log($('#userType').val());

    setting = {
        async: {
            type: 'get',
            enable: true,
            url: contextPath + 'workplan/depart/user',
            autoParam: ["id", "name", "level"],
            otherParam: ["departId", departId, "showUser", "true", "userType", $('#userType').val()],
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
            onRightClick: _onRightClick,
            onClick: _onClick,
            onAsyncSuccess: _onAsyncSuccess
        }
    };

    $.fn.zTree.destroy("#watcherList");//先销毁旧树
    $.fn.zTree.init($("#watcherList"), setting);
}




