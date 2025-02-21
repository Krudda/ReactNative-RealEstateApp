import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemProps {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ title, icon, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert('Success', 'Successfully logged out!');
      await refetch();
    } else {
      Alert.alert('Error', 'Error logged out!');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={{ uri: user?.avatar }} className="size-44 rounded-full" />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="font-rubik-bold text-2xl mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col justify-between relative mt-8">
          <SettingsItem title="My bookings" icon={icons.calendar} />
          <SettingsItem title="Payments" icon={icons.wallet} />
        </View>

        <View className="flex flex-col justify-between relative mt-3 pt-3 border-t border-primary-200">
          {settings.slice(2).map((item, i) => (
            <SettingsItem key={i} {...item} />
          ))}
        </View>

        <View className="flex flex-col justify-between relative mt-3 pt-3 border-t border-primary-200">
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
