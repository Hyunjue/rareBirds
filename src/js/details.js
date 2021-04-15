$(function () {
    // 根据商品id调取接口获取对应商品的信息
    $.ajax({
        type: "get",
        url: 'http://jx.xuzhixiang.top/ap/api/detail.php',
        async: false,
        data: { id: $.cookie("thePid") },
        contentType: "application/json",
        success: function (res) {
            $(".libox div").eq(0).find("img").prop("src", res.data.pimg);
            console.log(res);
        }
    });


    $(".libox div").hover(function () {
        $(this).css({
            borderColor: "#000"
        }).siblings().css("border-color", "#dfdede");
        let tsrc = $(this).find("img").attr("src");
        console.log(tsrc);
        $(".bigbox").find("img").prop("src", tsrc);
    }, function () {
        $(this).css({
            borderColor: "#dfdede"
        })
    })
    // 加减
    $(".pnum").val(1);
    $(".pnum").on("blur", function () {
        if ($(this).val() % 1 != 0) {
            alert("请输入整数！");
            $(".sche").off("click");
        } else {
            $(".sche").on("click", function () {
                // 点击加入购物车存一个总量
                $.cookie("znum", $(".pnum").val());
                //-----------
                $.ajax({
                    type: "get",
                    url: 'http://jx.xuzhixiang.top/ap/api/add-product.php',
                    async: false,
                    data: { uid: '51181', pid: $.cookie("thePid"), pnum: Number($.cookie("znum")) },
                    contentType: "application/json",
                    success: function (res1) {
                        console.log(res1);

                    }
                });
                // 查询购物车商品-------------------------------
                // 根据商品id调取接口获取对应商品的信息
                $.ajax({
                    type: "get",
                    url: 'http://jx.xuzhixiang.top/ap/api/cart-list.php',
                    async: false,
                    data: { id: '51181' },
                    contentType: "application/json",
                    success: function (res) {
                        let tPid = $.cookie("thePid");

                        let the = Number($.cookie("znum"));
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].pid == tPid) {
                                console.log(res.data[i].pnum);
                                res.data[i].pnum += the;
                                console.log(res.data[i].pnum);
                                // 加入购物车--------------------------
                            } else {
                                // return;
                            }
                        }

                        console.log(tPid);
                    }
                });
                $(location).attr("href", "../orderList.html");
                //-------------------------------------

            })
        };
        if ($(this).val() <= 0) {
            $(this).val("1");
        }
    });

})