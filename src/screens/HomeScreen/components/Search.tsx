import React, { useCallback, useMemo, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { debounce, delay, get, isEmpty, isNil, omit } from "lodash";
import { COLORS } from "../../../constants/colors";
import useThemeColor from "../../../hooks/useThemeColor";
import { useStateToggler } from "../../../hooks/useStateToggler";
import Typography from "../../../components/Typograhy";
import Input from "../../../components/Input";
import {
  fetchSuggestRequest,
  resetSuggestings,
  setFilter,
} from "../../../redux/reducers/movies/reducer";
import {
  MovieType,
  PersonSearchType,
} from "../../../redux/reducers/movies/declarations";
import {
  filterSelector,
  isSelectedPersonSelector,
  loadingSuggestingsSelector,
  moviesSuggestedSelector,
  personsSuggestedSelector,
  searchTypeSelector,
} from "../../../redux/reducers/movies/selectors";
import Icon from "../../../components/Icon";
import SearchOptionsModal from "./SearchOptionsModal";
import API_CONSTANTS from "../../../constants/apiContstants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "../../../constants/screenNames";
import type { RootStackParamList } from "../../../navigator";

type Props = {};

const Search = (_props: Props) => {
  const [inputValue, setInputValue] = useState<string>();

  const searchType = useSelector(searchTypeSelector);
  const filter = useSelector(filterSelector);

  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);
  const [isVisibleModal, showModal, hideModal] = useStateToggler(false);

  const dispatch = useDispatch();

  const moviesList: MovieType[] = useSelector(moviesSuggestedSelector);
  const personsList: PersonSearchType[] = useSelector(personsSuggestedSelector);

  const isLoadingSuggestings = useSelector(loadingSuggestingsSelector);
  const isSelectedPerson = useSelector(isSelectedPersonSelector);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showSuggestions = () => setIsShowingSuggestions(true);
  const hideSuggestions = () => setIsShowingSuggestions(false);

  const fetchSuggesting = useMemo(
    () =>
      debounce((text: string) => {
        dispatch(fetchSuggestRequest({ query: text }));

        showSuggestions();
      }, 200),
    [dispatch]
  );

  const onResetSuggesting = useCallback(() => {
    dispatch(resetSuggestings());
    dispatch(setFilter(omit(filter, API_CONSTANTS.PERSONS_PARAMS)));

    hideSuggestions();
  }, [filter, searchType, isSelectedPerson]);

  const onChangeText = useCallback(
    (text: string) => {
      setInputValue(text);

      if (text.length > 1) {
        fetchSuggesting(text);
      } else {
        delay(onResetSuggesting, 300);
      }
    },
    [fetchSuggesting, onResetSuggesting, searchType]
  );

  const onPressSuggesting = useCallback(
    (suggested: MovieType | PersonSearchType) => {
      if (searchType === "movies") {
        const { id } = suggested as MovieType;

        navigation.navigate(SCREEN_NAMES.MOVIE, { id });
      } else if (searchType === "persons") {
        const person = suggested as PersonSearchType;

        setInputValue(person.name);
        onResetSuggesting();
        Keyboard.dismiss();

        let personFilter = {};

        if (person?.known_for_department === "Acting") {
          personFilter = { with_cast: person.id };
        } else {
          personFilter = { with_crew: person.id };
        }

        dispatch(setFilter({ ...filter, ...personFilter }));
      }
    },
    [hideSuggestions, searchType, onResetSuggesting, filter]
  );

  const textColor = useThemeColor("text");
  const suggestionContainerColor = useThemeColor(null, {
    light: COLORS.white,
    dark: COLORS.black,
  });

  const onClear = useCallback(() => {
    onChangeText("");
    delay(Keyboard.dismiss, 300);
  }, [onChangeText]);

  const RenderMovies = useCallback(
    ({ data }: { data: MovieType[] }) => {
      return data.map((item: MovieType) => {
        const title = get(item, "title", "");

        return (
          <TouchableOpacity
            style={styles.suggestionItem}
            key={item.id + title}
            onPress={() => onPressSuggesting(item)}
          >
            <Typography.Caption1>{title}</Typography.Caption1>
          </TouchableOpacity>
        );
      });
    },
    [onPressSuggesting]
  );

  const RenderPersons = useCallback(
    ({ data }: { data: PersonSearchType[] }) => {
      return data.map((item: PersonSearchType) => {
        const name = get(item, "name", "");
        const { known_for_department } = item;

        const role =
          known_for_department && known_for_department !== "Acting"
            ? ` (as ${known_for_department})`
            : "";

        return (
          <TouchableOpacity
            style={styles.suggestionItem}
            key={item.id + name}
            onPress={() => onPressSuggesting(item)}
          >
            <Typography.Caption1>{name + role}</Typography.Caption1>
          </TouchableOpacity>
        );
      });
    },
    [onPressSuggesting]
  );

  const RenderSuggestions = useCallback(() => {
    if (!isShowingSuggestions || isLoadingSuggestings) {
      return null;
    }

    if (searchType === "movies") {
      if (isNil(moviesList)) {
        return null;
      }

      if (isEmpty(moviesList)) {
        return (
          <Typography.Caption1
            color={COLORS.grey}
            style={styles.absoluteContainer}
          >
            No results found...
          </Typography.Caption1>
        );
      }
    } else if (searchType === "persons") {
      if (isNil(personsList)) {
        return null;
      }

      if (isEmpty(personsList)) {
        return (
          <Typography.Caption1
            color={COLORS.grey}
            style={styles.absoluteContainer}
          >
            No results found...
          </Typography.Caption1>
        );
      }
    }

    return (
      <ScrollView
        bounces={false}
        style={[
          styles.suggestionContainer,
          styles.absoluteContainer,
          {
            backgroundColor: suggestionContainerColor,
            borderColor: textColor,
          },
        ]}
        keyboardShouldPersistTaps="always"
      >
        {searchType === "movies" && <RenderMovies data={moviesList} />}
        {searchType === "persons" && <RenderPersons data={personsList} />}
      </ScrollView>
    );
  }, [
    moviesList,
    personsList,
    searchType,
    isShowingSuggestions,
    isLoadingSuggestings,
    RenderMovies,
    RenderPersons,
  ]);

  return (
    <View style={styles.container}>
      <Input
        value={inputValue}
        containerStyle={styles.input}
        placeholder={`Find ${searchType}...`}
        onChangeText={onChangeText}
        onClear={onClear}
      />

      {!inputValue && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={showModal}
          hitSlop={{ left: 20, top: 10, right: 15, bottom: 15 }}
          style={styles.arrowDown}
        >
          <Icon name="arrow-down" />
        </TouchableOpacity>
      )}

      <RenderSuggestions />

      <SearchOptionsModal visible={isVisibleModal} hideModal={hideModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    marginBottom: 25,
  },

  suggestionContainer: {
    maxHeight: 180,
    width: "100%",
    borderWidth: 1,
  },

  absoluteContainer: {
    position: "absolute",
    zIndex: 3,
    elevation: 3,
    top: 50,
  },

  suggestionItem: {
    height: 40,
    justifyContent: "center",
    marginHorizontal: 10,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },

  arrowDown: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 4,
    elevation: 4,
  },
});

export default Search;
