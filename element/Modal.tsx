import { Button, Text, View } from "react-native";

const Modal = ({ title, messenge, animation, isvisible }) => {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Text>{title}</Text>
            <Text>{messenge}</Text>
            <Button title="close"></Button>
        </View>
    );
}