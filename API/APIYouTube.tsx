import { text } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react"
import React from 'react'
import RNFS from 'react-native-fs'
import { API_Key } from '@env';
import { PermissionsAndroid } from "react-native";
import useDownloader from 'react-use-downloader'
import { error } from "console";
// import dotenv from 'dotenv';
// dotenv.config();


// const API_Key = process.env.API_Key;




//export const API_Key = 'AIzaSyDravj7da6nwaeH8iI_tQolnEX7db4cMcQ'
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/search';
const VIDEO_URL = 'https://www.youtube.com/watch?v=';
const PART = 'snippet';
//const MAX_RESULTS = '25';
const TYPE = 'video';
const videoDuration = 'medium';

export function Search(Text: String, MAX_RESULTS: string, regionCode: string = 'VN'): () => Promise<any> {


    const searchURL = `https://youtube.googleapis.com/youtube/v3/search?part=${PART}&regionCode=${regionCode}&maxResults=${MAX_RESULTS}&q=${Text}&type=${TYPE}&key=${API_Key}`;
    //`${BASE_URL}?part=${PART}&maxResults=${MAX_RESULTS}&q=${Text}&id=7lCDEYXw3mM&type=${type}&key=${API_Key}`

    console.log(searchURL)
    return async function fetchDataSearch() {
        try {
            const response = await fetch(searchURL);
            const dataJson = await response.json();
            return dataJson;
        } catch (error) {
            console.error(error);
        }


    }

}


export function popularList(MAX_RESULTS: string, regionCode: string = 'VN'): () => Promise<any> {

    const popularURL = `${BASE_URL}?part=${PART}&q=trending&regionCode=${regionCode}&videoDuration=${videoDuration}&oder=viewCount&maxResults=${MAX_RESULTS}&type=${TYPE}&key=${API_Key}`

    console.log(popularURL)
    return async function fetchDataPopular() {
        try {
            const response = await fetch(popularURL);
            const dataJson = await response.json();
            console.log('data popular');
            console.log(dataJson);
            return dataJson;
        } catch (error) {
            console.error(error);
        }
    }
}


export function downloadMusic(videoID: string, fileName: string) {
    const youtubeVideoUrl = VIDEO_URL + videoID;
    const externalDiretory = RNFS.ExternalDirectoryPath;
    const externalStorage = RNFS.ExternalStorageDirectoryPath;

    // const object = {
    //     output: RNFS.ExternalStorageDirectoryPath,
    //     filename: fileName,
    //     link: youtubeVideoUrl
    // }

    // console.log(object.output);
    const grand = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            'title': 'Storage Read Permission',
            'message': 'App needs access to your storage to function properly.',
            'buttonNeutral': 'Ask Me Later',
            'buttonNegative': 'Cancel',
            'buttonPositive': 'OK'
        }
    );



    const data = async () => {
        console.log("in here3")
        try {
            console.log("in here 2")

            const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
            await download(youtubeVideoUrl, fileName).then((data) => {
                console.log(data)
            }).catch((error) => console.error(error));

        } catch (error) {
            console.error(error);
        }
    }


}


// export function loadChanel(chanelId:string):() =>Promise<any>{

//     const popularURL = `${BASE_URL}?part=${PART}&q=trending&regionCode=${regionCode}&oder=viewCount&maxResults=${MAX_RESULTS}&type=${type}&key=${API_Key}`

//     console.log(popularURL)
//     return async function fetchDataPopular() {
//         try {
//             const response = await fetch(popularURL);
//             const dataJson = await response.json();
//             return dataJson;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
