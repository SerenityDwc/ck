/**
 *==============================================
 *===================系统字典翻译=================
 *==============================================
 *
 * httpUtil  来源 hutool
 */

/**
 * 字典翻译的Url
 * @type {string}
 */
var dictUrl = contextPath+'dict/trans';
var dictQueryUrl = contextPath+'dict/trans/query';

/**
 *字典翻译展示
 * @param dictName  字典名称
 * @param dictCode  字典值
 */
function display(dictName,dictCode){
    //必须在外部定义一个变量，否则直接在function return 无效
    var dictValue = '';
    httpUtil.getData(
        dictUrl+'/'+dictName+'/'+dictCode,
        null,
        'text',
        false,
        function (result) {
            dictValue = result;
        },
        function (XMLHttpRequest, textStatus, errorThrown) {
        }
    );
    return dictValue;
}

function display2(dictName,dictCode){
    //必须在外部定义一个变量，否则直接在function return 无效
    var dictValue = '';
    httpUtil.getData(
        dictUrl+'/'+dictName+'/'+dictCode,
        null,
        'text',
        false,
        function (result) {
            dictValue = result;
        },
        function (XMLHttpRequest, textStatus, errorThrown) {
        }
    );
    return dictValue;
}


function display(dictName,dictCode,dictDepart){
    //必须在外部定义一个变量，否则直接在function return 无效
    var dictValue = '';
    httpUtil.getData(
        dictQueryUrl+'/'+dictName+'/'+dictCode+'/'+dictDepart,
        null,
        'text',
        false,
        function (result) {
            if(result.length==0){
                dictValue = dictCode;
            }else{
                dictValue = result;
            }
        },
        function (XMLHttpRequest, textStatus, errorThrown) {
        }
    );
    return dictValue;
}

/**
 * 工作排班-班次类型
 * @param value 字典值
 * @param row   行值(来源bootstrap table)
 * @param index 序列(来源bootstrap table)
 * @returns {string}
 */
function shiftType(value) {
    return value!=''?display('SHIFTTYPE', value):'';
}

function shift(value) {
    return display('SHIFT', value);
}


function yhdd(value,depart) {
    //console.log(value,depart)
    return value!=''?display('YHDD', value,departId):'';
}


function yhlx(value) {
    return value!=''?display2('YHLX', value):'';
}


function cr(value) {
    return value!=''?display2('CR', value):'';
}




/**
 * 排班人员信息翻译
 * @param value
 * @param row
 * @param index
 */
function workplanUser(value) {
    return display('USER', value);
}

function workplanDepart(value) {
    return display('DEPART', value);
}


/**
 * 岗位类型
 * @param value
 */
function areaType(value) {
    return display('AREATYPE', value);
}

function post(value) {
    return display('POST', value);
}