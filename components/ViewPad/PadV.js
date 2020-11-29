import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

export default   Padv =(data)=> {
   let nativeHeight
if(!data.nativeHeight){nativeHeight=812}
else{nativeHeight=data.nativeHeight}

    return (

        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height *data.height / nativeHeight }}></View>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
   
});
const mapStateToProps = state => ({
    www: state.www
})

