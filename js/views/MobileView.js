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

            renderSearchLoadingState : function () {
                this.$el.find('.mobile-search-results').addClass('loading');
                this.$el.find('.mobile-intro').slideUp( 150 );

            },

            renderSearchResults : function ( searchResults ) {

                var $searchResults = this.$el.find('.mobile-search-results');

                $searchResults.html('');
                $searchResults.removeClass('loading').append(
                    resultsTemplate.render({
                        results: searchResults.toJSON()
                    })
                );
            }
        });
    }
);