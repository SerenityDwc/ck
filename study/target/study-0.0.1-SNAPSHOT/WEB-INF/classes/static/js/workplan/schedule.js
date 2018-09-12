$(function () {

    //初始化日历
    $('#calendar').fullCalendar({
        custom_params:{
          "departId":departId,
          "userType":userType,
          "submitUser":submitUser
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        defaultView: 'people',
        //contentHeight:100,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'people,shift,position'
        },
        //titleFormat: 'title[Hello, World!]',
        editable: true,
        droppable: true,
        views: {
            people: {
                type: 'custom',
                buttonText: '人员',
                duration: { weeks: 1 }
            },
            shift: {
                type: 'custom',
                buttonText: '班次',
                duration: { weeks: 1 }
            },
            position: {
                type: 'custom',
                buttonText: '岗位',
                duration: { weeks: 1 }
            }
        },
        buttonText:{
            today :'本周'
        },
        viewRender:function (view, element) {
            //console.log('viewRender:'+view.name);
            if(view.name==='people'){
                initLeft('people');



            }else if(view.name==='shift'){
                initLeft('shift');



            }else if(view.name==='position'){
                initLeft('position');



            }
        },
        eventMouseover: function(calEvent, jsEvent, view){//鼠标在日程区块上时触发
            //console.log('eventMouseover');
            $(this).css('background-color', 'gray');
        },
        eventMouseout: function(calEvent, jsEvent, view){//鼠标从日程区块离开时触发
            console.log('eventMouseout');
            $(this).css('background-color', 'yellow');
        },
        eventClick: function(calEvent, jsEvent, view) {//日程区块，单击时触发
            // console.log("↓↓↓eventClick↓↓↓");
            // console.log('Event: ' + calEvent.title);
            // console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // console.log('Current view: ' + view.name);
            // change the day's background color just for fun
            $(this).css('background-color', 'green');
            return false;  //return false可以阻止点击后续事件发生（比如event中的url跳转事件）
        },
        dayClick: function(date, jsEvent, view) {//空白的日期区，单击时触发

            // console.log(view);
            // console.log("↓↓↓dayClick↓↓↓");
            // console.log('Clicked on: ' + date.format());
            // console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // console.log('Current view: ' + view.name);
            // change the day's background color just for fun
            $(this).css('background-color', 'red');
        }

    });

    //layui.flow.lazyimg();

    //防止滚动条事件冒泡到父页面
    $('.schedule-center-left div').bind('mousewheel DOMMouseScroll',function (e) {
        e.stopPropagation();
    });

    //填充部门排班信息

    refreshInfo();


    $('#leftBqs span').each(function () {
        var _this = $(this);
        $(this).click(function () {
            //alert(_this.data('id'));
            var activeId = _this.data('id');
            setBqState(activeId);
            //TODO
            //去加载相应的数据  初始化设备  这里暂时只有警车
            initSb(activeId);
        });
    });




});

//获取排班数量数据情况 刷新显示
function refreshInfo(){
    //已经排班
    var shiftedNum=0;
    //未排班
    var unshiftedNum=0;
    //一共
    var totalNum=0;

    //获取查询条件信息
    var startDay = $('#calendar').fullCalendar('getDate');
    var startDate=startDay.subtract(7-(7-startDay.format('E'))-1, 'days').format('YYYY-MM-DD');
    var endDate=startDay.subtract(7-(7-startDay.format('E'))-1-6, 'days').format('YYYY-MM-DD');

    //已经排班
    httpUtil.getData(
        contextPath+'workplan/shiftedByDepart',
        {
            "departId":departId,
            "startDate":startDate,
            "endDate":endDate,
            "userType":userType
        },
        null,
        null,
        function(result){
            shiftedNum = result.data;

            //未排班
            httpUtil.getData(
                contextPath+'workplan/unshiftedByDepart',
                {
                    "departId":departId,
                    "startDate":startDate,
                    "endDate":endDate,
                    "userType":userType
                },
                null,
                null,
                function(result){
                    unshiftedNum = result.data;

                    totalNum = shiftedNum+unshiftedNum;

                    //渲染
                    $('#departName').html(departName);
                    $('#totalNum').html(totalNum);
                    $('#shiftedNum').html(shiftedNum);
                    $('#unshiftedNum').html(unshiftedNum);

                },
                function(XMLHttpRequest, textStatus, errorThrown){

                }
            );
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}

function goDutyInfo() {
    //alert('goShift');
    window.location.href = contextPath + 'workplan/page/index/info?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

function goShift() {
    //alert('goShift');
    window.location.href = contextPath + 'workplan/shift/index?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

function goArea() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/position/index?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

function goZrqWork() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/page/index/zrq/work?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

function goZrqDept() {
    //alert('goArea');
    window.location.href = contextPath + 'workplan/page/index/zrq/dept?departId='+departId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

function goWorkPlan() {
    //alert('goArea');
   // alert(rootDepartId);
    window.location.href = contextPath + 'workplan/index?departId='+rootDepartId+'&departName='+departName+'&userType='+userType+'&submitUser='+submitUser ;
}

/**
 * 初始化左侧数据  依据不同的视图进行数据填充
 * @param viewType
 */
function initLeft(viewType){
    //清空左侧数据
    $('.list-group').empty();

    //设置下尺寸 没准之后的其他视图左侧不需要 所以写在这里
    //console.log(window.innerHeight);
    var left_list_height = window.innerHeight-180;
    $('.schedule-center-left div').css('height',left_list_height+'px');



    var dutyType = 'people';
    if(viewType=='people'){
        dutyType = 'people';
    }else if(viewType=='shift'){
        dutyType = 'shift';
    }else if(viewType=='position'){
        dutyType = 'position';
    }

    //获取该部门下已经排班的信息 按照数量倒序展示
    httpUtil.getData(
        contextPath+'workplan/dutys',
        {
            "departId":departId,
            "dutyType":dutyType
        },
        null,
        null,
        function(result){
            var $data = result.data;

            if($data.length==0){
                $('.list-group').append('<span style="color: red;">没有历史数据</br>请手动进行排班!</span>');
                return;
            }

            $data.forEach(function($duty,index,array){
                if(viewType=='people'){
                    $('.list-group').append('<li class="list-group-item one-line dutyInfo" data-shift-id="'+$duty.shiftId+'" data-area-id="'+$duty.areaId+'" title="'+$duty.shiftTypeName+'-'+$duty.areaName+'('+$duty.timeBegin+'-'+$duty.timeEnd+')" data-time-begin="'+$duty.timeBegin+'" data-time-end="'+$duty.timeEnd+'">'+$duty.shiftTypeName+'('+$duty.timeBegin+'-'+$duty.timeEnd+')'+'</br>'+$duty.areaName+'</li>');
                }else if(viewType=='shift'){
                    $('.list-group').append('<li class="list-group-item one-line dutyInfo" data-user-id="'+$duty.userId+'" data-area-id="'+$duty.areaId+'" title="'+$duty.userName+'('+$duty.userId+') '+$duty.areaName+'" data-time-begin="'+$duty.timeBegin+'" data-time-end="'+$duty.timeEnd+'">'+$duty.userName+'('+$duty.userId+')'+'</br>'+$duty.areaName+'</li>');
                }else if(viewType=='position'){
                    $('.list-group').append('<li class="list-group-item one-line dutyInfo" data-shift-id="'+$duty.shiftId+'" data-user-id="'+$duty.userId+'" title="'+$duty.shiftTypeName+'-'+$duty.areaName+'('+$duty.timeBegin+'-'+$duty.timeEnd+')" data-time-begin="'+$duty.timeBegin+'" data-time-end="'+$duty.timeEnd+'">'+$duty.userName+'('+$duty.userId+')'+'</br>'+$duty.shiftName+'('+$duty.timeBegin+'-'+$duty.timeEnd+')'+'</li>');
                }




            });

            ebableLeftDropable();
        },
        function(XMLHttpRequest, textStatus, errorThrown){

        }
    );
}


function ebableLeftDropable(){
    //初始化这些组合
    $('.schedule-center-left .list-group li').each(function() {

        //make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999999999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0,  //  original position after the drag
            cursor: "move",
            scroll:false,
            cursorAt: { top: 0, left: 0 },  //事件名称偏移位置
            helper: function( event ) {
                return $( '<span class="badge badge-info">'+$(event.target).text()+'</span>' );
            }
        });

    });


    //鼠标绑定左侧组合样式事件
    $('.list-group li').hover(function () {
        $(this).addClass('active');
    })

    $('.list-group li').mouseleave(function () {
        $(this).removeClass('active');
    })
}

function showImgIcon(td){
    //console.log($(td));
    // console.log($(td).find('i'));

    var $icon = $(td).find('i');

    $icon.removeClass("d-none");
}

function hideImgIcon(td){
    //console.log($(td));
    // console.log($(td).find('i'));

    var $icon = $(td).find('i');

    $icon.addClass("d-none");
}

function showDetail(td){

}

function modifyAvatar(avatarType,avatarId){
    layer.open({
        title:'修改头像',
        id:'modifyAvatar',
        type: 2,
        shadeClose : true,
        area:['80%','70%'],
        content: contextPath+'workplan/page/edit/avatar?avatarType='+avatarType+'&avatarId='+avatarId
    });
}

/**
 * 获取标签的激活状态返回需要加载信息的类别
 */
function getBqState(){
    $('#leftBqs').each(function () {
        if($(this).hasClass('activeBq')){
            return $(this).data('id');
        }
    });
}

/**
 * 设置标签的样式
 */
function setBqState(activeId){
    $('#leftBqs span').each(function () {
        if($(this).data('id')==activeId){
            $(this).addClass('activeBq');
        }else{
            $(this).removeClass('activeBq');
        }
    });
}

/**
 * 初始化左侧设备列表  传入设备类型
 * car - 警车
 */
function initSb(sbType){

    //清空左侧数据
    $('.list-group').empty();

    var sbName = '';
    if(sbType == 'car'){
        sbType = '2';
        sbName = '警车';


        httpUtil.getData(
            contextPath+'workplan/sb',
            {
                "departId":departId,
                "sbType":sbType
            },
            null,
            null,
            function(result){
                //console.log(result);

                if(result.code == 200){

                    var $data = result.data.list;

                    if($data.length==0){
                        $('.list-group').append('<span style="color: red;">没有'+sbName+'数据</br>请手动录入数据!</span>');
                        return;
                    }




                    //设置下尺寸 没准之后的其他视图左侧不需要 所以写在这里
                    //console.log(window.innerHeight);
                    var left_list_height = window.innerHeight-100;
                    $('.schedule-center-left div').css('height',left_list_height+'px');

                    $data.forEach(function($car,index,array){
                        $('.list-group').append('<li class="list-group-item one-line sbInfo" data-sb-id="'+$car.sbId+'">' +
                            '<div class="car_item">' +
                            '<div class="car_avatar">' +
                            '<img src="/'+app.path+'/img/workplan/bq/car.jpg" style="width:100%;height:100%;"/>' +
                            '</div>' +
                            '<div class="car_info">' +
                            '<div class="car_hphm"><div class="hphm">'+$car.sbName+'</div></div>' +
                            '<div class="car_num">编号:'+$car.sbNum+'</div>' +
                            '</div>' +
                            '<div>' +
                            '</li>');
                    });

                    ebableLeftDropable();

                    enableDutyDrap();
                }


            },
            function(XMLHttpRequest, textStatus, errorThrown){

            }
        );

    }else if(sbType == 'info'){
        //需要区分视图类型
        initLeft(viewName);
        //console.log(viewName);

    }


}

/**
 * 在切换到设备标签的时候去使  排班信息的event可以进行元素拖进操作 且只能接受 设备的拖拽
 */
function enableDutyDrap(){
    //绑定dropable事件 元素拖动到此触发的事件
    $('.fc-view .fc-day p').each(function (i) {
        var $that = $(this);//拖拽接收的对象
        $(this).droppable({

            accept: ".sbInfo",//只允许设备信息拖拽到排班信息上面
            //activeClass: "bg-info",
            hoverClass: "bg-success",
            drop: function (event, ui) {

                var $event = $(ui.draggable[0]);//拖拽对象

                //console.log($event);

                //获取班次信息dutyId   获取设备sbId

                //检测已经存在警车了就不能再添加了

                //console.log('sbId:'+$event.data('sbId'));
                //console.log('dutyId:'+$that.data('dutyId'));

                httpUtil.postData(
                    contextPath+'workplan/dutysb?dutyId='+$that.data('dutyId')+'&sbId='+$event.data('sbId'),
                    null,
                    null,
                    function(result){
                        if(result.code == 200){
                            //将排班信息加上汽车的小图标
                            $that.prepend('<i class="iconfont icon-jingwuicon_svg-" />');
                        }else{
                            layer.msg('数据保存失败,请联系管理员!');
                        }
                    },
                    function(XMLHttpRequest, textStatus, errorThrown){

                    }
                );

            }
        });
    });
}



