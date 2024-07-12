import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Footer from '../Components/Footer'
import { View } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import Sound from 'react-native-sound'
import { error } from 'console'
import { downloadMusic } from '../network/APIYouTube'
import { useDispatch, useSelector } from 'react-redux'
import store, { Appdispatch, RootState } from './Redux/Store'
import { getKEY_From_Server } from './Redux/redux_API_Slice'
import getAPI_KEY from './Redux/getRedux'
import { savePathSong, saveTime } from './Redux/redux_PlaySound_Slide'
import { create_DB, get_DB_Song } from '../Sqlite/store_song'




export default function Home({ navigation, route }: any) {

    useEffect(() => {

        const loadSQL = async () => {
            await create_DB();
            await get_DB_Song();
            console.log("loaded data from sql")
        }

        loadSQL();
    }, [])

    const dispatch = useDispatch<Appdispatch>();
    const SoundRef = useRef<Sound | null>(null);
    // const { handleOpenPopup } = route.params;

    useEffect(() => {
        dispatch(getKEY_From_Server());
    }, [dispatch]);

    const jey = getAPI_KEY(store);
    const path = `${RNFetchBlob.fs.dirs.MainBundleDir}/Music`;

    const listFileYT: Promise<RNFS.ReadDirItem[]> = RNFS.readDir(path);
    console.log(listFileYT)
    const [musicList, setMusicList] = useState<string[]>([]);
    const list: any[] = [];
    useEffect(() => {
        const create_Dir = async () => {
            const check = await RNFetchBlob.fs.isDir(path);
            if (!check)
                await RNFetchBlob.fs.mkdir(path);
        }
        create_Dir();
        RNFS.readdir(path)
            .then(files => {
                if (files.length > 0) {
                    console.log('Files in folder:', files);
                    files.forEach(element => {
                        console.log(path + '/' + element)
                        list.push([path + '/' + element, element.replace(".mp3", "")])
                    })
                }
            })
            .catch(error => {
                console.error('Error reading folder:', error);
            });
        setMusicList(list);
    }, [navigation])


    // ).catch((error) => { console.error(error) })
    // }

    const renderListMusic = ({ item }) => {
        if (item !== null) {
            const [path, name] = item;

            //item = [path, name, "home"];
            return (
                <ScrollView style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        {/* <TouchableOpacity onPress={() => handleOpenPopup(item)}> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate("PlaySound", { item })}> */}
                        <TouchableOpacity onPress={() => {
                            dispatch(savePathSong(path));
                            dispatch(saveTime(0));
                            navigation.navigate("PlaySound");
                        }}>
                            <View style={{ flexWrap: "wrap", columnGap: 2 }}>
                                <Text numberOfLines={3} >{name}</Text>
                            </View>
                        </TouchableOpacity>


                    </View>



                </ScrollView>
            )
        }
        else
            return (
                <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
                    <Text>empty</Text>
                </View>
            )
    }

    return (
        <SafeAreaView style={style.container}>

            <View style={style.content}>

                <FlatList
                    data={musicList}
                    renderItem={renderListMusic}
                    disableVirtualization={true}
                />
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
        justifyContent: 'flex-start',
        alignContent: 'center'
    }
})