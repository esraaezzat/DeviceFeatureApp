import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LoactionPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";


const PlaceForm = ({ onCreatePlace }) => {

    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();
    const [enteredTitle, setEnteredTitle] = useState();
    const chaneTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText)
    }
    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    }
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, [])
    const savePlaceHandler = () => {
        // handle static image

        const image = selectedImage ? selectedImage : 'https://picsum.photos/seed/picsum/200/300'
        const placeData = new Place(enteredTitle, image, pickedLocation);
        onCreatePlace(placeData);
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.lable}>Title</Text>
                <TextInput style={styles.input} onChangeText={chaneTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LoactionPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    lable: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})