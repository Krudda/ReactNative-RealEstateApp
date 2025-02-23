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

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{
    query?: string;
    filter?: string;
  }>();

  const { data: featuredProperties, loading: featuredPropertiesLoading } = useAppwrite({
    fn: getCurrentProperties,
  });
  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 6,
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
      limit: 6,
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
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Hello</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <View className="my-5">
              <Search />
              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="font-xl font-rubik-bold text-black-300">Featured</Text>
                  <TouchableOpacity onPress={() => router.push('/explore')}>
                    <Text className="text-base font-rubik-bold text-primary-300">View All</Text>
                  </TouchableOpacity>
                </View>

                {featuredPropertiesLoading ? (
                  <ActivityIndicator size="large" className="text-primary-300" />
                ) : !featuredProperties || featuredProperties.length === 0 ? (
                  <NoResults />
                ) : (
                  <FlatList
                    horizontal
                    data={featuredProperties}
                    keyExtractor={(item) => item.$id.toString()}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                    renderItem={({ item }) => (
                      <FeaturedCard item={item} onPress={() => handleCardSelect(item.$id)} />
                    )}
                  />
                )}
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text className="font-xl font-rubik-bold text-black-300">Recommended</Text>
                <TouchableOpacity onPress={() => router.push('/explore')}>
                  <Text className="text-base font-rubik-bold text-primary-300">View All</Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
