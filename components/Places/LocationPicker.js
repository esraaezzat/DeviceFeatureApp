import { Alert, StyleSheet, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

const LoactionPicker = () => {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const verifyPermissions = () => {


        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const userPermissionResponse = requestPermission();
            return userPermissionResponse.granted;
        }
        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insuffecient Permissions!',
                'You need to grant location permission to use this app.'
            );

            return false;
        }
        
        return true;
    }
    const getLoactionHandler = async() => {
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log('location = ',location)

     }
    const pickOnMapHandler = () => { }

    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLoactionHandler}>Loacte the user</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>pick on map</OutlinedButton>
            </View>
        </View>
    )
}

export default LoactionPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    }
})