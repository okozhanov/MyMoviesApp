import React, { useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Typography, { type TypographyProps } from "../Typograhy";
import useThemeColor from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/colors";

type Props = {
  title: string;
  textProps?: TypographyProps;
  type?: "solid" | "transparent";
  marginTop?: number;
  marginBottom?: number;
} & TouchableOpacityProps;

const Button = (props: Props) => {
  const {
    title,
    style,
    textProps,
    type = "solid",
    marginTop,
    marginBottom,
    ...restProps
  } = props;

  const textColor = useThemeColor("background");
  const mainColor = useThemeColor("main");

  const defaultTouchableProps: TouchableOpacityProps = {
    activeOpacity: 0.6,
    hitSlop: { top: 15, right: 10, bottom: 10, left: 15 },
  };

  const Text = useMemo(() => {
    return textProps?.size ? Typography.Base : Typography.Text2;
  }, [textProps?.size]);

  if (type === "transparent") {
    return (
      <TouchableOpacity
        {...defaultTouchableProps}
        {...restProps}
        style={[style, { marginTop, marginBottom }]}
      >
        <Text
          style={styles.underlineButtonText}
          color={mainColor}
          {...textProps}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...defaultTouchableProps}
      {...restProps}
      style={[
        styles.button,
        { backgroundColor: restProps?.disabled ? COLORS.grey : mainColor },
        { marginTop, marginBottom },
      ]}
    >
      <Text style={{ color: textColor }} {...textProps}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  underlineButtonText: {
    textDecorationLine: "underline",
  },
});

export default Button;
