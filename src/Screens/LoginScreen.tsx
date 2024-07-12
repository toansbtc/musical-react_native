

import React, { ReactElement, useState } from 'react'
import { Button, Image, ImageBackground, Modal, SafeAreaView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import styleLogin from '../../asset/style.login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dasboard from './Dasboard';
import Popup from '../Components/Modal_Component/Popup';
import ImageBG from '../../asset/image/background.jpg';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function LoginScreen({ navigation }: any) {
    let [username, setusername] = useState("");
    let [passwword, setpassword] = useState("");
    const [isvisible, setvisible] = useState(false);
    const img = Image.resolveAssetSource(ImageBG).uri;




    async function chekLogin() {
        const dataJson = await fetch('http://5.1.182.118:8080/QAMWebService/webapi/user/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'factory': "FTI",
                    'userid': username,
                    'password': passwword,
                    'acc_system': "NGB"
                })
            }).then((dataResponse) => dataResponse.json())
            .then((data) => {

                // console.log(data)
                // let dataArray = Array(data).forEach(element => {

                //     console.log(element.user.USER_ID)
                // });
                return (

                    navigation.navigate("Home", { data })
                )
            })
            .catch(error => {
                console.error("error:" + error)
                return null
            })


    }

    function getdata() {
        console.log(chekLogin())
        // Array(data).forEach(element => {
        //     console.log(element.user.USER_ID)
        // });
    }



    function About(): void {

    }

    return (
        <ImageBackground style={styleLogin.container} source={{ uri: img }}>
            <SafeAreaView >

                <View style={styleLogin.form}>
                    <Text style={styleLogin.label}>UserName</Text>
                    <TextInput style={styleLogin.textinput} placeholder='Enter User Name' onChangeText={text => setusername(text)}></TextInput>
                    <Text style={styleLogin.label}>PassWord</Text>
                    <TextInput style={styleLogin.textinput} placeholder='Enter PassWord' secureTextEntry onChangeText={pass => setpassword(pass)}></TextInput>
                    <Button title='login' color={'#fcaf0b'} onPress={getdata}></Button>
                    <View style={styleLogin.footer}>
                        <View style={styleLogin.pass}>
                            <TouchableOpacity>
                                <Text style={{ color: 'blue', paddingTop: 15 }}>forget your password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: 'blue', paddingTop: 15, }}>Change your password!</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={About} style={{ alignSelf: 'center', paddingTop: 10 }}>
                            <Text style={{ color: 'blue', }}>About us?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
            <Modal transparent={true} animationType='fade' visible={isvisible} >
                <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'column' }}>
                        <Text>Notice</Text>
                        <Text>Your account dont match!!</Text>
                        <Button title='ok' onPress={() => setvisible(false)}></Button>
                    </View>
                </View>
            </Modal>


        </ImageBackground>
    )
}
