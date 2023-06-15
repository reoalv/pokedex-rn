import { Method } from "axios";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

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
    url: string,
    img: string;
  }

export type baseReducerType = {
  dataPokemon: Array<dataPokemonType>
  pokemonTypeList: Array<pokemonDataListType>
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