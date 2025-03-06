import React from "react";
import { MovieDetailsType } from "../../redux/reducers/movies/declarations";
import { Dimensions } from "react-native";
import STYLES_CONSTANTS from "../../constants/styles";
import { Image } from "expo-image";
import API_CONSTANTS from "../../constants/apiContstants";

type Props = {
  path: MovieDetailsType["poster_path"];
  width?: number;
};

const { width: screenWidth } = Dimensions.get("screen");

const IMAGE_WIDTH = screenWidth - STYLES_CONSTANTS.HORIZONTAL_PADDING * 2;

const Poster = (props: Props) => {
  const { path, width } = props;

  const _width = width ? width : IMAGE_WIDTH;

  return path ? (
    <Image
      source={{ uri: API_CONSTANTS.IMAGE_BASE_URL + path }}
      style={{ width: _width, height: _width * 1.45 }}
      contentFit="cover"
      transition={500}
    />
  ) : null;
};

export default Poster;
