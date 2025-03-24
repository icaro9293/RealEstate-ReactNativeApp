import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext()

    if (!loading && isLoggedIn) {
        return <Redirect href="/"></Redirect>
    }

    const handleLogin = async () => {
        const response = await login()

        if (response) {
            refetch()
            console.log('login sucesso!')
        } else {
            Alert.alert('erro', 'falha ao fazer login.')
        }
    }

    return (
        <SafeAreaView className='bg-white-400 h-full'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain'></Image>

                <View className='px-10 py-2'>
                    <Text className='text-center text-base font-rubik text-black-500'>BEM VINDO AO REALESTATE APP</Text>
                    <Text className='text-center font-rubik-extrabold text-3xl'>Vamos Encontrar {'\n'}
                        <Text className='text-primary-300'>Sua Casa Ideal</Text>
                    </Text>
                    <Text className='text-center font-rubik mt-10 text-lg'>Login Com Sua Conta Google</Text>
                    <TouchableOpacity onPress={handleLogin} className='bg-white w-full rounded-full py-4 mt-5 shadow-zinc-300 shadow-md'>
                        <View className='flex flex-row items-center justify-center gap-2'>
                            <Image source={icons.google} className='w-5 h-5' resizeMode='contain'></Image>
                            <Text className=''>Continuar com Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn