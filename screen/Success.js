import React from 'react';
import {View, Text} from 'react-native'

export default function Success(){

    return(
        <View style={{flex:1 , justifyContent:"center", alignItems:"center"}}>
            <Text>Successfully Linked Your Account with Plaid</Text>
        </View>
    )

}