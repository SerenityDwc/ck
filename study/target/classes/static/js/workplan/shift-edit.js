$(function () {
    $shiftType = $('#select-shiftType');
    $timeBegin = $('#timeBegin');
    $timeEnd = $('#timeEnd');
    var laydate = layui.laydate;

    laydate.render({
        elem: '#timeBegin'
        ,type: 'time'
        ,format: 'HH:mm' //可任意组合，
        ,done: function(value, date, endDate){
            //console.log(value.trim());
        }
    });

    laydate.render({
        elem: '#timeEnd'
        ,type: 'time'
        ,format: 'HH:mm' //可任意组合，
        ,done: function(value, date, endDate){
            //console.log(value.trim());
        }
    });

    //请求班次类型字典数据
    httpUtil.getData(
        contextPath+'dict/download/SHIFTTYPE',
        null,
        null,
        null,
        function(result){
            for(var $option_key in result){
                // console.log($option_key);
                // console.log(result[$option_key]);
                //将数据刷新到下拉框中

                if($option_key==$('#shiftType').val()){
                    $shiftType.append('<option selected value="'+$option_key+'">'+result[$option_key]+'</option>');
                }else{
                    $shiftType.append('<option value="'+$option_key+'">'+result[$option_key]+'</option>');
                }
            }
            layui.form.render('select'); //刷新select选择框渲染

            //监听下拉选择框选择事件
            layui.form.on('select(shiftType)', function(data){
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(data.value); //得到被选中的值
                // console.log(data.othis); //得到美化后的DOM对象
                $('#shiftType').val(data.value);
            });
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-edit').click(function () {
        //验证字段


       // alert(departId);


        httpUtil.putData(
            contextPath+'workplan/shift/'+$('#shiftId').val(),
            {

                shiftId : $('#shiftId').val(),
                shiftType : $('#shiftType').val(),
                timeBegin : $('#timeBegin').val(),
                timeEnd : $('#timeEnd').val(),
                shiftName : $('#shiftName').val(),
                shiftDesc : $('#shiftDesc').val()

            },
            '',
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面
                    layer.msg('新增成功');

                    parent.$search.click();

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

});
