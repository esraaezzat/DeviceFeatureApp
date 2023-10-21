import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'; // we have a config(cameraPermission) in plugin array on app.json for this
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = () => {

    const [pickedImage, setPickedImage] = useState();

    // use useCameraPermissions to can use permission on IOS
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async() => {
        // we need to check if we have permission to access before(we asked user aboutpermission before) or the we don't (UNDETERMINED)
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
           
            // requestPermission open dailog and if user accept permission will return true otherwise will return false 
            const permissionResponse =  await requestPermission();
            return permissionResponse.granted // granted will be true or false
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insuffecient Permissions!',
                'You need to grant camera permission to use this app.'
            );

            return false;
        }

        return true; //return true if user allow permission before.
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }

        /*
        * in android we only need to use launchCameraAsync and a popup of permission will be open
        and permission message exist in cameraPermission in app.json and then open the camera if user allow permission.
        
        * in IOS we need to handle the permission popup so we need to add verifyPermissions function
        */
        const image = await launchCameraAsync({
            allowsEditing: true, // allow user to edit photo before confirm on it
            aspect: [16, 9],
            quality: 0.5, // to have a small image 
        });
        setPickedImage(image.uri);

    }
    let imagePreview = <Text> No Image Taken Yet. </Text>

    if(pickedImage){
        imagePreview =  <Image source={{uri: pickedImage}} style={styles.image} />
    }

    return <View>
        <View style={styles.imagePreview}>
           {imagePreview}
        </View>
        <OutlinedButton  onPress={takeImageHandler} icon='camera' >Take Image</OutlinedButton>
    </View>
}

export default ImagePicker;
const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image:{
        width: '100%',
        height: '100%'
    }
})