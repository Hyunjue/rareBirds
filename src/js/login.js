$(function () {

    $(".th span").on({
        click: function () {
            let index = $(this).index();
            if (index == 1) {
                $(".formbox").hide();
                $(".dlpage").show();
                $(".huoqu").css({
                    background: "#f0d9d3",
                    color: "#000"
                });
            } else {
                $(".formbox").show();
                $(".dlpage").hide();
            }
            $(this).css({
                borderBottom: "2px solid #000",
                color: "#000"
            }).siblings().css({
                borderColor: "transparent",
                color: "#ccc"
            })
        }
    });
    $(".checkbox").on("click", function () {
        $(this).css("background", "red");
    })
    $(".dl").on({
        click: function () {
            alert("登录成功!");
            $(location).attr("href", "../self.html");
        }
    });

    let regtel = /^1[3|4|5|7|8]\d{9}$/;// 手机号的正则
    let fla = true;
    $(".tel").on({
        blur: function () {
            if ($(this).val() == null || $(this).val() == "") {
                alert("不能为空！");
                fla = false;
                return;
            } else {
                fla = true;
            };
            if (regtel.test($(this).val())) {
                $(this).css("border-color", "green");
            } else {
                $(this).css({
                    border: "2px solid red",
                    color: "red",
                    fontWeight: 900

                }).val("ERROR!");
            }
        }
    })
    // 随机数匹配
    $(".rdnum").on({
        change: function () {
            if ($(this).val() != $(".yanzm").html()) {
                alert("请输入正确的校验码！");
            }
        }
    })
});