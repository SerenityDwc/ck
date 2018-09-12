$(function () {

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-xf').click(function () {

        //验证字段
        if($('#dymjmc').val().length==0){
            layer.msg('下发机构必须选择');
            return;
        }

        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : $('#dymj').val()
            },
            null,
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){

                    var yj = $('#yj').val();

                    if(yj.length!=0 ){
                        httpUtil.postData(
                            contextPath+'yhpc/xfmjinfo',
                            {
                                yj:yj,
                                id:id
                            },
                            null,
                            function(result){

                            },
                            function(XMLHttpRequest, textStatus, errorThrown){

                            }
                        );
                    }


                    //关闭弹窗 刷新父页面
                    layer.msg('下发民警('+$('#dymj').val()+')成功');

                    parent.$search.click();

                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                        parent.layer.close(index);//关闭弹出的子页面窗口
                    },500);

                }else{
                    //错误提示
                    layer.msg('下发失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );
    });




});

