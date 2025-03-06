import React, { LegacyRef, useCallback, useRef, useState } from "react";
import ThemedView from "../../components/ThemedView";
import Header from "../../components/Header";
import Input from "../../components/Input";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/Button";
import SCREEN_NAMES from "../../constants/screenNames";
import { RootStackParamList } from "../../navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Typography from "../../components/Typograhy";
import useThemeColor from "../../hooks/useThemeColor";
import STRINGS from "../../constants/strings";
import REGEX from "../../constants/regex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constants/storageKeys";

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.LOGIN
>;

const LoginScreen = (props: Props) => {
  const { navigation } = props;

  // strings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const errorColor = useThemeColor("error");

  // on press handle

  const setIsLogined = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.isLogined, "true");
    } catch (e) {
      console.log("setIsLogined login error", e);
    }
  };

  const validateOnPress = useCallback((_email: string, _password: string) => {
    const isEmailValid = REGEX.emailRegex.test(_email);
    const isPasswordValid = REGEX.passwordRegex.test(_password);

    if (!isEmailValid || !isPasswordValid) {
      setEmailError(!isEmailValid);
      setPasswordError(!isPasswordValid);

      return;
    }

    setIsLogined();

    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.HOME }],
    });
  }, []);

  // errors handle

  const isDisabled = emailError || passwordError || loginError;

  const onResetEmailError = useCallback(() => {
    setEmailError(false);

    if (loginError) {
      setLoginError(false);
    }
  }, [loginError]);

  const onResetPasswordError = useCallback(() => {
    setPasswordError(false);

    if (loginError) {
      setLoginError(false);
    }
  }, [loginError]);

  // focus handle

  const passwordRef = useRef() as React.RefObject<TextInput>;

  const focusPassword = () => {
    passwordRef?.current && passwordRef.current?.focus();
  };

  return (
    <ThemedView isWrapper>
      <Header title="Enter to your account" />

      <KeyboardAvoidingView
        style={styles.inputsContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <Input
            value={email}
            containerStyle={styles.input}
            onChangeText={setEmail}
            returnKeyType="next"
            isError={emailError}
            setIsError={onResetEmailError}
            placeholder={STRINGS.placeholders.email}
            errorText={STRINGS.errors.email}
            keyboardType="email-address"
            onSubmitEditing={focusPassword}
            submitBehavior={"submit"}
          />

          <Input
            value={password}
            containerStyle={styles.input}
            onChangeText={setPassword}
            returnKeyType="done"
            isError={passwordError}
            setIsError={onResetPasswordError}
            placeholder={STRINGS.placeholders.password}
            errorText={STRINGS.errors.password}
            ref={passwordRef}
            onSubmitEditing={() => validateOnPress(email, password)}
          />
        </View>

        <View>
          {loginError && (
            <Typography.Caption1 alignHorizontal="center" color={errorColor}>
              {STRINGS.errors.login}
            </Typography.Caption1>
          )}

          <Button
            disabled={isDisabled}
            title="Login"
            onPress={() => validateOnPress(email, password)}
            marginBottom={20}
            marginTop={10}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },

  inputsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default LoginScreen;
