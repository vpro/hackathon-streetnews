define(
    [
        'backbone',
        'underscore',
        'js/lib/template!templates/app.html',
        'js/lib/template!templates/searchresults.html'
    ],
    function ( Backbone, _, appTemplate, resultsTemplate ) {

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

                this.renderSearchBox();
            },

            renderSearchBox : function () {

                this.$el.html( appTemplate.render({}) );
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