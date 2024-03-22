import { text } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react"
import React from 'react'
//import { API_Key } from '@env';



export const API_Key = 'AIzaSyDravj7da6nwaeH8iI_tQolnEX7db4cMcQ'
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/search';
const PART = 'snippet';
const MAX_RESULTS = '25';
const ORDER = 'viewCount';
const CHART = 'mostPopular';
const type = 'video';



export function Search(Text: String, regionCode: string = 'VN'): () => Promise<any> {

    const searchURL = `https://youtube.googleapis.com/youtube/v3/search?part=${PART}&regionCode=${regionCode}&maxResults=${MAX_RESULTS}&q=${Text}&type=${type}&key=${API_Key}`;
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


export function popularList(regionCode: string = 'VN'): () => Promise<any> {

    const popularURL = `${BASE_URL}?part=${PART}&q=trending&regionCode=${regionCode}&oder=viewCount&maxResults=${MAX_RESULTS}&type=${type}&key=${API_Key}`

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
