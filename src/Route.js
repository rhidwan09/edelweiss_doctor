import React from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Divider,
} from '@ui-kitten/components';

import { Colors } from './themes';

//page
import Splash from './screen/Splash';
import Login from './screen/Login';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Schedules from './screen/Schedules';
import ListAppointment from './screen/Appointment/ListAppointment';
import HistoryAppointment from './screen/Appointment/HistoryAppointment';
import ListSchedule from './screen/Schedule/ListSchedule';
import EditProfile from './screen/Profile/EditProfile';
import ListArticle from './screen/Article/ListArticle';
import DetailArticle from './screen/Article/DetailArticle';
import PatientFavorit from './screen/Patient/PatientFavorit';

const iconHome = (style) => (
  <Icon {...style} fill={Colors.DARK100} name="home-outline" />
);
const iconActivity = (style) => (
  <Icon {...style} fill={Colors.DARK100} name="calendar-outline" />
);
const iconProfile = (style) => (
  <Icon {...style} fill={Colors.DARK100} name="person-outline" />
);

const TabBarComponent = ({ navigation }) => {
  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
    // console.warn('selectedTabRoute', selectedTabRoute);
  };

  return (
    <SafeAreaView>
      <Divider />
      <BottomNavigation
        selectedIndex={navigation.state.index}
        appearance="noIndicator"
        onSelect={onSelect}>
        <BottomNavigationTab title="Home" icon={iconHome} />
        <BottomNavigationTab title="History" icon={iconActivity} />
        <BottomNavigationTab title="Profile" icon={iconProfile} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Activity: HistoryAppointment,
    Profile: Profile,
  },
  {
    tabBarComponent: TabBarComponent,
    navigationOptions: {
      headerShown: false,
    },
  },
);

const AuthStack = createStackNavigator({
  Login: Login,
});

const AppStack = createStackNavigator(
  {
    TabScreen: TabNavigator,
    Home: Home,
    Profile: Profile,
    Schedules: Schedules,
    ListAppointment: ListAppointment,
    ListSchedule: ListSchedule,
    EditProfile: EditProfile,
    ListArticle: ListArticle,
    DetailArticle: DetailArticle,
    HistoryAppointment: HistoryAppointment,
    PatientFavorit: PatientFavorit,
  },
  {
    headerMode: 'screen',
  },
);

const prevGetStateForAction = AppStack.router.getStateForAction;
AppStack.router = {
  ...AppStack.router,
  getStateForAction(action, state) {
    if (state && action.type == 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);

      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForAction(action, state);
  },
};

const DocEdelweiss = createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Splash',
      headerMode: 'none',
      mode: 'modal',
    },
  ),
);

const prefix = 'docedelweiss://';

const Router = () => <DocEdelweiss uriPrefix={prefix} />;

export default Router;
