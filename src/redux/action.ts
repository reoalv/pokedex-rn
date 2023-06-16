import { createAction } from "@reduxjs/toolkit";
import { POKEMON_ALL_TYPES, POKEMON_LIST } from "./actionList";
import { baseReducerType, payloadPokemonList } from "./types";

export const getPokemonList = createAction<payloadPokemonList>(POKEMON_LIST.GET);
export const setPokemonList = createAction<baseReducerType['dataPokemon']>(
  POKEMON_LIST.SET,
);
export const loadPokemonList = createAction<boolean>(POKEMON_LIST.IS_LOAD);

export const getPokemonAllTypes = createAction(POKEMON_ALL_TYPES.GET);
export const setPokemonAllTypes = createAction<baseReducerType['pokemonTypeList']>(
    POKEMON_ALL_TYPES.SET,
);
