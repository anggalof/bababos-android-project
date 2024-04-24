import React, { useState, useEffect } from 'react';
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableScreens} from 'react-native-screens';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import Checkout from '../screens/Checkout';
import ThankYouScreen from '../screens/ThankYouScreen';
enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<string>('');

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const checkLoginStatus = async () => {
    const login = await AsyncStorage.getItem('isLoggedIn');
    if (login) {
      setIsLoggedIn(login);
    }
  };

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    switch (route.name) {
      case "Home":
        iconName = focused ? "home" : "home-outline";
        break;
      case "Cart":
        iconName = focused ? "cart" : "cart-outline";
        break;
      case "Profile":
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon
        name={iconName}
        type={IconType.Ionicons}
        size={size}
        color={color}
      />
    );
  };

  const HomeDefault = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: "#22A9E2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
          },
        })}
      >
        <Tab.Screen name="Home's" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeDefault} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: true }} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        <Stack.Screen
          name="Detail"
          options={() => ({
            headerTitle: 'Product Detail',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#ffffff',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#333333',
            headerShadowVisible: false,
            headerShown: true,
            tabBarVisible: true,
          })}
        >
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
