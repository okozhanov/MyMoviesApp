import React, { forwardRef, LegacyRef, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import useThemeColor from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/colors";
import Icon from "../Icon";
import { isFunction } from "lodash";
import Typography from "../Typograhy";

type Props = {
  onClear?: () => void;
  containerStyle?: ViewStyle;
  isError?: boolean;
  setIsError?: AnyFunction;
  errorText?: string;
} & TextInputProps;

const Input = forwardRef((props: Props, ref: LegacyRef<TextInput>) => {
  const {
    style = {},
    containerStyle = {},
    onClear,
    isError,
    setIsError,
    errorText,
    onChangeText,
    ...restProps
  } = props;

  const placeholderColor = useThemeColor("placeholder");
  const textColor = useThemeColor("text");
  const errorColor = useThemeColor("error");

  const errorStyle = isError ? { borderColor: errorColor } : {};

  const _onChangeText = useCallback(
    (text: string) => {
      onChangeText && onChangeText(text);

      isError && setIsError && setIsError(false);
    },
    [isError]
  );

  const _onClear = () => {
    if (isFunction(onClear)) {
      onClear();
    } else {
      _onChangeText("");
    }
  };

  const RenderError = useCallback(() => {
    if (!isError || !errorText) {
      return null;
    }

    return (
      <Typography.Caption1 style={styles.errorText} color={errorColor}>
        {errorText}
      </Typography.Caption1>
    );
  }, [isError]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={placeholderColor}
        maxLength={50}
        style={[styles.input, { color: textColor }, errorStyle, style]}
        onChangeText={_onChangeText}
        ref={ref}
        autoCorrect={false}
        spellCheck={false}
        {...restProps}
      />

      {restProps?.value && (
        <TouchableOpacity
          style={styles.clearButton}
          activeOpacity={0.6}
          onPress={_onClear}
        >
          <Icon name="close" />
        </TouchableOpacity>
      )}

      <RenderError />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    justifyContent: "center",
  },

  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    padding: 10,
  },

  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  errorText: {
    position: "absolute",
    bottom: -20,
    left: 10,
  },
});

export default Input;
