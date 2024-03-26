import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";



export function ModalYoutubeVideo({ youtubeVideo, open, setStatus }: any) {
    let [openModal, setOpenModal] = useState(false);
    let [videoId, discription, title, imageLink, channelId, channelTitle] = ['', '', '', '', '', ''];


    console.log('yt ' + open);
    console.log("open model yt" + openModal);
    console.log(youtubeVideo);
    if (typeof youtubeVideo !== 'undefined')
        [videoId, discription, title, imageLink, channelId, channelTitle] = youtubeVideo;
    useEffect(() => { setOpenModal(open) }, [open]);
    console.log('video id  ' + videoId);
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
            </View>
        </Modal>
    )
}


export function ModalFilter({ open, setStatus }: any) {
    const [openFilter, setOpenFilter] = useState(false);


    // console.log('poen filter' + open);
    // console.log("open model filter" + openFilter);
    useEffect(() => { setOpenFilter(open) }, [open]);
    return (
        <Modal animationType='slide' visible={openFilter}>

            {/* <View>
<DropDownPicker
items={[]}
/>
</View> */}
            <View style={{ backgroundColor: 'white', padding: 20 }}>

                <Text>This is your modal content</Text>

                <TouchableOpacity onPress={() => setStatus(false)}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}