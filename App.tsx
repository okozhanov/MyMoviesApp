import React from "react";
import { enableScreens } from "react-native-screens";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import useThemeColor from "./src/hooks/useThemeColor";
import Navigator from "./src/navigator";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundColor = useThemeColor("background");

  enableScreens();

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundColor}
        />

        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
