import { join, map } from "lodash";

export const getValuesFromObjectsArray = (array: any[], key: string) => {
  return join(map(array, key), ", ");
};
