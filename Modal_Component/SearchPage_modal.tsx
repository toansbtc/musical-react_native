import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { downloadMusic } from "../API/APIYouTube";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCancel, faCheck, faCheckCircle, faClose, faDownload, faFaceAngry, faFaceDizzy, faFaceFrown } from "@fortawesome/free-solid-svg-icons";



export function ModalYoutubeVideo({ youtubeVideo, open, setStatus }: any) {
    let [openModal, setOpenModal] = useState(false);
    let [videoId, discription, title, imageLink, channelId, channelTitle] = ['', '', '', '', '', ''];
    const { width, height } = Dimensions.get('window');

    if (typeof youtubeVideo !== 'undefined')
        [videoId, discription, title, imageLink, channelId, channelTitle] = youtubeVideo;
    useEffect(() => { setOpenModal(open) }, [open]);
    return (
        <Modal animationType='fade' visible={openModal} >


            <View style={{}}>
                <Text>{ }</Text>
                {(
                    <YoutubeIframe
                        videoId={videoId}
                        height={width > height ? height : 360}
                        width={width > height ? width : undefined}
                        play={false}
                    />
                )}

                <View >
                    <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold' }}>{title}</Text>
                    <Text numberOfLines={5} style={{ flexShrink: 1, flexWrap: 'wrap', marginTop: 10, flexDirection: 'row' }} aria-valuemax={100}>{discription}</Text>
                    <View style={{ direction: 'ltr' }}>
                        <Image source={{ uri: imageLink }} />
                        <Text style={{ marginLeft: 20 }}>{channelTitle}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setStatus(false)}>
                        <FontAwesomeIcon icon={faClose} size={30} style={{ color: 'green' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => downloadMusic(videoId, title)}>
                        <FontAwesomeIcon icon={faDownload} size={30} style={{ color: 'red' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

interface CustomItemType extends ItemType<string> {
    label: string;
    value: string;
}

export function ModalFilter({ open, setStatus, dataFilter }: any) {
    const [openFilter, setOpenFilter] = useState(false);
    const [openPickerVideo, setOpenPickerVideo] = useState(false);
    const [openPickerRegion, setOpenPickerRegion] = useState(false);
    const [valueTotalVideo, setValueTotalVideo] = useState('10');
    const [valueRegion, setValueRegion] = useState('VN');

    const [itemsVideo, setItemsVideo] = React.useState<CustomItemType[]>([
        { label: '20 Videos', value: '20', icon: () => (<FontAwesomeIcon icon={faFaceFrown} size={10} />) },
        { label: '40 Videos', value: '40', icon: () => (<FontAwesomeIcon icon={faFaceDizzy} size={10} />) },
        { label: '60 Videos', value: '60', icon: () => (<FontAwesomeIcon icon={faFaceAngry} size={10} />) },
    ]);

    const [itemsRegion, setItemsRegion] = React.useState<CustomItemType[]>([
        { label: 'United Stated', value: 'US' },
        { label: 'VietNam', value: 'VN' },
        { label: 'Indonesia', value: 'IN' },
        { label: 'China', value: 'CN' },
    ]);
    // console.log('poen filter' + open);
    // console.log("open model filter" + openFilter);
    useEffect(() => { setOpenFilter(open) }, [open]);
    return (

        <Modal animationType='slide' visible={openFilter} transparent={true}>


            <View style={{
                flex: 1,
                backgroundColor: 'rgba(128, 128, 128, 0.5)'
            }}>
                <View style={{ height: 155 }}></View>
                <View style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, flex: 1 }}>
                    <View style={{ marginLeft: '87%', position: 'absolute' }}>
                        <TouchableOpacity onPress={() => setStatus(false)} style={{ marginLeft: 50 }}>
                            <View>
                                <FontAwesomeIcon icon={faClose} size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>

                        <View style={{ flexDirection: 'row', width: '50%', marginRight: 10 }}>
                            <Text style={{
                                width: 120, alignSelf: 'center', fontFamily: 'arial', fontSize: 20, fontWeight: 'bold',
                                marginRight: 2
                            }}>Video/Page: </Text>
                            <DropDownPicker style={{ width: 150 }}

                                open={openPickerVideo}
                                value={valueTotalVideo}
                                items={itemsVideo}
                                setOpen={setOpenPickerVideo}
                                setValue={setValueTotalVideo}
                                containerStyle={{ width: 150 }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', width: '50%' }}>
                            <Text style={{
                                width: 70,
                                alignSelf: 'center',
                                fontFamily: 'arial',
                                fontSize: 20, fontWeight: 'bold',
                                marginRight: 10
                            }}>Region: </Text>
                            <DropDownPicker style={{ width: 150 }}
                                open={openPickerRegion}
                                value={valueRegion}
                                items={itemsRegion}
                                setOpen={setOpenPickerRegion}
                                setValue={setValueRegion}
                                containerStyle={{ width: 150 }}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '30%', width: '100%', alignContent: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setStatus(false);
                            dataFilter(valueTotalVideo, valueRegion);
                        }
                        }>
                            <View>
                                <FontAwesomeIcon icon={faCheck} size={30} style={{ backgroundColor: 'green' }} />
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ height: 500 }}></View>
            </View>

        </Modal >
    )
}
