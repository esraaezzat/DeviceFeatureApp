import PlaceForm from "../components/Places/PlaceForm";
import screenNames from "../constants/screenNames";
import { insertPlace } from "../util/database";

const AddPlace= ({navigation}) => {

    const createPlaceHandler = async(place) => {

        await insertPlace(place)
        navigation.navigate(screenNames.ALL_PLACES)
    }
    return <PlaceForm onCreatePlace={createPlaceHandler}/>

}

export default AddPlace;