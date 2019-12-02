import { BooksState, SET_BOOKS } from './types';

const initialState: BooksState = {
  books: []
};

export default function books(
  state = initialState,
  { type, payload }: { type: string; payload: any }
): BooksState {
  switch (type) {
    case SET_BOOKS:
      return { ...state, books: payload };

    default:
      return state;
  }
}
