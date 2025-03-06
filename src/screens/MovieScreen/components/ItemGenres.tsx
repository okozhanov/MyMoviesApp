import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../../../components/Typograhy";
import { GenreType } from "../../../redux/reducers/movies/declarations";
import { isEmpty } from "lodash";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigator";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/reducers/movies/reducer";
import API_CONSTANTS from "../../../constants/apiContstants";
import useThemeColor from "../../../hooks/useThemeColor";
import { COLORS } from "../../../constants/colors";
import SCREEN_NAMES from "../../../constants/screenNames";

type Props = {
  genres: GenreType[];
};

const ItemGenres = (props: Props) => {
  const { genres } = props;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const onPress = (id: GenreType["id"]) => {
    dispatch(setFilter({ ...API_CONSTANTS.DEFAULT_FILTER, with_genres: id }));

    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.HOME }],
    });
  };

  const mainColor = useThemeColor("main");

  return genres && !isEmpty(genres) ? (
    <View style={styles.container}>
      {genres.map((genre) => {
        const { id, name } = genre;

        return (
          <TouchableOpacity
            key={id}
            activeOpacity={0.6}
            onPress={() => onPress(id)}
            style={[styles.item, { backgroundColor: mainColor }]}
          >
            <Typography.Text2 color={COLORS.white}>{name}</Typography.Text2>
          </TouchableOpacity>
        );
      })}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: 15,
  },

  item: {
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default ItemGenres;
