import produce from 'immer';
import { AnyAction } from 'redux';
import { BookProps } from './Book';
import { SetBooksActionType, SET_BOOKS } from './types';

export function setBooksAction(newBooks: BookProps[]): SetBooksActionType {
  return {
    type: SET_BOOKS,
    payload: newBooks,
  };
}

export const initialState: BookProps[] = [];

export default function books(
  state = initialState,
  action: AnyAction
): BookProps[] {
  switch (action.type) {
    case SET_BOOKS:
      return produce(initialState, (draftState) => action.payload);

    default:
      return state;
  }
}
