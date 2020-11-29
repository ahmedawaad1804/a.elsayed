import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

import FastImage from 'react-native-fast-image'




export default CartItem = (data) => {
// console.log(data);

    return (

        <View style={styles.orderOpacity}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{uri:`http://www.beemallshop.com/img/productImages/${data.src.images[0]}`}}
                    style={styles.imageStyle}
                />
            </View>
            <View style={{ flex: 4, justifyContent: 'center' }}>
                <View style={{  justifyContent: 'center' ,marginLeft:20}}>
                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>{data.src.item.productNameEN}</Text>
                <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{data.src.item.price} EGP</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: "50%", width: "50%" }}
                onPress={()=>data.delete()}>
                    <Image
                        source={require('../../assets/icons/delete.png')}
                        style={{ height: "60%", resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{  flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                onPress={()=>data.increase()}>
                    <Image
                        source={require('../../assets/icons/plus.png')}
                        style={{ width: "30%", resizeMode: "contain" }}
                    />
                </TouchableOpacity>
                <View style={{ backgroundColor:colors.fade, flex: 1, alignItems: 'center', justifyContent: 'center', width: "50%" }}>
                    <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{data.src.count}</Text>
                </View>
                <TouchableOpacity style={{  flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                 onPress={()=>data.decrease()}>
                    <Image
                        source={require('../../assets/icons/minus.png')}
                        style={{ width: "30%", resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </View>
        </View>


    );

}

const styles = StyleSheet.create({


    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        flexDirection: "row",
        borderTopWidth: 1
    },
    imageStyle: {
        height: "90%",
        width: "100%",
        resizeMode: 'contain'
    }

});
const mapStateToProps = state => ({
    www: state.www
})
