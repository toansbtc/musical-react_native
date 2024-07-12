import React, { createContext, useState } from 'react'
import Sound from 'react-native-sound';


const soundContext = createContext<any>({});
export const SoundProvide: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [soundInstance, setSoundInstance] = useState<Sound | null>(null);

    const playSound = (path, time) => {
        if (time == 0) {
            stopSound(); // Stop any currently playing sound

            Sound.setCategory("Playback");
            try {
                const sound = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.log('Failed to load the sound', error);
                        return;
                    }

                    // if (time !== 0) {
                    //     sound.setCurrentTime(time);
                    //     console.log(`${time} timmer`)
                    // }

                    sound.play((success) => {
                        if (success) {
                            console.log('Sound played successfully');
                        } else {
                            console.log('Failed to play the sound');
                        }
                    });

                    setSoundInstance(sound);
                });

            } catch (error) {
                console.error(error);
            }
        }
        else {
            if (!isplaySound()) {
                getSound()?.setCurrentTime(time)
                getSound()?.play((success) => {
                    if (success) {
                        console.log(`playResum time play ${time}`);
                    }
                    else
                        console.log("playResum error");
                });
            }

        }
    };

    const stopSound = () => {
        if (soundInstance) {
            soundInstance.stop();
            soundInstance.release();
            console.log("stopSound success");
        }
        setSoundInstance(null);
    };

    const pauseSound = () => {
        if (soundInstance) {
            soundInstance.pause();
            console.log("pauseSound success");
        }
    };
    function playResum(timePlay) {

        soundInstance?.setCurrentTime(timePlay)
        soundInstance?.play((success) => {
            if (success) {
                console.log(`playResum time play ${timePlay}`);
            }
            else
                console.log("playResum error");
        });

    }

    function getSound() {
        return soundInstance;
    }

    function isplaySound() {
        if (soundInstance) {
            console.log("isplaySound sound playing")
            return soundInstance?.isPlaying();
        }
        else
            console.log("isplaySound sound null")
    }

    const value = {
        playSound,
        stopSound,
        pauseSound,
        playResum,
        getSound,
        isplaySound
    };
    return (
        <soundContext.Provider value={value}>
            {children}
        </soundContext.Provider>
    );
}

export default soundContext;