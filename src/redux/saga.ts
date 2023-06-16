import { call, put, select, takeLatest} from 'redux-saga/effects';
import { getPokemonAllTypes, getPokemonList, loadPokemonList, setPokemonAllTypes, setPokemonList } from './action';
import { BASE_URL, checkStatus, createRequest, findPokemonTypes, getColorOnTypes, getPokemonID, getPokemonTypes, getQueryParam } from './utils';
import { NameValueMap, baseReducerType, payloadPokemonList, requestType, resPokemonList, responGetTypesPokemon } from './types';

export function* fetchPokemonList({payload}: {payload: payloadPokemonList}) {
  try {
    yield put(loadPokemonList(payload.offset !== 0 ? true : false))
    const paramsData: NameValueMap[] = [
        {
            name: 'limit',
            value: 20,
        },
        {
            name: 'offset',
            value: payload.offset,
        },
      ];
    const objRequest: requestType = {
        path: `${BASE_URL}/pokemon` + getQueryParam(paramsData),
        method: 'GET',
      };
    const pokemonReducer: baseReducerType = yield select((state) => state?.pokemonReducers);
    const res: resPokemonList = yield call(createRequest, objRequest);
    if (checkStatus(res?.status)) {
        const pokemonDataMap = res?.data?.results.map(val => {
            const namePokemon = val?.name
            const pokemonType = findPokemonTypes(pokemonReducer?.pokemonTypeList, namePokemon)
            const pokemonId = getPokemonID(val?.url)

            return {
                name: namePokemon,
                type: pokemonType,
                color: getColorOnTypes(pokemonType),
                imgUri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
            }
        })
        if (pokemonDataMap.length > 0) {
            yield put(setPokemonList({
                data: pokemonDataMap,
                offset: payload?.offset
            }))
        }
    }

    yield put(loadPokemonList(false))
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