import React from 'react';
import { getData } from '../../../utils';
import uuid4 from 'uuid';

interface Props {}

const fetchController: AbortController = new AbortController();

const SFData: React.FC<Props> = (props: Props) => {
  const [businesses, setBusinesses] = React.useState([]);

  React.useEffect(() => {
    getData('https://data.sfgov.org/resource/vw6y-z8j6.json', fetchController)
      .then(response => {
        return response.json();
      })
      .then(businesses => {
        setBusinesses(
          businesses.map(biz => {
            return Object.assign({ id: uuid4() }, biz);
          })
        );
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {businesses.length > 0 &&
        businesses.map(biz => {
          console.log(biz);
          return <div key={biz.id}>{biz.address}</div>;
        })}
    </div>
  );
};

export default SFData;
