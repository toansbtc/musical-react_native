import React from 'react'
import { PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAddressBook, faDownload, faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { Search } from '../API/APIYouTube'
import SearchPage from '../Screens/SearchPage';

const permission = async () => {
    console.log('running');
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.denied)
                console.log('ok')
        } catch (error) {
            console.error(error)
        }
    }
}

export default function Footer({ navigation }: any) {

    permission();

    return (
        <View style={style.footer}>


            <TouchableOpacity onPress={() => navigation.navigate("")} style={style.icon}>
                <FontAwesomeIcon icon={faList} color='#df1717' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SearchPage")} style={style.icon}>
                <FontAwesomeIcon icon={faSearch} color='#df1717' />
            </TouchableOpacity>

            <View style={style.circle}>
                <TouchableOpacity onPress={() => navigation.navigate("")} style={style.home}>
                    <FontAwesomeIcon icon={faHome} size={40} color='#e6d713' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("")} style={style.icon} >
                <FontAwesomeIcon icon={faDownload} color='#df1717' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("")} style={style.icon}>
                <FontAwesomeIcon icon={faAddressBook} color='#df1717' />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        width: '100%',
        backgroundColor: '#e476bf',
        shadowColor: '#3b0c0c',
        shadowOffset: {
            width: 4,
            height: 4
        },
        justifyContent: 'space-around',
        alignContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row',
        position: 'relative'

    },

    icon: {
        minWidth: 50,
        minHeight: 20,
        padding: 10,
        // backgroundColor: '#585f57',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    home: {
        minWidth: 60,
        minHeight: 30,
        alignItems: 'center'
    },

    circle: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#2732c0',
        justifyContent: 'center',
        alignItems: 'center',

    }
})