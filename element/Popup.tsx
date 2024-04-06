import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const Popup = ({ title, message, onConfirm, onCancel }: any) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    return (
        <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.popup}>
                <Text style={styles.popupTitle}>{title}</Text>
                <Text style={styles.popupMessage}>{message}</Text>
                <View style={styles.popupButtonContainer}>
                    <TouchableOpacity style={styles.popupButton} onPress={handleCancel}>
                        <Text style={styles.popupButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={handleConfirm}>
                        <Text style={styles.popupButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    popupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    popupMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    popupButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    popupButton: {
        backgroundColor: '#4caf50',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    popupButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Popup;