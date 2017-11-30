import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollEvent from 'react-onscroll';

import Widget from 'pages/country/widgets';
import Share from 'components/share';
import Header from 'pages/country/header';
import Footer from 'pages/country/footer';
import Map from 'pages/country/map';
import Stories from 'pages/country/stories';

import './root-styles.scss';

const WIDGETS = {
  treeCover: {
    gridWidth: 6
  },
  treeLocated: {
    gridWidth: 6
  },
  treeLoss: {
    gridWidth: 12
  },
  treeCoverLossAreas: {
    gridWidth: 6
  },
  treeCoverGain: {
    gridWidth: 6
  },
  totalAreaPlantations: {
    gridWidth: 6
  },
  plantationArea: {
    gridWidth: 6
  }
};
class Root extends PureComponent {
  render() {
    const {
      isMapFixed,
      showMapMobile,
      handleShowMapMobile,
      handleScrollCallback,
      adminsLists,
      adminsSelected
    } = this.props;
    return (
      <div className="l-country">
        <ScrollEvent handleScrollCallback={handleScrollCallback} />
        <button className="open-map-mobile-tab" onClick={handleShowMapMobile}>
          <span>{!showMapMobile ? 'show' : 'close'} map</span>
        </button>
        <div className="panels">
          <div className="data-panel">
            <Header
              className="header"
              adminsLists={adminsLists}
              adminsSelected={adminsSelected}
            />
            <div className="c-tabs">
              <ul className="tabs-list">
                <li className="-selected">Summary</li>
                <li className="">Forest change</li>
                <li className="">Land cover</li>
              </ul>
            </div>
            <div className="widgets">
              <div className="row">
                {adminsSelected &&
                  Object.keys(WIDGETS).map(widget => (
                    <div
                      key={widget}
                      className={`columns large-${
                        WIDGETS[widget].gridWidth
                      } small-12 widget`}
                    >
                      <Widget widget={widget} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={`map-panel ${showMapMobile ? '-open-mobile' : ''}`}>
            <div
              className={`map ${isMapFixed ? '-fixed' : ''} ${
                showMapMobile ? '-open-mobile' : ''
              }`}
              style={{ top: this.props.mapTop }}
            >
              <Map
                maxZoom={14}
                minZoom={3}
                mapOptions={{
                  mapTypeId: 'grayscale',
                  backgroundColor: '#99b3cc',
                  disableDefaultUI: true,
                  panControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  scaleControl: true,
                  streetViewControl: false,
                  overviewMapControl: false,
                  tilt: 0,
                  scrollwheel: false,
                  center: { lat: -34.397, lng: 150.644 },
                  zoom: 8
                }}
              />
            </div>
          </div>
        </div>
        <Stories locationNames={adminsSelected} />
        <Footer />
        <Share />
      </div>
    );
  }
}

Root.propTypes = {
  showMapMobile: PropTypes.bool.isRequired,
  handleScrollCallback: PropTypes.func.isRequired,
  isMapFixed: PropTypes.bool.isRequired,
  mapTop: PropTypes.number.isRequired,
  handleShowMapMobile: PropTypes.func.isRequired,
  adminsLists: PropTypes.object,
  adminsSelected: PropTypes.object
};

export default Root;
