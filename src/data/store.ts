import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
});
