import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, TextInput, View } from 'react-native'
import style from '../asset/style.dasboard'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import SearchPage from './SearchPage';
import LoginScreen from './LoginScreen';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Redux from './Redux/Redux';
import NewRedux from './Redux/NewRedux';
import { requestPermission } from '../permission/permission';
import PlaySound from './PlaySound';
import PlaySound_modal from '../Components/Modal_Component/PlaySound_modal';
import { SoundProvide } from '../Components/soundProvide';





export default function Dasboard() {
    const [username, setusername] = useState("");
    const [pass, setpass] = useState("");
    const [playSoundPopup, setPlaySoundPopup] = useState(false);
    const [dataSong, setDataSong] = useState([]);

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
    // const Drawer = createDrawerNavigator();

    requestPermission();



    function handleOpenPopup(file) {
        console.log("handle open file");
        console.log(playSoundPopup == false)
        if (playSoundPopup == false)
            setPlaySoundPopup(true)
        console.log(playSoundPopup)
        setDataSong(file);
    }

    function closePopup(option: boolean) {
        setPlaySoundPopup(option);
    }

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

        <Provider store={Store}>
            <SoundProvide>

                <NavigationContainer >
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen
                            name='home'
                            component={Home}
                            //initialParams={{ handleOpenPopup: handleOpenPopup }}
                            options={{ title: 'Home page', headerShown: false }} >
                            {/* {() => <Home handleOpenPopup={handleOpenPopup} />} */}
                        </Stack.Screen>
                        <Stack.Screen
                            name='redux'
                            component={Redux}
                            options={{ title: 'test redux', headerShown: false }} />
                        <Stack.Screen
                            name='newredux'
                            component={NewRedux}
                            options={{ title: 'test redux', headerShown: false }} />
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ title: 'Login page', headerShown: false }} />
                        <Stack.Screen
                            name='SearchPage'
                            component={SearchPage}
                            options={{ title: 'Search Page', headerShown: false }} />
                        <Stack.Screen
                            name='PlaySound'
                            component={PlaySound}
                            options={{ title: 'Play Sound Track', headerShown: false, animation: "fade_from_bottom" }} />
                    </Stack.Navigator>
                    <PlaySound_modal visible={playSoundPopup} dataSong={dataSong} onclose={closePopup} />
                </NavigationContainer>
            </SoundProvide>
        </Provider>

    )
}


