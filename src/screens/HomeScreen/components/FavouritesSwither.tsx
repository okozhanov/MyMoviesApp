import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../../../components/Typograhy";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useThemeColor from "../../../hooks/useThemeColor";
import STYLES_CONSTANTS from "../../../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { isFavouritesFilteredSelector } from "../../../redux/reducers/movies/selectors";
import { setIsFavouritesFiltered } from "../../../redux/reducers/movies/reducer";

const { width } = Dimensions.get("window");

const BOX_WIDTH = width / 2 - STYLES_CONSTANTS.HORIZONTAL_PADDING;

const FavouritesSwither = () => {
  const isFavouritesFiltered = useSelector(isFavouritesFilteredSelector);

  const dispatch = useDispatch();

  const translateX = useSharedValue(isFavouritesFiltered ? BOX_WIDTH : 0);

  const togglePosition = (isFavourites: boolean) => {
    translateX.value = isFavourites ? BOX_WIDTH : 0;
  };

  const onPress = (isFavourites: boolean) => {
    dispatch(setIsFavouritesFiltered(isFavourites));
    togglePosition(isFavourites);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 300 }) },
    ],
  }));

  const mainColor = useThemeColor("main");

  useEffect(() => {
    if (!isFavouritesFiltered && translateX.value === BOX_WIDTH) {
      togglePosition(false);
    }
  }, [isFavouritesFiltered]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            borderColor: mainColor,
          },
          styles.selectedPoint,
          animatedStyle,
        ]}
      />

      <TouchableOpacity
        disabled={!isFavouritesFiltered}
        onPress={() => onPress(false)}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Typography.Text1>All</Typography.Text1>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isFavouritesFiltered}
        onPress={() => onPress(true)}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Typography.Text1>Favourite</Typography.Text1>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 25,
  },

  button: {
    width: BOX_WIDTH,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedPoint: {
    width: BOX_WIDTH,
    height: 40,
    position: "absolute",
    borderWidth: 1,
  },
});

export default FavouritesSwither;
