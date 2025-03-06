import React from "react";
import { Image } from "expo-image";

export type IconProps = {
  name:
    | "close"
    | "arrow-back"
    | "arrow-down"
    | "arrow-right"
    | "logo"
    | "favourite"
    | "favouriteEmpty"
    | "filter"
    | "filterDisabled"
    | "reset";
  size?: number;
};

const icons = {
  close: require("../../assets/icons/svg/close.svg"),
  "arrow-back": require("../../assets/icons/svg/arrow-back.svg"),
  "arrow-right": require("../../assets/icons/svg/arrow-right.svg"),
  "arrow-down": require("../../assets/icons/svg/arrow-down.svg"),
  logo: require("../../assets/icons/svg/logo.svg"),
  favourite: require("../../assets/icons/svg/favourite.svg"),
  favouriteEmpty: require("../../assets/icons/svg/favouriteEmpty.svg"),
  filter: require("../../assets/icons/svg/filter.svg"),
  filterDisabled: require("../../assets/icons/svg/filterDisabled.svg"),
  reset: require("../../assets/icons/svg/reset.svg"),
};

const Icon = ({ name, size = 24 }: IconProps) => {
  return <Image source={icons[name]} style={{ width: size, height: size }} />;
};

export default Icon;
