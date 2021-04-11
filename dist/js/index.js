$(function () {
    // 轮播图

    /*定三个全局变量 */
    var set = 0;
    var time;
    var len = 4 /* 轮播图图片数量     这里也可以获取轮播图数量如 $(".t_ul img").length*/

    /* 将图片切换以及小黑点切换封装成changeimg方法并赋值一个变量a */
    function changeimg(a) {
        $(".t_ul>li").eq(a).fadeIn(1000).siblings("li").fadeOut('slow');/* 淡入淡出 */
        $(".dot>li").eq(a).addClass('banner_btn').siblings().removeClass('banner_btn');/* 改变小黑点样式 */
    }

    /* 将定时器封装成autoplay方法以便调用 */
    function autoplay() {
        time = setInterval(function () {    /* 将定时器传给time变量 */
            set++;
            if (set > len - 1) {
                set = 0;
            }
            changeimg(set);  /* 初始化变量a 将set值传给changeimg方法 */
        }, 5000);
    }
    autoplay(); /* 调用定时器方法*/

    /* 点击上一张图片按钮停止定时器 */
    $("#span1").click(function () {
        clearInterval(time);   /* 清除定时器 */
        set--;
        if (set < 0)    /* 当图片为第一张时重新给set赋值为len-1 显示最后一张 */ {
            set = len - 1;
        }
        changeimg(set);
        autoplay();
    });

    /* 点击下一张图片按钮停止定时器 */
    $("#span2").click(function () {
        clearInterval(time);
        set++;
        if (set === len)     /* 当图片为最后一张时重新给set赋值为0, 显示第一张张 */ {
            set = 0;
        }
        changeimg(set);
        autoplay();
    });

    /* 点击小黑点，显示想对应的图片 */
    $(".dot>li").click(function () {
        clearInterval(time);
        set = $(this).index();  /* 获取小黑点索引 并赋值给set*/
        changeimg(set);
        autoplay();
    });
    /*  当鼠标进入轮播图时清除定时器，移出时启动定时器 */
    $(".t_ul>li").hover(function () { clearInterval(time) }, function () { autoplay() });

})