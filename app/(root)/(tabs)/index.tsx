import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/lib/global-provider';
import icons from '@/constants/icons';
import Search from '@/components/Search';
import { FeaturedCard, Card } from '@/components/Cards';
import Filters from '@/components/Filters';

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-fit">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => (<Card />)}
        keyExtractor={item => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-28"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
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
                  <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">View All</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  horizontal
                  data={[1, 2, 3]}
                  keyExtractor={(item) => item.toString()}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                  renderItem={(item) => (
                    <FeaturedCard />
                  )}
                  />
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text className="font-xl font-rubik-bold text-black-300">Recommended</Text>
                <TouchableOpacity>
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
