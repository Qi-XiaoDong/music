/* 
    进度条模块
        1 渲染歌曲时间
        2 播放音乐进度条运动
        3 左侧时间更新
        4 交互 拖拽进度条运动 跳转到当前歌曲部分，并且左侧时间跳转到当前播放的时间

*/

(function ($, root) {
    var frameId;  //定时器的标志
    var dur;      //总时间
    var startTime;
    var per            //表示当前播放时间占总时间的百分比
    var lastPer = 0;  // 记录这首歌之前播放时间占总时间的百分比 开始为0
    //渲染时间
    function renderTime (time) {  //渲染总时间
        dur = time;
        time = formatTime(time);
        $('.pro .all-time').html(time);
    }
    //格式化时间
    function formatTime (t) {
        var m = parseInt(t / 60);
        var s = parseInt(t % 60);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }



    // 播放音乐进度条运动

    function start (p) {
        // 点击播放的时刻点
        cancelAnimationFrame(frameId);
        lastPer = p == undefined ? lastPer : p;
        // 获得到此刻点击开始播放的时间点
        startTime = new Date().getTime();

        function frame () {
            
            // 每隔一段时间获取一个时刻点
            var nowTime = new Date().getTime();
            //per 表示当前播放时间占总时间的百分比
            per = lastPer + ( nowTime - startTime ) / (dur * 1000);
            if (per < 1) {
                update(per);
            } else {  // 播放完成切换到下一首歌曲
                cancelAnimationFrame(frameId);  // 清理掉当前歌曲的定时器
                $('.next').trigger('click');
            }

            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function stop () {
        cancelAnimationFrame(frameId);
        var nowTime = new Date().getTime;
        lastPer = per;  // 保留之前的播放时间
    }
//根据传过来的比例 计算当前播放时间和进度体的位置
    function update (per) {
        var time = formatTime(per * dur);
        $('.pro .cur-time').html(time);  // 渲染当前时间
        perX = (per - 1) * 100 + '%';
        $('.pro .pro-top').css({  // 设置进度条
            transform: 'translateX('+ perX +')'
        }); 
    }


    root.pro = {
        renderTime : renderTime,
        start : start,
        stop : stop,
        update : update
    }
})(window.Zepto, window.play || (window.play = {}))