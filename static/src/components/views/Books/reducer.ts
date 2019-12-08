import produce from 'immer';
import { AnyAction } from 'redux';

import { BookProps } from './Book';
import { SET_BOOKS } from './types';

export const initialState: BookProps[] = [];

export default function books(
  state = initialState,
  action: AnyAction
): BookProps[] {
  switch (action.type) {
    case SET_BOOKS:
      return produce(initialState, draftState => action.payload);

    default:
      return state;
  }
}
