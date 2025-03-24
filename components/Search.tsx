import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useDebouncedCallback } from 'use-debounce'
import icons from '@/constants/icons'

const Search = () => {
    const path = usePathname()
    const params = useLocalSearchParams<{ query?: string }>()
    const [search, setSearch] = useState(params.query)

    const debounceSearch = useDebouncedCallback((text: string) => {
        return router.setParams({ query: text }), 500
    })

    const handleSearch = (text: string) => {
        setSearch(text)
        debounceSearch(text)
    }

    return (
        <View className='flex flex-row items-center justify-between px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'>
            <View className='flex-1 flex flex-row items-center justify-start z-50'>
                <Image source={icons.search} className='size-5'></Image>
                <TextInput value={search} onChangeText={handleSearch} placeholder='Pesquisar' className='text-sm font-rubik py-2'></TextInput>
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className='size-5'></Image>
            </TouchableOpacity>
        </View>
    )
}

export default Search