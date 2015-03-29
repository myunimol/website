/* =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

    [Master Stylesheet]
    ---------------------------

      Name: Yamama
      Theme URI: http://demo.qawba.com/yamama/
      Description: Responsive Coming Soon Template
      Version: 1.0
      Author: qawba
      Author URI: http://qawba.com
      This template and more are available to purchase on Themeforest.net
      http://themeforest.net/user/qawba


    [Table of contents]
    ---------------------------

         1. Loading
         2. Tooltip
         3. Smooth scroll
         4. Backstretch
         5. Countdown
         6. jquery scrolltofixed
         7. Contact form
         8. Validation contact form
         9. Ajax mailchimp
        10. Owl-Carousel
        11. Player Youtube Controls
        12. Youtube Fancybox
        13. Google Map

=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=* */

jQuery(document).ready(function($) {
    "use strict";
    /* ================================= */
    /* :::::::::: 1. Loading ::::::::::: */
    /* ================================= */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".player").hide();
        $(".player-controls").hide();
    }

    $(".loader-item").delay(500).fadeOut();
    $("#page-loader").delay(700).fadeOut("slow");

    setTimeout(function() {
        $(".title").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
        $(".arrow").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
    });

    /* ================================= */
    /* ::::::::::: 2. Tooltip :::::::::: */
    /* ================================= */
    $('.tool-tip').tooltip();

    /* ================================= */
    /* :::::::: 3. Smooth scroll ::::::: */
    /* ================================= */
    smoothScroll.init();

    /* ================================= */
    /* ::::::::: 4. Backstretch :::::::: */
    /* ================================= */
    /* Active Single Image Background  */

    $("#top").backstretch("images/background/background_2.jpg");

    // ==== SLIDESHOW BACKGROUND ====
    // Set URLs to background images inside the array
    // Each image must be on its own line, inbetween speech marks (" ") and with a comma at the end of the line
    // Add / remove images by changing the number of lines below
    // Variable fade = transition speed for fade animation, in milliseconds
    // Variable duration = time each slide is shown for, in milliseconds


    /* ↓ Remove comments if you want to use the slideshow  ↓  */

    /*
    $("#top").backstretch([
        "images/background/background_1.jpg",
        "images/background/background_2.jpg",
        "images/background/background_3.jpg"
    ],{duration: 3000, fade: 750});
    */

    /* ================================= */
    /* :::::::::: 5. Countdown ::::::::: */
    /* ================================= */
    // To change date, simply edit: var endDate = "Dec 01, 2016 20:39:00";

    var endDate = "Mar 17, 2015 00:00:00";
    $('.countdown').countdown({
        date: endDate,
        render: function(data) {
            $(this.el).html("<div>" + this.leadingZeros(data.days, 2) + " <span>giorni</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>ore</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>minuti</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>secondi</span></div>");
        }
    });

    /* ================================= */
    /* :::: 6. jquery scrolltofixed :::: */
    /* ================================= */
    $('#nav-yamama').scrollToFixed();

    /* ================================= */
    /* :::::::: 7. Contact form :::::::: */
    /* ================================= */
    $("#ajax-contact-form").submit(function() {
        var str = $(this).serialize();
        var result = "";

        $.ajax({
            type: "POST",
            url: "php/contact.php",
            data: str,
            dataType: 'json',
            success: function(data) {
                if (!data.error) {
                    $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");
                    result = '<i class="fa fa-check"></i> ' + data.message;
                } else {
                    result = '<i class="fa fa-warning"></i> ' + data.message;
                }
                $('.contact-message').html(result);
            }
        });
        return false;
    });

    /* ================================= */
    /* :: 8. Validation contact form  :: */
    /* ================================= */
    $("#ajax-contact-form").validate({

        rules: {

            subject: {
                required: true
            },

            name: {
                required: true
            },

            email: {
                required: true,
                email: true
            },

            message: {
                required: true
            }
        },

        messages: {

            subject: {
                required: "<i class='fa fa-exclamation-triangle'></i>"
            },

            name: {
                required: "<i class='fa fa-exclamation-triangle'></i>"
            },

            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>",
                email: "<i class='fa fa-exclamation-triangle'></i>"
            },

            message: {
                required: "<i class='fa fa-exclamation-triangle'></i>"
            }

        }

    });

    /* ================================= */
    /* :::::::: 9. Ajax mailchimp :::::: */
    /* ================================= */
    // Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    $('#subscribe').ajaxChimp({
        language: 'eng',
        url: 'http://qawba.us9.list-manage1.com/subscribe/post?u=832e3e0e3e4e80a76d49721b5&id=a6a98967f6'
    });

    // Mailchimp translation
    //
    // Defaults:
    //'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.eng = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-check"></i> We will be in touch soon!',
        1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    }

    /* ================================= */
    /* :::::::: 10. Owl-Carousel :::::::: */
    /* ================================= */
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });

    $('.owl-carousel-2').owlCarousel({
        loop: true,
        items: 2,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });

    $('.owl-carousel-3').owlCarousel({
        loop: true,
        items: 1,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });


    /* ================================= */
    /* :: 11. Player Youtube Controls :: */
    /* ================================= */
    /* ↓ Remove comments if you want to use the youtube video  ↓  */
    /*
    $(".player").mb_YTPlayer();

    // player controls
    $('#play').on("click", function() {
        $('.player').playYTP()
    });

    $('#pause').on("click", function() {
        $('.player').pauseYTP()
    });
    */

    /* ================================= */
    /* ::::: 12. Youtube Fancybox :::::: */
    /* ================================= */

    $(".youtube-media").on("click", function(e) {
        e.preventDefault();
        var jWindow = $(window).width();
        if (jWindow <= 768) {
            return;
        }
        $.fancybox({
            padding: 4,
            type: "iframe",
            href: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        });
        return false;
    });

    /* ================================= */
    /* ::::::::: 13. Google Map :::::::: */
    /* ================================= */
    $('.mm-open, .mm-close').click(function() {
        $('.mm-open, .mm-close').toggle();
        $('.cover-map').toggleClass('map-active');
    });

    var map;
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 12,
                draggable: true,
                scrollwheel: false,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(30.381376, -9.538708),

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative.locality",
                    "elementType": "labels",
                    "stylers": [{
                        "hue": "#ffe500"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "landscape.natural",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.attraction",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.place_of_worship",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.school",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 45
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit.station",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "transit.station.airport",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#9bdffb"
                    }, {
                        "visibility": "on"
                    }]
                }]
            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using our element and options defined above
            map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(30.381376, -9.538708),
                map: map,
                title: 'Yamama',
                visible: true,
                icon: 'images/small-logo.png'
            });

            var contentString = '<p><strong>Adress</strong>: Yamama , Dchiera Inezgane 80000, Maroc</p>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        } // End init function

});

