var area_str = '';

$(function () {
    drawPolygon($('#areaStr').val());

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-edit').click(function () {
        //验证字段
        getPoints(polygon.getLngLats()[0]);


       // alert(departId);


        httpUtil.putData(
            contextPath+'workplan/zrq/dept/'+$('#areaId').val(),
            {
                areaId : $('#areaId').val(),
                areaName : $('#areaName').val(),
                areaDesc : $('#areaDesc').val(),
                areaNum : $('#areaNum').val(),

                disturb : $('#disturb').val(),
                areaStr : $('#areaStr').val(),
                jgbm : $('#jgbm').val()

            },
            '',
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('更新成功');

                    parent.$search.click();
                    parent.vectorLayer.clear();

                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                        parent.layer.close(index);//关闭弹出的子页面窗口
                    },500);

                }else{
                    //错误提示
                    layer.msg('更新失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );
    });

    $('#jgmc').click(function () {
        layer.open({
            title:'选择机构',
            id:'chooseDepart',
            type: 2,
            area:['30%','60%'],
            shadeClose : true,
            content: contextPath+'workplan/page/index/depart?departId='+departId+'&jgbm='+$('#jgbm').val()
        });
    });

});
