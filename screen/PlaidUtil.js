import React from 'react'
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import Plaid from "./PlaidScreen";

export default function PlaidUtil(props) {
    const plaidConfigurations = (token) =>{
        let url = "http://192.168.0.108:8000/stockchat/plaid/"
        axios.post(url, {public_token: token}).then(data=>{
            console.log("hello data is ", data);
            alert(data.data.message);
            props.navigation.push("Success")
        }).catch(error=>{
            alert(error.message);
            props.navigation.push("Success")
        })
    }

    const onPlaidRef = (obj)=>{
        console.log('call back onPlaidRef:',obj)
    }
    const onConnected =(obj)=>{
        console.log('call back onConnected:',obj);
        plaidConfigurations(obj.metadata.public_token)

    }
    const onMessage =(obj)=>{
        console.log('call back onMessage:',obj)
    }
    const onEvent =(obj)=>{
        console.log('call back onEvent:',obj)
    }
    const onExit =(obj)=>{
        console.log('call back onExit:',obj)
    }
    const onLoad = (obj)=>{
        console.log('call back onLoad:',obj)
    }
    const onReady =(obj)=>{
        console.log('call back onReady:',obj)
    }
    const onAcknowledged =(obj)=>{
        console.log('call back onAcknowledged:',obj)
    }

    return (
        <View style={{flex: 1}}>
            <Plaid
                selectAccount="false"
                env="development"
                PublicKey="[YOUR_PUBLIC_KEY]"
                origin='localhost'
                product="auth,transactions"
                clientName="Plaid Link"
                webhook="https://requestb.in"
                PlaidLinkUri='https://cdn.plaid.com/link/v2/stable/link.html'
                onLoad={onLoad}
                onEvent={onEvent}
                onConnected={onConnected}
                onExit={onExit}
                onReady={onReady}
                onAcknowledged={onAcknowledged}
                onMessage={onMessage}
                onPlaidRef={onPlaidRef}
            />

        </View>
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
