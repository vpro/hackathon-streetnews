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
                'submit .search-form' : 'handleSearchSubmit',
                'click .mid': 'handleMidClick'
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
            },

            handleMidClick: function( e ){

                var el = e.currentTarget;

                var mid = $( el ).attr( 'data-mid' );
                if( mid ){
                    this.createSoundCloudPlayer( mid, el );
                }
            },

            createSoundCloudPlayer: function( playerId, el ){

                var playerHTML = ('<iframe ' +
                    'frameborder="no" ' +
                    'width="100%" ' +
                    'height="100%" ' +
                    'id="playerframe" ' +
                    'src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + playerId + '&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"' +
                '></iframe>');

                $( el ).find( '.audioplayer' ).html( playerHTML );

            }
        });
    }
);



/*


 */