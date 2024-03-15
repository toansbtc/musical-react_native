import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, TextInput, View } from 'react-native'
import style from '../asset/style.dasboard'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import SearchPage from './SearchPage';
import LoginScreen from './LoginScreen';

export default function Dasboard() {
    const [username, setusername] = useState("");
    const [pass, setpass] = useState("");

    async function checklogin() {
        const dataJson = await fetch("http://5.1.182.118:8080/QAMWebService/webapi/user/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'factory': "FVGIT1",
                'userid': username,
                'password': pass,
                'acc_system': "NGB"
            }),
        });


        const data = await dataJson.json().catch(error => {
            console.error(error)
        });

        console.log(data);
    }

    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();

    return (
        // <SafeAreaView style={style.container}>
        //     <View style={{ flex: 1, width: '100%', }}></View>
        //     <View style={{ flex: 1, width: '100%', alignContent: 'center' }}>
        /* <TextInput style={style.textinput} onChangeText={text => setusername(text)} placeholder='user name' />
        <TextInput passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"} secureTextEntry={true} style={style.textinput} inputMode='text' onChangeText={text => setpass(text)} placeholder='*******' />
        <Button title='Login' onPress={checklogin} ></Button> */
        //     </View>
        //     <View style={{ flex: 1, width: '100%', }}></View>
        // </SafeAreaView>


        <NavigationContainer >
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ title: 'Home page', headerShown: false }} />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{ title: 'Login page', headerShown: false }} />
                <Stack.Screen
                    name='SearchPage'
                    component={SearchPage}
                    options={{ title: 'Search Page' }} />
            </Stack.Navigator>

        </NavigationContainer>


    )
}


