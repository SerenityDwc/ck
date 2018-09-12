var $image = $('#image');
var $inputImage = $('#input');
var uploadedImageURL;

$(function () {
    var options = {
        aspectRatio: 1,
        preview: '.img-preview',
        viewMode:2,
        crop: function (e) {

            // $dataX.val(Math.round(e.detail.x));
            // $dataY.val(Math.round(e.detail.y));
            // $dataHeight.val(Math.round(e.detail.height));
            // $dataWidth.val(Math.round(e.detail.width));
            // $dataRotate.val(e.detail.rotate);
            // $dataScaleX.val(e.detail.scaleX);
            // $dataScaleY.val(e.detail.scaleY);
        }
    };
    var $image = $('#image');
    var $inputImage = $('#input');
    var uploadedImageURL;
    // 给input添加监听
    $inputImage.change(function () {
        //console.log('监听')
            var files = this.files;
            var file;
            if (files && files.length) {
                file = files[0];
                // 判断是否是图像文件
                if (/^image\/\w+$/.test(file.type)) {

                    $('#fileName').val(file.name);

                    // 如果URL已存在就先释放
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }
                    uploadedImageURL = URL.createObjectURL(file);
                    // 销毁cropper后更改src属性再重新创建cropper
                    $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);

                    $inputImage.val('');


                    $('#left').removeClass('disabled');
                    $('#right').removeClass('disabled');
                    $('#reset').removeClass('disabled');
                    // $('#btn-add').removeClass('disabled');

                } else {
                    window.alert('请选择一个图像文件！');
                }
            }
        });

    $('#btn-add').click(function () {

        var loading = layer.load();

        $image.cropper("getCroppedCanvas").toBlob(function(blob){
            var formData=new FormData();
            formData.append('file',blob,$('#fileName').val());
            formData.append('avatarType',avatarType);
            formData.append('avatarId',avatarId);

            $.ajax({
                method:"post",
                url: contextPath+'workplan/upload', //用于文件上传的服务器端请求地址
                data: formData,
                processData: false,
                contentType: false,
                success:function(result){
                    if(result.code==200){
                        //console.log(result.data.id);

                        //修改父元素的src

                        //$target.attr('src', URL.createObjectURL(blob));
                        //console.log(URL.createObjectURL(blob));

                        //parent.$('#avatar_'+avatarId).css({"width":"60%","height":"60%"});

                        parent.$('#avatar_'+avatarId).attr('src', URL.createObjectURL(blob));


                        layer.close(loading);

                        //关闭弹出页面
                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

                        parent.layer.close(index);//关闭弹出的子页面窗口

                    }else{
                        layer.msg('修改图片错误');
                    }
                }
            });
        });
    });
});

function crop(){

    $image.cropper('getCroppedCanvas',{
        width:300, // 裁剪后的长宽
        height:300
    }).toBlob(function(blob){
        // 裁剪后将图片放到指定标签

        //$target.attr('src', URL.createObjectURL(blob));
        // urlCanvas();
    });
}

function rotateInit() {
    $image.cropper('reset');
}

function rotateLeft() {
    $image.cropper('rotate', -45);
}

function rotateRight() {
    $image.cropper('rotate', 45);
}

function urlCanvas(){
    var dataurl = $image.cropper("getCroppedCanvas");
    $('#imageBase64').val(dataurl.toDataURL('image/jpeg'))
    //console.log($('#imageBase64').val());
    //console.log(dataurl.toDataURL('image/jpeg'));
}



