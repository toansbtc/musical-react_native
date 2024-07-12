
import { NavigationContainer, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Text, View, DrawerLayoutAndroid, FlatList, TouchableOpacity, Image, Touchable, TouchableHighlightBase, TouchableNativeFeedback, Keyboard, TouchableOpacityBase, Modal, ActivityIndicator, LayoutChangeEvent, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import Home from './Home';
import { Search, popularList } from '../network/APIYouTube';
import Youtubeframe from '../Components/Youtubeframe';
import { TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Footer from '../Components/Footer';
import { faArrowUp, faCancel, faClose, faFilter, faWarning } from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import YoutubeIframe from 'react-native-youtube-iframe';
import { ModalFilter, ModalYoutubeVideo } from '../Components/Modal_Component/SearchPage_modal';
import { useDispatch, useSelector } from 'react-redux';
import store, { Appdispatch, RootState } from './Redux/Store';
import getAPI_KEY from './Redux/getRedux';
import { getKEY_From_Server } from './Redux/redux_API_Slice';


interface dataPaging {
    [key: number]: string[],
}


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
        if (typeof data === 'object' && data !== null)
            if ("items" in data)
                if (data.items != null) {
                    for (let i = 0; i < Array(data.items)[0].length; i++)
                        //if (data.items[i].snippet.channelTitle !== "TRENDING") {
                        arrayVideo.push([data.items[i].id.videoId,
                        data.items[i].snippet.description,
                        data.items[i].snippet.title,
                        data.items[i].snippet.thumbnails.high.url,
                        data.items[i].snippet.channelId,
                        data.items[i].snippet.channelTitle]);

                    //}
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
    const flatlistRef = useRef<FlatList>(null);


    const route = useRoute();
    const txtSearch = useRef('');
    const [visibleScroll, setVisibleScroll] = useState(false);
    const [cleanText, setCleanText] = useState('')
    const [allItemYT, setAllItemYT] = useState<dataPaging>([]);
    const [itemYT, setItemYT] = useState<Array<string>>([]);
    const [searchText, setSearchText] = useState('');
    const [youtubeVideo, setYoutubeVideo] = useState<string[]>(['']);
    const [totalVideo, setTotalVideo] = useState('50');
    const [regionCode, setRegionCode] = useState('vn');
    let [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [openModalVideoYT, setOpenModalVideoYT] = useState(false);
    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch<Appdispatch>();

    const reloadKey = useCallback(() => {
        dispatch(getKEY_From_Server());
    }, [dispatch])

    const checkKey = () => {
        if (typeof useSelector((state: RootState) => state.API.API_key) !== 'undefined'
            && useSelector((state: RootState) => state.API.API_key) !== ""
            && useSelector((state: RootState) => state.API.API_key) !== null)
            return true
        return false
    }


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
        //console.log('render ' + item);
        return (
            <Youtubeframe youTube={item} sendDatatoParent={getDatafromChild} />
        )
    }

    useRef(renderVideo);

    const renderTextSearch = () => {
        if (searchText !== null && searchText !== '') {
            setLoading(true);
            onSearch(searchText, totalVideo, regionCode).then((data) => {
                const item = pagePaging(data);
                setPageNumber(0)
                setAllItemYT(item);
                setItemYT(item[pageNumber]);

                flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
                console.log("renderTextSearch");
                setLoading(false);
            })
        }

    };

    useEffect(() => { renderTextSearch() }, [searchText]);

    const renderPopularVideo = () => {

        setLoading(true);
        onSearch(undefined, totalVideo, regionCode).then((data) => {
            const item = pagePaging(data);
            setPageNumber(0);
            setAllItemYT(item);
            setItemYT(item[pageNumber]);
            // console.log(allItemYT);
            // console.log(itemYT);
            console.log("renderPopularVideo");
            setLoading(false);
        })

    }
    useEffect(() => { renderPopularVideo() }, []);

    const pagePaging = (data: any) => {




        let itemData: string[] = [];
        let returnData: dataPaging = [];
        if (data.length % 10 === 0)
            setTotalPage(Math.trunc(data.length / 10) - 1);
        else
            setTotalPage(Math.trunc(data.length / 10));

        console.log('total page: ' + totalPage);
        for (let i = 0; i < data.length; i += 1) {
            {

                itemData.push(data[i]);
                if (i % 10 === 0 && i != 0) {
                    returnData[i / 10 - 1] = (itemData.slice());
                    itemData = [];
                }
            }
        }
        return returnData;
    }




    /**
     * 
     */
    // function loadMoreVideo() {
    const onEndReached = () => {

        if (pageNumber < totalPage) {

            setPageNumber(pageNumber += 1);
            const newData: string[] = allItemYT[pageNumber] ?? [];
            setItemYT(prevData => [...prevData, ...newData]);

        }
        console.log('load more')
    }

    const goToTop = () => {
        flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }



    // if (useSelector((state: RootState) => state.counter.API_key) === ""
    //     || useSelector((state: RootState) => state.counter.API_key) === undefined) {
    //     setTimeout(() => {
    //         dispatch(getKEY_From_Server());
    //         console.log("getting key from server")
    //     }, 100000)
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     )
    // }
    if (checkKey())
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <FontAwesomeIcon icon={faWarning} size={40} />
                    <Text>Some problem when take data from server!</Text>
                    <TouchableOpacity onPress={() => {
                        dispatch(getKEY_From_Server());
                        if (!checkKey()) {
                            renderPopularVideo();
                        }
                    }}>

                        <Text style={{ color: "blue" }} selectionColor={"yellow"}>Reload again</Text>
                    </TouchableOpacity>
                </View>
                <Footer navigation={navigation} />
            </View>

        )
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
            <View style={{ flexDirection: 'column', flex: 1 }}>

                <View style={{ backgroundColor: 'red', borderWidth: 0.5, borderColor: 'black', shadowColor: 'black', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <ModalYoutubeVideo open={openModalVideoYT} setStatus={(data: boolean) => setOpenModalVideoYT(data)} youtubeVideo={youtubeVideo} />
                    <ModalFilter open={openModalFilter} setStatus={(data: any) => setOpenModalFilter(data)}
                        dataFilter={(data) => {
                            const { data1, data2 } = data;
                            setTotalVideo(data1);
                            setRegionCode(data2);
                            if (searchText != '')
                                renderTextSearch();
                            else
                                renderPopularVideo();
                            console.log(regionCode + totalVideo)
                        }} />


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

                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {loading && (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text>Wait a moment</Text>
                            </View>
                        )}
                        {!loading && (<FlatList
                            data={itemYT}
                            ref={flatlistRef}
                            renderItem={renderVideo}

                            // keyExtractor={(item) => item[0]}
                            disableVirtualization={true}
                            onEndReached={() => onEndReached()}
                            onEndReachedThreshold={0.01}
                            onScroll={(event) => {
                                const { contentOffset } = event.nativeEvent;
                                contentOffset.y > 500 ? setVisibleScroll(true) : setVisibleScroll(false);
                            }}
                        // ListFooterComponent={
                        //     loading ? (
                        //         <ActivityIndicator size={'large'} color="#0000ff" />
                        //     ) : null
                        // }

                        />)}
                        <View style={{ position: 'absolute', marginTop: '100%', marginLeft: '90%' }}>
                            {visibleScroll &&
                                (<TouchableWithoutFeedback onPress={() => goToTop()} >
                                    <FontAwesomeIcon icon={faArrowUp} size={40} style={{ backgroundColor: 'red' }} />
                                </TouchableWithoutFeedback>)}
                        </View>
                    </View>
                    <View>

                        <Footer navigation={navigation} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </KeyboardAvoidingView>
    )
}
