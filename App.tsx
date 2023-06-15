import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import MainPage from './src/screen/MainPage/MainPage';

export default function App() {
  return (
    <Provider store={store}>
        <MainPage />
    </Provider>
  );
}