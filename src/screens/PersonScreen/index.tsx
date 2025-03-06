import React, { useCallback, useEffect, useState } from "react";
import SCREEN_NAMES from "../../constants/screenNames";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator";
import ThemedView from "../../components/ThemedView";
import { get } from "lodash";
import { ScrollView, StyleSheet } from "react-native";
import { fetchPersonDetails } from "../../api/moviesApi";
import Typography from "../../components/Typograhy";
import Loader from "../../components/Loader";
import { PersonDetailsType } from "../../redux/reducers/movies/declarations";
import DesciptionItem from "../MovieScreen/components/DesciptionItem";
import Poster from "../../components/Poster";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import useThemeColor from "../../hooks/useThemeColor";
import Header from "../../components/Header";

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.PERSON
>;

const PersonScreen = (props: Props) => {
  const {
    route: {
      params: { id },
    },
  } = props;

  const [person, setPerson] = useState<PersonDetailsType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPerson = useCallback(async () => {
    try {
      setIsLoading(true);
      const results = await fetchPersonDetails({ id });

      setPerson(results);
    } catch (e) {
      console.log("fetchMovie error", e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPerson();
  }, []);

  const mainColor = useThemeColor("main");

  const RenderPerson = useCallback(() => {
    const {
      biography,
      profile_path,
      birthday,
      deathday,
      place_of_birth,
      known_for_department,
      popularity,
    } = person || {};

    return (
      <ScrollView
        style={styles.detailsContainer}
        showsVerticalScrollIndicator={false}
      >
        {profile_path && <Poster path={profile_path} />}

        {popularity && (
          <StarRatingDisplay
            rating={popularity / 20}
            starSize={30}
            maxStars={5}
            color={mainColor}
            style={styles.popularityContainer}
          />
        )}

        {birthday && <DesciptionItem title="Birthday" value={birthday} />}

        {deathday && <DesciptionItem title="Deathday" value={deathday} />}

        {place_of_birth && (
          <DesciptionItem title="Homeland" value={place_of_birth} />
        )}

        {known_for_department && (
          <DesciptionItem title="Department" value={known_for_department} />
        )}

        {biography && (
          <Typography.Text2 alignHorizontal="center" marginTop={20}>
            {biography}
          </Typography.Text2>
        )}
      </ScrollView>
    );
  }, [person]);

  const RenderBody = useCallback(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (!person) {
      return (
        <Typography.Caption1>Sorry, couldn't load details</Typography.Caption1>
      );
    }

    return <RenderPerson />;
  }, [isLoading, person, RenderPerson]);

  return (
    <ThemedView isWrapper>
      <Header
        title={get(person, "name", "Person Details")}
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

  detailsContainer: {
    marginTop: 20,
  },

  popularityContainer: {
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default PersonScreen;
