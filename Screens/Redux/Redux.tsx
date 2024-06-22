import React, { useReducer } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './redux_API_Slice'
import { Appdispatch, RootState } from './Store';
import Footer from '../../Components/Footer';

export default function Redux({ navigation }: any) {
    // const count = useSelector((state: RootState) => state.counter.values);
    // const city = useSelector((state: RootState) => state.counter.city);
    const dispath = useDispatch<Appdispatch>();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <Text>{count}</Text>
                <Text>{city}</Text> */}
                <Text></Text>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', height: 20, width: '100%' }}>

                    <View style={{ backgroundColor: 'green', flex: 1, width: '30%', height: 30 }}>
                        <TouchableOpacity onPress={() => dispath(increment())}>
                            <Text>increment</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'red', flex: 1, width: '30%', height: 30 }}>
                        <TouchableOpacity onPress={() => dispath(decrement())}>
                            <Text>decrement</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'yellow', flex: 1, width: '30%', height: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("newredux")}>
                            <Text>new redux screeen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <Footer navigation={navigation} />
            </View>
        </View>
    )
}
