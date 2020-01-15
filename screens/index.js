import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './home';
import CreateMilestone from './create-milestone';
import Milestone from './milestone';

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {screen: Home, navigationOptions: {headerShown: false}},
  CreateMilestone: {screen: CreateMilestone, navigationOptions: {headerShown: false}},
  Milestone: {screen: Milestone, navigationOptions: {headerShown: false}},
}));

export default MainNavigator;