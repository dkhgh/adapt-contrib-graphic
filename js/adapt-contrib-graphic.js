define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

        events: {
            'inview':'inview'
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
        },

        inview: function(event, visible) {
            if (visible) {
                this.setCompletionStatus();
            }
        },
        
        resizeImage: function(width) {
            var src = this.$('.graphic-widget img').attr('data-' + width);
            this.$('.graphic-widget img').attr('src', src);

            this.$('.graphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });

    Adapt.register("graphic", Graphic);
});