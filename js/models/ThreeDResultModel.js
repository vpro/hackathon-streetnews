define(
    [
        'backbone'
    ],

    function ( Backbone ) {

        return Backbone.Model.extend({
            defaults: {
                type: '3d',
                is3d: true
            }
        });
    }
);