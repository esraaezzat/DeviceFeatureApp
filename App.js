import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlaces';
import screenNames from './constants/screenNames';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen
            name={screenNames.ALL_PLACES}
            component={AllPlaces}
            options={ // option may take an object or function returns object and take navigation as param
              ({ navigation }) => ({
                title: ' Your Favorite Places',
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
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

