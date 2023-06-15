import axios, {AxiosRequestConfig, Method, ResponseType} from 'axios';
import {baseReducerType, pokemonDataListType, requestType} from './types';

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

export const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };