import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";
import { typographyConstants } from "./constants";
import useThemeColor from "../../hooks/useThemeColor";

export type TypographyProps = {
  size?: number;
  lineHeight?: number;
  weight?: "regular" | "semiBold" | "bold" | "extraBold" | "extraBoldItalic";
  color?: string;
  alignHorizontal?: TextStyle["textAlign"];
  style?: TextStyle;
  lightColor?: string;
  darkColor?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
} & Omit<TextProps, "style">;

const TextMulish = (props: TypographyProps) => {
  const { defaultMaxFontSizeMultiplier } = typographyConstants;

  const {
    size = 14,
    lineHeight,
    weight = "regular",
    alignHorizontal,
    style,
    lightColor,
    darkColor,
    maxFontSizeMultiplier = defaultMaxFontSizeMultiplier,
    color: defaultColor,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...restProps
  } = props;

  const textColor = useThemeColor("text", {
    light: lightColor,
    dark: darkColor,
  });
  const color = defaultColor || textColor;

  return (
    <Text
      {...restProps}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={{
        fontSize: size,
        lineHeight,
        fontFamily: styles[weight]?.fontFamily,
        color,
        textAlign: alignHorizontal,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        ...style,
      }}
    />
  );
};

const styles = StyleSheet.create(typographyConstants.fonts.mulish);

const Header1 = (props: TypographyProps) => {
  return <TextMulish {...props} size={30} lineHeight={44} />;
};

const Header2 = (props: TypographyProps) => {
  return <TextMulish {...props} size={24} lineHeight={38} />;
};

const Text1 = (props: TypographyProps) => {
  return <TextMulish {...props} size={16} lineHeight={24} />;
};

const Text2 = (props: TypographyProps) => {
  return <TextMulish {...props} size={14} lineHeight={20} />;
};

const Caption1 = (props: TypographyProps) => {
  return <TextMulish {...props} size={12} lineHeight={18} />;
};

const Caption2 = (props: TypographyProps) => {
  return <TextMulish {...props} size={11} lineHeight={16} />;
};

const Typography = {
  Header1,
  Header2,
  Text1,
  Text2,
  Caption1,
  Caption2,
  Base: TextMulish,
};

export default Typography;
