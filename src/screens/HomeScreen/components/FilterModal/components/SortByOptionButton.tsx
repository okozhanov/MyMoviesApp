import React from "react";
import OptionButton, {
  type OptionButtonProps,
} from "../../../../../components/OptionButton";
import type { FilterMoviesType } from "../../../../../redux/reducers/movies/declarations";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from "../../../../../redux/reducers/movies/selectors";
import { setFilter } from "../../../../../redux/reducers/movies/reducer";
import API_CONSTANTS from "../../../../../constants/apiContstants";

type Props = {
  type: FilterMoviesType["sort_by"];
} & Partial<OptionButtonProps>;

const SortByOptionButton = (props: Props) => {
  const { type = "popularity.desc", ...restProps } = props;

  const filter = useSelector(filterSelector);

  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(setFilter({ ...filter, sort_by: type }));
  };

  const isSelected = filter.sort_by === type;

  return (
    <OptionButton
      {...restProps}
      isSelected={isSelected}
      onPress={onPress}
      label={API_CONSTANTS.SORT_MOVIES_VALUES[type]}
      disabled={isSelected}
    />
  );
};

export default SortByOptionButton;
