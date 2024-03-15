import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Footer from '../Components/Footer'
import { View } from 'react-native'

export default function Home({ navigation }: any) {
    return (
        <SafeAreaView style={style.container}>

            <View style={style.content}>

            </View>
            <Footer navigation={navigation} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 5
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})