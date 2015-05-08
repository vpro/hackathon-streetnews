define(
    [
        'backbone',
        'underscore',
        'js/lib/template!templates/map.html',
        'js/models/LocationModel',
        'async!https://maps.googleapis.com/maps/api/js'
    ],
    function ( Backbone, _, mapTemplate, LocationModel ) {

        return Backbone.View.extend({

            //https://maps.googleapis.com/maps/api/js?key=<API_KEY></API_KEY>

            //events : {
            //    'submit .search-form' : 'handleSearchSubmit'
            //},

            render : function () {

                this.renderMapContainer();
                this.bindMapHandlers();

            },

            renderMapContainer: function () {

                this.$el.html( mapTemplate.render({}) );

                var mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng( 52.23527077363721, 5.169609189033508 )
                };

                this.map = new google.maps.Map( document.getElementById( 'map-canvas' ),  mapOptions );

            },

            handleMapClick: function( geoLoc ){

                this.location = new LocationModel({
                    lat: geoLoc.lat,
                    long: geoLoc.long
                });

                this.trigger( 'location-change' );
            },

            getLocation: function(){
                return this.location;
            },

            bindMapHandlers: function(){

                google.maps.event.addListener( this.map, 'click', function ( e ) {

                    this.handleMapClick({
                        lat: e.latLng.A,
                        long: e.latLng.F
                    })

                }.bind( this ));

            }

        });
    }
);