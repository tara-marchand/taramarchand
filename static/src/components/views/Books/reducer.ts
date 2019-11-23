export interface Book {
  authors: string;
  id?: number;
  title: string;
}

interface State {
  books: Book[];
}

const initialState: State = {
  books: []
};

export default function books(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    // case typeName:
    //   return { ...state, ...payload }

    default:
      return state;
  }
}
