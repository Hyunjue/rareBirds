// 引用gulp工具
const gulp = require("gulp");
// 引用gulp插件压缩文件
const htmlmin = require('gulp-htmlmin');
const connect = require('gulp-connect');
// 引用gulp的插件抽取公共ht
const fileinclude = require('gulp-file-include');
// 引用gulp插件把less文件转换成css
const sass = require('gulp-sass');
// 使用gulp.task建立任务
// 1.任务的名称
// 2.任务的回调函数
// gulp.task("isMe", () => {
//     console.log("这是我的第一个gulp任务，我执行了！");
//     // 1.使用gulp.src获取要处理的文件
//     gulp.src('./src/css/style.css')
//         .pipe(gulp.dest('dist/css'));/* 自动生成css文件夹*/
// });
// copy首页
gulp.task("indexhtml", done => {
    console.log("successful!");
    gulp.src("./src/index.html")
        .pipe(fileinclude())
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
    done();
});
// copy 发布商品
gulp.task("cUpload", done => {
    console.log("successful!");
    gulp.src("./src/upload/*")
        .pipe(gulp.dest("dist/upload"))
        .pipe(connect.reload());
    done();
})
// copy分页
gulp.task("copyhtml", done => {
    gulp.src(["./src/*.html", "!./src/index.html"])
        .pipe(fileinclude())
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
    done();
});
// copy scss样式
gulp.task("scss", done => {
    gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('dist/css')).pipe(connect.reload());
    done();
});
// copy js文件
gulp.task("cjs", done => {
    gulp.src("./src/js/*.js").pipe(gulp.dest("dist/js")).pipe(connect.reload());
    done();
});
// copy bootstrap框架
gulp.task("bootstrap", done => {
    gulp.src("./src/bootstrap/**")
        .pipe(gulp.dest('dist/bootstrap'));
    done();
});
// copy images文件
gulp.task("cimg", done => {
    gulp.src("./src/images/*").pipe(gulp.dest('dist/images')).pipe(connect.reload());
    done();
});
gulp.task("fonts", done => {
    gulp.src("./src/fonts/*").pipe(gulp.dest("dist/fonts")).pipe(connect.reload());
    done();
});
// 服务器task
gulp.task("server", done => {
    connect.server({
        root: "dist",
        port: 1752,
        livereload: true
    })
    done();
});

gulp.task("watch", done => {
    gulp.watch("./src/*.html", gulp.series('copyhtml'));
    gulp.watch("./src/index.html", gulp.series('indexhtml'));
    gulp.watch("./src/js/*.js", gulp.series('cjs'));
    gulp.watch("./src/sass/*.scss", gulp.series('scss'));
    gulp.watch("./src/fonts/*", gulp.series("fonts"));
    gulp.watch("./src/images/*", gulp.series("cimg"));
    gulp.watch("./src/common/*.html", gulp.parallel("copyhtml", "indexhtml"));
    gulp.watch("./src/upload/*", gulp.series("cUpload"));
    done();
});
gulp.task("tasks", gulp.parallel('cUpload', 'fonts', 'cimg', 'cjs', 'bootstrap', 'scss', 'indexhtml', 'copyhtml'));
gulp.task("default", gulp.parallel("tasks", "watch", "server"));
