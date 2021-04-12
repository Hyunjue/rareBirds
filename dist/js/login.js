$(function () {
    $(".th span").on({
        click: function () {
            let index = $(this).index();
            if (index == 1) {
                $(".formbox").hide();
                $(".dlpage").show();
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
});