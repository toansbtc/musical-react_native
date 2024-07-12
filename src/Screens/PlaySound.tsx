import { useRoute } from '@react-navigation/native';
import React, { createContext, memo, useContext, useEffect, useRef, useState } from 'react'
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-native-sliders';
import { enableScreens } from 'react-native-screens';
import { getDuration, getPathSound, getSound, getTimePlay } from './Redux/getRedux';
import store, { Appdispatch } from './Redux/Store';
import { useDispatch } from 'react-redux';
import { saveTime } from './Redux/redux_PlaySound_Slide';
import soundContext from '../Components/soundProvide';
import { create_DB, save_song } from '../Sqlite/store_song';




function PlaySound({ navigation, route }) {


    const { playSound, stopSound, pauseSound, playResum, getSound, isplaySound } = useContext(soundContext);
    const dispatch = useDispatch<Appdispatch>();

    //const SoundRef = useRef<Sound | null>(null);
    // const router = useRoute();
    // const {dataSong} = router.params;
    // const dataSong = route.params.item;
    // const [duration, setDuration] = useState<number>(0);
    // const [path, setPath] = useState<string>("");


    const [nameSong, setNameSong] = useState<string>("");
    const [isPlay, setIsPlay] = useState<boolean>();
    const [timePlay, setTimePlay] = useState<number>(0);
    const [canPlay, setCanPlay] = useState<boolean>();
    const [timePlayDisplay, setTimePlayDisplay] = useState<string | undefined>("");

    useEffect(() => {
        create_DB();

        if (getPathSound(store) !== "undefined") {
            setCanPlay(true);
            console.log('when load');
            const name = getPathSound(store).replace(".mp3", "").replace("/storage/emulated/0/Download/", "");
            setNameSong(name);
            playSound(getPathSound(store), getTimePlay(store));
            if (isplaySound())
                setIsPlay(true);
        }
        else
            setCanPlay(false);
        console.log("canplay " + canPlay)


    }, []);

    useEffect(() => {
        function saveTimePlay(sound: Sound) {
            setInterval(() => {
                if (isPlay)
                    sound?.getCurrentTime((seconds) => {
                        dispatch(saveTime(seconds));
                        setTimePlayDisplay(Math.floor(seconds).toString());
                    });
            }, 1000);
        }
        saveTimePlay(getSound());
        console.log("play", isPlay)
    }, [isPlay]);

    const handleSeek = async (value) => {
        try {
            await getSound()?.setCurrentTime(value)
            setTimePlay(value);
        } catch (error) {
            console.log('handleSeek Error seeking:', error);
        }
    };



    function format_time(time_Duration) {

        const time = Math.floor(time_Duration);
        const hour = Math.floor(time / 3600);
        const minute = Math.floor((time % 3600) / 60);
        const seconce = Math.floor((time / 3600) % 60);
        return `${hour > 0 ? hour > 10 ? hour : "0" + hour : "00"} : ${minute > 0 ? minute > 10 ? minute : "0" + minute : "00"} : ${seconce > 0 ? seconce > 10 ? seconce : "0" + seconce : "00"}`;
    }

    function playOrPause(params: boolean) {
        setIsPlay(params);
    }

    function save(path, time) {
        save_song(path, time);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }} className="bg">
            {
                canPlay ?
                    (
                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", alignContent: "center" }}>
                                <Text style={{ flexWrap: "wrap", columnGap: 2, alignContent: "center" }}>{nameSong}</Text>
                                <View style={{ width: '90%', flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                                    <Text style={{ width: 50, textAlign: "center" }}>{timePlayDisplay}</Text>
                                    <Slider
                                        style={{ width: 200 }}


                                        minimumValue={0}
                                        // maximumValue={Math.floor(getSound()?.getDuration())}
                                        value={timePlay}
                                        onValueChange={handleSeek}
                                        onSlidingComplete={handleSeek}
                                        thumbTintColor="#000000"
                                        minimumTrackTintColor="#FF0000"
                                        maximumTrackTintColor="#000000"

                                    ></Slider>
                                    <Text style={{ width: 100, textAlign: "center" }}>{format_time(getSound()?.getDuration() as number)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: "30%", marginRight: "30%" }}>


                                    {
                                        isPlay ?
                                            (<TouchableOpacity
                                                onPress={() => {
                                                    pauseSound(),
                                                        playOrPause(false);
                                                }}>
                                                <FontAwesomeIcon icon={faPause} />
                                                <Text>play</Text>
                                            </TouchableOpacity>
                                            )
                                            :
                                            (<TouchableOpacity
                                                onPress={() => {
                                                    playResum(getTimePlay(store));
                                                    playOrPause(true);
                                                    save(getPathSound(store), getTimePlay(store));
                                                }}>
                                                <FontAwesomeIcon icon={faPlay} />
                                                <Text>pause</Text>
                                            </TouchableOpacity>)
                                    }
                                </View>

                            </View>
                            <Footer navigation={navigation} />
                        </View>
                    )
                    :
                    (

                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                                <Text style={{ color: "blue" }}>Choose song to play</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </View>
    )

}

export default memo(PlaySound);