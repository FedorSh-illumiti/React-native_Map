import React, {useContext, useCallback} from "react";
import { StyleSheet} from 'react-native';
import Map from "../components/Map";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import '../_mockLocation';
import { Context as LocationContext } from "../context/LocationContext";
import userLocation from "../hooks/userLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({isFocused}) =>{
    const {state, addLocation} = useContext(LocationContext);
    const callback = useCallback(location=>addLocation(location,state.recording),[state.recording]);
    const [err] = userLocation(isFocused || state.recording, callback);
    return (
        <SafeAreaView forceInset = {{top:"always"}}>
            <Text h2>Create a track</Text>
            <Map/>
            {err ?<Text>Please enable location service</Text>:null}
            <TrackForm/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);