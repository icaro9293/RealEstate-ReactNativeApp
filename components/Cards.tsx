import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
    onPress?: () => void;
    item: Models.Document;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-cold items-start w-60 h-80 relative'>
            <Image source={{ uri: item.image }} className='size-full rounded-2xl'></Image>
            <Image source={images.cardGradient} className='size-full absolute rounded-2xl'></Image>
            <View className='flex flex-row absolute top-5 right-5 bg-white/90 rounded-full px-3 py-1 items-center justify-center gap-1'>
                <Image source={icons.star} className='size-3.5'></Image>
                <Text className='text-xs font-rubik-bold'>{item.rating}</Text>
            </View>

            <View className='flex flex-col absolute bottom-5 items-start left-5 right-5'>
                <Text className='text-lg font-rubik-extrabold text-white bg-black-200/70 rounded-full p-1' numberOfLines={1}>{item.name}</Text>
                <Text className='p-1 text-base text-white font-rubik'>{item.address}</Text>
                <View className='flex flex-row  items-center justify-between w-full'>
                    <Text className='text-lg font-rubik-bold text-white'>R$ {item.price}</Text>
                    <Image source={icons.heart} className='size-5'></Image>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Card = ({ item, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 py-4 px-3 rounded-lg bg-white shadow-lg shadow-black/70 relative'>
            <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg/90 p-1 rounded-full z-50 bg-white/90'>
                <Image source={icons.star} className='size-2.5'></Image>
                <Text className='text-xs font-rubik-bold ml-0.5'>{item.rating}</Text>
            </View>

            <Image source={{ uri: item.image }} className='w-full h-40 rounded-lg'></Image>

            <View className='flex flex-col mt-2'>
                <Text className='text-base text-black-300 font-rubik-bold' numberOfLines={1}>{item.name}</Text>
                <Text className='text-xs font-rubik text-black-200'>{item.address}</Text>
                <View className='flex flex-row  items-center justify-between mt-2'>
                    <Text className='text-base font-rubik-bold text-primary-300'>R$ {item.price}</Text>
                    <Image source={icons.heart} className='w-5 h-5 mr-2' tintColor='#191D31'></Image>
                </View>
            </View>
        </TouchableOpacity>
    )
}

