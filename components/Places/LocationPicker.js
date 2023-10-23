import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useState } from "react";
import { getMapPreview } from "../../util/location";

const LoactionPicker = () => {

    const [pickedLocation, setPickedLocation] = useState();
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
        console.log('location = ',location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })

     }
    const pickOnMapHandler = () => { }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation){
        locationPreview = <Image 
        source={{uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude)}}
        style={styles.image}
        />
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
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
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
    } 
})