import Sound from "react-native-sound";

export default function getAPI_KEY(store: any): string {
    const api_key = store.getState().API.API_key;
    console.log("api key: " + api_key);
    return api_key;
}

export function getPathSound(store: any): string {

    const pathSound = store.getState().playSound.path_Sound;
    console.log("p" + pathSound);
    if (pathSound !== "")
        return pathSound;
    else
        return "undefined"
}
export function getTimePlay(store: any): number {
    const time_play = store.getState().playSound.time_Play;
    console.log(time_play);
    return time_play;
}
export function getDuration(store: any): number {
    const durarion = store.getState().playSound.Duration;
    console.log(durarion);
    return durarion;
}
export function getSound(store: any): Sound {
    const sound_Ref = store.getState().playSound.sound_Ref;
    console.log(sound_Ref);
    return sound_Ref;
}