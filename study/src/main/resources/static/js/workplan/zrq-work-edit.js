var area_str = '';

var $table = $('#table');

var type = '';

$(function () {

    $('#btn-add').click(function () {
        add(areaId,type);
    });

    drawPolygon($('#areaStr').val());

    $('#btn-cancel').click(function () {
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);//关闭弹出的子页面窗口
    });

    $('#btn-edit').click(function () {
        //验证字段
        getPoints(polygon.getLngLats()[0]);

        httpUtil.putData(
            contextPath+'workplan/zrq/work/'+$('#areaId').val(),
            {
                areaId : $('#areaId').val(),
                areaName : $('#areaName').val(),
                areaDesc : $('#areaDesc').val(),

                disturb : $('#disturb').val(),
                areaStr : $('#areaStr').val(),
                dymj : $('#dymj').val(),
                fjxm : $('#fjxm').val(),
                leader : $('#leader').val(),
                charter : $('#charter').val(),
                charter_phone : $('#charter_phone').val(),
                note : $('#note').val()
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


    drawWg();


    //查询网格元素类型
    var wgysType = 'WGYSTYPE';
    //异步请求工作项字典数据
    httpUtil.getData(
        contextPath+'dict/download/'+wgysType,
        null,
        null,
        null,
        function(result){
            if(result!=null && result!='{ }'){

                var unActiveImgUrl = '/'+app.path+'/img/workplan/wgys/unactive/';
                var activeImgUrl = '/'+app.path+'/img/workplan/wgys/active/';

                for (var data in result)
                {
                    // $('#wgys-item').append('<i class="iconfont icon-xiugaitouxiang wgys-icon" title="'+result[data]+'" data-type="'+data+'"  data-type-name="'+result[data]+'"/>');
                    var imgUrl = '/'+app.path+'/img/workplan/wgys/unactive/';
                    var imgIcon = '';
                    if(data == 1){
                        imgUrl+='wmzyz.png';
                        imgIcon='wmzyz.png';
                    }else if(data == 2){
                        imgUrl+='gfzddw.png';
                        imgIcon='gfzddw.png';
                    }else if(data == 3){
                        imgUrl+='zdsflk.png';
                        imgIcon='zdsflk.png';
                    }else if(data == 4){
                        imgUrl+='zdytqy.png';
                        imgIcon='zdytqy.png';
                    }else if(data == 5){
                        imgUrl+='pcszy.png';
                        imgIcon='pcszy.png';
                    }else if(data == 6){
                        imgUrl+='zdsfld.png';
                        imgIcon='zdsfld.png';
                    }


                    // if(data!=5){
                    //     $('#wgys-item').append('<img class="wgys-icon"  src="'+imgUrl+'" title="'+result[data]+'" data-type="'+data+'" style="width: 30px;height: 30px;" data-icon-name="'+imgIcon+'"  data-type-name="'+result[data]+'"/>');
                    // }


                }

                //添加点击事件
                $('.wgys-icon').each(function () {
                    var $_this = $(this);
                    $(this).click(function () {
                        //console.log('点击图标');
                        var wgysType = $_this.data('type');
                        var wgysTypeName = $_this.data('typeName');
                        // //console.log(wgysTypeName);
                        // if(wgysType == '1' || wgysType == '2' || wgysType == '3' || wgysType == '4' || wgysType == '5'){//point
                        //     //alert('画点');
                        //     drawPolyPoint();
                        //     type = wgysType;
                        //     typeName = wgysTypeName;
                        // }else if(wgysType == '6'){//polyline
                        //     //alert('划线');
                        //     drawPolyline();
                        //     type = wgysType;
                        //     typeName = wgysTypeName;
                        // }else{//polygon
                        //     type = wgysType;
                        //     typeName = wgysTypeName;
                        //}



                        queryWgys(wgysType);

                        type = wgysType;


                        //点击类型图标  显示相应的查询结果
                        // httpUtil.getData(
                        //     contextPath+'workplan/wgys/type',
                        //     {
                        //         type : wgysType
                        //     },
                        //     null,
                        //     null,
                        //     function(result){
                        //         alert(result);
                        //     },
                        //     function(XMLHttpRequest, textStatus, errorThrown){
                        //
                        //     }
                        // );


                    });

                    // $(this).mouseover(function () {
                    //     $_this.attr('src',activeImgUrl+$_this.data('iconName'));
                    // });
                    //
                    // $(this).mouseleave(function () {
                    //     $_this.attr('src',unActiveImgUrl+$_this.data('iconName'));
                    // });
                });
            }else{
                layer.msg('获取网格元素失败!');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            layer.msg('获取网格元素失败!');
        }
    );


    $('#dymjmc').click(function () {
        layer.open({
            title:'选择用户',
            id:'chooseUser',
            type: 2,
            area:['30%','60%'],
            shadeClose : true,
            content: contextPath+'workplan/page/index/user?departId='+departId+'&multi=true&dymj='+$('#dymj').val()+'&owner='+owner
        });
    });


    //查询该网格的民警信息  然后设置名称 这里树妖设置名称
    httpUtil.getData(
        contextPath+'workplan/ztree/choosed',
        {
            'dymj':dymj
        },
        null,
        null,
        function(result){
            if(result.code ==200 && result.data.length>0){
                //设置选中
                var fyxm='' ;
                for(var index in result.data){
                    if(index!=0){
                        fyxm+=',';
                    }
                    fyxm+=result.data[index].fjxm;

                    //console.log(result.data[index].dymj);
                }
                $('#dymjmc').val(fyxm);
                $('#dymjmc').attr('title',fyxm);
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

});

var queryParams = {
    pageNumber: 1,
    pageSize: 10
}


function queryWgys(wgysType){

    var columns;

    if(wgysType == '1'){//志愿者
         columns = [
            {
                field: 'ysDd',
                title: '执勤地点'
            },
            {
                field: 'ysXm',
                title: '姓名'
            },
            {
                field: 'ysLxfs',
                title: '联系方式'
            },
            {
                field: 'ysZqsj',
                title: '执勤时间'
            },
            {
                field: 'ysFzr',
                title: '负责人'
            },
            {
                field: '操作',
                title: '操作',
                formatter: function (value, row, index) {
                    var html = '<button class="btn btn-outline-info btn-sm" onclick="javascript:edit('+row.ysId+');">修改</button><button class="btn btn-outline-danger btn-sm" onclick="javascript:del('+row.ysId+');">删除</button>';
                    return html;
                }
            }
        ];
    }else if(wgysType == '2'){//重点保障单位  (高峰重点单位）
         columns = [
            {
                field: 'ysMc',
                title: '单位名称'
            },
            {
                field: 'ysXm',
                title: '派出所民警'
            },
            {
                field: 'ysLxfs',
                title: '联系电话'
            },
             {
                 field: '操作',
                 title: '操作',
                 formatter: function (value, row, index) {
                     var html = '<button class="btn btn-outline-info btn-sm"  onclick="javascript:edit('+row.ysId+');">修改</button><button class="btn btn-outline-danger btn-sm" onclick="javascript:del('+row.ysId+');">删除</button>';
                     return html;
                 }
             }
        ];
    }else if(wgysType == '3'){//重点示范路口
         columns = [
            {
                field: 'ysMc',
                title: '路口名称'
            },
            {
                field: 'ysXm',
                title: '责任民警'
            },
            {
                field: 'ysGfjls',
                title: '高峰警力数'
            },
             {
                 field: '操作',
                 title: '操作',
                 formatter: function (value, row, index) {
                     var html = '<button class="btn btn-outline-info btn-sm"  onclick="javascript:edit('+row.ysId+');">修改</button><button class="btn btn-outline-danger btn-sm" onclick="javascript:del('+row.ysId+');">删除</button>';
                     return html;
                 }
             }
        ];
    }else if(wgysType == '4'){//重点源头企业
         columns = [
            {
                field: 'ysMc',
                title: '企业名称'
            },
            {
                field: 'ysDd',
                title: '企业地址'
            },
            {
                field: 'ysFzr',
                title: '企业负责人'
            },
            {
                field: 'ysLxfs',
                title: '联系方式'
            },
             {
                 field: 'ysSsxz',
                 title: '所属性质'
             },
             {
                 field: '操作',
                 title: '操作',
                 formatter: function (value, row, index) {
                     var html = '<button class="btn btn-outline-info btn-sm"  onclick="javascript:edit('+row.ysId+');">修改</button><button class="btn btn-outline-danger btn-sm" onclick="javascript:del('+row.ysId+');">删除</button>';
                     return html;
                 }
             }
        ];
    }else if(wgysType == '5'){//

    }else if(wgysType == '6'){//重点示范路段
         columns = [
            {
                field: 'ysLdfw',
                title: '路段范围'
            },
            {
                field: 'ysXm',
                title: '责任民警'
            },
            {
                field: 'ysXljls',
                title: '巡逻警力数'
            },
             {
                 field: '操作',
                 title: '操作',
                 formatter: function (value, row, index) {
                     var html = '<button class="btn btn-outline-info btn-sm"  onclick="javascript:edit('+row.ysId+');">修改</button><button class="btn btn-outline-danger btn-sm" onclick="javascript:del('+row.ysId+');">删除</button>';
                     return html;
                 }
             }
        ];
    }

    $table.bootstrapTable('destroy').bootstrapTable({
        url: contextPath + 'workplan/wgys/type',
        sortName: 'id',
        striped: true,
        sidePagination: 'server',
        clickToSlect: true,
        pagination: true,
        escape: true,
        cache: false,
        uniqueId: 'id',
        queryParams: function(params) {

            params['type']=wgysType;

            params['areaid']=$('#areaId').val();

            queryParams = params;

            return params;
        },
        method: 'get',
        toolBar: '#toolBar',
        columns: columns,
        queryParamsType: 'undefined',
        responseHandler: function (result) {

            $('#btn-add').removeClass('d-none');

            return {
                'total': result.data.total,
                'rows': result.data.list
            }
        }
    });
}

function add(areaId,wgysType){

    //console.log('areaId='+areaId+',wgysType='+wgysType)

    //弹出修改元素界面  依据自己特定字段进行显示
    layer.open({
        id: 'toAddWygs',
        type: 2,
        title: '网格元素新增',
        shadeClose: true,
        area: ['80%', '80%'],
        content: contextPath + 'workplan/page/add/wgys?areaId='+areaId+'&wgysType='+wgysType+'&owner='+owner+'&departId='+departId+'&departName='+departName
    });
}

function edit(ysId){
    //弹出修改元素界面  依据自己特定字段进行显示
    layer.open({
        id: 'toEditWygs',
        type: 2,
        title: '网格元素编辑',
        shadeClose: true,
        area: ['80%', '80%'],
        content: contextPath + 'workplan/page/edit/wgys?ysId='+ysId+'&owner='+owner+'&departId='+departId+'&departName='+departName
    });
}

function del(ysId){

    layer.confirm('确定删除该网格元素？', {
        btn: ['确定', '取消'] //可以无限个按钮
    }, function(index, layero){
        httpUtil.delData(
            contextPath+'workplan/wgys/'+ysId,
            null,
            null,
            null,
            function(result){
                if(result.code ==200){
                    layer.msg('删除成功!');

                    //刷新table
                    $table.bootstrapTable('refresh');

                }else{
                    layer.msg('删除失败!');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
    }, function(index){
        //关闭弹出询问窗口
    });
}


function addWgys(ysId,ysType) {
    var ysXm = $('#ysXm').val();
    var ysDd = $('#ysDd').val();
    var ysLxfs = $('#ysLxfs').val();
    var ysZqsj = $('#ysZqsj').val();
    var ysMc = $('#ysMc').val();
    var ysFzr = $('#ysFzr').val();
    var ysSsxz = $('#ysSsxz').val();
    var ysZydw = $('#ysZydw').val();

    //验证元素

    if(ysType=='1'){
        if(ysXm.length==0 || ysDd.length==0  || ysLxfs.length==0  ||ysZqsj.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }else if(ysType=='2'){
        if(ysMc.length==0 || ysDd.length==0  || ysFzr.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }else if(ysType=='3'){
        if(ysMc.length==0 || ysFzr.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }else if(ysType=='4'){
        if(ysMc.length==0 || ysDd.length==0  || ysSsxz.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }else if(ysType=='5'){
        if(ysXm.length==0 || ysDd.length==0  || ysZydw.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }else if(ysType=='6'){
        if(ysMc.length==0  || ysFzr.length==0 ){
            layer.msg('请填写完整!');
            return;
        }
    }


    httpUtil.putData(
        contextPath+'workplan/wgys',
        {
            'ysId':ysId,

            'ysMc':ysMc,
            'ysXm':ysXm,
            'ysDd':ysDd,
            'ysLxfs':ysLxfs,
            'ysZqsj':ysZqsj,
            'ysFzr':ysFzr,
            'ysSsxz':ysSsxz,
            'ysZydw':ysZydw

        },
        null,
        function(result){

            //console.log(result);


            if(result.code==200){

               // console.log('2121');

                layer.msg('更新成功!');

            $('#btn-edit').css('display','none');

                //
                // $('#wgys-'+ysId).data('mc',ysMc);
                // $('#wgys-'+ysId).data('xm',ysXm);
                // $('#wgys-'+ysId).data('dd',ysDd);
                // $('#wgys-'+ysId).data('lxfs',ysLxfs);
                // $('#wgys-'+ysId).data('zqsj',ysZqsj);
                // $('#wgys-'+ysId).data('fzr',ysFzr);
                // $('#wgys-'+ysId).data('ssxz',ysSsxz);
                // $('#wgys-'+ysId).data('zydw',ysZydw);
                //关闭弹出的popu
            }else{
                layer.msg('更新失败!');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );




}


function drawWg(){
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

                    var wgys =result.data[i];

                    if(wgys.type == 1){
                        continue;
                    }

                    var point;
                    if(wgys.areaType == 'Point'){
                        if(wgys.type == 1){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img class="wgysIcon" style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;" data-id="'+wgys.ysId+'"  id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'" src="/'+app.path+'/img/workplan/wgys/active/wmzyz.png"  title="'+wgys.typename+'('+wgys.areaDesc+')"/>'));
                        }else
                            if(wgys.type == 2){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'"   src="/'+app.path+'/img/workplan/wgys/active/gfzddw.png"  title="'+wgys.typename+'('+wgys.areaDesc+')"/>'));
                        }else if(wgys.type == 3){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"   data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'"    src="/'+app.path+'/img/workplan/wgys/active/zdsflk.png"  title="'+wgys.typename+'('+wgys.areaDesc+')"/>'));
                        }else if(wgys.type == 4){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'"  data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'"    src="/'+app.path+'/img/workplan/wgys/active/zdytqy.png"  title="'+wgys.typename+'('+wgys.areaDesc+')"/>'));
                        }else if(wgys.type == 5){
                            point = new GL.Point(wgys.areaStr,new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'"data-desc="'+wgys.areaDesc+'" data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'"    src="/'+app.path+'/img/workplan/wgys/active/pcszy.png"  />'));
                        }

                        var $imgIcon = $(point.getIcon().options.html);
                        var ysId =   $imgIcon.data('id');


                        var desc =   $imgIcon.data('desc');

                        var mc =   $imgIcon.data('mc');
                        var fzr =   $imgIcon.data('fzr');
                        var xm =   $imgIcon.data('xm');
                        var dd =   $imgIcon.data('dd');
                        var lxfs =   $imgIcon.data('lxfs');
                        var zqsj =   $imgIcon.data('zqsj');
                        var ssxz =   $imgIcon.data('ssxz');
                        var zydw =   $imgIcon.data('zydw');

                        //console.log(point.getPopup()==null)

                        //console.log(this);
                        if(point.getPopup()==null){//每个元素都显示不同的字段信息

                            if(wgys.type == 1){
                                // point.bindPopup(
                                //     '<div>' +
                                //     '<input type="text" id="ysXm" value="'+xm+'" data-yd-id="'+ysId+'" placeholder="请输入姓名"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入执勤地点"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysLxfs" value="'+lxfs+'" data-yd-id="'+ysId+'" placeholder="请输入联系方式"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysZqsj" value="'+zqsj+'" data-yd-id="'+ysId+'" placeholder="请输入执勤时间"/></br>' +
                                //     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal btn-xs" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'1\');">更新</button>' +
                                //     '</div>'
                                // );

                                if(point.getTooltip()==null){
                                    if(wgys.ysXm.length==0){
                                        point.bindTooltip(wgys.typename+'(无)');
                                    }else{
                                        point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                    }
                                }


                            }else if(wgys.type == 2){
                                // point.bindPopup(
                                //     '<div>' +
                                //     '<input type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入单位地址"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysFzr" value="'+fzr+'" data-yd-id="'+ysId+'" placeholder="请输入负责人"/></br>' +
                                //     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'2\');">更新</button>' +
                                //     '</div>'
                                // );

                                if(point.getTooltip()==null){
                                    if(wgys.ysMc.length==0){
                                        point.bindTooltip(wgys.typename+'(无)');
                                    }else{
                                        point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                    }
                                }

                            }else if(wgys.type == 3){
                                // point.bindPopup(
                                //     '<div>' +
                                //     '<input type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysFzr" value="'+fzr+'" data-yd-id="'+ysId+'" placeholder="请输入负责人"/></br>' +
                                //     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'3\');">更新</button>' +
                                //     '</div>'
                                // );

                                if(point.getTooltip()==null){
                                    if(wgys.ysMc.length==0){
                                        point.bindTooltip(wgys.typename+'(无)');
                                    }else{
                                        point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                    }
                                }
                            }else if(wgys.type == 4){
                                // point.bindPopup(
                                //     '<div>' +
                                //     '<input type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入单位地址"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysSsxz" value="'+ssxz+'" data-yd-id="'+ysId+'" placeholder="请输入所属性质"/></br>' +
                                //     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'4\');">更新</button>' +
                                //     '</div>'
                                // );

                                if(point.getTooltip()==null){
                                    if(wgys.ysMc.length==0){
                                        point.bindTooltip(wgys.typename+'(无)');
                                    }else{
                                        point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                                    }
                                }
                            }else if(wgys.type == 5){
                                // point.bindPopup(
                                //     '<div>' +
                                //     '<input type="text" id="ysXm" value="'+xm+'" data-yd-id="'+ysId+'" placeholder="请输入姓名"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入执勤地点"/></br>' +
                                //     '<input  style="margin-top:5px;" type="text" id="ysZydw" value="'+zydw+'" data-yd-id="'+ysId+'" placeholder="请输入增援单位"/></br>' +
                                //     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal btn-xs" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'5\');">更新</button>' +
                                //     '</div>'
                                // );

                                if(point.getTooltip()==null){
                                    if(wgys.ysXm.length==0){
                                        point.bindTooltip(wgys.typename+'(无)');
                                    }else{
                                        point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                                    }
                                }

                            }

                        }

                        //添加点击事件
                        point.on('click', function (e) {

                            //console.log(e);
                            //console.log(this);

                            var _point =this;
                            var $imgIcon = $(this.getIcon().options.html);
                            var ysId =   $imgIcon.data('id');
                            //console.log('ysId:'+ysId);
                            //查询往网格元素数据
                            // httpUtil.getData(
                            //     contextPath+'workplan/wgys/ysid',
                            //     {
                            //         'ysid' : ysId
                            //     },
                            //     null,
                            //     null,
                            //     function(result){
                            //         //console.log(result);
                            //
                            //         if(result.code ==200 ){
                            //
                            //             //按照类型重新绑定
                            //
                            //             var wgys = result.data;
                            //
                            //             //console.log(wgys);
                            //
                            //             if(wgys.type == 1){
                            //
                            //                 console.log('1');
                            //
                            //                 _point.bindPopup(
                            //                     '<div>' +
                            //                     '<input type="text" id="ysXm" value="'+xm+'" data-yd-id="'+ysId+'" placeholder="请输入姓名" value="'+wgys.ysXm+'"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入执勤地点" value="'+wgys.ysZqdd+'"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysLxfs" value="'+lxfs+'" data-yd-id="'+ysId+'" placeholder="请输入联系方式" value="'+wgys.ysLxfs+'"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysZqsj" value="'+zqsj+'" data-yd-id="'+ysId+'" placeholder="请输入执勤时间" value="'+wgys.ysZqsj+'"/></br>' +
                            //                     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal btn-xs" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'1\');">更新</button>' +
                            //                     '</div>'
                            //                 );
                            //
                            //                 if(_point.getTooltip()==null){
                            //                     if(wgys.ysXm.length==0){
                            //                         _point.bindTooltip(wgys.typename+'(无)');
                            //                     }else{
                            //                         _point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                            //                     }
                            //                 }
                            //
                            //
                            //             }else if(wgys.type == 2){
                            //
                            //                 console.log('2');
                            //
                            //                 _point.bindPopup(
                            //                     '<div>' +
                            //                     '<input type="text" id="ysMc"  data-yd-id="'+ysId+'" placeholder="请输入名称" value="'+wgys.ysMc+'"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysDd"  data-yd-id="'+ysId+'" placeholder="请输入单位地址"  value="'+wgys.ysDd+'"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysFzr"  data-yd-id="'+ysId+'" placeholder="请输入负责人" value="'+wgys.ysFzr+'"/></br>' +
                            //                     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'2\');">更新</button>' +
                            //                     '</div>'
                            //                 );
                            //
                            //                 if(_point.getTooltip()==null){
                            //                     if(wgys.ysMc.length==0){
                            //                         _point.bindTooltip(wgys.typename+'(无)');
                            //                     }else{
                            //                         _point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                            //                     }
                            //                 }
                            //
                            //             }else if(wgys.type == 3){
                            //
                            //                 console.log('3');
                            //
                            //                 _point.bindPopup(
                            //                     '<div>' +
                            //                     '<input type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysFzr" value="'+fzr+'" data-yd-id="'+ysId+'" placeholder="请输入负责人"/></br>' +
                            //                     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'3\');">更新</button>' +
                            //                     '</div>'
                            //                 );
                            //
                            //                 if(_point.getTooltip()==null){
                            //                     if(wgys.ysMc.length==0){
                            //                         _point.bindTooltip(wgys.typename+'(无)');
                            //                     }else{
                            //                         _point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                            //                     }
                            //                 }
                            //             }else if(wgys.type == 4){
                            //
                            //                 console.log('4');
                            //
                            //                 _point.bindPopup(
                            //                     '<div>' +
                            //                     '<input type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入单位地址"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysSsxz" value="'+ssxz+'" data-yd-id="'+ysId+'" placeholder="请输入所属性质"/></br>' +
                            //                     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'4\');">更新</button>' +
                            //                     '</div>'
                            //                 );
                            //
                            //                 if(_point.getTooltip()==null){
                            //                     if(wgys.ysMc.length==0){
                            //                         _point.bindTooltip(wgys.typename+'(无)');
                            //                     }else{
                            //                         _point.bindTooltip(wgys.typename+'('+wgys.ysMc+')');
                            //                     }
                            //                 }
                            //             }else if(wgys.type == 5){
                            //
                            //                 console.log('5');
                            //
                            //                 console.log(_point);
                            //
                            //                 _point.bindPopup(
                            //                     '<div>' +
                            //                     '<input type="text" id="ysXm" value="'+xm+'" data-yd-id="'+ysId+'" placeholder="请输入姓名"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysDd" value="'+dd+'" data-yd-id="'+ysId+'" placeholder="请输入执勤地点"/></br>' +
                            //                     '<input  style="margin-top:5px;" type="text" id="ysZydw" value="'+zydw+'" data-yd-id="'+ysId+'" placeholder="请输入增援单位"/></br>' +
                            //                     '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal btn-xs" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'5\');">更新</button>' +
                            //                     '</div>'
                            //                 );
                            //
                            //                 if(_point.getTooltip()==null){
                            //                     if(wgys.ysXm.length==0){
                            //                         _point.bindTooltip(wgys.typename+'(无)');
                            //                     }else{
                            //                         _point.bindTooltip(wgys.typename+'('+wgys.ysXm+')');
                            //                     }
                            //                 }
                            //
                            //             }
                            //
                            //
                            //         }
                            //     },
                            //     function(XMLHttpRequest, textStatus, errorThrown){
                            //
                            //     }
                            // );


                            this.openPopup();
                        });


                        if(wgys.type!=1){
                            vectorLayer_wgys.addOverlay(point);

                        }


                    }else if(wgys.areaType == 'Polyline'){

                        //console.log(wgys.type);

                        var polyline = new GL.Polyline(wgys.areaStr, new GL.Style({ color: '#ff0000' }, true));
                        vectorLayer_wgys.addOverlay(polyline);


                        if(wgys.type == 6){//路段的画 除了画线段  还要一个图标标注  点的话依据线段的第一个点
                            var $imgIcon = $(point.getIcon().options.html);
                            var ysId =   $imgIcon.data('id');
                            var desc =   $imgIcon.data('desc');
                            var mc =   $imgIcon.data('mc');
                            var fzr =   $imgIcon.data('fzr');
                            var xm =   $imgIcon.data('xm');
                            var dd =   $imgIcon.data('dd');
                            var lxfs =   $imgIcon.data('lxfs');
                            var zqsj =   $imgIcon.data('zqsj');
                            var ssxz =   $imgIcon.data('ssxz');
                            var zydw =   $imgIcon.data('zydw');

                            //console.log(wgys.areaStr.split(';')[0]);

                            point = new GL.Point(wgys.areaStr.split(';')[0],new GL.Icon.Div('<img  class="wgysIcon"  style="border-width: 0;margin:0;padding:0;width: 30px;height: 30px;"data-id="'+wgys.ysId+'" id="wgys-'+wgys.ysId+'" data-desc="'+wgys.areaDesc+'" data-mc="'+wgys.ysMc+'"  data-fzr="'+wgys.ysFzr+'"  data-xm="'+wgys.ysXm+'"  data-dd="'+wgys.ysDd+'"  data-lxfs="'+wgys.ysLxfs+'"  data-zqsj="'+wgys.ysZqsj+'"  data-ssxz="'+wgys.ysSsxz+'"  data-zydw="'+wgys.ysZydw+'"  src="/'+app.path+'/img/workplan/wgys/active/zdsfld.png" />'));


                            //console.log(point.getPopup()==null)

                            // if(point.getPopup()==null){
                            //     point.bindPopup(
                            //         '<div>' +
                            //         '<input  style="margin-top:5px;" type="text" id="ysMc" value="'+mc+'" data-yd-id="'+ysId+'" placeholder="请输入名称"/></br>' +
                            //         '<input  style="margin-top:5px;" type="text" id="ysFzr" value="'+fzr+'" data-yd-id="'+ysId+'" placeholder="请输入负责人"/></br>' +
                            //         '<button  style="margin-top:5px;" class="layui-btn layui-btn-normal" id="btn-edit" onclick="javascript:addWgys('+ysId+',\'6\');">更新</button>' +
                            //         '</div>'
                            //     );
                            // }

                            if(point.getTooltip()==null){
                                if(wgys.ysLdfw.length==0){
                                    point.bindTooltip(wgys.typename+'(无)');
                                }else{
                                    point.bindTooltip(wgys.typename+'('+wgys.ysLdfw+')');
                                }
                            }

                            //添加点击事件
                            point.on('click', function (e) {
                                var $imgIcon = $(this.getIcon().options.html);
                                var ysId =   $imgIcon.data('id');
                                //查询往网格元素数据
                                // httpUtil.getData(
                                //     contextPath+'workplan/wgys/ysid',
                                //     {
                                //         'ysid' : ysId
                                //     },
                                //     null,
                                //     null,
                                //     function(result){
                                //         //alert(result);
                                //         console.log(result);
                                //     },
                                //     function(XMLHttpRequest, textStatus, errorThrown){
                                //
                                //     }
                                // );
                                //
                                //
                                //
                                // this.openPopup();


                                //console.log(this.getPopup());

                            });

                            vectorLayer_wgys.addOverlay(point);
                        }
                    }
                }

                $('.wgysIcon').each(function (index,value,ary) {
                    var $_this = $(this);
                    $(this).dblclick(function () {
                        var ysId =   $_this.data('id');
                        layer.confirm('确定删除该网格元素('+wgys.typename+')？', {
                            btn: ['确定', '取消'] //可以无限个按钮
                        }, function(index, layero){
                            httpUtil.delData(
                                contextPath+'workplan/wgys/'+ysId,
                                null,
                                null,
                                null,
                                function(result){
                                    if(result.code ==200){
                                        layer.msg('删除成功!');
                                        //在地图上面去掉该点
                                        vectorLayer_wgys.removeOverlay( point );
                                    }else{
                                        layer.msg('删除失败!');
                                    }
                                },
                                function(XMLHttpRequest, textStatus, errorThrown){

                                }
                            );
                        }, function(index){
                            //关闭弹出询问窗口
                        });
                    });
                });

            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}
