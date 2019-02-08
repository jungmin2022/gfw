import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

class LayerManagerComponent extends PureComponent {
  render() {
    const {
      layers,
      geostore,
      setMapLoading,
      basemap,
      labels,
      map
    } = this.props;

    return (
      <LayerManager
        map={map}
        plugin={PluginMapboxGl}
        onLayerLoading={loading => setMapLoading(loading)}
      >
        {basemap &&
          basemap.tileUrl && (
            <Layer
              id="basemap"
              provider="leaflet"
              layerConfig={{
                body: {
                  url: basemap.tileUrl
                }
              }}
            />
          )}
        {labels &&
          labels.url && (
            <Layer
              id="layers"
              provider="leaflet"
              layerConfig={{
                body: {
                  url: labels.url
                }
              }}
            />
          )}
        {geostore &&
          geostore.id && (
            <Layer
              id={geostore.id}
              name="Geojson"
              provider="geojson"
              params={{
                id: geostore.id
              }}
              layerConfig={{
                body: geostore.geojson,
                layers: [
                  {
                    id: `${geostore.id}-fill`,
                    type: 'fill',
                    source: geostore.id,
                    paint: {
                      'fill-color': 'transparent'
                    }
                  },
                  {
                    id: `${geostore.id}-line`,
                    type: 'line',
                    source: geostore.id,
                    paint: {
                      'line-color': '#000',
                      'line-width': 2
                    }
                  }
                ]
              }}
            />
          )}
        {layers && layers.map(l => <Layer key={l.id} {...l} />)}
      </LayerManager>
    );
  }
}

LayerManagerComponent.propTypes = {
  loading: PropTypes.bool,
  layers: PropTypes.array,
  basemap: PropTypes.object,
  geostore: PropTypes.object,
  setMapLoading: PropTypes.func,
  handleMapInteraction: PropTypes.func,
  draw: PropTypes.bool,
  map: PropTypes.object,
  labels: PropTypes.object
};

export default LayerManagerComponent;
