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

            // TODO: add api_key to google map script request
            //https://maps.googleapis.com/maps/api/js?key=<API_KEY></API_KEY>

            events: {
                'click #locate-me': 'locateMe'
            },

            render : function () {

                this.renderMapContainer();
                this.createGoogleMap();
                this.bindMapHandlers();

                this.statusContainer = this.$el.find( '#map-status' );
            },

            locateMe: function(){

                if ( 'geolocation' in navigator ) {

                    this.setStatus( 'trying to find you...' );

                    navigator.geolocation.getCurrentPosition( function( position ) {

                        var location = new LocationModel({
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        });

                        this.setLocation( location);

                    }.bind( this ));

                } else {
                    this.setStatus( "You're here nor there" );
                }

            },

            renderMapContainer: function () {

                this.$el.html( mapTemplate.render({}));
            },

            createGoogleMap: function(){

                var mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng( 52.23527077363721, 5.169609189033508 )
                };

                this.map = new google.maps.Map( document.getElementById( 'map-canvas' ),  mapOptions );

            },

            handleMapClick: function( geoLoc ){

                var location = new LocationModel({
                    lat: geoLoc.lat,
                    long: geoLoc.long
                });

                this.setLocation( location );

            },

            setLocation: function( location ){

                this.setStatus( '' );

                var oldLoc = this.getLocation();

                this.location = location;

                // TODO: compare old and new location properly
                //if( this.getLocation() !== oldLoc ) {
                    this.trigger( 'location-change' );
                //}
            },

            getLocation: function(){
                return this.location;
            },

            setMapCenter: function( location ){

                var latLng = new google.maps.LatLng( location.get( 'lat' ), location.get( 'long' ) );

                this.map.panTo( latLng );

                if ( !this.marker ) {
                    this.marker = new google.maps.Marker({
                        position: latLng,
                        title: "It's me!",
                        animation: google.maps.Animation.DROP
                    });
                    this.marker.setMap( this.map );
                } else {
                    this.marker.setPosition( latLng );
                }

            },

            bindMapHandlers: function(){

                google.maps.event.addListener( this.map, 'click', function ( e ) {

                    this.handleMapClick({
                        lat: e.latLng.A,
                        long: e.latLng.F
                    })

                }.bind( this ));

            },

            setStatus: function( status ){
                this.statusContainer.html( status );
            }

        });
    }
);