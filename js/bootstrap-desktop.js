requirejs.config({
    paths : {
        backbone : 'vendor/js/backbone-min',
        handlebars : 'vendor/js/handlebars.amd.min',
        jquery : 'vendor/js/jquery.min',
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
        'js/controllers/DesktopController'
    ],

    function ( DesktopController ) {

        var app = new DesktopController( document.getElementById('app') );
    }
);