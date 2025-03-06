import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator";
import SCREEN_NAMES from "../../constants/screenNames";
import ThemedView from "../../components/ThemedView";
import Header from "../../components/Header";
import { fetchMovieDetails, fetchMovieSimilars } from "../../api/moviesApi";
import {
  MovieDetailsType,
  MovieType,
} from "../../redux/reducers/movies/declarations";
import { get, isEmpty, join, map } from "lodash";
import { Image } from "expo-image";
import API_CONSTANTS from "../../constants/apiContstants";
import STYLES_CONSTANTS from "../../constants/styles";
import Typography from "../../components/Typograhy";
import Loader from "../../components/Loader";
import DesciptionItem from "./components/DesciptionItem";
import { minutesToTime } from "../../utils/time";
import { getValuesFromObjectsArray } from "../../utils/getters";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import useThemeColor from "../../hooks/useThemeColor";
import ItemGenres from "./components/ItemGenres";
import Poster from "../../components/Poster";

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.MOVIE
>;

const MovieScreen = (props: Props) => {
  const {
    route: {
      params: { id },
    },
    navigation,
  } = props;

  const [movie, setMovie] = useState<MovieDetailsType>();
  const [isLoading, setIsLoading] = useState(false);
  const [similars, setSimilars] = useState<MovieType[]>();

  const mainColor = useThemeColor("main");

  const fetchMovie = useCallback(async () => {
    try {
      setIsLoading(true);
      const results = await fetchMovieDetails({ id });

      setMovie(results);
    } catch (e) {
      console.log("fetchMovie error", e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const fetchSimilars = useCallback(async () => {
    try {
      const results = await fetchMovieSimilars({ id });

      setSimilars(results?.results || []);
    } catch (e) {
      console.log("fetchSimilar error", e);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
    fetchSimilars();
  }, []);

  const onPressSimilar = useCallback((id: MovieType["id"]) => {
    navigation.push(SCREEN_NAMES.MOVIE, { id });
  }, []);

  const RenderMovie = useCallback(() => {
    const {
      poster_path,
      release_date,
      spoken_languages,
      runtime,
      production_countries,
      vote_average,
      tagline,
      genres,
      overview,
    } = movie || {};

    return (
      <ScrollView
        style={styles.movieContainer}
        showsVerticalScrollIndicator={false}
      >
        {poster_path && <Poster path={poster_path} />}

        {tagline && (
          <Typography.Text2
            alignHorizontal="center"
            marginTop={15}
            marginLeft={20}
            marginRight={20}
          >
            {tagline}
          </Typography.Text2>
        )}

        {vote_average && (
          <StarRatingDisplay
            rating={vote_average / 2}
            starSize={30}
            maxStars={5}
            color={mainColor}
            style={styles.votesContainer}
          />
        )}

        {release_date && (
          <DesciptionItem title="Release date" value={release_date} />
        )}

        {spoken_languages && !isEmpty(spoken_languages) && (
          <DesciptionItem
            title="Languages"
            value={getValuesFromObjectsArray(spoken_languages, "english_name")}
          />
        )}

        {runtime && (
          <DesciptionItem title="Runtime" value={minutesToTime(runtime)} />
        )}

        {production_countries && !isEmpty(production_countries) && (
          <DesciptionItem
            title="Countries"
            value={getValuesFromObjectsArray(production_countries, "name")}
          />
        )}

        {genres && <ItemGenres genres={genres} />}

        {overview && (
          <Typography.Text2 alignHorizontal="center">
            {overview}
          </Typography.Text2>
        )}

        {similars && !isEmpty(similars) && (
          <View style={styles.similarsContainer}>
            <Typography.Header2 marginBottom={15}>Similars</Typography.Header2>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similars.map((item) => {
                const { title, poster_path, id } = item;

                return poster_path ? (
                  <TouchableOpacity
                    key={id}
                    activeOpacity={0.6}
                    style={styles.similarItem}
                    onPress={() => onPressSimilar(id)}
                  >
                    <Poster path={poster_path} width={130} />

                    <Typography.Text2 alignHorizontal="center" marginTop={10}>
                      {title}
                    </Typography.Text2>
                  </TouchableOpacity>
                ) : null;
              })}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    );
  }, [movie, similars, onPressSimilar]);

  const RenderBody = useCallback(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (!movie) {
      return (
        <Typography.Caption1>Sorry, couldn't load details</Typography.Caption1>
      );
    }

    return <RenderMovie />;
  }, [isLoading, movie, RenderMovie]);

  return (
    <ThemedView isWrapper>
      <Header
        title={get(movie, "title", "Movie Details")}
        maxLengthTitle={40}
        titleProps={{ style: styles.headerTitle }}
      />

      <RenderBody />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    paddingHorizontal: 20,
  },

  movieContainer: {
    marginTop: 20,
  },

  votesContainer: {
    justifyContent: "center",
    marginVertical: 10,
  },

  similarsContainer: {
    marginTop: 30,
    marginBottom: 15,
  },

  similarItem: {
    width: 130,
    marginHorizontal: 10,
  },
});

export default MovieScreen;
