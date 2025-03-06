import {COLORS, COLORS_BY_MODE} from '../constants/colors';
import {useColorScheme} from 'react-native';

const useThemeColor = (
  colorName: Nullable<
    keyof typeof COLORS_BY_MODE.light & keyof typeof COLORS_BY_MODE.dark
  >,
  props?: {light?: string; dark?: string},
) => {
  const theme = useColorScheme() ?? 'light';  

  const colorFromProps = props && props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  if (colorName) {
    return COLORS_BY_MODE[theme][colorName];
  }

  return COLORS.grey;
};

export default useThemeColor;
