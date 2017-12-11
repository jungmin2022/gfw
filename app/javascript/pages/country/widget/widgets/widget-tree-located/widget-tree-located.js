import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import {
  getThresholds,
  getUnits,
  getDataSources
} from 'pages/country/widget/widget-selectors';
import { filterData, getSortedData } from './widget-tree-located-selectors';

import WidgetTreeLocatedComponent from './widget-tree-located-component';
import actions from './widget-tree-located-actions';

export { initialState } from './widget-tree-located-reducers';
export { default as reducers } from './widget-tree-located-reducers';
export { default as actions } from './widget-tree-located-actions';

const mapStateToProps = ({ location, widgetTreeLocated, countryData }) => {
  const { isCountriesLoading, isRegionsLoading } = countryData;
  const data = {
    data: widgetTreeLocated.data.regions,
    page: widgetTreeLocated.settings.page,
    pageSize: widgetTreeLocated.settings.pageSize,
    unit: widgetTreeLocated.settings.unit,
    meta: countryData[!location.payload.region ? 'regions' : 'subRegions']
  };
  return {
    location: location.payload,
    regions: countryData.regions,
    isLoading:
      widgetTreeLocated.isLoading || isCountriesLoading || isRegionsLoading,
    data: filterData(data) || [],
    allData: getSortedData(data) || [],
    dataSources: getDataSources(),
    units: getUnits(),
    thresholds: getThresholds(),
    settings: widgetTreeLocated.settings
  };
};

class WidgetTreeLocatedContainer extends PureComponent {
  componentWillMount() {
    const { location, settings, getTreeLocated } = this.props;
    getTreeLocated({
      ...location,
      ...settings
    });
  }

  componentWillReceiveProps(nextProps) {
    const { settings, location, getTreeLocated } = nextProps;

    if (
      !isEqual(nextProps.location.country, this.props.location.country) ||
      !isEqual(nextProps.location.region, this.props.location.region) ||
      !isEqual(settings.threshold, this.props.settings.threshold)
    ) {
      getTreeLocated({
        ...location,
        ...settings
      });
    }
  }

  handlePageChange = change => {
    const { setTreeLocatedPage, settings } = this.props;
    setTreeLocatedPage(settings.page + change);
  };

  render() {
    return createElement(WidgetTreeLocatedComponent, {
      ...this.props,
      handlePageChange: this.handlePageChange
    });
  }
}

WidgetTreeLocatedContainer.propTypes = {
  setTreeLocatedPage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getTreeLocated: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(WidgetTreeLocatedContainer);
