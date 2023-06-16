import { Method } from "axios";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

export type NameValueMap = {
  name?: string;
  value?: string | number | boolean;
};

export type requestType = {
    path: string;
    method: Method;
    headers?: object;
    query?: object;
    data?: object;
    timeout?: number;
    responseType?: string;
  };

export type dataPokemonType = {
    name: string,
    type: string,
    color: string,
    imgUri: string;
  }

export type dataListPokemonType = {
  data: Array<dataPokemonType>
  offset: number
}

export type baseReducerType = {
  dataPokemon: dataListPokemonType
  pokemonTypeList: Array<pokemonDataListType>
  loadPokemonList: boolean
}

export type responGetPokemonData = {
  pokemon: dataPokemonType
}

export type pokemonDataListType = {
  pokemon: Array<responGetPokemonData>
  name: string
}

export type responGetTypesPokemon = {
  status: number,
  data: pokemonDataListType
}

export interface payloadPokemonList {
  offset: number;
}

export type pokemonDataType = {
  name: string,
  url: string,
}

export type dataPokemonListType = {
  count: number,
  results: Array<pokemonDataType>
}

export type resPokemonList = {
  status: number,
  data: dataPokemonListType,
}