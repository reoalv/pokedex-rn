import {createReducer} from '@reduxjs/toolkit';
import { setPokemonAllTypes, setPokemonList } from './action';
import { baseReducerType } from './types';

const initialState: baseReducerType = {
  dataPokemon: [],
  pokemonTypeList: [],
};
const pokemonReducers = createReducer(initialState, builder => {
  builder.addCase(setPokemonList, (state, {payload}) => {
    return {...state, dataPokemon: [...payload]};
  });
  builder.addCase(setPokemonAllTypes, (state, {payload}) => {
    return {...state, pokemonTypeList: [...payload]};
  });
});

export default pokemonReducers;