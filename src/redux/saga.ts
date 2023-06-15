import { put, select, takeLatest} from 'redux-saga/effects';
import { getPokemonAllTypes, getPokemonList, setPokemonAllTypes } from './action';
import { findPokemonTypes, getPokemonTypes } from './utils';
import { baseReducerType, responGetTypesPokemon } from './types';

export function* fetchPokemonList() {
  try {
    const pokemonReducer: baseReducerType = yield select((state) => state?.pokemonReducers);
    const searchPokemonTypes = findPokemonTypes(pokemonReducer?.pokemonTypeList, 'vileplume')
    console.log('searchPokemonTypes', searchPokemonTypes)

  } catch (responseFailed) {
    //handle error
  }
}

export function* fetchAllPokemonTypes() {
    try {
      const data: Array<responGetTypesPokemon> = yield getPokemonTypes();
      const pokemonDataList: baseReducerType['pokemonTypeList'] = data?.map(value => {
          return {
              pokemon: value?.data?.pokemon,
              name: value?.data?.name,
          }
      })
      yield put(setPokemonAllTypes(pokemonDataList));
    } catch (responseFailed) {
      //handle error
    }
  }

export default function* pokemonSaga() {
  yield takeLatest(getPokemonList, fetchPokemonList)
  yield takeLatest(getPokemonAllTypes, fetchAllPokemonTypes)
}