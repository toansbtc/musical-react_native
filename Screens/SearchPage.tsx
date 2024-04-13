import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Text, View, DrawerLayoutAndroid, FlatList, TouchableOpacity, Image, Touchable, TouchableHighlightBase, TouchableNativeFeedback, Keyboard, TouchableOpacityBase, Modal, ActivityIndicator } from 'react-native'
import Home from './Home';
import { Search, popularList } from '../API/APIYouTube';
import Youtubeframe from '../Components/Youtubeframe';
import { TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Footer from '../Components/Footer';
import { faCancel, faClose, faFilter } from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import YoutubeIframe from 'react-native-youtube-iframe';
import { ModalFilter, ModalYoutubeVideo } from '../Modal_Component/SearchPage_modal';



async function onSearch(text?: string | undefined, totalVideo: string = '10', regionCode: string = 'VN'): Promise<string[]> {
    const arrayVideo: any[] = [];
    let dataSearch: () => Promise<any>;
    if (typeof text === 'string') {
        dataSearch = Search(text, totalVideo, regionCode);
    }
    else {
        dataSearch = popularList(totalVideo, regionCode);

    }
    try {


        const data = await dataSearch();
        if (data.items != null) {
            for (let i = 0; i < Array(data.items)[0].length; i++)
                if (data.items[i].snippet.channelTitle !== "TRENDING") {
                    arrayVideo.push([data.items[i].id.videoId,
                    data.items[i].snippet.description,
                    data.items[i].snippet.title,
                    data.items[i].snippet.thumbnails.high.url,
                    data.items[i].snippet.channelId,
                    data.items[i].snippet.channelTitle]);

                }
            // })

        }
    } catch (error) {
        console.error(error);
        return [] as string[]
    }
    return arrayVideo as string[];
}


export default function SearchPage({ navigation }: any) {
    //const date =

    //const { data } = route.params;

    //const [search, setSearch] = useState('');
    const route = useRoute();
    const txtSearch = useRef('');
    const [cleanText, setCleanText] = useState('')
    const [itemYT, setItemYT] = useState<Array<string>>();
    const [searchText, setSearchText] = useState('');
    const [youtubeVideo, setYoutubeVideo] = useState<string[]>(['']);
    const [totalVideo, setTotalVideo] = useState('10');
    const [regionCode, setRegionCode] = useState('vn');
    const [pageNumber, setPageNumber] = useState(1);


    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [openModalVideoYT, setOpenModalVideoYT] = useState(false);
    const [loading, setLoading] = useState(false);


    const getDatafromChild = (data: any) => {
        if (typeof data === 'string') {
            onSearch(data, totalVideo, regionCode).then((item) => {
                setItemYT(item);
            })
            //console.log('id chanel' + data);
        }
        else {

            setOpenModalVideoYT(true);
            setYoutubeVideo(data);
            // console.log(typeof data)
            //data1 = data;
        }
    }

    const renderVideo = ({ item }: any) => {
        // console.log('render ' + item);
        return (
            <Youtubeframe youTube={item} sendDatatoParent={getDatafromChild} />
        )
    }

    useRef(renderVideo);

    useEffect(() => {
        if (searchText !== null && searchText !== '') {
            onSearch(searchText, totalVideo, regionCode).then((data) => {
                setItemYT(data);
            })
        }
    }, [searchText]);

    useEffect(() => {

        onSearch(undefined, totalVideo, regionCode).then((data) => {
            setItemYT(data)
        })
    }, [])





    function loadMoreVideo(): void {
        console.log('load more')
    }

    return (
        <View style={{ flexDirection: 'column', flex: 1 }}>

            <View style={{ backgroundColor: 'red', borderWidth: 0.5, borderColor: 'black', shadowColor: 'black', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <ModalYoutubeVideo open={openModalVideoYT} setStatus={(data: boolean) => setOpenModalVideoYT(data)} youtubeVideo={youtubeVideo} />
                <ModalFilter open={openModalFilter} setStatus={(data: any) => setOpenModalFilter(data)} />


                <View>
                    <TouchableOpacity
                        onPress={() => setOpenModalFilter(true)}
                    >
                        <FontAwesomeIcon icon={faFilter} size={25} />
                    </TouchableOpacity>

                </View>
                <View style={{ margin: 20, flexDirection: 'row', backgroundColor: 'red', height: 50, maxWidth: '60%' }}>

                    <TextInput placeholder='Input text for search' value={cleanText}
                        onChangeText={(text) => { txtSearch.current = text; setCleanText(text) }}
                        style={{ width: '100%', height: '100%', borderRadius: 15, borderWidth: 1.5, backgroundColor: 'white' }} />
                    <View style={{ marginLeft: -45, marginRight: 20, alignContent: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { txtSearch.current = '', setCleanText('') }}
                        >

                            <FontAwesomeIcon icon={faClose} size={30} style={{ color: 'gray', }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginLeft: -15,
                        justifyContent: 'center',
                        backgroundColor: 'gray',
                        width: 60,
                        alignItems: 'flex-start',
                        paddingLeft: 10, height: '100%',
                        borderBottomRightRadius: 15,
                        borderTopRightRadius: 15,
                        borderWidth: 1

                    }}>

                        <TouchableOpacity onPress={() => {
                            let searchData = '';
                            if (txtSearch.current)
                                searchData = txtSearch.current;
                            console.log('data' + searchData)
                            if (searchData != '') {
                                console.log('' + searchData);
                                setSearchText(searchData);
                                Keyboard.dismiss();
                            }
                        }}>
                            <FontAwesomeIcon icon={faSearch} size={36} color='black' />
                        </TouchableOpacity>

                    </View>
                </View>


            </View>

            <View style={{ borderWidth: 0.5, margin: 20, borderColor: 'black' }}></View>

            <View style={{ flex: 1 }}>
                {<FlatList
                    inverted
                    data={itemYT}
                    renderItem={renderVideo}
                    keyExtractor={(item) => item}
                    disableVirtualization={true}
                    onEndReached={() => loadMoreVideo()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator />
                        ) : null
                    }

                />}

            </View>

        </View>
    )
}


