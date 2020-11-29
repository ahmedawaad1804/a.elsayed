import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

export default MarketCard = (data) => {

    console.log(data);

    return (
       <View style={styles.container}>
            <Image style={styles.imageThumbnail, { width: data.width, height: data.height }} source={data.src} />
            <Text style={styles.smallText}>{data.name}</Text>
            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 12 / 812 }}></View>
            </View>   
     
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageThumbnail: {

        height: 50,
        width: 50,
    },
    gridCell: {
        width: Dimensions.get('window').width * 106 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        borderRadius: 15,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
    },
    smallText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 12
      },

});
const mapStateToProps = state => ({
    www: state.www
})

