import { Text, FlatList, Image, SafeAreaView, StatusBar, ActivityIndicator, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RootState, dataPokemonType } from '../../redux/types'
import { styles } from './MainPage.styles'
import Header from '../../component/Header/Header'
import Card from '../../component/Card/Card'
import { generateColor } from '../../redux/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonAllTypes, getPokemonList } from '../../redux/action'
import { moderateScale } from 'react-native-size-matters'

const MainPage = () => {
    const dispatch = useDispatch();
    const pokemonReducer = useSelector((state: RootState) => state.pokemonReducers);
    const pokemonTypeList = pokemonReducer?.pokemonTypeList
    const dataPokemon = pokemonReducer?.dataPokemon?.data
    const [currOffset, setCurrOffset] = useState(0)
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [extraData, setExtraData] = useState({
        onEndReachedCalledDuringMomentum: false,
        onEndReach: false,
      });

    const requestListPokemon = useCallback(() => {
        dispatch(getPokemonList({offset: currOffset}))
      }, [dispatch, currOffset])
    

    useEffect(() => {
        if (pokemonTypeList.length <= 0) {
        dispatch(getPokemonAllTypes())
        }   
    }, [dispatch, pokemonTypeList])

    useEffect(() => {
        if (pokemonTypeList.length > 0 && currOffset === 0) {
        requestListPokemon();
        }
    }, [pokemonTypeList, currOffset, requestListPokemon])

    useEffect(() => {
        if (extraData.onEndReach && extraData.onEndReachedCalledDuringMomentum) {
        requestListPokemon();
          }
    }, [extraData, requestListPokemon])

    useEffect(() => {
      if (dataPokemon.length > 0) {
        setIsFirstLoading(false)
      }
    }, [dataPokemon])

    const onMomentumScrollBegin = (event: any) => {
        if (event.nativeEvent.contentOffset.y > 0) {
          setExtraData(rest => ({
            ...rest,
            onEndReachedCalledDuringMomentum: true,
          }));
        }
      };
    
    const onMomentumScrollEnd = () => {
      setExtraData({
        onEndReach: false,
        onEndReachedCalledDuringMomentum: false,
      });
    };

    const _renderItem = (item: dataPokemonType) => {
        return (
            <Card cardColor={item?.color}>
                <Image
                  style={styles.img}
                  resizeMode='contain'
                  source={{
                    uri: item?.imgUri,
                  }}
                />
                <Text style={styles.textName}>{item?.name}</Text>
            </Card>
        )
    }
    
    

  return (
    <SafeAreaView style={styles.mainContainer}>
        <Header title={"Pokedex"}/>
        <StatusBar backgroundColor={'#892121'} />
        {isFirstLoading ? (
        <ActivityIndicator color={'#ffffff'} size={'large'}/>
        ) : (
            <FlatList
            style={styles.flatlistContainer}
            contentContainerStyle={{paddingBottom: moderateScale(24)}}
            columnWrapperStyle={styles.columnFlatlist}
            alwaysBounceVertical={false}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={2}
            data={dataPokemon}
            renderItem={({item}) => _renderItem(item)}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onEndReached={() => {
                if (!pokemonReducer.loadPokemonList) {
                    setExtraData(rest => ({
                        ...rest,
                        onEndReach: !extraData.onEndReach,
                      }));
                    setCurrOffset(page => page + 20);
                 }
              }}
              ListFooterComponent={
                <View style={styles.footer}>
                  {pokemonReducer.loadPokemonList && (
                    <ActivityIndicator
                      size="small"
                      color={'#ffffff'}
                    />
                  )}
                </View>
              }
            />
        )
        }   
    </SafeAreaView>
  )
}

export default MainPage