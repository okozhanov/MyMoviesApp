import React, { useCallback, useRef, useState } from "react";
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
  typeof SCREEN_NAMES.SIGNUP
>;

const SignupScreen = (props: Props) => {
  const { navigation } = props;

  // string
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // errors
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const errorColor = useThemeColor("error");

  // on press handle

  const setIsLogined = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.isLogined, "true");
    } catch (e) {
      console.log("setIsLogined signup error", e);
    }
  };

  const validateOnPress = useCallback(
    (
      _name: string,
      _email: string,
      _password: string,
      _passwordConfirm: string
    ) => {
      const isNameValid = _name?.length > 1;
      const isEmailValid = REGEX.emailRegex.test(_email);
      const isPasswordValid = REGEX.passwordRegex.test(_password);
      const isPasswordConfirmValid = _passwordConfirm === _password;

      if (
        !isEmailValid ||
        !isPasswordValid ||
        !isNameValid ||
        !isPasswordConfirmValid
      ) {
        setNameError(!isNameValid);
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);
        setPasswordConfirmError(!isPasswordConfirmValid);

        return;
      }

      setIsLogined();

      navigation.reset({
        index: 0,
        routes: [{ name: SCREEN_NAMES.HOME }],
      });
    },
    []
  );

  // errors handle

  const isDisabled = emailError || passwordError || signupError;

  const onResetNameError = useCallback(() => {
    setNameError(false);

    if (signupError) {
      setSignupError(false);
    }
  }, [signupError]);

  const onResetEmailError = useCallback(() => {
    setEmailError(false);

    if (signupError) {
      setSignupError(false);
    }
  }, [signupError]);

  const onResetPasswordError = useCallback(() => {
    setPasswordError(false);

    if (signupError) {
      setSignupError(false);
    }
  }, [signupError]);

  const onResetPasswordConfirmError = useCallback(() => {
    setPasswordConfirmError(false);

    if (signupError) {
      setSignupError(false);
    }
  }, [signupError]);

  // focus handle

  const emailRef = useRef() as React.RefObject<TextInput>;
  const passwordRef = useRef() as React.RefObject<TextInput>;
  const passwordConfirmRef = useRef() as React.RefObject<TextInput>;

  const focusEmail = () => {
    emailRef?.current && emailRef.current?.focus();
  };

  const focusPassword = () => {
    passwordRef?.current && passwordRef.current?.focus();
  };

  const focusPasswordConfirm = () => {
    passwordConfirmRef?.current && passwordConfirmRef.current?.focus();
  };

  return (
    <ThemedView isWrapper>
      <Header title="Create your account" />

      <KeyboardAvoidingView
        style={styles.inputsContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <Input
            value={name}
            containerStyle={styles.input}
            onChangeText={setName}
            returnKeyType="next"
            isError={nameError}
            setIsError={onResetNameError}
            errorText={STRINGS.errors.name}
            placeholder={STRINGS.placeholders.name}
            onSubmitEditing={focusEmail}
            submitBehavior={"submit"}
          />

          <Input
            ref={emailRef}
            value={email}
            containerStyle={styles.input}
            onChangeText={setEmail}
            returnKeyType="next"
            keyboardType="email-address"
            isError={emailError}
            setIsError={onResetEmailError}
            errorText={STRINGS.errors.email}
            placeholder={STRINGS.placeholders.email}
            onSubmitEditing={focusPassword}
            submitBehavior={"submit"}
          />

          <Input
            ref={passwordRef}
            value={password}
            containerStyle={styles.input}
            onChangeText={setPassword}
            returnKeyType="next"
            isError={passwordError}
            setIsError={onResetPasswordError}
            placeholder={STRINGS.placeholders.password}
            errorText={STRINGS.errors.password}
            onSubmitEditing={focusPasswordConfirm}
            submitBehavior={"submit"}
          />

          <Input
            ref={passwordConfirmRef}
            value={passwordConfirm}
            containerStyle={styles.input}
            onChangeText={setPasswordConfirm}
            returnKeyType="done"
            isError={passwordConfirmError}
            setIsError={onResetPasswordConfirmError}
            placeholder={STRINGS.placeholders.passwordConfirm}
            errorText={STRINGS.errors.passwordConfirm}
            onSubmitEditing={() =>
              validateOnPress(name, email, password, passwordConfirm)
            }
          />
        </View>

        <View>
          {signupError && (
            <Typography.Caption1 alignHorizontal="center" color={errorColor}>
              {STRINGS.errors.default}
            </Typography.Caption1>
          )}

          <Button
            disabled={isDisabled}
            title="Sign Up"
            onPress={() =>
              validateOnPress(name, email, password, passwordConfirm)
            }
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

export default SignupScreen;
