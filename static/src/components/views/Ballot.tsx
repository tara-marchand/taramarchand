import React, { Component } from 'react';
import { getData } from '../../utils';
import { v4 as uuid4 } from 'uuid';
import ballotJson from './250361.json';

interface Ballot {
  [key: string]: any;
}
interface Props {}

export const Ballot: React.FunctionComponent<Props> = (props) => {
  const [ballot, setBallot] = React.useState<Ballot>(null);
  const fetchController: AbortController = new AbortController();

  React.useEffect(() => {
    setBallot(ballotJson);
  }, [!ballot]);

  return (
    ballot && (
      <form>
        <h1>{ballot.election.title.value}</h1>
        {ballot.boxes.map((box) => {
          return (
            <div key={uuid4()}>
              {box.titles.map((title) => (
                <h3 key={uuid4()}>{title.value}</h3>
              ))}
              {/* {box.text.map((textItem) => (
                <p
                  key={uuid4()}
                  dangerouslySetInnerHTML={{ __html: textItem.value }}
                />
              ))} */}
              <ul>
                {box.options &&
                  box.options.map((option) => (
                    <li key={uuid4()}>
                      {option.titles.map((title) => title.value)}
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </form>
    )
  );
};
