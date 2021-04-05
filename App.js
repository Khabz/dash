import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { default as theme } from './theme.json';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ChatsScreen from './screen/ChatsScreen';
import AddChatScreen from './screen/AddChatScreen';
import ChatScreen from './screen/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
};

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name='Login' 
          component={LoginScreen} 
        />
        <Stack.Screen
          options={{
            headerShown: false
          }} 
          name='Register' 
          component={RegisterScreen} 
        />
          <Stack.Screen 
            name='Chats' 
            component={ChatsScreen} 
          />
          <Stack.Screen 
            name='AddChat' 
            component={AddChatScreen} 
          />
          <Stack.Screen 
            name='Chat' 
            component={ChatScreen} 
          />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
