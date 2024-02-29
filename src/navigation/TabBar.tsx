/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../hooks/useTheme';

const {width} = Dimensions.get('window');

const NavigationIcon = ({route, isFocused}: any) => {
  const {currentTheme} = useTheme();

  switch (route) {
    case 'Home':
      return (
        <Feather
          name="home"
          size={25}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    case 'Search':
      return (
        <Feather
          name="search"
          size={25}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    case 'Favorites':
      return (
        <Feather
          name="heart"
          size={25}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    default:
      return (
        <Feather
          name="home"
          size={25}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
  }
};

const TabBar = ({state, descriptors, navigation}: any) => {
  const {currentTheme} = useTheme();

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: currentTheme.bottomTab.background,
          shadowColor: currentTheme.bottomTab.inactive,
        },
      ]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              //   {backgroundColor: currentTheme.secondary},
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused
                  ? currentTheme.primary
                  : 'transparent',
                borderRadius: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                }}>
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    borderRadius: 25,
    marginHorizontal: width * 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
  },
});

export default TabBar;
