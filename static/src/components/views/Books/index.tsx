import fetch from 'isomorphic-fetch';
import * as React from 'react';

import Book from './Book';

interface BusinessData {
  business_zip: string;
  certificate_number: string;
  city: string;
  dba_name: string;
  dba_start_date: string; // timestamp
  full_business_address: string;
  location_start_date: string; // timestamp
  mail_city: string;
  mail_zipcode: string;
  mail_state: string;
  mailing_address_1: string;
  naic_code_description: string;
  naic_code: string;
  neighborhoods_analysis_boundaries: string;
  ownership_name: string;
  parking_tax: boolean;
  state: 'CA';
  supervisor_district: string;
  transient_occupancy_tax: boolean;
  ttxid: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

interface Props {}

export interface State {
  books: Book[];
  businesses: BusinessData[];
}

export default class Books extends React.PureComponent<Props, State> {
  public state: State = {
    books: [],
    businesses: []
  };

  public componentDidMount() {
    fetch('/api/books')
      .then(response => {
        return response.json();
      })
      .then(books => {
        this.setState({ books });
      })
      .catch(error => console.error(error));
  }

  public render() {
    const { books } = this.state;

    return (
      <div>
        {books.length > 0 &&
          books.map(book => (
            <Book
              title={book.props.title}
              authors={book.props.authors}
              key={book.props.id}
            />
          ))}
      </div>
    );
  }
}
