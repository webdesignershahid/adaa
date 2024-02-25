(function ($) {

    /* ============================================================ */
    /* Mobile Menu Integration
    /* ============================================================ */
    function mobile_menu(selector, actionSelector) {
        var mobile_menu = $(selector);
        mobile_menu.on('click', function() {
            $(selector).toggleClass('is-menu-open');
        });

        var hamburgerbtn = $(selector);
        hamburgerbtn.on('click', function() {
            $(actionSelector).toggleClass('is-menu-open');
        });

        $(document).on('click', function(e) {
            var selectorType = $(actionSelector).add(mobile_menu);
            if (
                selectorType.is(e.target) !== true &&
                selectorType.has(e.target).length === 0
            ) {
                $(actionSelector).removeClass('is-menu-open');
                $(selector).removeClass('is-menu-open');
            }
        });
        $('.mobile-menu .site-menu a, .menu-overlay').on('click', function(e) {
            $(actionSelector).removeClass('is-menu-open');
            $(selector).removeClass('is-menu-open');
        });
    }
    mobile_menu(
        '.menu-toggler, .close-menu ',
        '.mobile-menu, .menu-overlay'
    );  
        


    /* ============================================================ */
    /* Swiper Slider Init
    /* ============================================================ */
    var heroSlider = new Swiper('.heroSlider', {
        slidesPerView: 1,
        loop: 1,
        speed: 1000,
        autoplay:{
            delay: 5000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
    var partnerSlider = new Swiper('#partnerSlider', {
        spaceBetween: 30,
        slidesPerView: 3,
        loop: 1,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: true,
        },
        allowTouchMove: false,
        breakpoints: {
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 7,
            },
        },
    }); 

    /* ============================================================ */
    /* Scroll Top
    /* ============================================================ */
    $('body').append(
        `<a href='#home' title='Scroll Top' id='scroll-top' class='topbutton'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'/></svg></a>`
    );


    // Event Coundown Clock
    if ($("#event_countdown").hasClass("timer")) {
        const countdown = new Date("April 29, 2024");
        function getRemainingTime(endtime) {
            const milliseconds = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor((milliseconds / 1000) % 60);
            const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
            const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
            const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

            return {
                'total': milliseconds,
                'seconds': seconds,
                'minutes': minutes,
                'hours': hours,
                'days': days,
            };
        }

        function initClock(id, endtime) {
            const counter = document.getElementById(id);
            const daysItem = counter.querySelector('.days');
            const hoursItem = counter.querySelector('.hours');
            const minutesItem = counter.querySelector('.minutes');
            // const secondsItem = counter.querySelector('.seconds');

            function updateClock() {
                const time = getRemainingTime(endtime);

                daysItem.innerHTML = `<b> ${time.days}</b> Days`;
                hoursItem.innerHTML = `<b> ${('0' + time.hours).slice(-2)}</b> Hours`;
                minutesItem.innerHTML = `<b> ${('0' + time.minutes).slice(-2)}</b> Minutes`;
                // secondsItem.innerHTML = `<b> ${('0' + time.seconds).slice(-2)}</b> Seconds`;

                if (time.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            const timeinterval = setInterval(updateClock, 1000);
        }

        initClock('event_countdown', countdown);
    }

    // LOCOMOTIVE
    let options = {
        el: document.querySelector('.smooth-scroll'),
        smooth: true,
        class: 'is-inview',
        getSpeed: true,
        getDirection: true,
        reloadOnContextChange: true
    }
    const header = document.getElementById('header');
    let hidden = false,
        static = true;

    const scroll = new LocomotiveScroll(options);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();
    scroll.on('scroll', (instance) => {
        let headerHeight = header.getBoundingClientRect().height;
        if (instance.direction === 'down' && static) {
            if (instance.scroll.y > headerHeight) {
                header.classList.add('pinned');
                if (header.classList.contains('header')) {
                }
                static = false;
            }
        }
        if (instance.direction === 'up' && !static) {
            if (instance.scroll.y <= headerHeight) {
                header.classList.remove('pinned');
                if (header.classList.contains('header')) {
                }
                static = true;
            }
        }
        if (instance.direction === 'down' && !hidden) {
            if (instance.scroll.y > (headerHeight / 2)) {
                //console.log('hidden');
                header.classList.remove('pinned');
                header.classList.add('unpinned');
                hidden = true;
            }
        }
        if (instance.direction === 'up' && hidden) {
            //console.log('show');
            header.classList.remove('unpinned');
            header.classList.add('pinned');
            hidden = false;
        }
    });
    
    $('.site-menu a,.topbutton').on('click', function(e) {
        e.preventDefault();
        scroll.scrollTo($(this).attr("href"));
    });
    
})(jQuery);