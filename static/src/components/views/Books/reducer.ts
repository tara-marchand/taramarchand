import { SET_BOOKS } from './types';
import { BookProps } from './Book';

const initialState: BookProps[] = [];

export default function books(
  state = initialState,
  { type, payload }: { type: string; payload: any }
): BookProps[] {
  switch (type) {
    case SET_BOOKS:
      return payload;

    default:
      return state;
  }
}
