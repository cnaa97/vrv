window.onload = function () {

    var sceneEl = document.querySelector('a-scene'),
        panoImage = sceneEl.querySelector('#panoImage'),
        inputFile = document.getElementById('fileInput'),
        inputFileInMenu = document.getElementById('inputFileInMenu'),
        reader = new FileReader(),
        log = document.querySelector("textarea");

    inputFile.addEventListener("change", function() {
        if(!this.files || !/image/.test(this.files[0].type)){
            alert('이미지 파일이 아닙니다');
            return false
        } else {
            readFile(this.files[0])
        }
    });

    inputFileInMenu.addEventListener("change", function() {
        if(!this.files || !/image/.test(this.files[0].type)){
            alert('이미지 파일이 아닙니다');
            return false
        } else {
            readFile(this.files[0])
        }
    });

    function readFile(file){

        reader.readAsDataURL(file);
        reader.onload = function (e) {
            panoImage.setAttribute('src', e.target.result);
            $('#navWrapper').is(":visible") && toggleNav();
//                        logMessage(panoImage);
//                        logMessage(document.getElementById('imgDisplay'));
//                            document.getElementById('imgDisplay').setAttribute('src', e.target.result);
//                            $('a-sky')[0].setAttribute('src', e.target.result);
//                            logMessage($('a-sky')[0]);
        };
        reader.onabort = function () {
            logMessage('abort 이벤트의 핸들러. 이 이벤트는 읽기 동작이 중단 될 때마다 발생합니다.');
        };
        reader.onerror = function () {
            logMessage('error 이벤트의 핸들러. 이 이벤트는 읽기 동작에 에러가 생길 때마다 발생합니다.');
        };
    }

    document.addEventListener("message", function(event) {
        logMessage(event.data);
    }, false);

    function logMessage(message) {
        log.append((new Date()) + " " + message + "\n");
    }

    /**
     * UI animation
     */

    $('#iconMenu').click(function () {
        toggleNav();
    });

    $('#iconClose').click(function () {
        toggleNav();
    });

    function toggleNav() {
        $('#navWrapper').toggle();
        $('#mainIconWrapper').toggle();
    }

}; // window.onload