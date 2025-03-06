import React from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import Typography from "../../../../components/Typograhy";
import ThemedView from "../../../../components/ThemedView";
import Header from "../../../../components/Header";
import { COLORS } from "../../../../constants/colors";
import SortByOptionButton from "./components/SortByOptionButton";
import YearPicker from "./components/YearPicker";
import GenresPicker from "./components/GenresPicker";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../../../redux/reducers/movies/reducer";
import { isDefaultFilterSelector } from "../../../../redux/reducers/movies/selectors";
import Button from "../../../../components/Button";

type Props = {
  visible: boolean;
  hideFilter: AnyFunction;
};

const FilterModal = (props: Props) => {
  const { visible, hideFilter } = props;

  const dispatch = useDispatch();
  const isDefaultFilter = useSelector(isDefaultFilterSelector);

  return (
    <Modal
      visible={visible}
      onRequestClose={hideFilter}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <ThemedView style={styles.container} isWrapper>
        <Header
          title="Filter"
          iconName="close"
          onGoBack={hideFilter}
          withRightAction={!isDefaultFilter}
          rightAction={() => dispatch(resetFilter())}
          rightActionTitle="Reset"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography.Header2 marginTop={20} marginBottom={15}>
            Sort by
          </Typography.Header2>

          <SortByOptionButton
            type="popularity.desc"
            marginLeft={30}
            marginBottom={15}
          />

          <SortByOptionButton
            type="title.asc"
            marginLeft={30}
            marginBottom={15}
          />

          <SortByOptionButton
            type="title.desc"
            marginLeft={30}
            marginBottom={15}
          />

          <SortByOptionButton
            type="primary_release_date.desc"
            marginLeft={30}
            marginBottom={15}
          />

          <SortByOptionButton
            type="primary_release_date.asc"
            marginLeft={30}
            marginBottom={15}
          />

          <Typography.Header2 marginTop={20} marginBottom={15}>
            Year
          </Typography.Header2>

          <YearPicker />

          <Typography.Header2 marginTop={20} marginBottom={15}>
            Genres
          </Typography.Header2>

          <GenresPicker />

          <Button
            title="Apply"
            onPress={hideFilter}
            marginTop={20}
            marginBottom={15}
            disabled={isDefaultFilter}
          />

          <View style={styles.separator} />
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },

  separator: {
    height: 50,
  },
});

export default FilterModal;
