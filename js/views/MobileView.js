define(
    [
        'backbone',
        'underscore',
        'masonry',
        'jquery',
        'js/lib/template!templates/mobile/app.html',
        'js/lib/template!templates/mobile/searchresults.html'
    ],
    function ( Backbone, _, Masonry, $, introTemplate, resultsTemplate ) {

        return Backbone.View.extend({

            events : {
                'submit .mobile-search-form' : 'handleSearchSubmit',
                'click .mobile-result-listed' : 'handleResultClick',
                'click .mobile-result-popup' : 'handlePopupClick'
            },

            handlePopupClick : function () {
                this.$resultPopup.hide(150);
            },

            handleResultClick : function ( e ) {

                var $result = $( e.currentTarget );

                if ( this.$resultPopup ) {

                    this.$resultPopup.html( $result.html() );
                    this.$resultPopup.show(150);
                }
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
                        resultCount: searchResults.length,
                        results: searchResults.toJSON()
                    })
                );

                this.$resultPopup = this.$el.find('.mobile-result-popup');

                var msnry = new Masonry( '.mobile-search-results-listing', {
                });
            }
        });
    }
);