import produce from 'immer';
import { Props } from './Book';
import { BooksActions, SET_BOOKS } from './types';

export const initialState: Props[] = [];

export default function books(
  state = initialState,
  action: BooksActions
): Props[] {
  switch (action.type) {
    case SET_BOOKS:
      return produce(initialState, draftState => action.payload);

    default:
      return state;
  }
}
