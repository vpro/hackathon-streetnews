define(
    [
        'js/collections/SearchResults',
        'backbone',
        'jquery',
        'js/models/AudioResultModel',
        'js/models/ImageResultModel',
        'js/models/TextResultModel',
        'js/models/ThreeDResultModel',
        'js/models/VideoResultModel'
    ],

    function ( SearchResults, Backbone, $,
               AudioResultModel,
               ImageResultModel,
               TextResultModel,
               ThreeDResultModel,
               VideoResultModel
    ) {

        return Backbone.Model.extend({

                  id : 'europeana',
                  title : 'Europeana',

                  initialize : function () {

                      this.searchResults = new SearchResults();
                  },

                  parseSearchResults : function ( results ) {

                      _.each( results, function ( result ) {

                          // type: TEXT, VIDEO, SOUND, IMAGE, 3D
                          // edmPreview: preview link
                          // edmPlaceAltLabel: Alternative forms of the name of the place.
                          // year: A point of time associated with an event in the life of the original analog or born digital object.

                          var euResult;

                          // the specific stuff
                          switch( result.type ){

                              case 'TEXT':
                                  euResult = new TextResultModel();
                                  break;

                              case 'VIDEO':
                                  euResult = new VideoResultModel();
                                  break;

                              case 'SOUND':
                                  euResult = new AudioResultModel();
                                  break;

                              case 'IMAGE':
                                  euResult = new ImageResultModel();
                                  break;

                              case '3D':
                                  euResult = new ThreeDResultModel();
                                  break;

                          }

                          // the default stuff
                          euResult.set({
                              title : ( result.title && result.title.length ) ? result.title[0] : '',
                              link : result.link,
                              previewLink: result.edmPreview
                          });

                          this.searchResults.add( euResult );

                      }.bind(this) );

                      return this.searchResults;
                  },

                  search : function ( location, query ) {

                      var deferred = new $.Deferred();
                      var searchQuery = '';

                      if ( location ) {

                          searchQuery = 'pl_wgs84_pos_lat:['+  location.lat +'+TO+'+  (location.lat+0.02)+']+AND+pl_wgs84_pos_long:['+ location.long +'+TO+'+ (location.long+0.02) +']';

                      } else if ( query && query.length) {
                          searchQuery = query;
                      }

                      this.searchResults.reset();

                      $.getJSON( 'http://europeana.eu/api/v2/search.json?wskey='+ this.config.apiKey +'&query='+ searchQuery, function ( data ) {

                          if ( data && data.itemsCount ) {
                              deferred.resolve( this.parseSearchResults( data.items ) );
                          } else {
                              deferred.resolve( this.searchResults );
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