import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../../../../components/Typograhy";
import useThemeColor from "../../../../../hooks/useThemeColor";
import { COLORS } from "../../../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from "../../../../../redux/reducers/movies/selectors";
import { setFilter } from "../../../../../redux/reducers/movies/reducer";
import { FilterMoviesType } from "../../../../../redux/reducers/movies/declarations";
import { delay } from "lodash";

const START_YEAR = 1930;
const END_YEAR = 2025;

const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => END_YEAR - i
) as FilterMoviesType["year"][];

const YearPicker = () => {
  const dispatch = useDispatch();

  const flatListRef = useRef<FlatList>(null);

  const filter = useSelector(filterSelector);

  useEffect(() => {
    if (filter?.year) {
      delay(() => {
        flatListRef.current?.scrollToIndex({
          index: YEARS.indexOf(filter.year),
          animated: true,
          viewPosition: 0,
        });
      }, 300);
    }
  }, [filter?.year]);

  const onSelectYear = useCallback(
    (year: FilterMoviesType["year"]) => {
      const prevYear = filter?.year;

      if (prevYear && prevYear == year) {
        dispatch(setFilter({ ...filter, year: undefined }));
      } else {
        dispatch(setFilter({ ...filter, year }));
      }
    },
    [filter]
  );

  const mainColor = useThemeColor("main");
  const secondaryColor = useThemeColor("secondary");
  const textColor = useThemeColor("text");

  const YearItem = useCallback(
    ({ item }: { item: FilterMoviesType["year"] }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onSelectYear(item)}
          style={[
            styles.yearItem,
            { backgroundColor: secondaryColor },
            filter?.year === item && { backgroundColor: mainColor },
          ]}
        >
          <Typography.Text2
            style={{
              color: filter?.year === item ? COLORS.white : textColor,
            }}
          >
            {item}
          </Typography.Text2>
        </TouchableOpacity>
      );
    },
    [filter]
  );

  return (
    <FlatList
      ref={flatListRef}
      data={YEARS}
      keyExtractor={(item) => String(item)}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => <YearItem item={item} key={item} />}
      initialNumToRender={YEARS?.length}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 30,
  },
  yearItem: {
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
});

export default YearPicker;
