import * as React from 'react';

type Props = Pick<
  WomensSoccerTypes.Competition,
  'competition_name' | 'country_name'
>;

export default function Competition(props: Props) {
  const { competition_name: name, country_name: country } = props;

  return (
    <div>
      <h2>
        {name}, {country}
      </h2>
    </div>
  );
}
