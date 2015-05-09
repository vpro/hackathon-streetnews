define(
    [
        'js/collections/SearchServices',
        'js/collections/SearchResults',
        'js/views/AppView',
        'js/views/MapView',
        'jquery',
        'underscore'
    ],

    function ( SearchServices,
               SearchResults,
               AppView,
               MapView,
               $, _
            ) {

        var AppController = function ( config ) {

            this.appContainer = $( config.appContainer );
            this.mapContainer = $( config.mapContainer );

            this.searchServices = new SearchServices();
            this.expectedServices = 0;

            this.searchResults = new SearchResults();

            this.appView = new AppView({
                el: this.appContainer
            });

            this.mapView = new MapView({
               el: this.mapContainer
            });

            this.mapView.render();

            this.bindHandlers();

            this.loadConfig();
        };

        AppController.prototype = {

            bindHandlers : function () {

                this.appView.on( 'search', this.doSearch, this );
                this.searchServices.on( 'add', this.checkServicesProgress, this );

                this.mapView.on( 'location-change', this.handleLocationChange, this );
            },

            checkServicesProgress : function () {
                if ( this.searchServices.length === this.expectedServices ) {
                    this.appView.render();
                }
            },

            doSearch : function ( query, location ) {

                this.searchResults.reset();

                var results = [];
                var servicesFinished = 0;

                _.each( this.searchServices.models, _.bind(function ( service ) {
                    service.search( location, query ).done( _.bind(function ( searchResults ) {

                        if( searchResults ) {
                            results = results.concat(searchResults.toJSON());
                            servicesFinished++;
                        }

                        if ( servicesFinished == this.searchServices.length ) {
                            this.searchResults.add( results );
                            this.renderSearchResults();
                        }

                    },this) );
                },this));
            },

            handleLocationChange: function(){
                var location = this.mapView.getLocation();

                this.doSearch( '', {
                    lat: location.get( 'lat' ),
                    long: location.get( 'long' )
                })
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