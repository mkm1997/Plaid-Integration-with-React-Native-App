import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Success from "./screen/Success";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import PlaidUtil from "./screen/PlaidUtil";
const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={PlaidUtil} />
                <Stack.Screen name="Success" component={Success} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
      height:5000,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
