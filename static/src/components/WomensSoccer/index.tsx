import * as React from 'react';

export interface Props {}

export default class WomensSoccer extends React.PureComponent<Props, any> {
  // public competitions: WomensSoccerTypes.Competition[] = competitions.default;

  public render() {
    return (
      <div className="WomensSoccer">
        {/* {this.competitions.map((competition) => {
            const {competition_name: name, country_name: country} = competition;
            
            return <Competition competition_name={name} country_name={country} />
        })} */}
      </div>
    );
  }
}