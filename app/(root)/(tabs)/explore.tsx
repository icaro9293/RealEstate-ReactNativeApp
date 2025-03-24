import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperies } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
    const params = useLocalSearchParams<{ query?: string; filter?: string; }>()

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getProperies,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20
        },
        skip: true
    })

    const handleCardPress = (id: string) => {
        return router.push(`/properties/${id}`)
    }

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 20
        })
    }, [params.filter, params.query])

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)}></Card>}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size='large' className="text-primary-300 mt-5"></ActivityIndicator>
                    ) : <NoResults></NoResults>
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-5"></Image>
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Encontre Seu Lar Ideal</Text>
                            <Image source={icons.bell} className="w-6 h-6"></Image>
                        </View>
                        <Search></Search>

                        <View className="mt-5">
                            <Filters></Filters>
                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                                Encontrado {properties?.length} Propriedades
                            </Text>
                        </View>
                    </View>
                }
            >
            </FlatList>

        </SafeAreaView>
    );
}
