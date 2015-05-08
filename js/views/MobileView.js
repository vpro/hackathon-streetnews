define(
    [
        'backbone',
        'underscore',
        'js/lib/template!templates/mobile/intro.html',
        'js/lib/template!templates/searchresults.html'
    ],
    function ( Backbone, _, introTemplate, resultsTemplate ) {

        return Backbone.View.extend({

            events : {
                'submit .search-form' : 'handleSearchSubmit'
            },

            handleSearchSubmit : function ( e ) {
                e.preventDefault();

                this.$el.find('.search-results').empty();

                this.trigger( 'search', this.$el.find('[name=query]').val() );
            },

            render : function () {

                this.$el.html( introTemplate.render({}) );
            },

            renderDateInput : function () {

            },

            renderGeoData : function ( geoLocation ) {
                this.$el.find('.geolocation' ).html( 'lat: '+ geoLocation.lat +', ;long: '+ geoLocation.long );
            },

            renderSearchResults : function ( searchResults ) {

                this.$el.find('.search-results' ).html('');
                this.$el.find('.search-results').append(
                    resultsTemplate.render({
                        results: searchResults.toJSON()
                    })
                );
            }
        });
    }
);