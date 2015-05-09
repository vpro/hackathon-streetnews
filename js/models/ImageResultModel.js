define(
    [
        'backbone'
    ],

    function ( Backbone ) {

        return Backbone.Model.extend({
            defaults: {
                type: 'image',
                isImage: true
            }
        });
    }
);