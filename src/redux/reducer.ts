import {createReducer} from '@reduxjs/toolkit';
import { loadPokemonList, setPokemonAllTypes, setPokemonList } from './action';
import { baseReducerType } from './types';

const initialState: baseReducerType = {
  dataPokemon: {
    data: [],
    offset: 0,
  },
  pokemonTypeList: [],
  loadPokemonList: false,
};
const pokemonReducers = createReducer(initialState, builder => {
  builder.addCase(setPokemonList, (state, {payload}) => {
    return {
        ...state, 
        dataPokemon: {
            data: payload.offset === 0
            ? [...payload.data]
            : [...state.dataPokemon.data, ...payload.data],
            offset: payload.offset,
        }
    };
  });
  builder.addCase(setPokemonAllTypes, (state, {payload}) => {
    return {...state, pokemonTypeList: [...payload]};
  });
  builder.addCase(loadPokemonList, (state, {payload}) => {
    return {...state, loadPokemonList: payload};
  });
});

export default pokemonReducers;