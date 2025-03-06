import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSelector,
  genresSelector,
  isStrictGenresSelector,
} from "../../../../../redux/reducers/movies/selectors";
import Typography from "../../../../../components/Typograhy";
import type { GenreType } from "../../../../../redux/reducers/movies/declarations";
import { isEmpty, isNumber, omit } from "lodash";
import useThemeColor from "../../../../../hooks/useThemeColor";
import {
  setFilter,
  setIsStrictGenres,
} from "../../../../../redux/reducers/movies/reducer";
import { COLORS } from "../../../../../constants/colors";
import OptionButton from "../../../../../components/OptionButton";
import API_CONSTANTS from "../../../../../constants/apiContstants";

const GenresPicker = () => {
  const genres = useSelector(genresSelector);
  const filter = useSelector(filterSelector);
  const { with_genres } = filter;
  const isStrictGenres = useSelector(isStrictGenresSelector);

  const dispatch = useDispatch();

  const GENRES_SEPARATOR = isStrictGenres
    ? API_CONSTANTS.PARAMS_SEPARATORS.strict
    : API_CONSTANTS.PARAMS_SEPARATORS.nonStrict;

  const onPressGenre = useCallback(
    (id: number, isSelected: boolean) => {
      let newGenres;

      if (!with_genres) {
        newGenres = id;
      } else {
        if (isNumber(with_genres)) {
          if (!isSelected) {
            newGenres = String(with_genres) + GENRES_SEPARATOR + id;
          }
        } else {
          const oldGenres = with_genres?.split(GENRES_SEPARATOR);

          if (isSelected) {
            if (oldGenres?.length > 1) {
              newGenres = oldGenres.filter((item) => item !== String(id));

              if (newGenres?.length > 1) {
                newGenres = newGenres.join(GENRES_SEPARATOR);
              } else {
                newGenres = Number(newGenres[0]);
              }
            }
          } else {
            newGenres =
              oldGenres.join(GENRES_SEPARATOR) + GENRES_SEPARATOR + id;
          }
        }
      }

      if (!newGenres) {
        dispatch(setFilter(omit(filter, "with_genres")));
      } else {
        dispatch(setFilter({ ...filter, with_genres: newGenres }));
      }
    },
    [filter]
  );

  const mainColor = useThemeColor("main");
  const secondaryColor = useThemeColor("secondary");
  const textColor = useThemeColor("text");

  const GenreItem = useCallback(
    ({ item }: { item: GenreType }) => {
      const { name, id } = item;

      let isSelected = false;

      if (with_genres) {
        if (isNumber(with_genres)) {
          isSelected = id === with_genres;
        } else {
          isSelected =
            with_genres?.split(GENRES_SEPARATOR)?.includes(String(id)) || false;
        }
      }

      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onPressGenre(id, isSelected)}
          style={[
            styles.genreItem,
            { backgroundColor: isSelected ? mainColor : secondaryColor },
          ]}
        >
          <Typography.Text2
            style={{ color: isSelected ? COLORS.white : textColor }}
          >
            {name}
          </Typography.Text2>
        </TouchableOpacity>
      );
    },
    [filter]
  );

  return !isEmpty(genres) ? (
    <View style={styles.container}>
      <OptionButton
        isSelected={!isStrictGenres}
        label="Movie contains at least one selected genre"
        labelStyles={styles.optionButtonLabel}
        disabled={!isStrictGenres}
        onPress={() => dispatch(setIsStrictGenres(false))}
        marginBottom={10}
      />

      <OptionButton
        isSelected={isStrictGenres}
        label="Movie contains all selected genres"
        labelStyles={styles.optionButtonLabel}
        disabled={isStrictGenres}
        onPress={() => dispatch(setIsStrictGenres(true))}
        marginBottom={20}
      />

      <View style={styles.genresContainer}>
        {genres.map((item) => (
          <GenreItem item={item} key={item.id} />
        ))}
      </View>
    </View>
  ) : (
    <Typography.Text2>Can't find genres...</Typography.Text2>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },

  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 15,
  },

  genreItem: {
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  optionButtonLabel: {
    width: "80%",
  },
});

export default GenresPicker;
