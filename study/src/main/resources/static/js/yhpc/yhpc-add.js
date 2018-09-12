$(function () {

    $fxdd = $('#select-fxdd');


    if(departId=='320500000000'){
//请求风险地点字典数据
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
                    $fxdd.append('<option value="'+result.data[index].dictCode+'"  data-value="'+result.data[index].dictCode+'">['+result.data[index].dictDepart+']'+result.data[index].dictName+'('+result.data[index].dictCode+')</option>');
                }
                layui.form.render('select'); //刷新select选择框渲染

                //监听下拉选择框选择事件
                layui.form.on('select(fxdd)', function(data){

                    var reg = new RegExp('\].*\\u0028');

                    //console.log(data.elem[data.elem.selectedIndex].text);

                    var text = (data.elem[data.elem.selectedIndex].text).toString();
                    //console.log(typeof text);
                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    // console.log(data.othis); //得到美化后的DOM对象
                    $('#fxdd').val(data.value);


                    var str2 = text.match(reg).toString();

                    //console.log(str2.replace('\]',''));

                    var str3 = (str2.replace('\]','')).replace('\(','');
                   // console.log(str3);
                    $('#fxddmc').val(str3);

                    // console.log(data.value);

                });
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
    }else{
        //请求风险地点字典数据
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
                    $fxdd.append('<option value="'+result.data[index].dictCode+'">'+result.data[index].dictName+'('+result.data[index].dictCode+')</option>');
                }
                layui.form.render('select'); //刷新select选择框渲染

                //监听下拉选择框选择事件
                layui.form.on('select(fxdd)', function(data){
                    //console.log('selected');
                    //console.log(data.value);
                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    // console.log(data.othis); //得到美化后的DOM对象
                    $('#fxdd').val(data.value);
                    var text = (data.elem[data.elem.selectedIndex].text).toString();

                    //alert(text.split('(')[0]);

                    $('#fxddmc').val(text.split('(')[0]);
                    // console.log(data.value);

                });
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
    }




    var laydate = layui.laydate;


    laydate.render({
        elem: '#fxxfsj'
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


    $('#btn-add').click(function () {
        //验证字段


            if($('#fxdd').val().length==0  || $('#fxddmc').val().length==0  || $('#ddms').val().length==0 || $('#fxxfsj').val().length==0  ||$('#fxys').val().length==0){
                layer.msg('请填写完整在录入!');
                return;
            }


        httpUtil.postData(
            contextPath+'yhpc/fxxx',
            {
                ddfzr: departId,
                fxdd : $('#fxdd').val(),
                fxddmc : $('#fxddmc').val(),
                ddms : $('#ddms').val(),
                fxxfsj : $('#fxxfsj').val(),
                fxys : $('#fxys').val(),
                fxxfr : userId,
                zdmj : userId,
                sjly : '1',
                xfzt : '0'
                //,
                //fxshzt : '0'
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
                    },1000);

                }else{
                    //错误提示
                    layer.msg('新增失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );
    });


    $('#btn-addLr').click(function () {
        //验证字段

        httpUtil.putData(
            contextPath+'yhpc/yhxx',
            {
                yhbh : yhbh,
                mjjh : userId,
                mjbm : departId,
                zlqk : $('#zlqk').val()
            },
            null,
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面

                    httpUtil.getData(
                        contextPath+'yhpc/task',
                        {
                            id : yhbh,
                            activitiState : activitiState,
                            taskId : taskId,
                            mjjh : departId,
                            state:'lrzl'
                        },
                        null,
                        null,
                        function (res) {
                            //console.log(res);
                            if(res.code==200){
                                //关闭弹窗 刷新父页面
                                layer.msg('录入治理成功');

                                parent.$search.click();

                                setTimeout(function () {
                                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                                    parent.layer.close(index);//关闭弹出的子页面窗口
                                },500);


                            }else{
                                //错误提示
                                layer.msg('录入治理失败');
                            }
                        },
                        function (XMLHttpRequest, textStatus, errorThrown) {
                            layer.msg('录入治理失败');
                        }
                    );

                }else{
                    //错误提示
                    layer.msg('录入治理失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg('录入治理失败');
            }
        );
    });



    $('#btn-addYh').click(function () {
        //验证字段

        httpUtil.postData(
            contextPath+'yhpc/yhxx',
            {
                yhbh : yhbh,
                mjjh : userId,
                mjbm : departId,
                yhdd : $('#yhdd').val(),
                ddms : $('#ddms').val(),
                yhlx : $('#yhlx').val(),
                cjsj : $('#cjsj').val(),
                cr : $('#cr').val()
            },
            '',
            function (res) {
                //console.log(res);
                if(res.code==200){
                    //关闭弹窗 刷新父页面

                    httpUtil.getData(
                        contextPath+'yhpc/task',
                        {
                            id : yhbh,
                            activitiState : activitiState,
                            taskId : taskId,
                            mjjh : userId
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



                }else{
                    //错误提示
                    layer.msg('新增失败');
                }
            },
            function (XMLHttpRequest, textStatus, errorThrown) {

            }
        );
    });


    $('#btn-xf').click(function () {
        //验证字段

        httpUtil.getData(
            contextPath+'yhpc/task',
            {
                id : id,
                activitiState : activitiState,
                taskId : taskId,
                mjjh : $('#dymj').val()
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




    $('#dymjmc').click(function () {
        layer.open({
            title:'选择用户',
            id:'chooseUser',
            type: 2,
            area:['95%','98%'],
            shadeClose : true,
            content: contextPath+'workplan/page/index/users?departId='+departId+'&multi=false'
        });
    });

});

