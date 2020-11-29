import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

export default Ads = (data) => {


    return (
        <View>
        <Image source={require("../../assets/ad.png")}
          style={[styles.advStyle, { borderRadius: 15 }]} />
      </View>
     
    );

}

const styles = StyleSheet.create({
    advStyle: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 94 / 812,
        resizeMode: 'contain'
      },

});
const mapStateToProps = state => ({
    www: state.www
})

