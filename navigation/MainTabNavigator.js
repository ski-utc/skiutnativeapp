import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GroupeScreen from '../screens/GroupeScreen';
import InformationsScreen from '../screens/InformationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

/**
 * Actualité navigator
 * @type {NavigationContainer}
 */
const ActualityNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

ActualityNavigator.navigationOptions = {
  tabBarLabel: 'Actualités',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-notifications${focused ? '' : '-outline'}`
          : 'md-notifications'
      }
    />
  ),
};

ActualityNavigator.path = '';

/**
 *
 * Information navigator
 * @type {NavigationContainer}
 */
const InformationNavigator = createStackNavigator(
    {
        Home: InformationsScreen,
    },
    config
);

InformationNavigator.navigationOptions = {
    tabBarLabel: 'Informations',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

InformationNavigator.path = '';

/**
 *
 * Groupe Navigator
 * @type {NavigationContainer}
 */
const GroupNavigator = createStackNavigator(
  {
    Links: GroupeScreen,
  },
  config
);

GroupNavigator.navigationOptions = {
  tabBarLabel: 'Groupe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-beer' : 'md-beer'} />
  ),
};

GroupNavigator.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack: ActualityNavigator,
  InformationNavigator,
  GroupNavigator,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;