import * as React from 'react';

type Props = Pick<
  WomensSoccerTypes.Competition,
  'competition_name' | 'country_name'
>;

export default class Competition extends React.PureComponent<Props, any> {
  public render() {
    const { competition_name: name, country_name: country } = this.props;

    return (
      <div className="Competition">
        <h2>
          {name}, {country}
        </h2>
      </div>
    );
  }
}
