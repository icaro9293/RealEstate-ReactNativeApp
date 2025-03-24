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

export default function Index() {
  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string; filter?: string; }>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties,
  })

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperies,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
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
      limit: 6
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
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full"></Image>
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-black-100 font-rubik text-xs">Bom dia</Text>
                  <Text className="font-rubik-medium text-base">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6"></Image>
            </View>
            <Search></Search>
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold">Principais</Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-primary-300">Ver Todos</Text>
                </TouchableOpacity>
              </View>

              {
                latestPropertiesLoading ?
                  <ActivityIndicator size="large" className="text-primary-300"></ActivityIndicator> :
                  !latestProperties || latestProperties.length === 0 ? <NoResults></NoResults> : (

                    <FlatList
                      data={latestProperties}
                      renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}></FeaturedCard>}
                      keyExtractor={(item) => item.$id} //cada um é um número unico.
                      contentContainerClassName="flex gap-5 mt-5"
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      bounces={false}
                    >

                    </FlatList>)
              }
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold">Recomendações</Text>
              <TouchableOpacity>
                <Text className="font-rubik-bold text-primary-300">Ver Todos</Text>
              </TouchableOpacity>
            </View>

            <Filters></Filters>

          </View>
        }
      >
      </FlatList>

    </SafeAreaView>
  );
}
