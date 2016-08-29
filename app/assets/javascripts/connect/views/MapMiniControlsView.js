/**
 * The MapMiniControlsView view.
 *
 * @return MapMiniControlsView view (extends Backbone.View)
 */
define([
  'underscore',
  'handlebars',
  'mps',
], function(_, Handlebars, mps) {

  'use strict';

  var MapMiniControlsView = Backbone.View.extend({

    status: new (Backbone.Model.extend({
      defaults: {
        is_drawing: false
      }
    })),

    el: '#map-controls',

    events: {
      'click .js-map-controls-zoom-in' : 'onClickZoomIn',
      'click .js-map-controls-zoom-out' : 'onClickZoomOut',
      'click .js-map-controls-autolocate' : 'onClickLocate',
      'click .js-map-controls-drawing' : 'onClickDrawing',
      // 'click .js-map-controls-zoom-search' : 'onClickZoomOut',
    },

    initialize: function(map) {
      this.map = map;
      this.cache();
      this.listeners();

      this.renderGoogleAutocomplete();
    },

    listeners: function() {
      this.status.on('change:is_drawing', this.changeIsDrawing.bind(this));

      // MPS listeners
      mps.subscribe('Drawing/toggle', function(toggle){
        this.status.set('is_drawing', toggle);
      }.bind(this))
    },

    cache: function() {
      this.$drawing = this.$el.find('#map-controls-drawing');
      this.$autolocate = this.$el.find('#map-controls-autolocate');
      this.$autocomplete = this.$el.find('#map-controls-search');
    },

    renderGoogleAutocomplete: function() {
      // Set autocomplete search input
      this.autocomplete = new google.maps.places.Autocomplete(this.$autocomplete[0], {
        types: ['geocode']
      });
      
      // Listen to selected areas (search)
      google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
        var place = this.autocomplete.getPlace();
        if (place && place.geometry && place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        }
        if (place && place.geometry && place.geometry.location && !place.geometry.viewport) {
          var index = [];
          for (var x in place.geometry.location) {
            index.push(x);
          }
          this.map.setCenter(new google.maps.LatLng(place.geometry.location[index[0]], place.geometry.location[index[1]]));
        }
      }.bind(this));

      // Listen to keys
      google.maps.event.addDomListener(this.$autocomplete[0], 'keydown', function(e) {
        switch(e.keyCode) {
          case 13:
            e.preventDefault();
          break;
          case 27:
            $(e.currentTarget).val('');
          break;
        }
      }.bind(this));
    },



    /**
     * CHANGE EVENTS
     * - changeIsDrawing
     */
    changeIsDrawing: function() {
      this.$drawing.toggleClass('-drawing', this.status.get('is_drawing')); 
    },



    /**
     * UI EVENTS
     * - onClickZoomIn
     * - onClickZoomOut
     * - onClickLocate
     */
    onClickZoomIn: function(e) {
      e && e.preventDefault();
      var zoom = this.map.getZoom() + 1;
      this.map.setZoom(zoom);
    },

    onClickZoomOut: function(e){
      e && e.preventDefault();
      var zoom = this.map.getZoom() - 1;
      this.map.setZoom(zoom);
    },

    onClickLocate: function(e){
      e && e.preventDefault();
      this.$autolocate.toggleClass('-loading', true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            this.$autolocate.toggleClass('-loading', false);
            
            var lat = position.coords.latitude,
                lng = position.coords.longitude;

            this.map.setCenter(new google.maps.LatLng(lat, lng));

          }.bind(this),

          function() {
            this.$autolocate.toggleClass('-loading', false);
            mps.publish('Notification/open', ['notification-enable-location']);
          }.bind(this)
        );
      } else {
        this.$autolocate.toggleClass('-loading', false);
      }
    },

    onClickDrawing: function(e) {
      e && e.preventDefault();
      var is_drawing = $(e.currentTarget).hasClass('-drawing');
      mps.publish('Drawing/toggle', [!is_drawing]);
    }

  });

  return MapMiniControlsView;

});
