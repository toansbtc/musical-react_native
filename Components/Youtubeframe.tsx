import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function Youtubeframe({ youTube }: any, { sendDatatoParent }: any) {
    const [playReady, setPlayReady] = useState(false);
    const [videoId, discription, title, imageLink] = youTube;

    useEffect(() => {
        setPlayReady(true);
    }, []);
    return (
        <View style={style.item_youtube}>
            <TouchableWithoutFeedback
                onPress={() => {
                    sendDatatoParent(youTube)
                }}
            >

                {/* {playReady && (
                <YoutubeIframe
                    videoId={videoId}
                    height={250}
                    width={250}
                    play={false}
                    onReady={() => setPlayReady(true)}
                />
            )}
            <View style={style.descript}>
                <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold' }}>{title}</Text>
                <Text numberOfLines={5} style={{ flexShrink: 1, flexWrap: 'wrap', marginTop: 10, flexDirection: 'row' }} aria-valuemax={100}>{discription}</Text>
            </View> */}

                <Image source={{ uri: imageLink }} height={250} width={250} />


            </TouchableWithoutFeedback>

            <View style={style.descript}>
                <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold' }}>{title}</Text>
                <Text numberOfLines={5} style={{ flexShrink: 1, flexWrap: 'wrap', marginTop: 10, flexDirection: 'row' }} aria-valuemax={100}>{discription}</Text>
            </View>
            <View style={{ height: 100, width: '100%' }}></View>
        </View>

    );
}

const style = StyleSheet.create({
    item_youtube: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 200,
        marginBottom: 80
    },
    descript: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 20,
        width: '60%',
    }
})
