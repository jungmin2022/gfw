import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { formatNumber } from 'utils/format';
import { aboveGroundToBelowGround } from 'utils/calculations';

const getData = state => state.data;
const getLocationName = state => state.locationLabel;
const getColors = state => state.colors;
const getSentences = state => state.sentences;
const getTitle = state => state.title;
const getSettings = state => state.settings;

export const calculateData = createSelector(
  [getData, getSettings],
  (data, settings) => {
    if (isEmpty(data)) return null;
    const { variable } = settings;

    const extent = (data && data.extent) || 0;
    const aboveGroundBiomass = (data && data.biomass) || 0;
    const belowGroundBiomass = aboveGroundToBelowGround(aboveGroundBiomass);
    const soil = (data && data.soilCarbon) || 0;
    const soilDensity = (data && data.soilCarbonDensity) || 0;

    const aboveGroundCarbon = aboveGroundBiomass * 0.5;
    const belowGroundCarbon = belowGroundBiomass * 0.5;
    const aboveGroundCarbonDensity =
      extent > 0 ? aboveGroundCarbon / extent : 0;
    const belowGroundCarbonDensity =
      extent > 0 ? belowGroundCarbon / extent : 0;
    const total = soil + aboveGroundCarbon + belowGroundCarbon;

    return {
      soil,
      soilDensity,
      aboveGround: aboveGroundCarbon,
      belowGround: belowGroundCarbon,
      aboveGroundDensity: aboveGroundCarbonDensity,
      belowGroundDensity: belowGroundCarbonDensity,
      total,
      unit: variable === 'totalbiomass' ? 't' : 't/Ha'
    };
  }
);

export const parseData = createSelector(
  [calculateData, getColors],
  (data, colors) => {
    if (isEmpty(data)) return null;
    const { soil, aboveGround, belowGround, total } = data || {};
    return [
      {
        label: 'Soil carbon',
        value: soil,
        unit: 't',
        color: colors.carbon[0],
        percentage: soil / total * 100
      },
      {
        label: 'Above ground carbon',
        value: aboveGround,
        unit: 't',
        color: colors.carbon[1],
        percentage: aboveGround / total * 100
      },
      {
        label: 'Below ground carbon',
        value: belowGround,
        unit: 't',
        color: colors.carbon[2],
        percentage: belowGround / total * 100
      }
    ];
  }
);

export const parseLegendData = createSelector(
  [calculateData, getColors, getSettings],
  (data, colors, settings) => {
    if (isEmpty(data)) return null;
    const {
      soil,
      soilDensity,
      aboveGround,
      aboveGroundDensity,
      belowGround,
      belowGroundDensity
    } =
      data || {};

    const { variable } = settings;
    const unit = variable === 'totalbiomass' ? 't' : 't/Ha';
    return [
      {
        label: `Soil carbon${variable === 'totalbiomass' ? '' : ' density'}`,
        value: variable === 'totalbiomass' ? soil : soilDensity,
        unit,
        color: colors.carbon[0]
      },
      {
        label: `Above ground carbon${
          variable === 'totalbiomass' ? '' : ' density'
        }`,
        value: variable === 'totalbiomass' ? aboveGround : aboveGroundDensity,
        unit,
        color: colors.carbon[1]
      },
      {
        label: `Below ground carbon${
          variable === 'totalbiomass' ? '' : ' density'
        }`,
        value: variable === 'totalbiomass' ? belowGround : belowGroundDensity,
        unit,
        color: colors.carbon[2]
      }
    ];
  }
);

export const parseSentence = createSelector(
  [calculateData, getLocationName, getSentences],
  (data, locationName, sentence) => {
    if (!data) return null;
    const { soil, aboveGround, belowGround, total } = data || {};
    const allGround = aboveGround + belowGround;
    const params = {
      location: locationName,
      carbonStored: allGround > soil ? 'biomass' : 'soil',
      carbonValue: formatNumber({ num: total, unit: 't' })
    };

    return {
      sentence,
      params
    };
  }
);

export const parseTitle = createSelector(
  [getTitle, getLocationName],
  (title, location) => title.replace('{location}', location)
);

export default createStructuredSelector({
  data: parseData,
  legendData: parseLegendData,
  sentence: parseSentence,
  title: parseTitle
});
