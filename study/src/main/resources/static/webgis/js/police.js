
var picSize =[0,0,0,0,0,0,0,0,0,0,25,25,25,30,30,40,40,40,50];
//var picSize =[16,17,19,22,25,28,31,34,37,40];

function Policeman(g, b, f, d, s, c, t,z,o, l, n,sjhm,imei,mjlb,bs) {


    this.base = Monitor;
    this.base(g, b, f, d, null);

    this.mjjh = g;
    this.mjxm = b;
    this.lon = f;
    this.lat = d;

    this.imgSrc = "policeman.gif";
    this.policeStatus = s;
    this.jgmc =c;
    this.gpstime = t;
    this.onduty = o;
    this.overline = l;
    this.timeout = n;
    this.gps_lon = f;
    this.gps_lat = d;
    this.mjlb = mjlb;

    if(sjhm==null){
        this.sjhm = "";
    }else{
        this.sjhm = sjhm;
    }
    if(imei==null){
        this.imei = "";
    }else{
        this.imei = imei;
    }
    if(z==null){
        this.zdlx = "";
    }else{
        this.zdlx = z;
    }
    if(this.timeout==1){
        this.policeStatus = 4;			// 下线
    }else{
        if(this.onduty==0){
            this.policeStatus = 1;		// 在线
        }else{
            if(this.overline == 0){
                this.policeStatus = 2;	// 当班
            }else{
                this.policeStatus = 3;	// 越界
            }
        }
    }
    this.bs = bs;
}

Policeman.prototype = new Monitor;

Policeman.prototype.getMonitorImage = function (d) {
    var b = "";
    var c = "image/policeman/";
    if(this.mjlb=="3"){
        c="image/fpoliceman/";
    }
    var f = "";
    if (this.policeStatus == 1) {
        f = "_1.gif";
    } else {
        if (this.policeStatus == 2) {
            f = "_2.gif";
        } else {
            if (this.policeStatus == 3) {
                f = "_3.gif";
            } else {
                f = "_4.gif";
            }
        }
    }
    b = this.imgSrc.replace(".gif", f);
    b = c + b;
    return b;
};


Policeman.prototype.initMonitorImage = function () {
    var currentZoomLevel = this.getCurrentZoomLevel();
    this.imgSize = picSize[currentZoomLevel];
    this.topOffset = 0;
};

Policeman.prototype.getImageObj = function (c) {
    var b = new ImageObj();
    b.URL = this.getMonitorImage();
    b.width = 16;
    b.alt = "";
    return b;
};

Policeman.prototype.bIsVisable = function () {
    var b = false;
    if (this.div == null) {
        this.createDiv();
    }
    if (this.bIsDisplay) {
        if (this.div.style.display == "none") {
            this.div.style.display = "";
        }
        b = false;
    } else {
        if (this.div.style.display == "") {
            this.div.style.display = "none";
        }
    }
    return b;
};

Policeman.prototype.setImg = function (b) {
    this.imgSrc = b;
    this.refreshMonImg();
};

Policeman.prototype.openInfoWindowHtml = function(point) {
    if (typeof b == "undefined" || b == null) {
        this.map.openInfoWindow(this.lon, this.lat, this.getPoliceInfo());

        point.bindPopup(this.getPoliceInfo());
        point.openPopup();

    } else {
        this.map.openInfoWindow(this.lon, this.lat, b);
    }
    $(".BMap_IW_right").mousedown("click",function(){
        $(".BMap_pop").hide();
    });
    // 显示当前民警的工作情况
    //initPoliceWork(this);
    //initPoliceJcjWork(this);
    // 清除当前已画的责任区
    //clearPolygon();
    // 显示当前民警的责任区
    // TODO
    //initPoliceArea(this);
}

Policeman.prototype.redraw = function (f) {
    var h = null;
    var g = this.map.convert2WPoint(this.lon, this.lat);
    var d = g.x;
    var k = g.y;
    var c = "";
    var b = null;
    if (this.div) {
        h = this.div;
    } else {
        h = getEleByID(this.id);
    }
    if (h) {
        h.x = d;
        h.y = k;
        h.lon = this.lon;
        h.lat = this.lat;
        var j = this.imgSize * this.imgScale;
        this.setImgPos(d - j / 2, k - j / 2, j, j);
        if (!(this instanceof Video)) {
            b = this.getImageObj();
            c = b.URL;
            strAlt = b.alt;
            if (h.src != c) {
                h.src = c;
            }
            if (h.alt != strAlt) {
                h.alt = strAlt;
            }
        }
    }
    this.onChange();
    delete g;
    delete b;
    return h;
};

Policeman.prototype.getCurrentZoomLevel = function(){
    return this.map.getZoomLevel();
};

Policeman.prototype.getPoliceInfo = function(){
    //console.log(this);

    var policeID = "\u8B66\u5458\u7F16\u53F7";
    var policeName = "\u8B66\u5458\u540D\u79F0";
    var policeInJG = "\u673A\u6784\u540D\u79F0";
    var policeSjhm = "\u624B\u673A\u53F7\u7801";
    var policegpstime = "\u5B9A\u4F4D\u65F6\u95F4";
    var mjlbms="";
    if(this.mjlb==3 || this.mjlb=="3"){
        mjlbms="(警辅)";
    }
    var policemsg = '<div class="BMap_bubble_content"><div class="BMap_content_police">'+
        policeID+'：'+this.mjjh+'</br>'+
        policeName+'：'+this.mjxm+'</br>'+
        policeInJG+'：'+this.jgmc+'</br>'+
        policegpstime+'：'+moment(this.gpstime).format('YYYY-MM-DD HH:mm:ss')+'<br>'+
        // policeSjhm+'：'+(this.sjhm==null?'':this.sjhm)+'</br></div>' +
        '<div class="btn-group btn-group-justified" role="group">'+
        '<div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block" onclick="queryGj(\''+this.mjjh+'\',\''+this.mjxm+'\');">轨迹查询</button></div>' +
        '<div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block" onclick="querySnapshot(\''+this.mjjh+'\',\''+this.mjxm+'\');">快照查询</button></div>'+
        '<div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block" onclick="goYryd(\''+this.mjjh+'\',\''+this.mjxm+'\');">一人一档</button></div>'+
        /*'<div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block" onclick="queryGj(\''+this.id+'\',\''+this.name+'\');">视频通话</button></div>' +
        '<div class="btn-group" role="group"><button type="button" class="btn btn-info btn-sm btn-block" onclick="querySnapshot(\''+this.id+'\',\''+this.name+'\');">下发任务</button></div>'+*/
        '</div></div></div>';
    var test1 = '<div class="BMap_pop"><div class="BMap_IW_bottom"></div><div class="BMap_bubble_title"><b>当前点位</b>'+policemsg +'<div class="BMap_IW_right"></div></div>';
    return test1;

}

Policeman.prototype.createMonitorTitleDiv = function () {
    var b;
    if (typeof this.callNo != "undefined" && this.callNo != null) {
        b = this.callNo;
    } else {
        b = this.name;
    }
    this.titleText = b;
    if (typeof this.titleText != "string") {
        this.titleText = this.titleText + "";
    }
    var c = createTxt(b);
    this.titleDiv = c;
    c.style.zIndex = 1200;
    c.style.fontSize = convert2Px(12);
    c.style.fontFamily = "\u5b8b\u4f53";
    c.style.color = "BLUE";
    c.style.backgroundColor = "WHITE";
    c.style.filter="Alpha(opacity=100)";
    c.style.width = "auto";
    c.style.height = "auto";
    c.noWrap = true;
    return this.titleDiv;
};
// MainFrame.prototype.addMarkersToInfoWindowMask = function () {
//     if (this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
//         return;
//     }
//     this.infoWindow.clearMaskMap();
//     var f = new Point(this.infoWindow.getOffsetLeft(), this.infoWindow.getOffsetTop());
//     var d = new Point(f.x + this.infoWindow.getTotalWidth(), f.y + this.infoWindow.getTotalHeight());
//     for (var b = 0; b < this.locations.length; b++) {
//         var c = this.locations[b].marker;
//         if (c.icon.offsetTop > d.y) {
//             break;
//         }
//         this.addMarkerToInfoWindowMask(f, d, c);
//     }
//     if (false) {                                // this.directionsMarkersAreVisible() 一直会报错，直接改为false
//         this.addMarkerToInfoWindowMask(f, d, this.directionsStart);
//         this.addMarkerToInfoWindowMask(f, d, this.directionsEnd);
//     }
// };
// MainFrame.prototype.onClick = function () {
//     //document.focus();                          // 一直报错，没有function，取消
// };

