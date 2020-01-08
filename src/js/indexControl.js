/**
 * 主要实现对歌曲索引的控制
 */

;(function ($, root) {
    function Control (len) {
        this.index = 0;         // 默认歌曲
        this.len = len;        // 歌曲的总数量
    }
    Control.prototype = {
        prev : function () {
            return this.getIndex(-1);
        },
        next : function () {
            return this.getIndex(1);
        },
        getIndex : function (val) {
            var index = this.index;
            var len = this.len;
            // 计算当前索引 目前为0
            // （3 + -1 + 0） % 3  = 2 
            // （3 +  1 + 0） % 3  = 0
            var curIndex = (index + val + len) % len;
            //更新index
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;
})(window.Zepto, window.play || (window.play = {}))