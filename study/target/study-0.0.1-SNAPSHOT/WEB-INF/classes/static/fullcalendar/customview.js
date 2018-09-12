/**
 * 自定义日历视图组件
 * @author LancCJ
 * @type {{version: string}|*}
 *
 *预期组件布局如下
 *
 *   警员-时间
 *
 *   ________________________________________________________________________
 *  | 竖向\日期         周一           周二      周三   周四   周五    周六   周日
 *
 *  | 张三         班次/地点/岗位类型
 *  | 李四
 *  | 王五
 *  |________________________________________________________________________
 *
 *
 *  班次-时间
 *
 *   ________________________________________________________________________
 *  | 竖向\日期          周一           周二      周三   周四   周五    周六   周日
 *
 *  | 早高峰        张三/地点/岗位类型
 *  |
 *  | 晚高峰
 *  |________________________________________________________________________
 *
 *
 *  地点\时间
 *
 *   ________________________________________________________________________
 *  | 竖向\日期           周一           周二      周三   周四   周五    周六   周日
 *
 *  | 锦绣府西路口    张三/班次/岗位类型
 *  |
 *  | 交警二大队队部
 *  |________________________________________________________________________
 *
 *
 *  岗位类型-时间
 *
 *   ________________________________________________________________________
 *  | 竖向\日期           周一           周二      周三   周四   周五    周六   周日
 *
 *  | 政治岗         张三/班次/地点
 *  |
 *  | 定点岗位
 *  |________________________________________________________________________
 */

//默认视图必须在自定义组件前面定义
var viewName = '';

var FC = $.fullCalendar; // a reference to FullCalendar's root namespace
var View = FC.View;      // the class that all views must inherit from
var CustomView;          // our subclass

var days_MD = [];
var days_YMD = [];

CustomView = View.extend({ // make a subclass of View

    initialize: function() {
        //这个方法只会在视图第一次切换的时候执行，后续切换后不会在次执行 这个点很重要
    },

    render: function() {
        //这个方法每次切换视图后都会执行
        viewName = this.name;
        //刷新最新排班的情况数据
        refreshInfo();
        //获取视图配置参数
        var departId=this.options.custom_params.departId;
        var userType=this.options.custom_params.userType;
        var submitUser=this.options.custom_params.submitUser;
        var startDay = moment(this.start._i);//起始时间 从继承的组件获取时间戳
        //console.log(startDay);

        //当前当前日期一周的日期数组  格式分两种 一种1/22    一种   2018-01-22  前者用于显示   后者用于数据持久化
        var days = ['周一','周二','周三','周四','周五','周六','周日'];
        days_MD = [];
        days_YMD = [];
        for(var i = 0;i < 7;i++){
            days_MD.push(startDay.subtract(7-(7-startDay.format('E'))-1-i, 'days').format('MM/DD'));
            days_YMD.push(startDay.subtract(7-(7-startDay.format('E'))-1-i, 'days').format('YYYY-MM-DD'));
        }
        //console.log(days_MD);
        //console.log(days_YMD);

        //组装表头
        var custom_column = '姓名';  //这里到时候可以是  岗位   还有活着班次
        if(viewName == 'people'){
            custom_column = '姓名';
        }else if(viewName == 'shift'){
            custom_column = '班次';
        }else if(viewName == 'position'){
            custom_column = '岗位';
        }

        var table_header = '<th>'+custom_column+'/日期</th>';

        //每次渲染新的数据前，先清空上一次
        $('.fc-view').empty();
        for(var i = 0;i<7;i++){
            table_header += '<th>'+days[i]+' '+days_MD[i]+'</th>';
        }

        var table_body = '';
        //console.log('viewName='+viewName);
        if(viewName == 'people'){
            //console.log('请求数据');
            //组装表单body

            httpUtil.getData(
                contextPath+'workplan/users?departId='+departId+'&userType='+userType,
                null,
                null,
                null,
                function(result){
                    var $data = result.data;
                    //循环
                    $data.forEach(function($user,index,array){
                        var table_body_tr = '<tr style="height: 150px;">';

                        var avatar = '<img  style="width:100%;height:100%;"  src="/'+app.path+'/img/workplan/police2.jpg" alt="" id="avatar_'+$user.userId+'"/>';
                        console.log($user.userAvatar);
                        if($user.userAvatar.length>0){
                            avatar = '<img class="avatar" style="width:100%;height:100%;" src="/'+app.path+'/file/view/avatar/'+$user.userAvatar+'" alt="" id="avatar_'+$user.userId+'"/>';
                        }

                        table_body_tr+='<td style="vertical-align: middle !important;" onmouseover="javscript:showImgIcon(this);" onmouseleave="javscript:hideImgIcon(this);" onclick="javscript:showDetail(this)" >' +
                            '<div style="position:relative;">' +
                            avatar+
                            '<a  href="javascript:void(0);"  onclick="javascript:modifyAvatar(\'people\',\''+$user.userId+'\');"  style="cursor: pointer;" title="修改头像"><i  class="iconfont icon-xiugaitouxiang text-danger d-none"  id="'+$user.userId+'_'+days_YMD[i]+'"  style="position:absolute;right:5px;top:5px;z-index:999;"/></a><br>'+
                            '<span>'+$user.userName+'('+$user.userId+')</span><br>' +
                            //'<span>'+$user.userPosition+'   班时:10小时</span>' +
                            '<span>班时:<span id="'+$user.userId+'_workTime" class="time">-</span>小时</span>' +
                            '</div>' +
                            '</td>' ;
                        for(var i = 0;i<7;i++){
                            table_body_tr += '<td class="fc-day fc-widget-content fc-tue fc-past" style="position: relative;" data-date="'+days_YMD[i]+'" data-index="'+index+'" data-user-id="'+$user.userId+'"><i class="iconfont icon-info text-warning tipInfo"  id="'+$user.userId+'_'+days_YMD[i]+'"  style="position:absolute;right:-0px;top:-10px;z-index:999;"/>' +
                                '</td>';
                        }
                        table_body_tr += '</tr>';
                        table_body += table_body_tr;
                    });

                    //渲染表格
                    $('.fc-view').append('' +
                        '<table class="table text-center" style="z-index: 999;">' +
                        '<thead>' +
                        table_header +
                        '</thead>' +
                        '<tbody>' +
                        table_body +
                        '</tbody>' +
                        '</table>'
                    );



                    //console.log('渲染完毕表格');

                    //console.log($('.fc-view table'));

                    //为了让渲染不卡顿所以在渲染完毕所有表格后再异步的加载每个人员相应日期的事件
                    $data.forEach(function($user,index,array){//循环每个人
                        //这样做实在没办法 至少现在是异步的 不然同步就UI卡死了
                        getEvent($user,days_YMD,0,'people');
                        getEvent($user,days_YMD,1,'people');
                        getEvent($user,days_YMD,2,'people');
                        getEvent($user,days_YMD,3,'people');
                        getEvent($user,days_YMD,4,'people');
                        getEvent($user,days_YMD,5,'people');
                        getEvent($user,days_YMD,6,'people');

                        //异步加载每个人的工作时长

                        getWorkTime($user.userId,days_YMD[0],days_YMD[6]);

                    });

                    $('.tipInfo').each(function () {
                        $(this).mouseover(function () {
                            $that = $(this);

                            //console.log($that);
                            setTimeout(function(){
                                //console.log($(this).parent());

                                var id = $that.attr('id');

                                //获取这个格子的所有title信息循环组装
                                var tip = '<div style="display: flex;flex-direction: column;justify-content: center;align-items: center;" >' +
                                    '<div  style="display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;">';
                                $that.parent().find('p').each(function (i) {
                                    var $event = $(this);
                                    tip += '<p>'+$event.attr('title')+'</p>';

                                    //console.log($event.attr('title'));
                                    //console.log($event.attr('title'));
                                });
                                tip+='</div>';
                                tip+='<div style="display: flex;flex-direction: row-reverse;justify-content: flex-start;align-items: center;">';

                                // var time  = $that.parent().parent().find('td:first').find('span .time').text();
                                // if(time>40){
                                //     tip+='<p>时长:<span>'+$that.parent().parent().find('td:first').find('span .time').text()+'</span>小时</p>';
                                // }else{
                                //     tip+='<p>时长:<span style="color: red">'+$that.parent().parent().find('td:first').find('span .time').text()+'</span>小时</p>';
                                // }

                                tip+='</div>';
                                tip+='</div>';

                                layer.tips(tip, '#'+id, {
                                    tips: [4, '#78BA32']
                                });

                                //console.log($that.attr('id'))
                            },1000);






                        });
                    });

                    //绑定点击事件 最初没有组合数据时候只能通过点击来进行数据添加
                    $('.fc-view .fc-day').each(function (i) {
                        $(this).click(function (e) {
                            var $user = $data[$(this).data('index')];
                            // console.log('点击了 ID:'+$user.userId+'/日期:'+$(this).data('date'));
                            //弹出选择界面
                            layer.open({
                                title:'新增排班',
                                id:'addDuty',
                                type: 2,
                                shadeClose : true,
                                area:['70%','80%'],
                                content: contextPath+'workplan/schedule/toAdd?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser+'&userId='+$user.userId+'&shiftId&areaId=&dutyDate='+$(this).data('date')+'&viewName='+viewName+'&timeBegin=&timeEnd=&shiftName=&areaName='
                            });
                            e.stopPropagation();
                        });
                    });

                    //绑定dropable事件 元素拖动到此触发的事件
                    $('.fc-view .fc-day').each(function (i) {
                        var $that = $(this);
                        $(this).droppable({

                            accept: ".dutyInfo",
                            //activeClass: "bg-info",
                            hoverClass: "bg-success",
                            drop: function( event, ui ) {
                                //console.log(event);
                                var $event = $(ui.draggable[0]);
                                var dutyDate = $(this).data('date');
                                var shiftId = $event.data('shiftId');
                                var areaId = $event.data('areaId');
                                var timeBegin = $event.data('timeBegin');
                                var timeEnd = $event.data('timeEnd');
                                var userId = $(this).data('userId');

                                //校验是否已经添加
                                //console.log($that.find('p'));
                                var eventIsExist = false;
                                $that.find('p').each(function (i) {
                                    var $event = $(this);
                                    if($event.data('shiftId')===shiftId && $event.data('areaId')===areaId){
                                        eventIsExist = true;
                                        return false;
                                    }
                                });
                                if(eventIsExist){
                                    layer.msg('排班已经存在,请勿重复排班!');
                                    return false;
                                }

                                //添加数据库数据，渲染该格子数据
                                httpUtil.postData(
                                    contextPath+'workplan/duty',
                                    {
                                        "shiftId":shiftId,
                                        "areaId":areaId,
                                        "userId":userId,
                                        "dutyDate":dutyDate,
                                        "submitUser":submitUser,
                                        "dutyType":'1',
                                        "areaOwner":departId
                                    },
                                    null,
                                    function(result){
                                        if(result.code ===200){
                                            layer.msg('排班完成!');
                                            //往表格中渲染该排班信息
                                            var event = '<p    style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.text()+'"  data-duty-id="'+result.data.dutyId+'" data-duty-date="'+dutyDate+'" data-user-id="'+userId+'" data-user-name="'+result.data.userName+'"  data-shift-id="'+shiftId+'" data-area-id="'+areaId+'" data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+shiftId+'\',\''+areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.text()+'</p>';
                                            //$that.append(event);

                                            sortEventAndAppend($that,timeBegin,event);

                                            //console.log($(event));

                                            // layer.close(loading);



                                            getWorkTime(userId,days_YMD[0],days_YMD[6]);


                                        }else{
                                            layer.msg('排班失败!');
                                        }



                                    },
                                    function(XMLHttpRequest, textStatus, errorThrown){
                                        layer.msg('排班失败!');
                                    }
                                );
                            }
                        });


                    });


                    //lazyLoadImg();
                },
                function(XMLHttpRequest, textStatus, errorThrown){

                }
            );
        }else if(viewName == 'shift'){
            httpUtil.getData(
                contextPath+'workplan/shift/'+departId+'/'+userType,
                null,
                null,
                null,
                function(result){
                    var $data = result.data;
                    //循环
                    $data.forEach(function($shift,index,array){
                        var table_body_tr = '<tr style="height: 150px;">';


                        var avatar = '<img style="width:100%;height:100%;"  src="/'+app.path+'/img/workplan/shift.jpg" alt="" id="avatar_'+$shift.shiftId+'"/>';
                        //console.log($user.userAvatar);
                        if($shift.shiftAvatar.length>0){
                            avatar = '<img style="width:100%;height:100%;" src="/'+app.path+'/file/view/avatar/'+$shift.shiftAvatar+'" alt="" id="avatar_'+$shift.shiftId+'"/>';
                        }

                        var deleted = $shift.deleted;
                        if(deleted == 1){
                            table_body_tr+='<td style="vertical-align: middle !important;" onmouseover="javscript:showImgIcon(this);" onmouseleave="javscript:hideImgIcon(this);" onclick="javscript:showDetail(this)" >' +
                                '<div style="position:relative;">' +
                                avatar +
                                '<a  href="javascript:void(0);"  onclick="javascript:modifyAvatar(\'shift\',\''+$shift.shiftId+'\');"  style="cursor: pointer;" title="修改头像"><i  class="iconfont icon-xiugaitouxiang text-danger d-none"  id="'+$shift.shiftId+'_'+days_YMD[i]+'"  style="position:absolute;right:5px;top:5px;z-index:999;"/></a><br>'+
                                '<span style="color:tomato">'+$shift.shiftTypeName+'</span><br>' +
                                '<span style="color:tomato">'+$shift.shiftName+'('+$shift.timeBegin+'-'+$shift.timeEnd+')</span><br>' +
                                '</div>' +
                                '</td>' ;
                            for(var i = 0;i<7;i++){
                                table_body_tr += '<td class="fc-day fc-widget-content fc-tue fc-past" data-date="'+days_YMD[i]+'" data-index="'+index+'" data-shift-id="'+$shift.shiftId+'"  data-time-begin="'+$shift.timeBegin+'" data-time-end="'+$shift.timeEnd+'" >' +
                                    '</td>';
                            }
                            table_body_tr += '</tr>';
                            table_body += table_body_tr;
                        }else{
                            table_body_tr+='<td style="vertical-align: middle !important;" onmouseover="javscript:showImgIcon(this);" onmouseleave="javscript:hideImgIcon(this);" onclick="javscript:showDetail(this)" >' +
                                '<div style="position:relative;">' +
                                avatar +
                                '<a  href="javascript:void(0);"  onclick="javascript:modifyAvatar(\'shift\',\''+$shift.shiftId+'\');"  style="cursor: pointer;" title="修改头像"><i  class="iconfont icon-xiugaitouxiang text-danger d-none"  id="'+$shift.shiftId+'_'+days_YMD[i]+'"  style="position:absolute;right:5px;top:5px;z-index:999;"/></a><br>'+
                                '<span>'+$shift.shiftTypeName+'</span><br>' +
                                '<span>'+$shift.shiftName+'('+$shift.timeBegin+'-'+$shift.timeEnd+')</span><br>' +
                                '</div>' +
                                '</td>' ;
                            for(var i = 0;i<7;i++){
                                table_body_tr += '<td class="fc-day fc-widget-content fc-tue fc-past" data-date="'+days_YMD[i]+'" data-index="'+index+'" data-shift-id="'+$shift.shiftId+'"  data-time-begin="'+$shift.timeBegin+'" data-time-end="'+$shift.timeEnd+'" >' +
                                    '</td>';
                            }
                            table_body_tr += '</tr>';
                            table_body += table_body_tr;
                        }


                    });

                    //渲染表格
                    $('.fc-view').append('' +
                        '<table class="table text-center" style="z-index: 999;">' +
                        '<thead>' +
                        table_header +
                        '</thead>' +
                        '<tbody>' +
                        table_body +
                        '</tbody>' +
                        '</table>'
                    );


                    //为了让渲染不卡顿所以在渲染完毕所有表格后再异步的加载每个岗位相应日期的事件
                    $data.forEach(function($shift,index,array){//循环每个人
                        //这样做实在没办法 至少现在是异步的 不然同步就UI卡死了
                        getEvent($shift,days_YMD,0,'shift');
                        getEvent($shift,days_YMD,1,'shift');
                        getEvent($shift,days_YMD,2,'shift');
                        getEvent($shift,days_YMD,3,'shift');
                        getEvent($shift,days_YMD,4,'shift');
                        getEvent($shift,days_YMD,5,'shift');
                        getEvent($shift,days_YMD,6,'shift');

                    });

                    //绑定点击事件 最初没有组合数据时候只能通过点击来进行数据添加
                    $('.fc-view .fc-day').each(function (i) {
                        $(this).click(function () {



                            var $shift = $data[$(this).data('index')];
                            // console.log('点击了 ID:'+$shift.shiftId+'/日期:'+$(this).data('date'));
                            //弹出选择界面
                            layer.open({
                                title:'新增排班',
                                id:'addDuty',
                                type: 2,
                                area:['80%','70%'],
                                shadeClose : true,
                                content: contextPath+'workplan/schedule/toAdd?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser+'&shiftId='+$shift.shiftId+'&userId=&areaId=&dutyDate='+$(this).data('date')+'&viewName='+viewName+'&timeBegin='+$shift.timeBegin+'&timeEnd='+$shift.timeEnd+'&shiftName='+$shift.shiftName+'&areaName='
                            });
                        });
                    });


                    //绑定dropable事件 元素拖动到此触发的事件
                    $('.fc-view .fc-day').each(function (i) {
                        var $that = $(this);
                        $(this).droppable({

                            accept: ".dutyInfo",
                            //activeClass: "bg-info",
                            hoverClass: "bg-success",
                            drop: function( event, ui ) {
                                //console.log(event);
                                var $event = $(ui.draggable[0]);
                                var dutyDate = $(this).data('date');
                                var shiftId = $(this).data('shiftId');
                                var areaId = $event.data('areaId');
                                var timeBegin = $event.data('timeBegin');
                                var timeEnd = $event.data('timeEnd');
                                var userId = $event.data('userId');

                                //校验是否已经添加
                                //console.log($that.find('p'));
                                var eventIsExist = false;
                                $that.find('p').each(function (i) {
                                    var $event = $(this);
                                    if($event.data('userId')===userId && $event.data('areaId')===areaId){
                                        eventIsExist = true;
                                        return false;
                                    }
                                });
                                if(eventIsExist){
                                    layer.msg('排班已经存在,请勿重复排班!');
                                    return false;
                                }

                                //添加数据库数据，渲染该格子数据
                                httpUtil.postData(
                                    contextPath+'workplan/duty',
                                    {
                                        "shiftId":shiftId,
                                        "areaId":areaId,
                                        "userId":userId,
                                        "dutyDate":dutyDate,
                                        "submitUser":submitUser,
                                        "dutyType":'1',
                                        "areaOwner":departId
                                    },
                                    null,
                                    function(result){
                                        if(result.code ===200){
                                            layer.msg('排班完成!');
                                            //往表格中渲染该排班信息
                                            var event = '<p   style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.text()+'"  data-duty-id="'+result.data.dutyId+'"  data-duty-date="'+dutyDate+'" data-user-id="'+userId+'" data-user-name="'+result.data.userName+'" data-shift-id="'+shiftId+'" data-area-id="'+areaId+'" data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+shiftId+'\',\''+areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.text()+'</p>';
                                            //$that.append(event);

                                            sortEventAndAppend($that,timeBegin,event);

                                            //console.log($(event));

                                            // layer.close(loading);



                                            getWorkTime(userId,days_YMD[0],days_YMD[6]);


                                        }else{
                                            layer.msg('排班失败!');
                                        }



                                    },
                                    function(XMLHttpRequest, textStatus, errorThrown){
                                        layer.msg('排班失败!');
                                    }
                                );
                            }
                        });


                    });
                },
                function(XMLHttpRequest, textStatus, errorThrown){

                }
            );
        }else if(viewName == 'position'){
            httpUtil.getData(
                contextPath+'workplan/position/'+departId+'/'+userType,
                null,
                null,
                null,
                function(result){
                    var $data = result.data;
                    //循环
                    $data.forEach(function($position,index,array){
                        var table_body_tr = '<tr style="height: 150px;">';

                        var avatar = '<img style="width:100%;height:100%;"  src="/'+app.path+'/img/workplan/position.jpg" alt="" id="avatar_'+$position.areaId+'"/>';
                        //console.log($user.userAvatar);
                        if($position.areaAvatar.length>0){
                            avatar = '<img style="width:100%;height:100%;" src="/'+app.path+'/file/view/avatar/'+$position.areaAvatar+'" alt="" id="avatar_'+$position.areaId+'"/>';
                        }

                        //console.log($position.deleted);

                        var deleted = $position.deleted;
                        if(deleted == 1){
                            table_body_tr+='<td style="vertical-align: middle !important;" onmouseover="javscript:showImgIcon(this);" onmouseleave="javscript:hideImgIcon(this);" onclick="javscript:showDetail(this)" >' +
                                '<div style="position:relative;">' +
                                avatar +
                                '<a  href="javascript:void(0);"  onclick="javascript:modifyAvatar(\'position\',\''+$position.areaId+'\');"  style="cursor: pointer;" title="修改头像"><i  class="iconfont icon-xiugaitouxiang text-danger d-none"  id="'+$position.areaId+'_'+days_YMD[i]+'"  style="position:absolute;right:5px;top:5px;z-index:999;"/></a><br>'+
                                '<span  style="color:tomato;">'+$position.areaTypeName+'</span><br>' +
                                '<span style="color:tomato;">'+$position.areaName+'</span><br>' +
                                '</div>' +
                                '</td>' ;
                            for(var i = 0;i<7;i++){
                                table_body_tr += '<td class="fc-day fc-widget-content fc-tue fc-past" data-date="'+days_YMD[i]+'" data-index="'+index+'" data-area-id="'+$position.areaId+'">' +
                                    '</td>';
                            }
                            table_body_tr += '</tr>';
                            table_body += table_body_tr;
                        }else{
                            table_body_tr+='<td style="vertical-align: middle !important;" onmouseover="javscript:showImgIcon(this);" onmouseleave="javscript:hideImgIcon(this);" onclick="javscript:showDetail(this)" >' +
                                '<div style="position:relative;">' +
                                avatar +
                                '<a  href="javascript:void(0);"  onclick="javascript:modifyAvatar(\'position\',\''+$position.areaId+'\');"  style="cursor: pointer;" title="修改头像"><i  class="iconfont icon-xiugaitouxiang text-danger d-none"  id="'+$position.areaId+'_'+days_YMD[i]+'"  style="position:absolute;right:5px;top:5px;z-index:999;"/></a><br>'+
                                '<span>'+$position.areaTypeName+'</span><br>' +
                                '<span>'+$position.areaName+'</span><br>' +
                                '</div>' +
                                '</td>' ;
                            for(var i = 0;i<7;i++){
                                table_body_tr += '<td class="fc-day fc-widget-content fc-tue fc-past" data-date="'+days_YMD[i]+'" data-index="'+index+'" data-area-id="'+$position.areaId+'">' +
                                    '</td>';
                            }
                            table_body_tr += '</tr>';
                            table_body += table_body_tr;
                        }
                    });

                    //渲染表格
                    $('.fc-view').append('' +
                        '<table class="table text-center" style="z-index: 999;">' +
                        '<thead>' +
                        table_header +
                        '</thead>' +
                        '<tbody>' +
                        table_body +
                        '</tbody>' +
                        '</table>'
                    );

                    //为了让渲染不卡顿所以在渲染完毕所有表格后再异步的加载每个岗位相应日期的事件
                    $data.forEach(function($position,index,array){//循环每个人
                        //这样做实在没办法 至少现在是异步的 不然同步就UI卡死了
                        getEvent($position,days_YMD,0,'position');
                        getEvent($position,days_YMD,1,'position');
                        getEvent($position,days_YMD,2,'position');
                        getEvent($position,days_YMD,3,'position');
                        getEvent($position,days_YMD,4,'position');
                        getEvent($position,days_YMD,5,'position');
                        getEvent($position,days_YMD,6,'position');

                    });

                    //绑定点击事件 最初没有组合数据时候只能通过点击来进行数据添加
                    $('.fc-view .fc-day').each(function (i) {
                        $(this).click(function () {
                            var $position = $data[$(this).data('index')];
                            // console.log('点击了 ID:'+$position.areaId+'/日期:'+$(this).data('date'));
                            //console.log($position )

                            //弹出选择界面
                            layer.open({
                                title:'新增排班',
                                id:'addDuty',
                                type: 2,
                                area:['80%','70%'],
                                shadeClose : true,
                                content: contextPath+'workplan/schedule/toAdd?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser+'&areaId='+$position.areaId+'&userId=&shiftId=&dutyDate='+$(this).data('date')+'&viewName='+viewName+'&timeBegin=&timeEnd=&shiftName=&areaName='+$position.areaName
                            });
                        });
                    });

                    //绑定dropable事件 元素拖动到此触发的事件
                    $('.fc-view .fc-day').each(function (i) {
                        var $that = $(this);
                        $(this).droppable({

                            accept: ".dutyInfo",
                            //activeClass: "bg-info",
                            hoverClass: "bg-success",
                            drop: function( event, ui ) {

                                var $event = $(ui.draggable[0]);

                                //console.log($event);

                                var dutyDate = $(this).data('date');
                                var shiftId = $event.data('shiftId');
                                var areaId = $(this).data('areaId');
                                var timeBegin = $event.data('timeBegin');
                                var timeEnd = $event.data('timeEnd');
                                var userId = $event.data('userId');

                                //校验是否已经添加
                                //console.log($that.find('p'));
                                var eventIsExist = false;
                                $that.find('p').each(function (i) {
                                    var $event = $(this);
                                    if($event.data('shiftId')===shiftId && $event.data('userId')===userId){
                                        eventIsExist = true;
                                        return false;
                                    }
                                });
                                if(eventIsExist){
                                    layer.msg('排班已经存在,请勿重复排班!');
                                    return false;
                                }

                                //添加数据库数据，渲染该格子数据
                                httpUtil.postData(
                                    contextPath+'workplan/duty',
                                    {
                                        "shiftId":shiftId,
                                        "areaId":areaId,
                                        "userId":userId,
                                        "dutyDate":dutyDate,
                                        "submitUser":submitUser,
                                        "dutyType":'1',
                                        "areaOwner":departId
                                    },
                                    null,
                                    function(result){
                                        if(result.code ===200){
                                            layer.msg('排班完成!');
                                            //往表格中渲染该排班信息
                                            var event = '<p   style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.text()+'"  data-duty-id="'+result.data.dutyId+'"  data-duty-date="'+dutyDate+'" data-user-id="'+userId+'" data-user-name="'+result.data.userName+'" data-shift-id="'+shiftId+'" data-area-id="'+areaId+'" data-time-begin="'+timeBegin+'" data-time-end="'+timeEnd+'"><a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+userId+'\',\''+dutyDate+'\',\''+shiftId+'\',\''+areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.text()+'</p>';
                                            //$that.append(event);

                                            sortEventAndAppend($that,timeBegin,event);

                                            //console.log($(event));

                                            // layer.close(loading);



                                            getWorkTime(userId,days_YMD[0],days_YMD[6]);




                                        }else{
                                            layer.msg('排班失败!');
                                        }



                                    },
                                    function(XMLHttpRequest, textStatus, errorThrown){
                                        layer.msg('排班失败!');
                                    }
                                );
                            }
                        });


                    });
                },
                function(XMLHttpRequest, textStatus, errorThrown){

                }
            );
        }





        //console.log('render');
    },
    setHeight: function(height, isAuto) {
        // responsible for adjusting the pixel-height of the view. if isAuto is true, the
        // view may be its natural height, and `height` becomes merely a suggestion.
        //console.log('setHeight');
    },

    renderEvents: function(events) {
        // reponsible for rendering the given Event Objects
        //console.log('渲染每个格子的数据:renderEvents');

        //console.log($('.fc-view table tbody'));

        //绑定每个格子的点击事件
        // $('.fc-view table tbody td').forEach(function(user,index,array){
        //     $(this).click(function () {
        //         alert('点击我了');
        //     });
        // });

        //console.log($('.fc-view'));

    },

    destroyEvents: function() {
        // responsible for undoing everything in renderEvents
        //console.log('destroyEvents');
    },

    renderSelection: function(range) {
        // accepts a {start,end} object made of Moments, and must render the selection
        //console.log('renderSelection');
    },

    destroySelection: function() {
        // responsible for undoing everything in renderSelection
        //console.log('destroySelection');
    }

});

function lazyLoadImg() {
    //异步加载图片

    $('.avatar').each(function (i) {
        //console.log($(this).attr('lay-src'));

        var $that = $(this);
        //判断下是否网络可用
        httpUtil.getImgImgData(
            contextHost+$(this).attr('lay-src'),
            null,
            null,
            function(result){
                //console.log(result);
                //console.log($that);
                $that.attr('src',$that.attr('lay-src'));
            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );
        //可用就显示网络图片

    });
}

/**
 * 事件排序  这里的排序比较简单  因为默认加载的数据已经排序进行加载了，只是进行拖拽后的元素需要 按需插入而已
 * @param $fc_day
 */
function sortEventAndAppend($fc_day,timeBegin,event){


    //循环现有的Event 肯定是已经都排序的

    if($fc_day.find('p').length!=0){
       $fc_day.find('p').each(function (i) {
            var _timeBegin = $(this).data('timeBegin');


            // console.log('_timeBegin='+_timeBegin);
            // console.log('timeBegin='+timeBegin);

            if(moment.duration(timeBegin, 'HH:mm')-moment.duration(_timeBegin, 'HH:mm')<=0){
                $(this).before(event);
                return false;
            }else{
                if((i+1)==$fc_day.find('p').length){
                    $(this).after(event);
                    return false;
                }
            }
        });
    }else{
        $fc_day.append(event);
    }


    enabbleDrop();

}


/**
 * @param $user
 * @param days_YMD
 * 获取每天的事件
 * @param _i
 */
function getEvent($obj,days_YMD,_i,viewName) {


    if(viewName=='people'){
        httpUtil.getData(
            contextPath+'workplan/dutyByUserAndDate',
            {
                "userId":$obj.userId,
                "dutyDate":days_YMD[_i]
            },
            null,
            null,
            function(result){
                if(result.data.length>0){
                    result.data.forEach(function ($event,index,array) {

                        //console.log(moment($event.dutyDate).format('YYYY-MM-DD'));

                        //console.log($event.userId);

                        var sbStr = '';
                        if($event.hasCar == 'true'){
                            sbStr += '<i class="iconfont icon-jingwuicon_svg-" />';
                        }

                        $that = $("td[data-user-id=\""+$event.userId+"\"][data-date=\""+days_YMD[_i]+"\"]");
                        //console.log($that);
                        var event = '<p    style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.userName+'('+$event.userId+')'+$event.shiftTypeName+'|'+$event.areaName+'('+$event.timeBegin+'-'+$event.timeEnd+')" data-duty-id="'+$event.dutyId+'" data-duty-date="'+moment($event.dutyDate).format('YYYY-MM-DD')+'" data-user-id="'+$event.userId+'" data-user-name="'+$event.userName+'" data-shift-id="'+$event.shiftId+'" data-area-id="'+$event.areaId+'" data-time-begin="'+$event.timeBegin+'" data-time-end="'+$event.timeEnd+'">'+sbStr+'<a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+$event.userId+'\',\''+days_YMD[_i]+'\',\''+$event.shiftId+'\',\''+$event.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.shiftTypeName+'('+$event.timeBegin+'-'+$event.timeEnd+')'+$event.areaName+'</p>';
                        $that.append(event);

                        //sortEvent($that);

                    });


                    enabbleDrop();
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取人员排班数据存在错误,请联系管理员!');
            }
        );
    }else if(viewName=='shift'){
        httpUtil.getData(
            contextPath+'workplan/dutyByShiftAndDate',
            {
                "shiftId":$obj.shiftId,
                "dutyDate":days_YMD[_i]
            },
            null,
            null,
            function(result){

                //console.log(result);

                if(result.data.length>0){

                    result.data.forEach(function ($event,index,array) {

                        var sbStr = '';
                        if($event.hasCar == 'true'){
                            sbStr += '<i class="iconfont icon-jingwuicon_svg-" />';
                        }


                        $that = $("td[data-shift-id=\""+$event.shiftId+"\"][data-date=\""+days_YMD[_i]+"\"]");
                        var event = '<p  style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.userName+'('+$event.userId+')'+$event.shiftTypeName+'|'+$event.areaName+'('+$event.timeBegin+'-'+$event.timeEnd+')" data-duty-id="'+$event.dutyId+'" data-duty-date="'+moment(days_YMD[_i]).format('YYYY-MM-DD')+'" data-user-id="'+$event.userId+'" data-user-name="'+$event.userName+'"  data-shift-id="'+$event.shiftId+'" data-area-id="'+$event.areaId+'" data-time-begin="'+$event.timeBegin+'" data-time-end="'+$event.timeEnd+'">'+sbStr+'<a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+$event.userId+'\',\''+days_YMD[_i]+'\',\''+$event.shiftId+'\',\''+$event.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.userName+'('+$event.userId+') '+$event.areaName+'</p>';


                        $that.append(event);

                        //sortEvent($that);

                    });


                    enabbleDrop();
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取人员排班数据存在错误,请联系管理员!');
            }
        );
    }else if(viewName=='position'){
        httpUtil.getData(
            contextPath+'workplan/dutyByPositionAndDate',
            {
                "areaId":$obj.areaId,
                "dutyDate":days_YMD[_i]
            },
            null,
            null,
            function(result){

                if(result.data.length>0){

                    result.data.forEach(function ($event,index,array) {


                        var sbStr = '';
                        if($event.hasCar == 'true'){
                            sbStr += '<i class="iconfont icon-jingwuicon_svg-" />';
                        }


                        $that = $("td[data-area-id=\""+$event.areaId+"\"][data-date=\""+days_YMD[_i]+"\"]");
                        var event = '<p    style="height:25px;font-size:5px;line-height:25px;text-overflow:ellipsis;margin: 0.25em 0.25em 0.25em 0.25em;background-color:#2196F3;color: #FFFFFF;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;" class="one-line fc-event dutyInfo" title="'+$event.userName+'('+$event.userId+')'+$event.shiftTypeName+'|'+$event.areaName+'('+$event.timeBegin+'-'+$event.timeEnd+')" data-duty-id="'+$event.dutyId+'" data-duty-date="'+moment(days_YMD[_i]).format('YYYY-MM-DD')+'" data-user-id="'+$event.userId+'" data-user-name="'+$event.userName+'"  data-shift-id="'+$event.shiftId+'" data-area-id="'+$event.areaId+'" data-time-begin="'+$event.timeBegin+'" data-time-end="'+$event.timeEnd+'">'+sbStr+'<a  style="text-decoration:none" href="javascript:void(0);" onclick="javascript:delDuty(event,\''+$event.userId+'\',\''+days_YMD[_i]+'\',\''+$event.shiftId+'\',\''+$event.areaId+'\',$(this));"><i class="text-danger iconfont icon-delete d-none"/></a> '+$event.userName+'('+$event.userId+')'+$event.shiftTypeName+'('+$event.timeBegin+'-'+$event.timeEnd+')</p>';
                        $that.append(event);

                        //sortEvent($that);

                    });


                    enabbleDrop();
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('获取人员排班数据存在错误,请联系管理员!');
            }
        );
    }



}

/**
 * 查询用户的工作时间
 */
function getWorkTime(userId,timeDegin,timeEnd){
    httpUtil.getData(
        contextPath+'workplan/worktime/'+userId+'/'+timeDegin+'/'+timeEnd,
        null,
        null,
        null,
        function(result){
            // alert(result);

            $('#'+userId+'_workTime').html(result.data);
            if(result.data<40){
                $('#'+userId+'_workTime').css('color','red');
            }
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );

}

function delDuty(e,userId,dutyDate,shiftId,areaId,$this){
    //alert('删除排班信息userId='+userId+',dutyDate='+dutyDate+',shiftId='+shiftId+',areaId='+areaId);

    //console.log($this.parent());
    layer.confirm('确定删除该排班信息？', {
        btn: ['确定','取消'] //按钮
    }, function(index){
        layer.close(index);
        httpUtil.getData(
            contextPath+'workplan/delShiftByUserDateShift',
            {
                "userId":userId,
                "dutyDate":dutyDate,
                "shiftId":shiftId,
                "areaId":areaId
            },
            null,
            null,
            function(result){
                if(result.code==200){
                    //删除DOM节点
                    var $event = $this.parent();
                    $event.remove();
                    refreshInfo();
                    //重新计算该人员的工作时间
                    getWorkTime(userId,days_YMD[0],days_YMD[6]);
                }else{
                    layer.msg('删除失败!');
                }
            },
            function(XMLHttpRequest, textStatus, errorThrown){
                layer.msg('删除失败!');
            }
        );
    }, function(){

    });





    e.stopPropagation();
}

function enabbleDrop(){
    $('td .fc-event').each(function (i) {

        //console.log($(this).data('dutyId'));

        var userId = $(this).data('userId');
        var dutyId = $(this).data('dutyId');
        var dutyDate = $(this).data('dutyDate');
        var userName = $(this).data('userName');
        var shiftId = $(this).data('shiftId');
        var areaId = $(this).data('areaId');
        //绑定悬停样式  绑定删除事件 悬浮鼠标出现删除小图标
        $(this).on("mouseover mouseout",function(e){
            if(e.type == "mouseover"){
                //鼠标悬浮
                $(this).css('backgroundColor','#FFFFFF');
                $(this).css('color','#2196F3');
                $(this).find('i.icon-delete').removeClass("d-none");
            }else if(e.type == "mouseout"){
                //鼠标离开
                $(this).css('backgroundColor','#2196F3');
                $(this).css('color','#FFFFFF');
                $(this).find('i.icon-delete').addClass('d-none');
            }
            e.stopPropagation();

        });

        //禁止点击冒泡，禁止选择文字(文字选择已经添加样式)
        $(this).click(function (e) {
            //绑定弹出修改事件
            //弹出选择界面
            //layer.alert('弹出编辑排班信息', {icon: 6});

            //弹出选择界面
            layer.open({
                title:'编辑排班',
                id:'editDuty',
                type: 2,
                area:['70%','80%'],
                shadeClose : true,
                content: contextPath+'workplan/page/edit/duty?dutyId='+dutyId+'&departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser+'&viewName='+viewName+'&userId='+userId+'&userName='+userName+'&dutyDate='+dutyDate+'&shiftId='+shiftId+'&areaId='+areaId
            });

            e.stopPropagation();



        });

        //绑定拖拽事件
        $(this).draggable({
            zIndex: 999999999,
            revertDuration: 0,
            cursor: "move",
            scroll:false,
            // cursorAt: { top: -12, left: -20 },  //事件名称偏移位置
            helper: function( event ) {
                return $( '<span class="badge badge-info">'+$(event.target).text()+'</span>' );
            }
        });

    });

    //可以刷新左侧最新频率列表  但是为了不影响用户选择当前的顺序所以这里不给她自动刷新这个列表
    refreshInfo();
}


function createEvent(attrs){
    return '<p></p>';
}


FC.views.custom = CustomView; // register our class with the view system