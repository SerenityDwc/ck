$(function () {

    $yhdd = $('#select-yhdd');

    $yhlx = $('#select-yhlx');

    $cr = $('#select-cr');


    if(departId=='320500000000'){
//请求隐患地点字典数据
        httpUtil.getData(
            contextPath+'dict/query',
            {
                dictName:'YHDD',
                dictDepart:''
            },
            null,
            null,
            function(result){
                for(var index in result.data){
                    //console.log($option_key);
                    // console.log(result[$option_key]);
                    //将数据刷新到下拉框中
                    $yhdd.append('<option value="'+result.data[index].dictCode+'">'+result.data[index].dictName+'('+result.data[index].dictCode+')</option>');
                }
                layui.form.render('select'); //刷新select选择框渲染

                //监听下拉选择框选择事件
                layui.form.on('select(yhdd)', function(data){
                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    // console.log(data.othis); //得到美化后的DOM对象
                    $('#yhdd').val(data.value);

                    // console.log(data.value);

                });
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
    }else{
        //请求隐患地点字典数据
        httpUtil.getData(
            contextPath+'dict/query',
            {
                dictName:'YHDD',
                dictDepart:departId
            },
            null,
            null,
            function(result){
                for(var index in result.data){
                    //console.log($option_key);
                    // console.log(result[$option_key]);
                    //将数据刷新到下拉框中
                    $yhdd.append('<option value="'+result.data[index].dictCode+'">'+result.data[index].dictName+'('+result.data[index].dictCode+')</option>');
                }
                layui.form.render('select'); //刷新select选择框渲染

                //监听下拉选择框选择事件
                layui.form.on('select(yhdd)', function(data){
                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    // console.log(data.othis); //得到美化后的DOM对象

                    $('#yhdd').val(data.value);

                    var text = (data.elem[data.elem.selectedIndex].text).toString();

                    //alert(text.split('(')[0]);

                    $('#yhddmc').val(text.split('(')[0]);

                    // console.log(data.value);

                });
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
    }



    //请求隐患类型字典数据
    httpUtil.getData(
        contextPath+'dict/download/YHLX',
        null,
        null,
        null,
        function(result){
            for(var $option_key in result){
                // console.log($option_key);
                // console.log(result[$option_key]);
                //将数据刷新到下拉框中
                $yhlx.append('<option value="'+$option_key+'">'+result[$option_key]+'</option>');
            }
            layui.form.render('select'); //刷新select选择框渲染

            //监听下拉选择框选择事件
            layui.form.on('select(yhlx)', function(data){
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(data.value); //得到被选中的值
                // console.log(data.othis); //得到美化后的DOM对象
                $('#yhlx').val(data.value);

               // console.log(data.value);

            });
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );



    //请求CR字典数据
    httpUtil.getData(
        contextPath+'dict/download/CR',
        null,
        null,
        null,
        function(result){
            for(var $option_key in result){
                // console.log($option_key);
                // console.log(result[$option_key]);
                //将数据刷新到下拉框中
                $cr.append('<option value="'+$option_key+'">'+result[$option_key]+'</option>');
            }
            layui.form.render('select'); //刷新select选择框渲染

            //监听下拉选择框选择事件
            layui.form.on('select(cr)', function(data){
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(data.value); //得到被选中的值
                // console.log(data.othis); //得到美化后的DOM对象
                $('#cr').val(data.value);
               // console.log(data.value);


            });
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );


    var laydate = layui.laydate;

    laydate.render({
        elem: '#cjsj'
        ,type: 'datetime'
        ,value: moment().format('YYYY-MM-DD HH:mm:ss')
        ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合，
        ,done: function(value, date, endDate){
            //console.log(value.trim());
        }
    });

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    //监听提交
    layui.form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
    });

    $('#btn-addYh').click(function () {


        //alert($('#yhddmc').val());


        if($('#yhdd').val().length==0  || $('#ddms').val().length==0 || $('#yhlx').val().length==0  ||$('#cjsj').val().length==0||$('#cr').val().length==0){
            layer.msg('请填写完整在录入!');
            return;
        }

        httpUtil.postData(
            contextPath+'yhpc/yhxx',
            {
                yhbh : yhbh,
                mjjh : userId,
                mjbm : departId,
                zdbm : departId,
                yhdd : $('#yhdd').val(),
                yhddmc : $('#yhddmc').val(),
                ddms : $('#ddms').val(),
                yhlx : $('#yhlx').val(),
                cjsj : $('#cjsj').val(),
                cr : $('#cr').val()
            },
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){


                    //console.log(onlyLr == 'false');
                   // console.log(typeof onlyLr);




                    if(onlyLr == 'false'){
                        httpUtil.getData(
                            contextPath+'yhpc/task',
                            {
                                id : yhbh,
                                activitiState : activitiState,
                                taskId : taskId,
                                mjjh : userId,
                                state : 'lryh'
                            },
                            null,
                            null,
                            function (res) {
                                //console.log(res);
                                if(res.code==200){
                                    //关闭弹窗 刷新父页面
                                    layer.msg('执行成功');

                                    parent.$search.click();

                                    setTimeout(function () {
                                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                                        parent.layer.close(index);//关闭弹出的子页面窗口
                                    },500);

                                }else{
                                    //错误提示
                                    layer.msg('执行失败');
                                }
                            },
                            function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg('执行失败');
                            }
                        );
                    }else{
                        layer.msg('执行成功');

                        parent.$search.click();

                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                            parent.layer.close(index);//关闭弹出的子页面窗口
                        },500);
                    }



                }else{
                    //错误提示
                    layer.msg('新增失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg('新增失败');
            }
        );
    });


});

