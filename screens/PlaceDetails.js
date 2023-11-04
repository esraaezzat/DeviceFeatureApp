import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlacesDetails } from "../util/database";
import screenNames from "../constants/screenNames";

const PlaceDetails = ({ route, navigation }) => {
    const selectedPlaceId = route.params.placeId;
    const [fetchedPlace, setFetchedPlace] = useState()
    useEffect(() => {
        //use selectedPlaceId to fetch place
        const loadPlaceData = async () => {
            const place = await fetchPlacesDetails(selectedPlaceId);
            setFetchedPlace(place); 
            navigation.setOptions({
                title: place.title,
            })
        }
        loadPlaceData()
    }, [selectedPlaceId]);


    const showOnMapHandler = () => {
        navigation.navigate(screenNames.MAP, {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        });
    }

    if (!fetchedPlace) {
        return <View style={styles.fallback}>
            <Text>Loading place data ...</Text>
        </View>
    }
    return <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer} >
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>View on map</OutlinedButton>
        </View>
    </ScrollView>
}

export default PlaceDetails;
const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});

