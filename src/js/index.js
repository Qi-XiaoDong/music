var root = window.play;

// 定义全局数据 再请求后将数据赋值给它，以便在全局范围内使用
var dataList = null;
// 定义数据长度
var len = 0;
// 将音乐播放模块引入
var audio = root.autioManager ;
// index索引
var control;
// var $scope = $(document.body);

function getData (url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
           
            dataList = data;    //将data全局赋值给dataList
            len = data.length;   //  len记录数据的总长度，方便控制索引
            control = new root.controlIndex(len);    // 将索引控制模块的构造函数实例化
            root.render(dataList[control.index]);    // 调用渲染页面模块 对基本信息进行渲染， 默认渲染索引为0的歌曲
            audio.getAudio(dataList[control.index].audio);   //  调用资源加载模块  control.index   ： 由索引控制模块产生的索引  默认渲染索引为0的歌曲
            root.pro.renderTime(dataList[control.index].duration);   // 渲染歌曲的总时间
            
            bindTouch()
            bindEvent();   // 事件的执行
        },
        error : function () {
            console.log('error');
        }
    });
}


// 绑定按钮事件

function bindEvent () {
    $('body').on('playChange', function (e, index) {

        root.render(dataList[index]);        //点击上下曲的时候 渲染页面信息
        audio.getAudio(dataList[index].audio);   //加载歌曲信息
        root.pro.renderTime(dataList[index].duration);
        root.pro.start(0);

        if (audio.status === 'play') {
            audio.play();        //如果点击时歌曲再播放状态， 点击后下一曲默认播放
            root.pro.start(0);
        }else {
            root.pro.stop();
            audio.pause();
        }
    })

    // 点击上一曲
    $('.control .prev').on('click', function () {
        var i = control.prev();
       $('body').trigger('playChange',i);
    });

    // 点击下一曲
    $('.control .next').on('click' , function () {
        var i = control.next();
        $('body').trigger('playChange',i);
    });

// 点击喜欢歌曲或取消喜欢歌曲
    $('.like').on('click' ,function () {
        if (dataList[control.index].isLike == true) {
            $('.like').removeClass('liking');
            dataList[control.index].isLike = false;
            root.render(dataList[control.index]);
        } else {
            $('.like').addClass('liking');
            dataList[control.index].isLike = true;
            root.render(dataList[control.index]);
        }
    });

//点击播放/暂停
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            // audio.getAudio(dataList[nowIndex].audio);
            audio.play();
            root.pro.start();
        } else {
            audio.pause();
            root.pro.stop();
        }
        //切换 播放/暂停图标
        $('.play').toggleClass('playing');
    });

// 点击歌单列表
// $scope.on("click",".list    ",function(){
//     root.playList.show(control);
// })
    
}

// 进度条控制播放
/* 
    按下 ： 停止时间的渲染， 
    移动 ： 1 记录每次移动的点的位置 2 只在规定的范围内移动 
    松开 ： 跳转到指定的位置

*/
function bindTouch () {
    var offset = $('.pro .pro-wrap').offset();
    var left = offset.left;
    var width = offset.width;
    $('.pro .slider').on('touchstart',function () {
      
        //按下时先停止时间的渲染
        root.pro.stop();

    }).on('touchmove',function (e) {
        // 记录此刻的x坐标点
        var x = e.changedTouches[0].clientX;
        // 计算拖拽进度条的百分比
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            // 再合理范围内更新时间和进度条
            root.pro.update(per);
        }
    }).on('touchend',function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            // 根据百分比计算出时间
            var time = per * (dataList[control.index].duration);

            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            // $('.play').addClass('playing');
            // 从交互完的百分比继续进行运动
            root.pro.start(per);
        }
    });
}



getData('../../mock/data.json');
