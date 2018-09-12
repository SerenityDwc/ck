/**===================================================
 *
 *
 *       JS 工具集
 *    @Author LancCJ
 *
 ===================================================*/


/****
 * 修改日志
 * 2018年01月03日
 *              1.修改 getData  新增返回数据参数 dataType 默认 json 返回类型 [LancCJ]
 *
 *
 *
 *
 *
 *
 */

/**
 * 方法作用：【格式化时间】
 * 使用方法
 * 示例：
 *      使用方式一：
 *      var now = new Date();
 *      var nowStr = now.dateFormat("yyyy-MM-dd hh:mm:ss");
 *      使用方式二：
 *      new Date().dateFormat("yyyy年MM月dd日");
 *      new Date().dateFormat("MM/dd/yyyy");
 *      new Date().dateFormat("yyyyMMdd");
 *      new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
 * @param format {date} 传入要格式化的日期类型
 * @returns {2015-01-31 16:30:00}
 */
Date.prototype.dateFormat = function (format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}
/***********************************************************************
 *                           日期时间工具类                            *
 *                     注：调用方式，deteUtil.方法名                   *
 * ********************************************************************/
var dateUtil = {
    /*
     * 方法作用：【取传入日期是星期几】
     * 使用方法：dateUtil.nowFewWeeks(new Date());
     * @param date{date} 传入日期类型
     * @returns {星期四，...}
     */
    nowFewWeeks:function(date){
        if(date instanceof Date){
            var dayNames = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
            return dayNames[date.getDay()];
        } else{
            return "Param error,date type!";
        }
    },
    /*
     * 方法作用：【字符串转换成日期】
     * 使用方法：dateUtil.strTurnDate("2010-01-01");
     * @param str {String}字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
     * @return {Date}由字符串转换成的日期
     */
    strTurnDate:function(str){
        var   re   =   /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        var   dt;
        if   (re.test(str)){
            dt   =   new   Date(RegExp.$1,RegExp.$2   -   1,RegExp.$3);
        }
        return dt;
    },
    /*
     * 方法作用：【计算2个日期之间的天数】
     * 传入格式：yyyy-mm-dd(2015-01-31)
     * 使用方法：dateUtil.dayMinus(startDate,endDate);
     * @startDate {Date}起始日期
     * @endDate {Date}结束日期
     * @return endDate - startDate的天数差
     */
    dayMinus:function(startDate, endDate){
        if(startDate instanceof Date && endDate instanceof Date){
            var days = Math.floor((endDate-startDate)/(1000 * 60 * 60 * 24));
            return days;
        }else{
            return "Param error,date type!";
        }
    },
    /**
     *转换日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */
    getSmpFormatDate:function(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return getFormatDate(date, pattern);
    },
    /**
     *转换当前日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */

    getSmpFormatNowDate:function(isFull) {
        return getSmpFormatDate(new Date(), isFull);
    },
    /**
     *转换long值为日期字符串
     * @param l long值
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */

    getSmpFormatDateByLong:function(l, isFull) {
        return getSmpFormatDate(new Date(l), isFull);
    },
    /**
     *转换long值为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */
    getFormatDateByLong:function(l, pattern) {
        return getFormatDate(new Date(l), pattern);
    },
    /**
     *转换日期对象为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */
    getFormatDate:function(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    },
    /**
     * 将字符串转换为日期 <br/>
     * 字符串格式给：yyyy-MM-dd
     * @param dateStr 字符串
     * @returns
     */
    pasre:function(dateStr){
        try{
            var dtArr = dateStr.split("-");
            var dt = new Date(dtArr[0], dtArr[1], dtArr[2]);
            return dt;
        }catch(e){
            return null;
        }
    },
    /**
     * 将字符串转换为年月日
     * 字符串格式给：yyyy-MM-dd
     * @param dateStr yyyy年MM月dd日
     * @returns
     */
    getDateStr:function(dateStr){
        try{
            var dtArr = dateStr.split("-");
            var dt = dtArr[0]+"年"+dtArr[1]+"月"+ dtArr[2]+"日";
            return dt;
        }catch(e){
            return null;
        }
    }
};
/***********************************************************************
 *                           加载工具类                                *
 *                     注：调用方式，loadUtil.方法名                   *
 * ********************************************************************/
var loadUtil = {
    /*
     * 方法说明：【动态加载js文件css文件】
     * 使用方法：loadUtil.loadjscssfile("http://libs.baidu.com/jquery/1.9.1/jquery.js","js")
     * @param fileurl 文件路径，
     * @param filetype 文件类型，支持传入类型，js、css
     */
    loadjscssfile:function(fileurl,filetype){
        if(filetype == "js"){
            var fileref = document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src",fileurl);
        }else if(filetype == "css"){

            var fileref = document.createElement('link');
            fileref.setAttribute("rel","stylesheet");
            fileref.setAttribute("type","text/css");
            fileref.setAttribute("href",fileurl);
        }
        if(typeof fileref != "undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }else{
            alert("loadjscssfile method error!");
        }
    }
};

/***********************************************************************
 *                           字符串操作工具类                          *
 *                     注：调用方式，strUtil.方法名                   *
 * ********************************************************************/
var strUtil = {
    /*
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {}
     */
    isEmpty:function(str){
        if(str != null && str.length > 0){
            return true;
        }else{
            return false;
        }
    },
    /*
     * 判断两个字符串子否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEquals:function(str1,str2){
        if(str1==str2){
            return true;
        }else{
            return false;
        }
    },
    /*
     * 忽略大小写判断字符串是否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEqualsIgnorecase:function(str1,str2){
        if(str1.toUpperCase() == str2.toUpperCase()){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 判断是否是数字
     * @param value
     * @returns {Boolean}
     */
    isNum:function (value){
        if( value != null && value.length>0 && isNaN(value) == false){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 判断是否是中文
     * @param str
     * @returns {Boolean}
     */
    isChine:function(str){
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if(reg.test(str)){
            return false;
        }
        return true;
    }
};


var webgis = {
    /**
     * 将老的坐标转换成新的用;隔开
     * @param areaStr
     */
    convertLngLat:function(areaStr){
        if(areaStr.length==0){
            return '';
        }else{
            if(areaStr.indexOf(';')!=-1){//存在  新坐标
                return areaStr;
            }else{
                //判断是否偶数个
                var areaStrs = areaStr.split(',');
                if(areaStrs.length % 2 ==0){
                    //console.log('转换');
                    //满足然后进行偶数位,替换成;再返回
                    return areaStr.replace(/([0-9]{1,}[.][0-9]*),([0-9]{1,}[.][0-9]*),/g,"$1,$2\;");
                }else{
                    return '';
                }
            }
        }
    }
};

/***********************************************************************
 *                           验证工具类                          *
 *                     注：调用方式，valiUtil.方法名                   *
 * ********************************************************************/
var valiUtil = {
    /**
     * 验证手机号码 <br/>
     * @param mobile
     * @returns {Boolean}
     */
    mobile:function (mobile) {
        if(!mobile || mobile == ""){
            return false;
        }
        var validate = false;
        var reg =/^((\+?86)|(\+86))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|170[0125789][0-9]{7}|17[678][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        if (reg.test(mobile)) {
            validate = true;
        }else{
            validate = false;
        };
        return validate;
    },
    /**
     * 验证电话号码 <br/>
     * @param telphone
     * @returns {Boolean}
     */
    tel:function(telphone){
        if(!telphone || telphone == ""){
            return false;
        }
        var validate = false;
        var reg =/^(0[0-9]{2,3})?(-)?[0-9]{7,8}$/;
        if (reg.test(telphone)) {
            validate = true;
        }else{
            validate = false;
        };
        return validate;
    },
    /**
     * 验证邮箱地址
     * @param email
     * @returns {Boolean}
     */
    email:function(email){
        if(!email || email == ""){
            return false;
        }
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!pattern.test(email)) {
            return false;
        }else{
            return true;
        }
    },
    /**
     * 验证15位或18位身份证号码
     * @param idCard
     * @returns {Boolean}
     */
    idCard:function(idCard) {
        //15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }
                var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);//得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (!(idCardLast == "X" || idCardLast == "x")) {
                        return false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (!(idCardLast == idCardY[idCardMod])) {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
        return true;
    }
};
/***********************************************************************
 *                           Http工具类                          *
 *                     注：调用方式，httpUtil.方法名                   *
 *                     传对象的都是传json到后台然后SpringBoor requestBody 接收对象
 * ********************************************************************/
var httpUtil = {
    getImgImgData:function(url,params,async,callback,errorMethod){
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }

        $.ajax({
            url : url,
            data : params,
            type : "GET",
            cache : true,
            async : async,
            success : function(result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    },
    /***
     * ajax请求封装
     * @param url 请求地址
     * @param params 请求参数  参数会拼接到链接后面  没有参数会自动添加一个时间戳
     * @param dataType 返回类型  默认 json
     * @param async 是否异步,默认值为：true. true：异步，false：同步
     * @param callback 执行成功后的回调方法
     */
    getData:function(url,params,dataType,async,callback,errorMethod){
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }
        if(dataType == null || dataType == ""){
            dataType = 'json';
        }
        $.ajax({
            url : url,
            data : params,
            type : "GET",
            dataType : dataType,
            cache : true,
            async : async,
            success : function(result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    },
    delData:function(url,params,dataType,async,callback,errorMethod){
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }
        if(dataType == null || dataType == ""){
            dataType = 'json';
        }
        $.ajax({
            url : url,
            type : "DELETE",
            dataType : dataType,
            cache : true,
            async : async,
            success : function(result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    },
    /***
     * ajax请求封装
     * @param url 请求地址
     * @param params 请求参数
     * @param async 是否异步,默认值为：true.<br/>  true：异步，false：同步
     * @param callback 执行成功后的回调方法
     */
    postData:function(url, params, async, callback,errorMethod) {
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }
        $.ajax({
            url : url,
            data : JSON.stringify(params),
            contentType:"application/json",
            type : "POST",
            dataType : 'json',
            cache : true,
            async : async,
            success : function(result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    },
    putData:function(url, params, async, callback,errorMethod) {
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }
        //console.log(params);
        $.ajax({
            url : url,
            data : JSON.stringify(params),
            type : "PUT",
            dataType : 'json',
            cache : false,
            async : async,
            contentType : 'application/json; charset=UTF-8',
            success : function(result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    },
    /***
     * ajax请求封装
     * @param formId 表单的ID
     * @param async 是否异步,默认值为：true.<br/>  true：异步，false：同步
     * @param callback 执行成功后的回调方法
     * @param errorMethod 出错时的回调方法
     */
    postFormData:function(url,formId,async, callback,errorMethod) {
        var j_searchForm = $("#"+formId);
        if(url.length==0 || url ==null){
            url =j_searchForm.attr("action");
        }
        var params = j_searchForm.serialize();
        if(params == null || params == ""){
            params = {"t":new Date().getTime()};
        }
        if(async == null){
            async = true;
        }
        $.ajax({
            url : url,
            data : params,
            type : "POST",
            dataType : 'json',
            cache : true,
            async : async,
            success : function(result) {
                if (typeof callback == 'function') {
                    var isPrompt = errorMessage(result);
                    if(!isPrompt){
                        callback(result);
                    }
                }
            },
            complete : function(xhr, ts) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(window.console){
                    // console.log("status:"+XMLHttpRequest.status);
                    // console.log("readyState:"+XMLHttpRequest.readyState);
                    // console.log("textStatus:"+textStatus);
                }
                if(errorMethod && typeof errorMethod == "function"){
                    errorMethod(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        })
    }
};
/***********************************************************************
 *                           Page页面(分页,提示)工具类
 *                           仅限UI为Bootstrap V4 其他的自己修改*
 *                     注：调用方式，PageUtil.方法名                   *
 * ********************************************************************/
var PageUtil = {
    /**
     * 分页插件
     */
    createPageInfo:function(page,searchFormId){
        var html = "";
        if(page && page.total){
            var total = page.total;
            if(total && total > 0){
                //当前页
                var currentPage = page.pageNum;
                //每页显示的条数
                var pageSize = page.pageSize;
                //总页数
                var pageCount = page.pages;

                $("#currentPageInput").val(currentPage);
                $("#pageSizeInput").val(pageSize);

                html +="<div class=\"col-sm-4\"><label>每次加载<select class=\"form-control input-sm\" onchange=\"changePage(this,'"+searchFormId+"')\">";
                if(pageSize == 10){
                    html +="<option value=\"10\" selected>10</option>";
                }else{
                    html +="<option value=\"10\">10</option>";
                }
                if(pageSize == 20){
                    html +="<option value=\"20\" selected>20</option>";
                }else{
                    html +="<option value=\"20\">20</option>";
                }
                if(pageSize == 50){
                    html +="<option value=\"50\" selected>50</option>";
                }else{
                    html +="<option value=\"50\">50</option>";
                }
                if(pageSize == 100){
                    html +="<option value=\"100\" selected>100</option>";
                }else{
                    html +="<option value=\"100\">100</option>";
                }
                html +="</select>条，共"+total+"条数据";
                html +="</label>";
                html +="</div>";


                html +="<div class=\"col-sm-8\">";
                html +="<nav aria-label=\"Page navigation\">";
                html +=" <ul class=\"pagination\" style=\"margin-top: 0px;margin-bottom: 0px;\">";
                //第一页时，禁用第一页翻页按钮
                if(currentPage == 1){
                    html +="<li class=\"disabled\">";
                    html +="<a href=\"javascript:void(0)\" aria-label=\"Previous\">";
                    html +="<span aria-hidden=\"true\">«</span>";
                    html +="</a>";
                    html +="</li>";
                }else{
                    html +="<li>";
                    html +="<a href=\"javascript:void(0)\" onclick=\"setCurrentPage("+1+",'"+searchFormId+"')\" aria-label=\"Previous\">";
                    html +="<span aria-hidden=\"true\">«</span>";
                    html +="</a>";
                    html +="</li>";
                }

                //最多显示6个页码,此参数必须为偶数
                var showPageNum = 6;

                var index = 1;
                var end = pageCount;
                if(end > showPageNum){
                    if(currentPage < showPageNum){
                        end = showPageNum;
                    }else if(currentPage >=showPageNum/2 && currentPage < end-showPageNum/2){
                        index = currentPage - (showPageNum/2+1);
                        end = currentPage + showPageNum/2;
                    }else{
                        index = end- showPageNum+1;
                    }
                }

                for(var i = index; i <=end;i++){
                    if( i == currentPage){
                        html +="<li class=\"active\"><a  href=\"javascript:void(0)\">"+i+" <span class=\"sr-only\">(current)</span></a></li>";
                    }else{
                        html +="<li><a href=\"javascript:void(0)\" onclick=\"setCurrentPage("+i+",'"+searchFormId+"')\">"+i+"</a></li>";
                    }
                }

                //最后一页时，禁用最后一页翻页按钮
                if(currentPage == pageCount){
                    html +="<li class=\"disabled\">";
                    html +="<a href=\"javascript:void(0)\" aria-label=\"Next\">";
                    html +="<span aria-hidden=\"true\">»</span>";
                    html +="</a>";
                    html +="</li>";
                }else{
                    html +="<li>";
                    html +="<a href=\"javascript:void(0)\" onclick=\"setCurrentPage("+pageCount+",'"+searchFormId+"')\" aria-label=\"Next\">";
                    html +="<span aria-hidden=\"true\">»</span>";
                    html +="</a>";
                    html +="</li>";
                }

                html +="<li><span style=\"color: #2C2E2F;border-top: 0;border-bottom: 0;border-right: 0;\">"+currentPage+"/"+pageCount+"</span></li>";
                html +="<li><input type=\"text\" id=\"goPageText\" style=\"width: 34px;height: 34px;margin-right: 10px;padding: 0px;text-align: center;\" class=\"form-control\" /></li>";
                html +="<li><span style=\"float: right;\"  onclick=\"goPage("+pageCount+",'"+searchFormId+"')\"><a href=\"javascript:void(0)\">GO</a></span></li>";
                html +="</ul>";
                html +="</nav>";
            }
        }
        return html;
    },
    /**
     * 全局错误提示，提示未登录和未存在权限的AJAX请求
     * @param result
     */
    errorMessage:function(result){
        var isPrompt = false;
        if(!result.success){
            var status = result.status;
            //如果用户未登录或者没有权限发出AJAX请求
            if(status == 401 || status == 403){
                if(window.layui){
                    var layer = window.layui.layer;
                    if(layer){
                        $(".panel-disabled").hide();
                        var message = result.message;
                        layer.open({
                            type: 1,
                            title:'提示信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '240px'], //宽高
                            content: message
                        });
                        isPrompt = true;
                    }
                }
            }
        }
        return isPrompt;
    },
    /***
     * 表单后端验证提示信息
     * @param errorMessage
     * @returns
     */
    errorTips:function(result){
        var errors=result.message;
        if(errors instanceof Array){
            if(errors && errors.length>0){
                var fileName=errors[0].propertyName;
                var el=$("input[name='"+fileName+"'][type='text']");
                var errorMess=errors[0].message;
                if(el&&el.length>0){
                    layui.layer.tips(errorMess, el,{
                        tips: [1, '#f57a78'] //还可配置颜色
                    });
                }else{
                    layer.alert(errorMess, {icon: 5});
                }
            }
        }else{
            layer.alert(errors, {icon: 5});
        }
    }
};



/***********************************************************************
 *                           重写Jqyery UI 拖拽事件  默认左键  现在可以右键啦
 *                           例子在方法底部
 *                           必须在引入jquery ui之后引入
 * ********************************************************************/
// $(document).ready(function () {
//     //override jQuery UI draggable
//     $.extend($.ui.draggable.prototype, {
//         _mouseInit: function () {
//             var that = this;
//             if (!this.options.mouseButton) {
//                 this.options.mouseButton = 1;
//             }
//
//             $.ui.mouse.prototype._mouseInit.apply(this, arguments);
//
//             if (this.options.mouseButton === 3) {
//                 this.element.bind("contextmenu." + this.widgetName, function (event) {
//                     if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
//                         $.removeData(event.target, that.widgetName + ".preventClickEvent");
//                         event.stopImmediatePropagation();
//                         return false;
//                     }
//                     event.preventDefault();
//                     return false;
//                 });
//             }
//
//             this.started = false;
//         },
//         _mouseDown: function (event) {
//
//             // we may have missed mouseup (out of window)
//             (this._mouseStarted && this._mouseUp(event));
//
//             this._mouseDownEvent = event;
//
//             var that = this,
//                 btnIsLeft = (event.which === this.options.mouseButton),
//                 // event.target.nodeName works around a bug in IE 8 with
//                 // disabled inputs (#7620)
//                 elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
//             if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
//                 return true;
//             }
//
//             this.mouseDelayMet = !this.options.delay;
//             if (!this.mouseDelayMet) {
//                 this._mouseDelayTimer = setTimeout(function () {
//                     that.mouseDelayMet = true;
//                 }, this.options.delay);
//             }
//
//             if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
//                 this._mouseStarted = (this._mouseStart(event) !== false);
//                 if (!this._mouseStarted) {
//                     event.preventDefault();
//                     return true;
//                 }
//             }
//
//             // Click event may never have fired (Gecko & Opera)
//             if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
//                 $.removeData(event.target, this.widgetName + ".preventClickEvent");
//             }
//
//             // these delegates are required to keep context
//             this._mouseMoveDelegate = function (event) {
//                 return that._mouseMove(event);
//             };
//             this._mouseUpDelegate = function (event) {
//                 return that._mouseUp(event);
//             };
//             $(document)
//                 .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
//                 .bind("mouseup." + this.widgetName, this._mouseUpDelegate);
//
//             event.preventDefault();
//
//             mouseHandled = true;
//             return true;
//         }
//     });
//
//     // $(".test1").draggable({  这是使用右键拖拽
//     //     mouseButton: 3
//     // });
//     // $(".test2").draggable();
// });

/**
 * 数据导出
 * @param exportParams 数据导出参数
 * @param queryParams  查询参数
 */
var exportData = {

    doExport : function(params) {
    var url = params.url;

    // if (params.type) {
    // 	if (url.indexOf('?') > -1) {
    // 		url += '&type=' + params.type;
    // 	} else {
    // 		url += '?type=' + params.type;
    // 	}
    // }
    //遍历params生成  form提交表单字符串

    if ($("#downloadForm").length  == 0) {
        var form = "<form id='downloadForm' method='post' action='" + url + "' style='display:none;'>"+
            inputForFrom(params)
            // +     "<input type='hidden' name='type' value='" + params.type + "'>"
            // +     "<input type='hidden' name='columns' value='" + params.columns + "'>"
            // +     "<input type='hidden' name='pageSize' value='" + params.pageSize + "'>"
            // +     "<input type='hidden' name='pageNumber' value='" + params.pageNumber + "'>"
            + "</form>";
        $("body").append(form);
    } else {
        $("#downloadForm").attr('action', url);
        $("input[name=type]", $("#downloadForm")).val(params.type);
        $("input[name=columns]", $("#downloadForm")).val(params.columns);
        $("input[name=pageSize]", $("#downloadForm")).val(params.pageSize);
        $("input[name=pageNumber]", $("#downloadForm")).val(params.pageNumber);
    }

    $("#downloadForm").submit();
    }
}


/**
 * 通过对象转换成 表单隐藏字符串
 * @param ParamJson
 * @returns {string}
 */
function inputForFrom(ParamJson){
    var inputs='';
    for(var key in ParamJson){
        inputs +=" <input type='hidden' name='"+key+"' value='" + ParamJson[key] + "'> ";
    }
    return inputs;
}






