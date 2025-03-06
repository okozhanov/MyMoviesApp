import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../../../components/Typograhy";
import ThemedView from "../../../components/ThemedView";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { MovieType } from "../../../redux/reducers/movies/declarations";
import useThemeColor from "../../../hooks/useThemeColor";
import { useDispatch, useSelector } from "react-redux";
import { updateFavouritesRequest } from "../../../redux/reducers/movies/reducer";
import { favouritesByIdSelector } from "../../../redux/reducers/movies/selectors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "../../../constants/screenNames";
import type { RootStackParamList } from "../../../navigator";

type Props = {
  movie: MovieType;
};

const MAX_HEIGHT = 175;

const MovieItem = (props: Props) => {
  const { movie } = props;

  const { title, overview, id } = movie;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const favouritesById = useSelector(favouritesByIdSelector);

  const isFavourite = favouritesById.hasOwnProperty(id);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const toggleAnimation = () => {
    const isOpen = height.value === MAX_HEIGHT;
    height.value = withTiming(isOpen ? 0 : MAX_HEIGHT, { duration: 400 });
    opacity.value = withTiming(isOpen ? 0 : 1, { duration: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  const onPressFavourite = () => {
    dispatch(updateFavouritesRequest(movie));
  };

  const onPressDetails = () => {
    navigation.navigate(SCREEN_NAMES.MOVIE, { id });
  };

  const secondaryColor = useThemeColor("secondary");

  return (
    <TouchableOpacity onPress={toggleAnimation}>
      <ThemedView
        isWrapper
        style={[styles.container, { borderColor: secondaryColor }]}
      >
        <View style={styles.titleContainer}>
          <Typography.Text1 style={styles.title}>{title}</Typography.Text1>

          <TouchableOpacity
            activeOpacity={0.2}
            hitSlop={{ left: 15, top: 10, right: 5, bottom: 5 }}
            onPress={onPressFavourite}
          >
            <Icon name={isFavourite ? "favourite" : "favouriteEmpty"} />
          </TouchableOpacity>
        </View>

        <Animated.View style={animatedStyle}>
          <Typography.Text2 marginTop={20} marginBottom={15} numberOfLines={4}>
            {overview}
          </Typography.Text2>
          <Button title="View details" onPress={onPressDetails} />
        </Animated.View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    maxWidth: "80%",
  },

  image: {
    height: 310,
    marginBottom: 20,
  },
});

export default MovieItem;
