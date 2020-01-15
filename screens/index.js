import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './home';
import CreateMilestone from './create-milestone';
import Milestone from './milestone';
import Finished from './finished';
import Failed from './failed';

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {screen: Home, navigationOptions: {headerShown: false}},
  CreateMilestone: {screen: CreateMilestone, navigationOptions: {headerShown: false}},
  Milestone: {screen: Milestone, navigationOptions: {headerShown: false}},
  Failed: {screen: Failed, navigationOptions: {headerShown: false}},
  Finished: {screen: Finished, navigationOptions: {headerShown: false}},
}));

export default MainNavigator;