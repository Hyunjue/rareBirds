; $(function () {
    $(".tnav li").mouseover(function () {
        let index = $(this).index();
        $(this).find("a").css(
            {
                borderColor: "#efd8d2",
                fontWeight: 900
            }).end().siblings().find("a").css("border-color", "transparent");
        $(".child_b").eq(index).show().siblings().hide();
    });
    // 导航栏淡入淡出
    $(".tnav li").hover(function () {
        $(".h_box").show().hover(function () {
            $(this).show();
        }, function () {
            $(this).hide();
        });
    }, function () {
        $(".h_box").hide();
    });
    $("#lli").on({
        mouseover: function () {
            $(".h_box").hide();
        },
        mouseout: function () {
            $(".h_box").hide();
        }
    })
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

    // 购物车

    $(".fixrig").find("img").eq(1).on("click", function () {
        if ($.cookie("theTel") == "" || $.cookie("theTel") == null) {
            return;
        }
        $(location).attr("href", "../orderList.html");
    })

    // -----------------------
});
window.onload = function () {
    window.addEventListener("scroll", function () {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 1000) {
            $(".fixed").css("display", "block");
        } else {
            $(".fixed").css("display", "none");
        }
    })
    $(".fixed").click(function () {
        $("html,body").animate({ scrollTop: "0px" }, 500);
    })


}