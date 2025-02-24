import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Импортируем thunk
import rootReducer from './reducers'; // Правильный путь к reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;