import React, { useReducer } from 'react'
import { View, Text } from 'react-native'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './ReduxSlice'
import { Appdispatch, RootState } from './Store';

export default function Redux({ navigation }: any) {
    const count = useSelector((state: RootState) => state.counter.values);
    const city = useSelector((state: RootState) => state.counter.city);
    const dispath = useDispatch<Appdispatch>();
    return (
        <View>
            <Text>{count}</Text>
            <Text>{city}</Text>
            <Text></Text>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', height: 20, width: '100%' }}>

                <GestureHandlerRootView style={{ backgroundColor: 'green', flex: 1, width: '30%', height: 30 }}>
                    <TouchableOpacity onPress={() => dispath(increment())}>
                        <Text>increment</Text>
                    </TouchableOpacity>
                </GestureHandlerRootView>
                <GestureHandlerRootView style={{ backgroundColor: 'red', flex: 1, width: '30%', height: 30 }}>
                    <TouchableOpacity onPress={() => dispath(decrement())}>
                        <Text>decrement</Text>
                    </TouchableOpacity>
                </GestureHandlerRootView>
                <GestureHandlerRootView style={{ backgroundColor: 'yellow', flex: 1, width: '30%', height: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("newredux")}>
                        <Text>new redux screeen</Text>
                    </TouchableOpacity>
                </GestureHandlerRootView>
            </View>

        </View>
    )
}
