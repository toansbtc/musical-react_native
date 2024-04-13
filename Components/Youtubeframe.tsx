import React, { useCallback, useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
//import { API_Key } from '../API/APIYouTube'
import { API_Key } from '@env';
// import dotenv from 'dotenv';
// dotenv.config();


// const API_Key = process.env.API_Key;

async function name(channelId: string) {
    try {

        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id=${channelId}&key=${API_Key}`;
        const response = await fetch(url);

        const data = await response.json();

        // console.log(url)
        // console.log(data.items[0].snippet.thumbnails.default.url);

        return data.items[0].snippet.thumbnails.default.url;
    } catch (error) {

    }

}

const setDisplayTitle = (title: string): string => {
    let data = '';
    const array = title.split(' ');
    for (let i = 0; i < 10; i++)
        if (typeof array[i] !== 'undefined')
            data += ' ' + array[i]

    if (array.length > 10)
        data += ' ...'
    return data


}



export default function Youtubeframe({ youTube, sendDatatoParent }: any) {
    const [playReady, setPlayReady] = useState(false);
    const [videoId, discription, title, imageLink, channelId, channelTitle] = youTube;
    const { width, height } = Dimensions.get('window');
    const [imageChanelLink, setImageChannelLink] = useState('');

    name(channelId).then((data) => { if (data != null) setImageChannelLink(data) });

    useEffect(() => {
        setPlayReady(true);
    }, []);

    const checkRotation = useCallback(() => {
        // console.log('rotate haha')
        if (width > height)
            return style.horizantal
        else
            return style.vertical
    }, [width | height])


    return (
        <View style={style.item_youtube}>
            <TouchableWithoutFeedback
                onPress={() => {
                    sendDatatoParent(youTube)
                }}
            >

                <Image source={{ uri: imageLink }} style={checkRotation()} />

            </TouchableWithoutFeedback>
            <View style={style.infor}>
                <View style={style.descript}>
                    <Text style={[{ marginLeft: 10, fontSize: 19, fontStyle: 'normal', fontWeight: 'bold' }, style.text]}>{setDisplayTitle(title)}</Text>
                    <Text style={[{ margin: 10 }, style.text]}>{discription}</Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        sendDatatoParent(channelId)
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>



                        <Image source={loadImageChanel(imageChanelLink as string)} style={style.imageChanel} />

                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{channelTitle}</Text>
                    </View>
                </TouchableWithoutFeedback>


            </View>
        </View>
    );
}

const loadImageChanel = (imageChanelLink: string) => {
    try {
        return imageChanelLink !== '' ? { uri: imageChanelLink } : { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzYoYuB-6XTjMn2c-tiXfoDOfTW0D6HhJZDnFLrOLMAE7r3R2wjiBs3YLycWO8zHheq78&usqp=CAU' }
    } catch (error) {
        console.error(error);
    }
}

const style = StyleSheet.create({
    item_youtube: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 200,
        width: 'auto',
        margin: 10,
        // borderWidth: 1,
        // borderColor: 'red'
    },
    infor: {
        flex: 1,
        flexDirection: 'column'
    },
    descript: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    text: {
        // flex: 1,
        //maxWidth: '80%',
        color: '#000',
        lineHeight: 21,
        includeFontPadding: true,
        overflow: 'hidden',
        flexShrink: 1,
        alignItems: 'flex-start',

    },
    imageChanel: {
        width: 20,
        height: 20,
        borderRadius: 10,
        margin: 10
    },
    horizantal: { width: '40%', height: '110%' },
    vertical: { width: '50%', height: '100%' }
})
