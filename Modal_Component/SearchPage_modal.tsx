import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { downloadMusic } from "../API/APIYouTube";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faFaceAngry, faFaceDizzy, faFaceFrown } from "@fortawesome/free-solid-svg-icons";



export function ModalYoutubeVideo({ youtubeVideo, open, setStatus }: any) {
    let [openModal, setOpenModal] = useState(false);
    let [videoId, discription, title, imageLink, channelId, channelTitle] = ['', '', '', '', '', ''];

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
                        height={300}
                        play={false}
                    />
                )}

                <View >
                    <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold' }}>{ }</Text>
                    <Text numberOfLines={5} style={{ flexShrink: 1, flexWrap: 'wrap', marginTop: 10, flexDirection: 'row' }} aria-valuemax={100}></Text>
                </View>
                <TouchableOpacity onPress={() => setStatus(false)}>
                    <Text>Close Modal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => downloadMusic(videoId, title)}>
                    <Text>Download</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

interface CustomItemType extends ItemType<string> {
    label: string;
    value: string;
}

export function ModalFilter({ open, setStatus }: any) {
    const [openFilter, setOpenFilter] = useState(false);
    const [openPicker, setOpenPicker] = useState(false);
    const [valueTotalVideo, setValueTotalVideo] = useState('10');
    const [valueRegion, setValueRegion] = useState('VN');

    const [itemsVideo, setItemsVideo] = React.useState<CustomItemType[]>([
        { label: '10 Videos', value: '10', icon: () => (<FontAwesomeIcon icon={faFaceFrown} size={10} />) },
        { label: '20 Videos', value: '20', icon: () => (<FontAwesomeIcon icon={faFaceDizzy} size={10} />) },
        { label: '30 Videos', value: '30', icon: () => (<FontAwesomeIcon icon={faFaceAngry} size={10} />) },
    ]);

    const [itemsRegion, setItemsRegion] = React.useState<CustomItemType[]>([
        { label: 'China', value: 'CN' },
        { label: 'VietNam', value: 'VN' },
        { label: 'Indonesia', value: 'IN' },
        { label: 'United Stated', value: 'US' },
    ]);
    // console.log('poen filter' + open);
    // console.log("open model filter" + openFilter);
    useEffect(() => { setOpenFilter(open) }, [open]);
    return (
        <Modal animationType='fade' visible={openFilter}>


            <View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flexDirection: 'row', width: '50%', marginRight: 10 }}>
                        <Text style={{
                            width: 100, alignSelf: 'center', fontFamily: 'arial', fontSize: 20, fontWeight: 'bold',
                            marginRight: 10
                        }}>Video/Page</Text>
                        <DropDownPicker style={{ width: 100 }}
                            open={openPicker}
                            value={valueTotalVideo}
                            items={itemsVideo}
                            setOpen={setOpenPicker}
                            setValue={setValueTotalVideo}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', width: '50%' }}>
                        <Text style={{ width: 100, alignSelf: 'center', fontFamily: 'arial', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>TotalVideo</Text>
                        <DropDownPicker style={{ width: 100 }}
                            open={openPicker}
                            value={valueRegion}
                            items={itemsRegion}
                            setOpen={setOpenPicker}
                            setValue={setValueRegion}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setStatus(false)}>
                        <View>
                            <Text>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal >
    )
}
