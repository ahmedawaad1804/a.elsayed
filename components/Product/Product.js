import React, { useState } from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, I18nManager, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

import FastImage from 'react-native-fast-image'




export default Product = (data) => {
    // console.log(data.src);
    const [heart, setHeart] = data.src.isliked ? useState(require("../../assets/icons/heart-red.png")) : useState(require("../../assets/icons/heart-sq.png"))
    // if(data.src.isliked){setHeart(require("../../assets/icons/heart-red.png"))}
    const handleChange = bool => {

        data.handleLike(bool);
    }

    return (

        <View style={styles.productOpacity}>

            <TouchableOpacity onPress={data.handlePress} >

                <Image
                    //  source={{ uri: data.src.uri }}
                    source={{ uri: `http://www.beemallshop.com/img/productImages/${data.src.images[0]}` }}
                    style={styles.productImage} />

                {(!(data.src.discount === 0)) && <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{data.src.discount} %</Text>
                </View>}


            </TouchableOpacity>
            <View style={styles.textHolder}>
                <Text style={styles.productNameFont}>{I18nManager.isRTL ? data.src.productNameAR : data.src.productNameEN} </Text>
                {/* <Text style={styles.descriptionFont}>{I18nManager.isRTL?data.src.descriptionAR:data.src.descriptionEN}</Text> */}
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Text style={styles.price}>{data.src.discountPrice} {I18nManager.isRTL ? "ج.م" : "EGP"}</Text>
                        </View>
                        {(!(data.src.discount === 0)) && <View style={{ alignItems: "flex-end", flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.discount}>{data.src.price}</Text>
                        </View>}
                    </View>
                </View>
            </View>
            <View style={styles.cartHolder}>
                <View style={styles.heartContainer}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', height: "100%" }}
                        onPress={() => {
                            heart == require("../../assets/icons/heart-sq.png") ?
                                setHeart(require("../../assets/icons/heart-red.png"))
                                : setHeart(require("../../assets/icons/heart-sq.png"))

                            handleChange(heart == require("../../assets/icons/heart-sq.png"))
                        }
                        }>
                        <Image source={heart}
                            style={styles.heart} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", alignItems: 'center', height: "100%" }}>
                        <Text style={styles.nomOfFavorite}>{data.src.likes}</Text>
                    </View>
                </View>
                <View style={styles.cartContainer}>
                    <TouchableOpacity style={{ height: "100%", justifyContent: "center", alignItems: 'center' }}
                        onPress={data.handleCartAddOne}>
                        <Image source={require("../../assets/icons/cartIn.png")}
                            style={styles.cart} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>


    );

}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 9 / 20,
        height: Dimensions.get('window').height * 6.7 / 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: Dimensions.get('window').width * 0.4 / 20,
        borderRadius: 20,
        backgroundColor: colors.white,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.05,
        // shadowRadius: 2,

        // elevation: 1,
    },
    productImage: {
        width: Dimensions.get('window').width * 9 / 20,
        height: Dimensions.get('window').width * 9 / 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: "contain",
        // backgroundColor:'blue'

    },
    productOpacity: {
        width: Dimensions.get('window').width * 9 / 20,
        // height: Dimensions.get('window').height * 8 / 20,
        // Dimensions.get('window').width * 9 / 20+
        borderRadius: 15,
        margin: Dimensions.get('window').width * 0.4 / 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    textHolder: {
        backgroundColor: colors.white,
        width: '100%',
        height: Dimensions.get('window').height * 3 / 20,
        paddingLeft: 5,
        paddingRight: 5,
        // justifyContent:'flex-end'
        // backgroundColor:'red'
    },
    descriptionFont: {
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        textAlign: I18nManager.isRTL ? 'left' : null
    }, productNameFont: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        textAlign: I18nManager.isRTL ? 'left' : null

    },
    price: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color:colors.gold
    },
    discount: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        textDecorationLine: 'line-through',
        textDecorationStyle: "solid",
        textDecorationColor: "red"
    }
    ,
    cartHolder: {
        backgroundColor: colors.primary,
        width: '100%',
        flex: 1,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').height * 1.5 / 20
    },
    heart: {
        height: '50%',
        resizeMode: "contain"
    },
    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: "100%"
    },
    cartContainer: {
        alignItems: 'flex-end',
        flexGrow: 1
    },
    cart: {
        height: '55%',
        resizeMode: "contain"
    }, nomOfFavorite: {
        fontFamily: 'Cairo-Regular',
        fontSize: 12,

    },
    discountBadge: {
        backgroundColor: 'red',
        width: "26%",
        height: "16%",
        position: 'absolute',
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    discountText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        color: colors.white
    }
});
const mapStateToProps = state => ({
    www: state.www
})
