import { PermissionsAndroid } from "react-native";

export async function requestPermission() {
    checkPermission().then((check) => {
        if (check === false) {
            read_storage_permission();
            write_storage_permission();
        }
        else
            console.log("all permission is grand")
    })

}

const read_storage_permission = async () => {
    console.log("request read storage")
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            'title': 'READ EXTERNAL STORAGE',
            'message': 'App needs access to your storage to function properly.',
            'buttonNeutral': 'Ask Me Later',
            'buttonNegative': 'Cancel',
            'buttonPositive': 'OK'
        }
    );
}

const write_storage_permission = async () => {
    console.log("require write storage")
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            'title': 'WRITE EXTERNAL STORAGE',
            'message': 'App needs access to your storage to function properly.',
            'buttonNeutral': 'Ask Me Later',
            'buttonNegative': 'Cancel',
            'buttonPositive': 'OK'
        }
    );
}

export async function checkPermission(): Promise<boolean> {
    if (await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')
        && await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE'))
        return true
    return false
}
