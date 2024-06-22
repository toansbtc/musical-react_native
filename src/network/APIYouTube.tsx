import { text } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react"
import React from 'react'
import RNFS, { DownloadBeginCallbackResult, DownloadProgressCallbackResult } from 'react-native-fs'
import { PermissionsAndroid, View } from "react-native";
import { error } from "console";
import { Readline } from "readline/promises";
import { cursorTo } from "readline";
import RNFetchBlob from "rn-fetch-blob";
import fs from "fs"
import { useSelector } from "react-redux";
import store, { RootState } from "../../Screens/Redux/Store";
import { checkPermission, requestPermission } from "../permission/permission";
import getAPI_KEY from "../../Screens/Redux/getRedux";
import serverURL from "./API_URL";
import { stringify } from "querystring";
//import { API_Key } from '@env';
// import dotenv from 'dotenv';
// dotenv.config();


// const API_Key = process.env.API_Key;




//export const API_Key = 'AIzaSyDravj7da6nwaeH8iI_tQolnEX7db4cMcQ'
//const MAX_RESULTS = '25';
//const API_Key = useSelector((state: RootState) => state.counter.API_key)
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/search';
const VIDEO_URL = 'https://www.youtube.com/watch?v=';
const PART = 'snippet';
const TYPE = 'video';
const videoDuration = 'medium';



export function Search(Text: String, MAX_RESULTS: string, regionCode: string): () => Promise<any> {


    const searchURL = `https://youtube.googleapis.com/youtube/v3/search?part=${PART}&regionCode=${regionCode}&maxResults=${MAX_RESULTS}&q=${Text}&type=${TYPE}&key=${getAPI_KEY(store)}`;
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


export function popularList(MAX_RESULTS: string, regionCode: string): () => Promise<any> {

    const popularURL = `${BASE_URL}?part=${PART}&q=trending&regionCode=${regionCode}&videoDuration=${videoDuration}&oder=viewCount&maxResults=${MAX_RESULTS}&type=${TYPE}&key=${getAPI_KEY(store)}`

    console.log(popularURL)
    return async function fetchDataPopular() {
        try {
            const response = await fetch(popularURL);
            const dataJson = await response.json();
            // console.log('data popular');
            // console.log(dataJson);
            return dataJson;
        } catch (error) {
            console.error("popular list:" + error);
        }
    }
}

const fetchDataYT = async (videoID: string, fileName: string) => {
    const data = await fetch(`${serverURL()}/Youtube/download`,
        {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "videoURL": `https://www.youtube.com/watch?v=${videoID}`,
                "videoID": videoID,
                "file_name": fileName
            })
        });
    if (!data.ok) {
        throw new Error("faile connect to server")
    }

    return data.blob()
}

export async function downloadMusic(videoID: string, fileName: string) {
    const youtubeVideoUrl = VIDEO_URL + videoID;
    const externalDiretory = RNFS.ExternalDirectoryPath;
    const externalStorage = RNFS.ExternalStorageDirectoryPath;
    const file_path = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.mp3`;


    const check = await checkPermission().then(check => { return check })
    if (check === true) {

        const response = await RNFetchBlob
            .config({
                fileCache: true,
                // addAndroidDownloads: {
                //     useDownloadManager: true,
                //     title: "Downloading " + fileName,
                //     notification: true
                // },
                path: file_path
            })

            .fetch('POST', `${serverURL()}/Youtube/download`,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify({
                    "videoURL": `https://www.youtube.com/watch?v=${videoID}`,
                    "videoID": videoID,
                    "file_name": fileName
                }));
        if (response.respInfo.status == 200) {
            console.log("write success")
        }



        // const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.mp3`;
        // const urlFetch = `${serverURL()}/Youtube/download`;





        // const blob = await fetchDataYT(videoID, fileName).then;
        // console.log(blob._data)
        // const arrayBuffer = await blob.arrayBuffer();
        // const blobString = new TextDecoder('utf8').decode(arrayBuffer);
        // RNFS.writeFile(file_path, blobString, "binary")

        // const arrayBuffer = await new Response(blob).arrayBuffer(); // Convert Blob to ArrayBuffer
        // const uint8Array = new Uint8Array(arrayBuffer);
        // const base64String = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
        // await RNFetchBlob.fs.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.mp3`, base64String, "base64")



        // const reader = new FileReader();
        // reader.onload = async () => {
        //     let base64String;
        //     if (typeof reader.result === 'string') {
        //         base64String = reader.result.split(',')[1]
        //     }
        //     else {
        //         const arrayBuffer = new Uint8Array(reader.result);
        //         const uintArray = Array.from(arrayBuffer);
        //         base64String = String.fromCharCode.apply(null, uintArray);
        //     }
        //     console.log("base 64 " + base64String)
        //     await RNFS.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.mp3`, base64String, "base64");
        // }


        // const dataArrayBuffer = await blob.arrayBuffer();
        // const binayContent = new Uint8Array(dataArrayBuffer).toString();

        //await RNFS.writeFile(`${RNFetchBlob.fs.dirs.MusicDir}/${fileName}.mp3`, base64String, 'base64');

        // dta.then((res) => {
        //     console.log('start download')
        //     console.log(res)
        // }) 
    }
    else
        requestPermission()

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
