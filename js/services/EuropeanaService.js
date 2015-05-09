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
                      switch( result.type.toLowerCase() ){

                          case 'text':
                              euResult = new TextResultModel();
                              break;

                          case 'video':
                              euResult = new VideoResultModel();
                              break;

                          case 'sound':
                              /**
                               * object
                               * proxies[0].dcCreator bevat soundcloud
                               * dcCreator:       http://soundcloud.com/marloeskunst
                               * dcIdentifier:    51656863
                               * dcFormat:        mp4
                               *
                               */

                              var id,
                                 creator = result.dcCreator[0];

                              if( creator.indexOf( 'soundcloud' ) > 0 ){
                                  id = result.id.split( 'tracks_' )[1];
                              }

                              euResult = new AudioResultModel({
                                  id: id
                              });
                              break;

                          case 'image':
                              euResult = new ImageResultModel({
                                  thumbnail: result.edmPreview
                              });
                              break;

                          case '3d':
                              euResult = new ThreeDResultModel();
                              break;

                      }

                      // the default stuff
                      euResult.set({
                          title : ( result.title && result.title.length ) ? result.title[0] : '',
                          link : result.link,
                          provider: result.provider,
                          guid: result.guid
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