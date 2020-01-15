/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar, SafeAreaView} from 'react-native';
import {name as appName} from './app.json';

import MainNavigator from "./screens";

const root = () => {
    return(
    <>
      <StatusBar barStyle="light-content" />
      <MainNavigator/>
    </>)
}

AppRegistry.registerComponent(appName, () => root);
