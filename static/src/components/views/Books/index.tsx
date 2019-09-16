import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import { useQuery } from 'graphql-hooks'

import Book, { BookData } from './Book';
import ErrorBoundary from '../../ErrorBoundary';

export default function Books(props: any) {
    const addBookMutation = `
      mutation AddBook($title: String!, $authors: String!) {
        addBookToCache(title: $title, authors: $authors) {
          authors
          title
        }
      }
    `;
    const allBooksQuery = `
        {
          allBooks {
            authors
            title
          }
        }
      `
    const titleInputRef = React.createRef();
    const authorsInputRef = React.createRef();

    const { loading, error, data } = useQuery(allBooksQuery)
 
  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Something bad happened!';
  }
  if (data) {
    const books = get(data, 'books');
    let booksList;

    if (books) {
      booksList = data.books.map((book: BookData, index: number) => (
        <Book title={book.title} authors={book.authors} key={index} />
      ));

    return (
      <ErrorBoundary>
        <div>
          {/* {this.addBookMutation()} */}
          {booksList}
        </div>
      </ErrorBoundary>
    );

    return null;
  }
};

  // public addBookMutationOld = () => {
  //   return (
      // <Mutation mutation={ADD_BOOK}>
      //   {(addBook, { loading, error }) => {
      //     return (
      //       <form onSubmit={e => this.handleFormSubmit(e, addBook)}>
      //         <label>
      //           Title <input ref={this.titleInputRef} />
      //         </label>
      //         <label>
      //           Authors <input ref={this.authorsInputRef} />
      //         </label>
      //         <button type="submit">Add Book</button>
      //       </form>
      //     );
      //   }}
      // </Mutation>
  //   );
  // };

  // public handleFormSubmit = (
  //   e: React.FormEvent<HTMLFormElement>,
  //   addBook: MutationFn
  // ) => {
  //   e.preventDefault();

  //   addBook({
  //     variables: {
  //       title: get(this, 'titleInputRef.current.value', ''),
  //       authors: get(this, 'authorsInputRef.current.value', '')
  //     }
  //   }).then(() => {
  //     set(this, 'titleInputRef.current.value', '');
  //     set(this, 'authorsInputRef.current.value', '');  
  //   });
  // };
}

// import { gql, Resolvers } from 'apollo-boost';

// function addBook(root: any, variables: {[key: string]: any}, context: any) {
//   const id = context.getCacheKey({ __typename: 'Book', id: variables.id });
//   const fragment = gql`
//     fragment addedBook on Book {}
//   `;
//   const book = context.cache.readFragment({ fragment, id });
//   const data = { ...book };

//   context.cache.writeData({ id, data });
//   return null;
// }

// export default {
//   Mutation: {
//     addBook
//   }
// } as Resolvers;
