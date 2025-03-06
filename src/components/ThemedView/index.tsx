import React from "react";
import { View, ViewProps } from "react-native";
import useThemeColor from "../../hooks/useThemeColor";
import STYLES_CONSTANTS from "../../constants/styles";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  isWrapper?: boolean;
};

export type ThemedViewProps = ThemeProps & ViewProps;

const wrapperStyles = {
  flex: 1,
  paddingHorizontal: STYLES_CONSTANTS.HORIZONTAL_PADDING,
  paddingVertical: STYLES_CONSTANTS.VERTICAL_PADDING,
};

const ThemedView = (props: ThemedViewProps) => {
  const { style, lightColor, darkColor, isWrapper, ...restProps } = props;
  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor,
  });

  return (
    <View
      style={[{ backgroundColor }, isWrapper ? wrapperStyles : {}, style]}
      {...restProps}
    />
  );
};

export default ThemedView;
