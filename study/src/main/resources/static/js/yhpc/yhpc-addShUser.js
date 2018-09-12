$(function () {

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-addShUser').click(function () {
        //新增数据

        httpUtil.postData(
            contextPath+'yhpc/shusers',
            {
                'userId':user_id,
                'userName':user_name,
                'departId':depart_id,
                'departName':depart_name,
                'userType':user_type
            },
            null,
            function(result){
                if(result.code ==200 ){
                    layer.msg('新增成功!');

                    parent.$search.click();

                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                        parent.layer.close(index);//关闭弹出的子页面窗口
                    },500);

                }else{
                    layer.msg('新增失败!');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );

    });



});

