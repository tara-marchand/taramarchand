import React from 'react';
import { getData } from '../../../../data/utils';
import RestHealthScoresChart, {
  transformHealthScoresData,
  zip94112RestHealthUrl,
} from './rest_health_scores_chart';
import Sunnyside311CasesMap, {
  sunnyside311CasesUrl,
  transformCasesData,
} from './sunnyside_311_cases_map';
import { BizViolationBar, CaseLocation } from './types';

interface Props {}

const fetchController: AbortController = new AbortController();

const SFData: React.FunctionComponent<Props> = (props) => {
  const [cases, setCases] = React.useState<CaseLocation[]>([]);
  const [bizHealthScores, setHealthScores] = React.useState(
    [] as BizViolationBar[]
  );

  let maxNumInspections = 0;

  // Sunnyside 311 cases map
  React.useEffect(() => {
    getData(sunnyside311CasesUrl, fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then((casesData) => {
        setCases(transformCasesData(casesData));
      })
      .catch((error) => console.error(error));
  }, [!cases]);

  // 94112 restaurant health violations chart
  React.useEffect(() => {
    getData(zip94112RestHealthUrl, fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then((scores) => {
        setHealthScores(transformHealthScoresData(scores, maxNumInspections));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {/* TODO: redo chart in Highcharts */}
      {/* <RestHealthScoresChart scores={bizHealthScores} /> */}
      <Sunnyside311CasesMap cases={cases} />
    </div>
  );
};

export default SFData;
