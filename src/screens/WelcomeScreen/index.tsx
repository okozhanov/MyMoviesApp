import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Button from "../../components/Button";
import ThemedView from "../../components/ThemedView";
import Typography from "../../components/Typograhy";
import useThemeColor from "../../hooks/useThemeColor";
import SCREEN_NAMES from "../../constants/screenNames";
import Icon from "../../components/Icon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import Loader from "../../components/Loader";

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.WELCOME
>;

const WelcomeScreen = ({ navigation }: Props) => {
  const mainColor = useThemeColor("main");

  const [isFetchedLogin, setIsFetchedLogin] = useState(false);

  const getIsLogined = async () => {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.isLogined);

    if (result === "true") {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREEN_NAMES.HOME }],
      });
    } else {
      setIsFetchedLogin(true);
    }
  };

  useEffect(() => {
    getIsLogined();
  }, []);

  const onNavigateLogin = () => {
    navigation.navigate(SCREEN_NAMES.LOGIN);
  };

  const onNavigateSignup = () => {
    navigation.navigate(SCREEN_NAMES.SIGNUP);
  };

  return isFetchedLogin ? (
    <ThemedView style={styles.container}>
      <Icon name="logo" size={150} />

      <Typography.Header1
        color={mainColor}
        marginTop={30}
        alignHorizontal="center"
      >
        Welcome to My Movies!
      </Typography.Header1>

      <Button title="Login" onPress={onNavigateLogin} marginTop={30} />

      <Typography.Caption1 color={mainColor} marginTop={15}>
        don't have an account?
      </Typography.Caption1>

      <Button
        title="Sing up"
        type="transparent"
        onPress={onNavigateSignup}
        marginTop={15}
      />
    </ThemedView>
  ) : (
    <Loader />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default WelcomeScreen;
