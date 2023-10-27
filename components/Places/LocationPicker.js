import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import screenNames from "../../constants/screenNames";

/**
 * 
 * useIsFocused is returend true if we are in addplace screen that hold LoactionPicker component
 * and retrned false if we are displaying other screens
 * we used it because when we go to the map screen 
 * and returned to this screen after clicking save location, the LoactionPicker will not reload so 
 * will not get a new value for mapPickedLocation and it will not reload because
 * switching between screens without using goBack will not rernder the screens
 * 
 */
const LoactionPicker = ({ onPickLocation }) => {

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();



    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat, lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    useEffect(() => {
        const handleLocation = async () => {

            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onPickLocation({...pickedLocation, address: address})
            }
        }

        handleLocation()
    }, [pickedLocation, onPickLocation]);

    const verifyPermissions = () => {


        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const userPermissionResponse = requestPermission();
            return userPermissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insuffecient Permissions!',
                'You need to grant location permission to use this app.'
            );

            return false;
        }

        return true;
    }
    const getLoactionHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })

    }
    const pickOnMapHandler = () => {
        navigation.navigate(screenNames.MAP)
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = <Image
            source={{ uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude) }}
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
    image: {
        width: '100%',
        height: '100%',
    }
})