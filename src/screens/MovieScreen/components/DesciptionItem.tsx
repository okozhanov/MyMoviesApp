import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../../components/Typograhy";
import useThemeColor from "../../../hooks/useThemeColor";

type Props = {
  title: string;
  value: string;
};

const DesciptionItem = (props: Props) => {
  const { title, value } = props;

  const secondaryColor = useThemeColor("secondary");

  return (
    <View style={styles.container}>
      <View
        style={[styles.titleContainer, { backgroundColor: secondaryColor }]}
      >
        <Typography.Text2>{title}</Typography.Text2>
      </View>
      <View style={[styles.valueContainer, { borderColor: secondaryColor }]}>
        <Typography.Text2>{value}</Typography.Text2>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },

  titleContainer: {
    flex: 0.35,
    padding: 10,
    justifyContent: "center",
  },

  valueContainer: {
    padding: 10,
    flex: 0.65,
    justifyContent: "center",
    borderWidth: 2,
  },
});

export default DesciptionItem;
