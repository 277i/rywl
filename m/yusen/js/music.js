// 音乐切换
function musicSwitch() {
    var mediaWrap = document.querySelector('.media-wrap');
    var audio = document.querySelector('#autoplay');
    var musicOn = document.querySelector('.music_on');
    var musicOff = document.querySelector('.music_off');
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    // IOS策略，无法自动播放，只能使用原来的方式播放
    var isUseAudioCtx = AudioContext && !/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(navigator.userAgent);
    // var isUseAudioCtx = AudioContext;
    var url = audio.getAttribute('src');
    var isPalying = true;
    if (isUseAudioCtx) {
        loadSound(url, audioCtx);
    } else {
        document.addEventListener(
            'WeixinJSBridgeReady',
            function () {
                audio.play();
            },
            false
        );
        audio.play();
        $('#autoplay').on('ended', function () {
            this.load();
            this.play();
        });
    }
    mediaWrap.addEventListener(
        'touchstart',
        function () {
            if (isUseAudioCtx) {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                    isPalying = true;
                } else {
                    audioCtx.suspend();
                    isPalying = false;
                }
            } else {
                if (audio.paused) {
                    audio.play();
                    isPalying = true;
                } else {
                    audio.pause();
                    isPalying = false;
                }
            }
            if (isPalying) {
                mediaWrap.classList.add('on');
                musicOn.style.display = 'block';
                musicOff.style.display = 'none';
            } else {
                mediaWrap.classList.remove('on');
                musicOn.style.display = 'none';
                musicOff.style.display = 'block';
            }
        },
        false
    );
}
function loadSound(url, context) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // Decode asynchronously
    var onError = function (e) {
        console.log(e);
    };
    request.onload = function () {
        context.decodeAudioData(
            request.response,
            function (buffer) {
                playSound(buffer, context);
            },
            onError
        );
    };
    request.send();
}

function playSound(buffer, context) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    source.loop = true;
}