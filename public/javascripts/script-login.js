$(document).ready(function () {

    $('#login-submit').on('click', function () {
        let passwordLogin = $('#login-password').val();
        let encrypted = CryptoJS.AES.encrypt(passwordLogin, "Secret Passphrase");
        let decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
    });

    $("#login-submit").click(function () {
        let userName = $('#login-name').val();
        let userPassword = $('#login-password').val();
        localStorage.setItem('user', userName);
        localStorage.setItem('password', userPassword);
    });

    $(window).on('scroll', function () {
        if($(window).scrollTop()===0 && $("#menu-toggler").attr("aria-expanded")===true) {
            $('nav').removeClass('nav-scroll');
            $('#main-menu').addClass('menu-scroll');
        };
        if($(window).scrollTop()) {
            $('nav').addClass('nav-scroll');
            $('#main-menu').addClass('menu-scroll');
        } else {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                $('nav').removeClass('nav-scroll');
                $('#main-menu').removeClass('menu-scroll');
            };
        };

        if ($(this).scrollTop()>100) {
            $('#totop').fadeIn(600);
        } else {
            $('#totop').fadeOut(600);
        }


    });

    var pressed = true;
    $("#menu-toggler").click(function () {
        var altura = $(window).scrollTop();

        if (altura === 0) {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                pressed = false;
                $('nav').addClass('nav-scroll');
                $('#main-menu').addClass('menu-scroll');
            } else {
                pressed = true;
                $('nav').removeClass('nav-scroll');
                $('#main-menu').removeClass('menu-scroll');
            }
        }
    });

    $('#totop').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
    });


});
