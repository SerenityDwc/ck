$(function () {

    layui.formSelects.btns('znbm', []).config('znbm', {
        beforeSuccess: function(id, url, searchVal, result){
            //然后返回数据
            var attr = [];

            for(var $option_key in result){
                // console.log($option_key);
                // console.log(result[$option_key]);
                //将数据刷新到下拉框中

                var op = new Object();
                op.name = result[$option_key];
                op.value = $option_key;
                attr.push(op);

            }

            return attr;
        }
    }).data('znbm', 'server', {
        url: contextPath+'dict/download/ZNBM'
    });


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
                    //关闭弹窗 刷新父页面

                    var znbm = layui.formSelects.value('znbm', 'valStr');
                    var yj = $('#yj').val();

                    // console.log(znbm);
                    // console.log(yj);

                    if(znbm.length!=0 || yj.length!=0 ){
                        httpUtil.postData(
                            contextPath+'yhpc/xfddinfo',
                            {
                                znbm:znbm,
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

                    layer.msg('下发机构('+$('#dymj').val()+')成功');

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

