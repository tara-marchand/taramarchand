import fetch from 'isomorphic-fetch';
import * as React from 'react';

import Book, { BookProps } from './Book';
import { connect } from 'react-redux';
import { setBooksAction } from './actions';
import { Dispatch } from 'redux';
import { SetBooksActionType } from './types';

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

interface OwnProps {}

interface StateProps {
  books: BookProps[];
}

interface DispatchProps {
  setBooks: (books: BookProps[]) => SetBooksActionType;
}

type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  businesses: BusinessData[];
}

export class Books extends React.PureComponent<Props, State> {
  public state: State = {
    businesses: []
  };

  public componentDidMount(): void {
    fetch('/api/books')
      .then(response => {
        return response.json();
      })
      .then(books => {
        this.props.setBooks(books);
      })
      .catch(error => console.error(error));
  }

  public render() {
    const { books } = this.props;

    return (
      <div>
        {books.length > 0 &&
          books.map(book => (
            <Book title={book.title} authors={book.authors} key={book.id} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state: { books: BookProps[] }) => ({
  books: state.books
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setBooks: (books: BookProps[]) => dispatch(setBooksAction(books))
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
