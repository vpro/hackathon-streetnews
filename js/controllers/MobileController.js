define(
    [
        'js/collections/SearchServices',
        'js/collections/SearchResults',
        'js/views/MobileView',
        'jquery',
        'underscore'    
    ],

    function ( SearchServices,
               SearchResults,
               MobileView,
               $, _
            ) {

        var AppController = function ( container ) {

            this.container = $( container );

            this.searchServices = new SearchServices();
            this.expectedServices = 0;

            this.searchResults = new SearchResults();

            this.appView = new MobileView({
                el: this.container
            });

            this.bindHandlers();

            this.loadConfig();
        };

        AppController.prototype = {

            bindHandlers : function () {

                this.appView.on( 'search', this.doGeoSearch, this );
                this.searchServices.on( 'add', this.checkServicesProgress, this );
            },

            checkServicesProgress : function () {
                if ( this.searchServices.length === this.expectedServices ) {

                    this.appView.render();
                }
            },

            doGeoSearch : function () {

                this.fetchGeoLocation().then(function( position ){

                    var geoLocation = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    };

                    // for now, directly do a location search
                    this.doSearch( geoLocation, '' );

                }.bind( this ));
            },

            doSearch : function ( geoLocation, query ) {

                this.searchResults.reset();

                var results = [];
                var servicesFinished = 0;

                _.each( this.searchServices.models, _.bind(function ( service ) {
                    service.search( geoLocation, query ).done( _.bind(function ( searchResults ) {

                        results = results.concat( searchResults.toJSON() );
                        servicesFinished++;

                        if ( servicesFinished == this.searchServices.length ) {
                            this.searchResults.add( results );
                            this.renderSearchResults();
                        }

                    },this) );
                },this));
            },

            fetchGeoLocation : function () {

                var deferred = new $.Deferred();

				navigator.geolocation.getCurrentPosition( deferred.resolve, deferred.reject);

                return deferred.promise();
            },

            loadConfig : function () {
                $.getJSON('config.json').done( this.parseConfig.bind(this) );
            },

            parseConfig : function ( cfg ) {

                var services = [];

                this.config = cfg;

                _.each( cfg.services, function ( service ) {

                    services.push( 'js/services/'+ service.module );
                });

                this.expectedServices = services.length;

                require( services, this.parseServices.bind(this) );
            },

            parseServices : function ( /* 1..n Services modules */ ) {

                _.each( arguments, _.bind( function ( Service ) {

                    var service = new Service();
                        service.setConfig( this.config.services[ service.id ].config );

                    this.searchServices.add( service );

                }, this) );
            },

            renderSearchResults : function () {
                this.appView.renderSearchResults( this.searchResults );
            }
        };

        return AppController;
    }
);