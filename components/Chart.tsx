import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep, merge } from 'lodash';
import React, { useEffect, useState } from 'react';

let defaultOptions: Highcharts.Options;

export const Chart: React.FunctionComponent<{
  propsOptions?: Highcharts.Options;
}> = ({ propsOptions = {} }) => {
  const [options, setOptions] = useState(propsOptions);

  useEffect(() => {
    setOptions(merge(cloneDeep(defaultOptions), propsOptions));
  }, [propsOptions]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};
