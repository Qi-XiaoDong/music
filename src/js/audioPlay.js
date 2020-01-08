 /* 控制音频文件的js 
    play  pause  getAudio 
    getAudio 需要传入歌曲地址
    load ： 加载歌曲但不播放
*/


(function ($, root) {
    function AudioManager() {
        //创建一个audio对像
        this.audio = new Audio();
        //默认为暂停播放状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play : function () {
            this.audio.play();
            this.status = 'play';
        },
        pause : function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio : function (src) {
            this.audio.src = src;   // 设置音频来源
            this.audio.load()       // 加载歌曲但不播放
        },
        playTo : function (time) {   //跳转播放进度的
            this.audio.currentTime = time;
        }
    }

    root.autioManager =  new AudioManager()
})(window.zepto, window.play || (window.play = {}))