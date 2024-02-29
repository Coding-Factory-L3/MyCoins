import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Router} from './src/navigation/router';
import {AuthProvider} from './src/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import theme from './theme';
import {ThemeProvider} from './src/hooks/useTheme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? theme.colors.dark.background
      : theme.colors.light.background,
  };

  return (
    <>
      <ThemeProvider>
        <SafeAreaView style={[backgroundStyle, styles.container]}>
          <AuthProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Router />
          </AuthProvider>
        </SafeAreaView>
      </ThemeProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
