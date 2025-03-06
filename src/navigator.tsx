import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import PersonScreen from "./screens/PersonScreen";

import SCREEN_NAMES from "./constants/screenNames";
export type RootStackParamList = {
  [SCREEN_NAMES.WELCOME]: undefined;
  [SCREEN_NAMES.LOGIN]: undefined;
  [SCREEN_NAMES.SIGNUP]: undefined;
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.MOVIE]: { id: number };
  [SCREEN_NAMES.PERSON]: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.WELCOME}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAMES.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
        <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREEN_NAMES.MOVIE} component={MovieScreen} />
        <Stack.Screen name={SCREEN_NAMES.PERSON} component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
