import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/reducers/movies/reducer";
import {
  filterSelector,
  hasNextPageSelector,
} from "../../../redux/reducers/movies/selectors";
import Typography from "../../../components/Typograhy";

const Footer = () => {
  const dispatch = useDispatch();

  const filter = useSelector(filterSelector);
  const hasNextPage = useSelector(hasNextPageSelector);

  const { page } = filter;

  const goBack = () => {
    dispatch(setFilter({ ...filter, page: page - 1 }));
  };

  const goForward = () => {
    dispatch(setFilter({ ...filter, page: page + 1 }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.arrowContainer,
          page === 1 ? styles.arrowDisabled : undefined,
        ]}
        activeOpacity={0.6}
        onPress={goBack}
        disabled={page === 1}
      >
        <Icon name="arrow-back" />
      </TouchableOpacity>

      <Typography.Text1>{page}</Typography.Text1>

      <TouchableOpacity
        style={[
          styles.arrowContainer,
          !hasNextPage ? styles.arrowDisabled : undefined,
        ]}
        activeOpacity={0.6}
        onPress={goForward}
        disabled={!hasNextPage}
      >
        <Icon name="arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },

  arrowContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowDisabled: {
    opacity: 0.3,
  },
});

export default Footer;
