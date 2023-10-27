import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapVeiw, { Marker } from 'react-native-maps';
import screenNames from '../constants/screenNames';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation }) => {
    // initialRegion determine which region should displayed on the map when it laoded
    // latitude & latitude determine the center location of map
    // latitudeDelta & longitudeDelta how much region beside the center should displayed

    const [selectedLocation, setSelectedLocation] = useState()
    const region = {
        latitude: 30.033333,
        longitude: 31.233334,
        latitudeDelta: 0.0992,
        longitudeDelta: 0.0421
    };
/*
* function is redefiend when component is rerendered
* using useCallback will cache the function and not rerender it if its dependencies not changed
* this is important for optimize the code 
* and also important when the function is used as adependency in useLayoutEffect because it granted that
function will not change every time when reload the component as this change will also rerun the useLayoutEffect func.

*/
    const savePickedLocationHandler = useCallback(() => {

        if (!selectedLocation) {
            Alert.alert('No location picked!', 'Select location first!');
            return;
        }

        navigation.navigate(screenNames.ADD_PLACE, {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        })
    },[navigation, selectedLocation])
 
    const selectLocationHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({
            lat: lat,
            lng: lng
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) =>
                <IconButton
                    icon='save'
                    size={24}
                    color={tintColor}
                    onPress={ savePickedLocationHandler }
                />
        })
    }, [navigation, savePickedLocationHandler]);

    return <MapVeiw
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}>

        {selectedLocation &&
            <Marker
                title='pickedLoction'
                coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng
                }}
            />
        }
    </MapVeiw>
}

export default Map;
const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})