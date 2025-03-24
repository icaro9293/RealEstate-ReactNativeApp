import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle: any;
    showArrow: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='size-6'></Image>
                <Text className={`text-lg font-rubik-medium ${textStyle}`}>{title}</Text>
            </View>

            {showArrow && <Image source={icons.rightArrow} className='size-5'></Image>}

        </TouchableOpacity>
    )
}

const Profile = () => {
    const { user, refetch } = useGlobalContext()

    const handleLogout = async () => {
        const result = await logout()

        if (result) {
            Alert.alert('Sucesso', 'sua sessão foi encerrada com sucesso.')
            refetch()
        } else {
            Alert.alert('Erro', 'ocorreu um erro ao tentar finalizar sua sessão.')
        }
    }

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>Profile</Text>
                    <Image source={icons.bell} className='size-5'></Image>
                </View>

                <View className='flex flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image source={{ uri: user?.avatar }} className='size-44 relative rounded-full'></Image>
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image source={icons.edit} className='size-9'></Image>
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
                    </View>
                </View>

                <View className='flex flex-col mt-10'>
                    <SettingsItem icon={icons.calendar} title="Meus Agendamentos"></SettingsItem>
                    <SettingsItem icon={icons.wallet} title="Pagamentos"></SettingsItem>
                </View>
                {/* forma mais rapida de percorrer os itens */}
                <View>
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} title={item.title} icon={item.icon}></SettingsItem>
                    ))}
                </View>

                <View className='flex flex-col mt-5 pt-8 border-t border-primary-200'>
                    <SettingsItem icon={icons.logout} title='Logout' showArrow={false} textStyle='text-danger' onPress={handleLogout}></SettingsItem>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Profile