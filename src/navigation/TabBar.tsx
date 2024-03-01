/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../hooks/useTheme';

const NavigationIcon = ({route, isFocused}: any) => {
  const {currentTheme} = useTheme();

  switch (route) {
    case 'Home':
      return (
        <Feather
          name="home"
          size={24}
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
          size={24}
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
          size={24}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    case 'Profile':
      return (
        <Feather
          name="user"
          size={24}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    case 'AllNft':
      return (
        <Feather
          name="image"
          size={24}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    case 'AllExchange':
      return (
        <Feather
          name="book-open"
          size={24}
          color={
            isFocused
              ? currentTheme.bottomTab.active
              : currentTheme.bottomTab.inactive
          }
        />
      );
    default:
      return null;
  }
};

const TabBar = ({state, descriptors, navigation}: any) => {
  const {currentTheme, toggleTheme} = useTheme();

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
          <View key={index} style={[styles.mainItemContainer]}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: isFocused
                  ? currentTheme.primary
                  : 'transparent',
                borderRadius: 15,
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
            </TouchableOpacity>
          </View>
        );
      })}
      <View
        style={[
          {
            height: 30,
            width: 2,
            backgroundColor: currentTheme.bottomTab.inactive,
            alignSelf: 'center',
            marginLeft: 5,
          },
        ]}
      />
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.mainItemContainer]}>
        <Feather name="sun" size={24} color={currentTheme.switch} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
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
