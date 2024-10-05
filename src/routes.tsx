/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SingleToken from './screens/single-tokens';
import Tokens from './screens/tokens';
import Settings from './screens/settings';
import { TokenData } from '../types/types';

// the aim is to have 3 simple screens.
// drawer navigation
//    2 items within Settings and Main crypto view
//    A stack navigator within crypto view to hold two screens the main view and the single crypto assets view.
//

export type RootStackParamList = {
  Tokens: undefined;
  Settings: undefined;
  SingleToken: { crypto: TokenData }; // Passing crypto data
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const StackView = () => {
  return (<Stack.Navigator screenOptions={
    {
      headerShown: false,
    }
  }>
    <Stack.Screen name="Tokens" component={Tokens} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="SingleToken" component={SingleToken} />
  </Stack.Navigator>);
};

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false}}>
    <Drawer.Screen name="Tokens" component={StackView} />
    {/* <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="SingleToken" component={SingleToken} /> */}
  </Drawer.Navigator>
);


const App = () => {
  return (<NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>);
};


export default App;
