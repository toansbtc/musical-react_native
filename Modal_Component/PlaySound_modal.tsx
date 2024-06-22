import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function PlaySound_modal({ visible, dataSong, onclose }) {
    const SoundRef = useRef<Sound | null>(null);
    const [path, setPath] = useState("");
    const [nameSong, setNameSong] = useState("");
    const [isPlay, setIsPlay] = useState(false);
    const [timePlay, setTimePlay] = useState(0);

    useEffect(() => {
        setPath(dataSong[0]);
        setNameSong(dataSong[1]);
        if (path != "" && visible) {
            playSound(path);
        }
        setTimeout(() => {
            if (SoundRef.current?.isPlaying)
                SoundRef.current.getCurrentTime((seconds) => {
                    setTimePlay(seconds);
                });
        }, 1000);
    }, [dataSong]);



    function playSound(path) {

        stopSound();
        Sound.setCategory("Playback");
        try {
            const sound = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }
                console.log('ready play sound');

                sound.play((success) => {
                    if (success) {
                        setIsPlay(true);
                        console.log('Sound played successfully');
                    } else {
                        console.log('Failed to play the sound');
                    }
                });
            });
            SoundRef.current = sound;
        } catch (error) {
            console.error(error)
        }

    }

    function stopSound() {
        if (SoundRef.current) {
            SoundRef.current.stop();
            SoundRef.current.release();
            console.log("stop current sound in play sound");

        }
    }
    function pauseSound() {
        if (SoundRef.current) {
            SoundRef.current.pause();
            setIsPlay(false);
        }
    }
    function play() {
        if (SoundRef.current) {
            SoundRef.current.setCurrentTime(timePlay)
            SoundRef.current.play((success) => {
                if (success) {
                    console.log(`Play resumed ${timePlay}`);
                    setIsPlay(true);
                }
                else
                    console.log("error play resum");

            });
        }
    }
    return (
        <Modal
            transparent={false}
            animationType='slide'
            // visible={visible}
            visible={false}
        >
            <View style={{ position: "absolute", bottom: 45, left: 0, right: 0, height: 100, width: '100%', flexDirection: 'column', justifyContent: "center", alignContent: "center" }}>
                <View style={{ alignSelf: "flex-end" }}>
                    <TouchableOpacity onPress={() => { stopSound(); onclose(false) }}>
                        <FontAwesomeIcon icon={faClose} size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={{ flexWrap: "wrap", columnGap: 2 }}>{nameSong}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: "30%", marginRight: "30%" }}>


                    {!isPlay && (<TouchableOpacity onPress={() => play()}><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></TouchableOpacity>)}
                    {isPlay && (<TouchableOpacity onPress={() => pauseSound()}><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></TouchableOpacity>)}
                </View>

            </View>
        </Modal>
    )
}
