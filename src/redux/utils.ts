import axios, {AxiosRequestConfig, Method, ResponseType} from 'axios';
import {NameValueMap, baseReducerType, pokemonDataListType, requestType} from './types';

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const checkStatus = (statusCode: number) => {
  return statusCode === 200;
};

export const createRequest = (apiConfig: requestType) => {
  const {
    path,
    method,
    headers,
    query = {},
    data = {},
    timeout = 0,
    responseType = 'json',
  } = apiConfig;
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method.toLowerCase() as Method,
    params: query,
    ...(method === 'GET' ? {} : {data}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout,
    responseType: responseType as ResponseType,
  };
  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response: any) => {
        return resolve(response);
      })
      .catch((error: any) => {
        return reject({error});
      });
  });
};

export const getQueryParam = (data: NameValueMap[]) => {
    let tempQueryParamString = '';
    for (const item of data) {
      tempQueryParamString += tempQueryParamString === '' ? '?' : '&';
      tempQueryParamString += item.name + '=' + item.value;
    }
    return tempQueryParamString;
  };

export const findPokemonTypes = (pokemonDataList: baseReducerType['pokemonTypeList'], pokemonName: string) => {
    const searchType =  pokemonDataList?.filter(value => {
        return value?.pokemon?.find(val => val?.pokemon?.name === pokemonName)
    })
    return searchType[0]?.name
}

export const getPokemonTypes = () => {
    const arrayRequest: Array<object> = []
    for (var i = 1; i <= 18; i++) {
        arrayRequest.push(axios.get(`${BASE_URL}/type/${i}`));
     }

    return new Promise((resolve, reject) => {  
        axios.all(arrayRequest)
        .then(axios.spread((...data) => {
            return resolve(data)
        })).catch((error: any) => {
            return reject({error});
        });
    
    })
}

export const getPokemonID = (str: string) => {
    const found = str.match(/\d+/g);
    return found ? found[1] : ''; 
}

export const getColorOnTypes = (types: string) => {
    switch (types) {
        case 'normal':
            return '#fece7a'
        case 'poison':
            return '#4297a0'
        case 'fire':
            return '#f36e31'
        case 'flying':
            return '#97ffff'
        case 'water':
            return '#0098db'
        case 'bug':
            return '#c6c4e1'
        case 'electric':
            return '#6c78d7'
        case 'ground':
            return '#a58360'
        case 'fairy':
            return '#f0595b'
        case 'fighting':
            return '#b43838'
        case 'psychic':
            return '#fab617'
        default:
            return '#e49987';
    }
}