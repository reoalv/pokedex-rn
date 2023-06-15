import {combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import pokemonReducers from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import { fork } from 'redux-saga/effects';
import pokemonSaga from './saga';

const combineReducer = combineReducers({pokemonReducers});
const saga = function* () {
    yield fork(pokemonSaga);
  }

const sagaMidware = createSagaMiddleware();

export const store = configureStore({
  reducer: combineReducer,
  middleware: [sagaMidware],
});

sagaMidware.run(saga);