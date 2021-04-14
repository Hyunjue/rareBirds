$(function () {
    let tTel = $.cookie('theTel');
    // 注册，发送请求
    $.ajax({
        type: "get",
        url: 'http://jx.xuzhixiang.top/ap/api/login.php',
        data: { username: 'xianjue', password: '111111' },
        contentType: "application/json",
        success: function (res) {
            console.log(res);
            let pd = res.data.password;
            let tokenVal = res.data.token;
            $.cookie("theToken", tokenVal);
            console.log(pd);
            // 登录验证
            $(".dl").on({
                click: function () {
                    if ($(".sjh").val() == "" || $(".sjh").val() != tTel && $(".wdmm").val() == "" || $(".wdmm").val() != pd) {
                        alert("请填写正确的手机号或密码！");
                        return false;
                    } else {
                        alert("登录成功!");
                        $(location).attr("href", "../self.html");
                    }

                }
            });
        }
    })
    // 登录 注册切换
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
                //符合验证 设置边框为绿色
                $(this).css({ border: "2px solid green", color: "#000" });

            } else {
                $(this).css({
                    border: "2px solid red",
                    color: "red",
                    fontWeight: 900

                }).val("ERROR!");
            }
        }
    });
    // 验证码
    function rdm() {
        let chars = '0123456789';
        let maxPos = chars.length;
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return code;    //直接转换为小写
    }
    // 自动补全验证码
    $(".huoqu").on("click", function () {
        $(".zidong").val(rdm());
    })

    // 注册
    $(".zc").on("click", function () {
        if ($(".tel").val() == "" && $(".rdnum").val() == "" && $(".zidong").val() == "") {
            $(this).html("请补全注册信息！");
        }
        else {
            $(".zc").html("注册");
            $.cookie('theTel', $(".tel").val(), { expires: 7 });
            alert("注册成功！");
            $(location).attr("href", "login.html");
        }
    })
    // 随机数匹配
    $(".rdnum").on({
        change: function () {
            if ($(this).val() != $(".yanzm").html()) {
                alert("请输入正确的校验码！");
            }
        }
    });
});

