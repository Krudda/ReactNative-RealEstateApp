import React from 'react';
import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

const TabIcon = ({ title, icon, focused }: { title: string; icon: any; focused: boolean }) => (
  <View className="flex flex-1 flex-col mt-3 items-center">
    <Image
      source={icon}
      tintColor={focused ? '#0061FF' : '#666876'}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200'}
      text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={'Home'} icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={'Explore'} icon={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={'Profile'} icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
