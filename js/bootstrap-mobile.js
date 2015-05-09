
requirejs.config({
    paths : {
        backbone : 'vendor/js/backbone-min',
        handlebars : 'vendor/js/handlebars.amd.min',
        jquery : 'vendor/js/jquery.min',
        masonry : 'vendor/js/masonry.pkgd',
        ramjet : 'vendor/js/ramjet',
        underscore : 'vendor/js/underscore-min'
    },
    shim : {
        underscore : {
            exports : '_'
        }
    }
});

require(
    [
        'js/controllers/MobileController'
    ],

    function ( MobileController ) {

        var app = new MobileController( document.getElementById('app') );
    }
);