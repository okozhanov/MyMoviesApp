import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { COLORS } from "../../constants/colors";
import useThemeColor from "../../hooks/useThemeColor";
import Typography from "../Typograhy";

export type OptionButtonProps = {
  isSelected: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  label?: string;
  isLabelOnRight?: boolean;
  labelStyles?: TextStyle;
} & TouchableOpacityProps;

const OptionButton = (props: OptionButtonProps) => {
  const {
    isSelected,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    label,
    labelStyles,
    isLabelOnRight = true,
    style,
    ...restProps
  } = props;

  const mainColor = useThemeColor("main");

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        { marginTop, marginBottom, marginLeft, marginRight },
        style,
      ]}
      {...restProps}
    >
      {!isLabelOnRight && (
        <Typography.Text1 style={labelStyles} marginRight={10}>
          {label}
        </Typography.Text1>
      )}

      <View style={styles.button}>
        <View
          style={[
            styles.innerButton,
            {
              backgroundColor: isSelected ? mainColor : undefined,
            },
          ]}
        />
      </View>

      {isLabelOnRight && (
        <Typography.Text1 style={labelStyles} marginLeft={10}>
          {label}
        </Typography.Text1>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    width: 23,
    height: 23,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.grey,
    borderRadius: 13,
  },

  innerButton: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
});

export default OptionButton;
