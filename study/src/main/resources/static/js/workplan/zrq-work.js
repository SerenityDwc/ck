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
    // {
    //     field : 'checked',
    //     checkbox : true
    // },
    {
        field: 'areaName',
        title: '名称'
    }, {
        field: 'areaDesc',
        title: '描述'
    }, {
        field: 'disturb',
        title: '误差'
    }
    // , {
    //     field: 'dymj',
    //     title: '所属民警'
    // }
    ,{
        // }, {
        //     field: 'leader',
        //     title: '警务区警长'
        // }, {
        //     field: 'charter',
        //     title: '捆绑中队领导'
        // }, {
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
            url: contextPath + 'workplan/zrq/work/'+userType,
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
               // console.log(row.areaStr);

                if(row.areaStr.length==0){
                    layer.msg('该民警-网格没有网格数据!');
                    return;
                }




                drawPolygon(row.areaStr);

                drawWgys(row.areaId);
            }
        });
    });

    $search.click();

    $toAdd.click(function () {
        layer.open({
            id: 'areaWorkAdd',
            type: 2,
            title: '民警网格新增',
            shadeClose: true,
            area: ['95%', '95%'],
            content: contextPath + 'workplan/page/add/zrq/work?departId=' + departId + '&departName=' + departName + '&userType=' + userType + '&submitUser=' + submitUser
        });
    });
});

function edit(areaId) {
    layer.open({
        id: 'areaWorkEdit',
        type: 2,
        title: '民警网格编辑',
        shadeClose: true,
        area: ['95%', '95%'],
        content: contextPath + 'workplan/page/edit/zrq/work/' + areaId + '?departId=' + departId + '&departName=' + departName + '&userType=' + userType + '&submitUser=' + submitUser
    });
}


function del(areaId) {
    // console.log(areaId);

    httpUtil.delData(
        contextPath + 'workplan/zrq/work/' + areaId,
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

    params['owner']=departId;

    queryParams = params;

    return params

}


function drawWgys(areaId){
    //查询网格元素 然后进行标注
    httpUtil.getData(
        contextPath+'workplan/wgys',
        {
            "areaId":areaId
        },
        null,
        null,
        function(result){
            if(result.code ==200 && result.data.length>0){
                vectorLayer_wgys.clear();
                for(var i in result.data){//画已经存在的网格元素


                    //console.log(i);


                    var wgys =result.data[i];
                    //console.log(wgys.areaStr);

                    if(wgys.type == 1){
                        continue;
                    }

                    // console.log(wgys.areaStr);
                    var point;
                    if(wgys.areaType == 'Point'){
                        if(wgys.type == 1){
                            // point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img class="wgysIcon" style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;" data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/wmzyz.png"  />'));
                            //
                            // if(point.getTooltip()==null){
                            //     if(wgys.ysXm.length==0){
                            //         point.bindTooltip(wgys.typename+'(无)');
                            //     }else{
                            //         point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                            //     }
                            // }

                        }else if(wgys.type == 2){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/gfzddw.png"  />'));


                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                        }else if(wgys.type == 3){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/zdsflk.png"  />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                        }else if(wgys.type == 4){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/zdytqy.png" />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }

                        }else if(wgys.type == 5){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/pcszy.png" />'));

                            if(point.getTooltip()==null){
                                if(wgys.ysXm.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                }
                            }
                        }

                        if(wgys.type != 1){
                            vectorLayer_wgys.addOverlay(point);
                        }



                    }else if(wgys.areaType == 'Polyline'){
                        var polyline = new GL.Polyline(wgys.areaStr, new GL.Style({ color: '#ff0000' }, true));
                        vectorLayer_wgys.addOverlay(polyline);

                        if(wgys.type == 6){
                            point = new GL.Point(wgys.areaStr.split(';')[0],new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" src="/'+app.path+'/img/workplan/wgys/active/zdsfld.png" />'));


                            if(point.getTooltip()==null){
                                if(wgys.ysMc.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                }
                            }



                            vectorLayer_wgys.addOverlay(point);
                        }

                    }
                }


            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}