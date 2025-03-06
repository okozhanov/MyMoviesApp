import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGenresRequest,
  fetchMoviesRequest,
  resetFavourites,
  updateFavouritesRequest,
} from "../../redux/reducers/movies/reducer";
import Search from "./components/Search";
import ThemedView from "../../components/ThemedView";
import Icon from "../../components/Icon";
import Typography from "../../components/Typograhy";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SCREEN_NAMES from "../../constants/screenNames";
import type { RootStackParamList } from "../../navigator";
import Loader from "../../components/Loader";
import {
  favouritesSelector,
  filterSelector,
  isDefaultFilterSelector,
  isFavouritesFilteredSelector,
  isPresentFavouritesSelector,
  isPresentSuggestingSelector,
  isSelectedPersonSelector,
  loadingMoviesSelector,
  moviesSelector,
  searchTypeSelector,
} from "../../redux/reducers/movies/selectors";
import MovieItem from "./components/MovieItem";
import { isEmpty } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import type { MovieType } from "../../redux/reducers/movies/declarations";
import { useStateToggler } from "../../hooks/useStateToggler";
import FilterModal from "./components/FilterModal";
import FavouritesSwither from "./components/FavouritesSwither";
import Button from "../../components/Button";
import Footer from "./components/Footer";

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.HOME
>;

const HomeScreen = (props: Props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const movies: MovieType[] = useSelector(moviesSelector);

  const isPresentSuggesting = useSelector(isPresentSuggestingSelector);
  const loadingMovies = useSelector(loadingMoviesSelector);

  const favourites = useSelector(favouritesSelector);
  const isPresentFavourites = useSelector(isPresentFavouritesSelector);
  const isFavouritesFiltered = useSelector(isFavouritesFilteredSelector);
  const isDefaultFilter = useSelector(isDefaultFilterSelector);
  const isSelectedPerson = useSelector(isSelectedPersonSelector);
  const filter = useSelector(filterSelector);

  const [isVisibleFilter, showFilter, hideFilter] = useStateToggler(false);

  useEffect(() => {
    dispatch(fetchMoviesRequest());
    dispatch(fetchGenresRequest());
    dispatch(updateFavouritesRequest());
  }, [dispatch]);

  const handleResetFavourites = useCallback(async () => {
    try {
      Alert.alert("Reset favourites?", "", [
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            dispatch(resetFavourites());
            await AsyncStorage.removeItem(STORAGE_KEYS.favourites);
          },
        },
        { text: "No", style: "cancel" },
      ]);
    } catch (e) {
      console.warn("resetFavourites error", e);
    }
  }, []);

  const onPressVisitPerson = () => {
    const id = filter?.with_cast || filter?.with_crew;

    if (id) {
      navigation.navigate(SCREEN_NAMES.PERSON, { id });
    }
  };

  const RenderMovies = useCallback(({ data }: { data: MovieType[] }) => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: MovieType) => item?.id + item?.title}
        renderItem={({ item }: { item: MovieType }) => {
          return <MovieItem movie={item} />;
        }}
        ListFooterComponent={<Footer />}
      />
    );
  }, []);

  const RenderEmptyState = useCallback(
    ({ type }: { type: "movies" | "favourites" }) => {
      return (
        <Typography.Caption1 alignHorizontal="center" marginTop={20}>
          Sorry, {type} are not found
        </Typography.Caption1>
      );
    },
    []
  );

  const RenderFavourites = useCallback(() => {
    return <RenderMovies data={favourites} />;
  }, [favourites]);

  const RenderBody = useCallback(() => {
    if (isPresentSuggesting) {
      return null;
    }

    if (isFavouritesFiltered) {
      if (isPresentFavourites) {
        return <RenderFavourites />;
      } else {
        return <RenderEmptyState type="favourites" />;
      }
    }

    if (loadingMovies) {
      return <Loader />;
    }

    if (isEmpty(movies)) {
      return <RenderEmptyState type="movies" />;
    }

    return <RenderMovies data={movies} />;
  }, [
    loadingMovies,
    movies,
    isPresentSuggesting,
    isFavouritesFiltered,
    isPresentFavourites,
  ]);

  return (
    <ThemedView isWrapper>
      <View style={styles.logoContainer}>
        <Icon name="logo" size={35} />

        {isFavouritesFiltered ? (
          <>
            {isPresentFavourites && (
              <TouchableOpacity onPress={handleResetFavourites}>
                <Icon name="reset" size={35} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity onPress={showFilter}>
            <Icon
              name={isDefaultFilter ? "filterDisabled" : "filter"}
              size={35}
            />
          </TouchableOpacity>
        )}
      </View>

      <Search />

      {!isPresentSuggesting && !isSelectedPerson && <FavouritesSwither />}

      {!isPresentSuggesting && isSelectedPerson && (
        <Button
          title="View person details"
          onPress={onPressVisitPerson}
          marginBottom={20}
        />
      )}

      <RenderBody />

      <FilterModal visible={isVisibleFilter} hideFilter={hideFilter} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default HomeScreen;
