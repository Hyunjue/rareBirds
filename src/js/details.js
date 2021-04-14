$(function () {
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
})