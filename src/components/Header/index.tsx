import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon, { type IconProps } from "../Icon";
import Typography, { TypographyProps } from "../Typograhy";
import useThemeColor from "../../hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import { isFunction } from "lodash";

type Props = {
  title: string;
  titleProps?: TypographyProps;
  onGoBack?: AnyFunction;
  withBackButton?: boolean;
  withRightAction?: boolean;
  rightAction?: AnyFunction;
  rightActionTitle?: string;
  maxLengthTitle?: number;
  iconName?: IconProps["name"];
};

const Header = (props: Props) => {
  const {
    title,
    titleProps,
    onGoBack,
    withBackButton = true,
    withRightAction,
    rightAction,
    rightActionTitle,
    maxLengthTitle = 25,
    iconName = "arrow-back",
  } = props;

  const navigation = useNavigation() as any;

  const onGoBackPressed = () => {
    if (isFunction(onGoBack)) {
      onGoBack();
      return;
    }

    navigation.goBack();
  };

  const titleCut = useMemo(() => {
    if (title?.length <= maxLengthTitle) {
      return title;
    }

    return title.slice(0, maxLengthTitle + 1) + "...";
  }, [maxLengthTitle, title]);

  const mainColor = useThemeColor("main");
  return (
    <View style={styles.container}>
      {withBackButton && (
        <TouchableOpacity
          onPress={onGoBackPressed}
          style={styles.backButton}
          activeOpacity={0.6}
          hitSlop={{ left: 10, top: 15, right: 20, bottom: 15 }}
        >
          <Icon name={iconName} />
        </TouchableOpacity>
      )}

      <Typography.Header2
        alignHorizontal="center"
        color={mainColor}
        {...titleProps}
      >
        {titleCut}
      </Typography.Header2>

      {withRightAction && (
        <TouchableOpacity
          onPress={() => rightAction && rightAction()}
          style={styles.rightAction}
          activeOpacity={0.6}
          hitSlop={{ left: 10, top: 15, right: 20, bottom: 15 }}
        >
          <Typography.Text2>{rightActionTitle}</Typography.Text2>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 3,
    elevation: 3,
  },

  rightAction: {
    position: "absolute",
    right: 0,
    zIndex: 3,
    elevation: 3,
  },
});

export default Header;
