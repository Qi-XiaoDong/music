/* 自动添加前缀没做到
    */

var gulp = require('gulp');

// 压缩HTML文件  下载插件 gulp-htmlclean 取到插件
var HtmlClaean = require("gulp-htmlclean");

//压缩图片
var ImageMin = require("gulp-imagemin"); 

//压缩js文件
var Uglify = require("gulp-uglify");

//去掉js中的调试语句
var Debug = require("gulp-strip-debug");

// 将less转换为css
    var Less = require("gulp-less");

//压缩css
var CleanCss = require("gulp-clean-css");

//自动添加前缀
// gulp-postcss autoprefixer
var PostCss = require("gulp-postcss");
var AutoPreFixer = require("autoprefixer");

//开启本地服务器
var  Connect = require('gulp-connect');

//判断当前的模式
var devMod = process.env.NODE_ENV == "development";
//export NODE_ENV=development 设置环境变量
console.log(devMod);



var folder = {
    src : "src/",
    dist : "dist/"
}

gulp.task("images",function () {
    var page = gulp.src(folder.src + "images/*")
        .pipe(Connect.reload());
        if (!devMod) {
            page.pipe(ImageMin());
        }
        page.pipe(gulp.dest(folder.dist + "images/"));
});

gulp.task("html",function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(Connect.reload());
        if (!devMod) {
            page.pipe(HtmlClaean());
        }
        page.pipe(gulp.dest(folder.dist + "html/"));
});

gulp.task("css",function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(Connect.reload())    //和自动监听配合使用刷新页面
        .pipe(Less());
        // .pipe(PostCss([AutoPreFixer()]))
        // .pipe(AutoPreFixer())
        if (!devMod) {
            page.pipe(CleanCss());
        }
        page.pipe(gulp.dest(folder.dist + "css/"));
});


gulp.task("js",function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(Connect.reload());
        if (!devMod) {
            page.pipe(Debug())
            .pipe(Uglify());
        }
        page.pipe(gulp.dest(folder.dist + "js/"));
});

//开启服务器的任务
gulp.task("server", function () {
    Connect.server({
        port : "8888",    // 设置端口
        livereload : true  // 自动刷新
    });
});

//监听数据改变 
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"])
    gulp.watch(folder.src + "css/*", ["css"])
    gulp.watch(folder.src + "js/*", ["js"])
    gulp.watch(folder.src + "images/*", ["images"])
});

gulp.task("default", ["html", "css", "js", "images", "server", "watch"]);

 /* gulp.src : 添加资源 
    gulp.task ： 添加自定义事件
    gulp.dest : 将文件写入
    gulp.watch : 开启监听
    
 */
