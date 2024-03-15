import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Text, View, DrawerLayoutAndroid, FlatList, TouchableOpacity, Image, Touchable, TouchableHighlightBase, TouchableNativeFeedback, Keyboard, TouchableOpacityBase, Modal } from 'react-native'
import Home from './Home';
import { Search, popularList } from '../API/APIYouTube';
import Youtubeframe from '../Components/Youtubeframe';
import { TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Footer from '../Components/Footer';
import { useDebounce } from 'use-debounce';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';



async function onSearch(text?: string): Promise<string[]> {
    const arrayVideo: any[] = [];
    let dataSearch: () => Promise<any>;
    if (typeof text === 'string') {
        dataSearch = Search(text);
    }
    else {
        dataSearch = popularList();

    }
    try {
        // dataSearch().then((data) => {
        //console.log(data);
        const data = await dataSearch();
        if (data.items != null)
            for (let i = 0; i < Array(data.items)[0].length; i++) {
                arrayVideo.push([data.items[i].id.videoId,
                data.items[i].snippet.description,
                data.items[i].snippet.title,
                data.items[i].snippet.thumbnails.high.url]);
            }
        // })

    } catch (error) {
        console.error(error);
        return [] as string[]
    }
    return arrayVideo as string[];
}


const renderVideo = ({ item }: any) => {
    console.log('render ' + item);
    return (
        <Youtubeframe youTube={item} />
    )
}

export default function SearchPage({ navigation }: any) {
    //const date =
    let search = '';
    const [itemYT, setItemYT] = useState<Array<string>>();
    const [openModal, setOpenModal] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [deboundSearchText, setDeboundSearchText] = useDebounce(searchText, 500);

    useRef(renderVideo);


    useEffect(() => {
        setSearchText(deboundSearchText);
    }, [deboundSearchText]);

    useEffect(() => {
        if (searchText !== null && searchText !== '') {
            onSearch(searchText).then((data) => {
                setItemYT(data);
            })
            // setItemYT(onSearch(searchText));
            // console.log('haha   ' + searchText)
        }
    }, [searchText]);

    useEffect(() => {

        onSearch().then((data) => {
            setItemYT(data)
        })
        //setItemYT(onSearch());
        //console.log('onload ' + itemYT)
    }, [])

    const route = useRoute();
    const txtSearch = useRef('');

    //const { data } = route.params;

    //const [search, setSearch] = useState('');


    const modalFilter = () => {
        if (openModal === false)
            setOpenModal(true);
    }

    function handleData(data: any) {
        console.log(data);
    }


    return (
        <View style={{ flexDirection: 'column', flex: 1 }}>



            <View style={{ backgroundColor: 'red', borderWidth: 0.5, borderColor: 'black', shadowColor: 'black', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <View>
                    <TouchableOpacity
                        onPress={() => { modalFilter }}
                    >

                        <FontAwesomeIcon icon={faFilter} />
                    </TouchableOpacity>
                    <Modal transparent={true} animationType='slide' visible={openModal} style={{ position: 'absolute', minWidth: 100 }}>

                        {/* <View>
                            <DropDownPicker
                            items={[]}
                            />
                        </View> */}

                    </Modal>
                </View>
                <View style={{ margin: 20, borderWidth: 0.5, borderColor: 'black', borderRadius: 10, flexDirection: 'row', backgroundColor: 'white', height: 50, maxWidth: '70%' }}>
                    <TextInput onChangeText={(text) => txtSearch.current = text} style={{ width: '95%' }} />

                    <TouchableNativeFeedback onPress={() => {
                        let searchData = '';
                        if (txtSearch.current)
                            searchData = txtSearch.current;
                        console.log(searchData)
                        if (searchData != '') {
                            console.log('' + searchData);
                            setSearchText(searchData);
                            Keyboard.dismiss();
                        }
                    }}
                        onBlur={() => {
                            if (txtSearch.current) {
                                setDeboundSearchText(txtSearch.current);
                            }
                        }}
                    >
                        <View style={{ justifyContent: 'center', backgroundColor: 'gray', width: 60, alignItems: 'flex-start', paddingLeft: 10, height: '100%', borderBottomRightRadius: 15, borderTopRightRadius: 15, borderWidth: 0.5, borderColor: 'black' }}>

                            <FontAwesomeIcon icon={faSearch} size={35} color='black' />
                        </View>
                    </TouchableNativeFeedback>
                </View>


            </View>
            <View style={{ borderWidth: 0.5, margin: 20, borderColor: 'black' }}></View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={itemYT}
                    renderItem={renderVideo}
                    keyExtractor={(item) => item}

                />
            </View>
            <Youtubeframe sendDatatoParent={handleData} />
        </View>
    )
}
