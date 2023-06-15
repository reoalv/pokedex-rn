import { Text, FlatList, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { RootState, dataPokemonType } from '../../redux/types'
import { styles } from './MainPage.styles'
import Header from '../../component/Header/Header'
import Card from '../../component/Card/Card'
import { generateColor } from '../../redux/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonAllTypes, getPokemonList } from '../../redux/action'

const MainPage = () => {
    const dispatch = useDispatch();
    const pokemonReducer = useSelector((state: RootState) => state.pokemonReducers);
    const pokemonTypeList = pokemonReducer?.pokemonTypeList
    console.log('pokemonReducer', pokemonReducer)
    const dataProduct: Array<dataPokemonType> = [
        {
            name: "zubat",
            url: "https://pokeapi.co/api/v2/pokemon/41/",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
        },
        {
            name: "golbat",
            url: "https://pokeapi.co/api/v2/pokemon/42/",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
        },
    ]

    const _renderItem = (item: dataPokemonType) => {
        return (
            <Card cardColor={generateColor()}>
                <Image
                  style={styles.img}
                  resizeMode='contain'
                  source={{
                    uri: item?.img,
                  }}
                />
                <Text>{item?.name}</Text>
            </Card>
        )
    }

    useEffect(() => {
        if (pokemonTypeList.length <= 0) {
        dispatch(getPokemonAllTypes())
        }   
    }, [dispatch, pokemonTypeList])

    useEffect(() => {
        if (pokemonTypeList.length > 0) {
         dispatch(getPokemonList())
        }
    }, [dispatch, pokemonTypeList])
    

  return (
    <SafeAreaView style={styles.mainContainer}>
        <Header title={"Pokemon"}/>
        <StatusBar backgroundColor={'#892121'} />
        <FlatList
        style={styles.flatlistContainer}
        columnWrapperStyle={styles.columnFlatlist}
        alwaysBounceVertical={false}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns={2}
        data={dataProduct}
        renderItem={({item}) => _renderItem(item)}
      />
    </SafeAreaView>
  )
}

export default MainPage