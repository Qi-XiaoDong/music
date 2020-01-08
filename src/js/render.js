/*  
    模块内容：渲染图片  信息  喜欢按钮
将这个模块暴漏在外面,方便后面调用 */

(function  ($, root) {
    // console.log(root);
    function renderImg (src) {
        //声明图片对象以便于用高斯模糊
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src' , src);
            root.blurImg(img, $('body'));
        }

    }

    function renderInfo (info) {
        var str = '';
        str = '<div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>'
        $('.song-info').html(str);
    }

    function renderIsLike (like) {
        if (like) {
            $('.like').addClass('liking');
        } else {
            $('.like').removeClass('liking');

        }
    }

    

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
        
    }
})(window.Zepto, window.play || (window.play = {}))

