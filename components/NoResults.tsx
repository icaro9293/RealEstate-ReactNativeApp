import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
    return (
        <View className='flex items-center my-5'>
            <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain'></Image>
            <Text className='text-2xl font-rubik-bold text-black-300 mt-5'>Não Encontrado.</Text>
            <Text className='text-base text-black-100 mt-2'>Não encontramos resultados para esta pesquisa.</Text>
        </View>
    )
}

export default NoResults