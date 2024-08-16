// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AccessRights from './src/screens/accessRights';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AccessRights" component={AccessRights} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

