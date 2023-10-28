import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlaces';
import screenNames from './constants/screenNames';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import { StyleSheet, View, Text } from 'react-native';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((err) => {
      console.log(err);
      setDbInitialized(true);
    })
  }, []);
  
  // if(!dbInitialized){
  //   return  <>
  //   <View style={styles.loading}>
  //     <Text>Loading ... </Text>
  //   </View>
  //   </>
  // }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen
            name={screenNames.ALL_PLACES}
            component={AllPlaces}
            options={ // option may take an object or function returns object and take navigation as param
              ({ navigation }) => ({
                title: ' Your Favorite Places!!!',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={24}
                    onPress={() => { navigation.navigate(screenNames.ADD_PLACE) }} />
                ),
              })
            }
          />
          <Stack.Screen
            name={screenNames.ADD_PLACE}
            component={AddPlace}
            options={{
              title: 'Add a new place'
            }} />

          <Stack.Screen
            name={screenNames.MAP}
            component={Map}
          />
          <Stack.Screen
            name={screenNames.PLACE_DETAILS}
            component={PlaceDetails}
            options={{
              title: 'Loading Place ...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

