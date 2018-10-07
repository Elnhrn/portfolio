if ($(window).width() <= 768) {
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}

$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");

    if (path == "") {
        $("#home").addClass("active");
    }

    path = decodeURIComponent(path);

    $(".nav a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(".nav-link").removeClass("active");
            $(this).closest('a').addClass('active');
        }
    });
};