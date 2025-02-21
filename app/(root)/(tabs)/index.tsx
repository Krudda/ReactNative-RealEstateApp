import {Image, Text, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/lib/global-provider';
import icons from '@/constants/icons';
import Search from '@/components/Search';

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
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
              <Text className="font-xl font-rubik-bold text-black-300">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className='text-base font-rubik-bold text-primary-300'>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
