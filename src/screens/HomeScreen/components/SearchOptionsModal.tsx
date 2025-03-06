import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedView from "../../../components/ThemedView";
import useThemeColor from "../../../hooks/useThemeColor";
import Icon from "../../../components/Icon";
import OptionButton from "../../../components/OptionButton";
import { useDispatch, useSelector } from "react-redux";
import { searchTypeSelector } from "../../../redux/reducers/movies/selectors";
import type { SearchTypes } from "../../../redux/reducers/movies/declarations";
import { setSearchType } from "../../../redux/reducers/movies/reducer";
import { delay } from "lodash";

type Props = {
  visible: boolean;
  hideModal: AnyFunction;
};

const SearchOptionsModal = (props: Props) => {
  const { visible, hideModal } = props;

  const semiTransparentColor = useThemeColor("semiTransparent");

  const searchType = useSelector(searchTypeSelector);
  const dispatch = useDispatch();

  const onPressSearchType = (type: SearchTypes) => {
    dispatch(setSearchType(type));
    delay(hideModal, 200);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={hideModal}
      animationType="fade"
      transparent
    >
      <View
        style={[styles.container, { backgroundColor: semiTransparentColor }]}
      >
        <ThemedView style={styles.body}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={hideModal}
            hitSlop={{ left: 15, top: 15, right: 10, bottom: 15 }}
            style={styles.closeButton}
          >
            <Icon name="close" />
          </TouchableOpacity>

          <OptionButton
            label="Search movies"
            disabled={searchType === "movies"}
            isSelected={searchType === "movies"}
            onPress={() => onPressSearchType("movies")}
            marginTop={40}
            marginBottom={30}
          />

          <OptionButton
            label="Search persons"
            disabled={searchType === "persons"}
            isSelected={searchType === "persons"}
            onPress={() => onPressSearchType("persons")}
            marginBottom={15}
          />
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    padding: 30,
    borderRadius: 10,
  },
  closeButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default SearchOptionsModal;
