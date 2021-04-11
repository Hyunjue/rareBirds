; $(function () {
    $(".tnav li").mouseenter(function () {
        $(this).find("a").css("border-color", "#efd8d2").end().siblings().find("a").css("border-color", "transparent");
    });
    // 导航栏淡入淡出
    $(".tnav").hover(function () {
        $(".h_box").show().hover(function () {
            $(this).show();
        }, function () {
            $(this).hide();
        });
    }, function () {
        $(".h_box").hide();
    });

    $("#ssuo").find("a").click(function () {
        $("#ssuo").find("input").stop().animate({
            width: "125px"
        }).css("visibility", "visible").end().stop().animate({
            marginLeft: "100px",
        }).css("border-color", "black");
    });
    // 获取焦点时，用prop()设置属性值
    $("#ssuo input").focus(function () {
        $(this).prop("placeholder", "");
    });
    $("#ssuo input").blur(function () {
        $(this).prop("placeholder", "戒托");
    });




});