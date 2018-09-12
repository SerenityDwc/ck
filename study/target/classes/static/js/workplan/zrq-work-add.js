var area_str = '';

$(function () {
    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-add').click(function () {
        //验证字段

        var areaName = $('#areaName').val();
        var     areaDesc  =  $('#areaDesc').val();
        var     areaNum  =  $('#areaNum').val();
        var    areaStr  =  $('#areaStr').val();
        var    dymj  = $('#dymj').val();

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

        if(dymj.length==0){
            layer.msg('请选择所属机构民警!');
            return;
        }

       // alert(departId);
        httpUtil.postData(
            contextPath+'workplan/zrq/work/add',
            {
                areaName : $('#areaName').val(),
                areaDesc : $('#areaDesc').val(),
                areaNum : $('#areaNum').val(),
                disturb : $('#disturb').val(),
                areaStr : $('#areaStr').val(),
                dymj : $('#dymj').val(),
                fjxm : $('#fjxm').val(),
                leader : $('#leader').val(),
                charter : $('#charter').val(),
                charter_phone : $('#charter_phone').val(),
                note : $('#note').val(),

                owner : $('#owner').val(),
                userType : userType,
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

    $('#dymjmc').click(function () {
        layer.open({
            title:'选择用户',
            id:'chooseUser',
            type: 2,
            area:['30%','60%'],
            shadeClose : true,
            content: contextPath+'workplan/page/index/user?departId='+departId+'&multi=true'
        });
    });



});
