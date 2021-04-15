$(function () {

    $.ajax({
        type: "get",
        url: 'http://jx.xuzhixiang.top/ap/api/cart-list.php',
        data: { id: '51181' },

        contentType: "application/json",
        success: function (res) {
            $.cookie("jl", res.data.length);
            for (let i = 0; i < res.data.length; i++) {
                $(".box").eq(i).find("img").prop("src", res.data[i].pimg);
                $(".box").eq(i).find(".lef").find("span").text(res.data[i].pdesc);
                $(".box").eq(i).find(".mid").text(res.data[i].pprice);
                $(".box").eq(i).find(".rig").text(res.data[i].pprice * res.data[i].pnum);
            }
        }
    });

    $(".r").find("span").text(Number($(".rig").eq(0).text()))
    $("button").click(function () {
        alert("支付成功！");
        $(location).attr("href", "../index.html");
    })
})
window.onload = function () {
    let tbox = document.querySelectorAll(".box");
    let sum = 0;
    for (let i = 0; i < tbox.length; i++) {
        sum += Number(tbox[i].children[2].innerHTML)
    }
    $(function () {
        $(".r span").text(sum);
    })
    console.log(tbox, sum);
}