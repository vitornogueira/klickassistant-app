import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AuthLoader from './pages/AuthLoader';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Event from './pages/Event';
import InvoiceCreate from './pages/InvoiceCreate';
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
          Events: {
            screen: createStackNavigator({
              Events,
              Event,
              InvoiceCreate,
            }, {
              defaultNavigationOptions: {
                headerTintColor: '#292929',
                headerBackTitle: null,
                headerStyle: { backgroundColor: '#fff' },
              },
            }),
            navigationOptions: {
              tabBarLabel: 'Eventos',
              tabBarIcon: ({ tintColor }) => <MaterialIcons name="event" size={24} color={tintColor} />,
            },
          },
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
      overlayColor: 1,
      drawerPosition: 'right',
      drawerBackgroundColor: '#fff',
      drawerType: 'slide',
      initialRouteName: 'Main',
    }),
  }, {
    initialRouteName: 'Auth',
  }),
);
