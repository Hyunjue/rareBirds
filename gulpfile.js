// 引用gulp工具
const gulp = require("gulp");
// 引用gulp插件压缩文件
const htmlmin = require('gulp-htmlmin');
const connect = require('gulp-connect  ');
// 引用gulp的插件抽取公共ht
const fileinclude = require('gulp-file-include');
// 引用gulp插件把less文件转换成css
const less = require('gulp-less');
// 使用gulp.task建立任务
// 1.任务的名称
// 2.任务的回调函数
gulp.task("isMe", () => {
    console.log("这是我的第一个gulp任务，我执行了！");
    // 1.使用gulp.src获取要处理的文件
    gulp.src('./src/css/style.css')
        .pipe(gulp.dest('dist/css'));/* 自动生成css文件夹*/
});
// 创建压缩的gulp任务
gulp.task("htmlmin", () => {
    console.log("successful!");
    gulp.src("./src/*.html")
        // 压缩html文件里的代码
        .pipe(fileinclude())
        .pipe(htmlmin({
            /* 折叠 空格*/
            collapseWhitespace: true
        }))
        /* 输出到dist文件里 */
        .pipe(gulp.dest("dist"));
});
// css任务
// 1.less语法转换
// 2.css代码压缩
gulp.task("cssmin", () => {
    gulp.src("./src/css/*.less")
        .pipe(less)
        .pipe(gulp.dest('dist/css'))
})
gulp.task("server", done => {
    connect.server({
        root: "dist"
    })
    done();
})
gulp.task("watch", done => {
    gulp.watch("./src/index.html", gulp.series('htmlmin'));
    done();
})