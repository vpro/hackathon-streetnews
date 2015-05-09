define(
    [
        'backbone',
        'underscore',
        'js/lib/template!templates/mobile/app.html',
        'js/lib/template!templates/searchresults.html'
    ],
    function ( Backbone, _, introTemplate, resultsTemplate ) {

        return Backbone.View.extend({

            events : {
                'submit .mobile-search-form' : 'handleSearchSubmit'
            },

            handleSearchSubmit : function ( e ) {
                e.preventDefault();

                this.$el.find('.mobile-search-results').empty();

                this.trigger( 'search' );
            },

            render : function () {

                this.$el.html( introTemplate.render({}) );
            },

            renderDateInput : function () {

            },

            renderSearchResults : function ( searchResults ) {

                this.$el.find('.mobile-search-results' ).html('');
                this.$el.find('.mobile-search-results').append(
                    resultsTemplate.render({
                        results: searchResults.toJSON()
                    })
                );
            }
        });
    }
);