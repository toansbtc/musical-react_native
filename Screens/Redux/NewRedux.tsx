import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import { Appdispatch, RootState } from './Store';
import { changeCity, counterAsync } from './ReduxSlice';

export default function NewRedux({ navigation }: any) {
    const number = useSelector((state: RootState) => state.counter.values);
    const city = useSelector((state: RootState) => state.counter.city);
    const dispatch = useDispatch<Appdispatch>();
    dispatch(counterAsync('configuration'));
    dispatch(changeCity(''))
    return (
        <View>
            <Text>{number}</Text>
            <Text>{city}</Text>
            <GestureHandlerRootView style={{ backgroundColor: 'green' }}>
                <TouchableOpacity onPress={() => navigation.navigate("redux")}>
                    <Text>comback</Text>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    )
}
