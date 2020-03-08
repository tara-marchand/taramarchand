import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { BizViolationBar } from './types';
import React from 'react';

interface Props {
  scores: BizViolationBar[];
}

export const zip94112RestHealthUrl =
  'https://data.sfgov.org/resource/pyih-qa8i.json?$select=' +
  encodeURIComponent('business_name,count(violation_id),max(inspection_date)') +
  '&$where=' +
  encodeURIComponent("business_postal_code = '94112'") +
  '&$group=business_name&$order=business_name&$limit=25';

const RestHealthScoresChart: React.FunctionComponent<Props> = props => {
  return (
    <VictoryChart>
      <VictoryBar data={props.scores} />
      <VictoryAxis dependentAxis label="Number of Violations" minDomain={0} />
    </VictoryChart>
  );
};

export function transformHealthScoresData(healthScoresData, maxNumInspections) {
  return healthScoresData.map((score, index) => {
    const y = parseInt(score.count_violation_id, 10);
    const isYMax = y > maxNumInspections;

    // Only save the properties we're going to use
    return {
      x: index,
      y,
      isYMax
    };
  });
}

export default RestHealthScoresChart;
