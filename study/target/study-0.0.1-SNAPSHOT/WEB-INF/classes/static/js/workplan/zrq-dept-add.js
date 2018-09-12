var area_str = '';

$(function () {


    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-add').click(function () {
        //验证字段
        var areaName = $('#areaName').val();
        var disturb = $('#disturb').val();
        var areaStr =$('#areaStr').val();

        var areaDesc = $('#areaDesc').val();
        var areaNum = $('#areaNum').val();

        var jgbm= $('#jgbm').val();


        if(areaNum.length==0){
            layer.msg('请输入网格编号!');
            return;
        }

        if(areaDesc.length==0){
            layer.msg('请输入网格描述!');
            return;
        }


        if(areaName.length==0){
            layer.msg('请输入网格名称!');
            return;
        }

        if(areaStr.length==0){
            layer.msg('请在地图上面画网格!');
            return;
        }

        if(jgbm.length==0){
            layer.msg('请选择所属机构!');
            return;
        }

       // alert(departId);
        httpUtil.postData(
            contextPath+'workplan/zrq/dept/add',
            {
                areaName : areaName,
                disturb : disturb,
                areaStr : areaStr,
                areaDesc : areaDesc,
                areaNum : areaNum,
                jgbm : jgbm,
                submitUser : submitUser
            },
            '',
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('新增成功');

                    parent.$search.click();
                    parent.vectorLayer.clear();

                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                        parent.layer.close(index);//关闭弹出的子页面窗口
                    },500);

                }else{
                    //错误提示
                    layer.msg('新增失败');
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
            content: contextPath+'workplan/page/index/depart?departId='+departId
        });
    });

});
