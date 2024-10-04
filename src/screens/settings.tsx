import React from 'react';
import {View, Text} from 'react-native';
import TopBar from '../components/topbar';


export default function Tokens(): React.JSX.Element {
 return (

    <>
      <TopBar/>
      <View style={{
        flex: 1,
        justifyContent :'center',
        marginHorizontal: 'auto',
      }}>
        <Text>Settings screen</Text>
      </View>

    </>

 );
}
