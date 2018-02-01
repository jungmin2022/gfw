import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import WidgetComposedChart from 'pages/country/widget/components/widget-composed-chart';
import WidgetDynamicSentence from 'pages/country/widget/components/widget-dynamic-sentence';

import './widget-tree-loss-plantations-styles.scss';

class WidgetTreeLossPlantations extends PureComponent {
  render() {
    const { data, config, sentence, active } = this.props;

    return (
      <div className="c-widget-tree-loss-plantations">
        {sentence && <WidgetDynamicSentence sentence={sentence} />}
        {data && (
          <WidgetComposedChart
            className="loss-chart"
            data={data}
            config={config}
            backgroundColor={active ? '#fefedc' : '#fff'}
          />
        )}
      </div>
    );
  }
}

WidgetTreeLossPlantations.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  sentence: PropTypes.string,
  active: PropTypes.bool
};

export default WidgetTreeLossPlantations;
