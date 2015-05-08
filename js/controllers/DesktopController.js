define(
    [
        'js/collections/SearchServices',
        'js/collections/SearchResults',
        'js/views/AppView',
        'jquery',
        'underscore'    
    ],

    function ( SearchServices,
               SearchResults,
               AppView,
               $, _
            ) {

        var AppController = function ( container ) {

            this.container = $( container );

            this.searchServices = new SearchServices();
            this.expectedServices = 0;

            this.searchResults = new SearchResults();

            this.appView = new AppView({
                el: this.container
            });

            this.bindHandlers();

            this.loadConfig();
        };

        AppController.prototype = {

            bindHandlers : function () {

                this.appView.on( 'search', this.doSearch, this );
                this.searchServices.on( 'add', this.checkServicesProgress, this );
                this.searchResults.on( 'add', this.renderSearchResults, this );
            },

            checkServicesProgress : function () {
                if ( this.searchServices.length === this.expectedServices ) {
                    this.appView.render();
                }
            },

            doSearch : function ( query ) {

                this.searchResults.reset();

                _.each( this.searchServices.models, _.bind(function ( service ) {
                    service.search( query ).done( _.bind(function ( searchResults ) {

                        this.searchResults.add( searchResults.toJSON() );

                    },this) );
                },this));
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
                console.log('rendering');
                this.appView.renderSearchResults( this.searchResults );
            }
        };

        return AppController;
    }
);