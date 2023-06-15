import { createAction } from "@reduxjs/toolkit";
import { POKEMON_ALL_TYPES, POKEMON_LIST } from "./actionList";
import { baseReducerType } from "./types";

export const getPokemonList = createAction(POKEMON_LIST.GET);
export const setPokemonList = createAction<baseReducerType['dataPokemon']>(
  POKEMON_LIST.SET,
);

export const getPokemonAllTypes = createAction(POKEMON_ALL_TYPES.GET);
export const setPokemonAllTypes = createAction<baseReducerType['pokemonTypeList']>(
    POKEMON_ALL_TYPES.SET,
);
