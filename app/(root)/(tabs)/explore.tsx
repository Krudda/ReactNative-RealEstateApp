import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/lib/global-provider';
import icons from '@/constants/icons';
import Search from '@/components/Search';
import { FeaturedCard, Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import { useAppwrite } from '@/lib/useAppwrite';
import { getCurrentProperties, getProperties } from '@/lib/appwrite';
import NoResults from '@/components/NoResults';

export default function Explore() {
  const params = useLocalSearchParams<{
    query?: string;
    filter?: string;
  }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardSelect = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-fit">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardSelect(item.$id)} />}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerClassName="pb-28"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                className="bg-primary-200 rounded-full flex justify-center items-center size-11"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-6" />
              </TouchableOpacity>
              <Text className="text-base font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-6" />
            </View>
            <View className="my-2">
              <Search />
              <View className="mt-5">
                <Filters />
                <Text className="text-black-300 text-xl font-rubik-bold mt-5">
                  Found {properties?.length} Properties
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
