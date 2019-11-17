import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createStackNavigator } from 'react-navigation-stack';
// import { MaterialIcons } from '@expo/vector-icons';

import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AuthLoader from './pages/AuthLoader';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
// import Profile from './pages/Profile';
// import ProfileUpdate from './pages/ProfileUpdate';
// import Launchs from './pages/Launchs';

export default createAppContainer(
  createSwitchNavigator({
    Auth: {
      screen: createSwitchNavigator({
        Signup,
        Signin,
        AuthLoader,
      }, {
        backBehavior: 'history',
        initialRouteName: 'AuthLoader',
      }),
    },
    SignedRoutes: createDrawerNavigator({
      Main: {
        screen: createMaterialBottomTabNavigator({
          Dashboard,
          Events,
          // Map: {
          //   screen: createStackNavigator({
          //     Dashboard,
          //     Profile,
          //   }, {
          //     defaultNavigationOptions: {
          //       headerTintColor: '#FFF',
          //       headerBackTitle: null,
          //       headerStyle: { backgroundColor: '#111' }
          //     },
          //   }),
          //   navigationOptions: {
          //     tabBarLabel: 'Insiders',
          //     tabBarIcon: ({ tintColor }) => <MaterialIcons name="map" size={24} color={tintColor} />
          //   },
          // },
          // Launchs,
          // ProfileUpdate,
        }, {
          initialRouteName: 'Dashboard',
          activeColor: '#7863cc',
          inactiveColor: '#8c8c8c',
          barStyle: { backgroundColor: '#fff' },
        }),
        navigationOptions: {
          drawerLabel: 'Início',
        },
      },
      Profile,
    }, {
      drawerPosition: 'right',
      drawerBackgroundColor: '#fff',
      drawerType: 'slide',
      initialRouteName: 'Main',
    }),
  }, {
    initialRouteName: 'Auth',
  })
);
