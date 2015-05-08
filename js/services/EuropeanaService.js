define(
    [
        'js/collections/SearchResults',
        'backbone',
        'jquery'
    ],

    function ( SearchResults, Backbone, $ ) {

        return Backbone.Model.extend({

                  id : 'europeana',
                  title : 'Europeana',

                  initialize : function () {

                      this.searchResults = new SearchResults();
                  },

                  parseSearchResults : function ( results ) {

                      _.each( results, function ( result ) {

                          this.searchResults.add({
                              title : ( result.title && result.title.length ) ? result.title[0] : '',
                              link : result.link
                          });

                      }.bind(this) );

                      return this.searchResults;
                  },

                  search : function ( query, location ) {

                      var deferred = new $.Deferred();

                      this.searchResults.reset();

                      $.getJSON( 'http://europeana.eu/api/v2/search.json?wskey='+ this.config.apiKey +'&query='+ query, function ( data ) {

                          if ( data && data.itemsCount ) {
                              deferred.resolve( this.parseSearchResults( data.items ) );
                          } else {
                              deferred.resolve([]);
                          }

                      }.bind( this ));

                      return deferred.promise();
                  },

                  setConfig : function ( config ) {
                      this.config = config;
                  }
              });
    }
);