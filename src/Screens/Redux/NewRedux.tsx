import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Appdispatch, RootState } from './Store';
import { changeCity, counterAsync } from './redux_API_Slice';

export default function NewRedux({ navigation }: any) {
    const number = useSelector((state: RootState) => state.API.API_key);
    const city = useSelector((state: RootState) => state.API.API_key);
    const dispatch = useDispatch<Appdispatch>();
    dispatch(counterAsync('hello'));
    dispatch(changeCity(''))
    return (
        <View>
            <Text>{number}</Text>
            <Text>{city}</Text>
            <View style={{ backgroundColor: 'green' }}>
                <TouchableOpacity onPress={() => navigation.navigate("redux")}>
                    <Text>comback</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
