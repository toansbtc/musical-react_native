import { StyleSheet } from "react-native";

const styleLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',

    },

    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textinput: {
        padding: 5,
        borderColor: '#fcaf0b',
        shadowOpacity: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pass: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    footer: {
        justifyContent: 'center',
        flexDirection: 'column'
    }
})
export default styleLogin;