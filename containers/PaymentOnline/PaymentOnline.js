import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCartModifications } from '../../actions/product'
import { Header } from 'react-navigation-stack';
/* webview */  
import { WebView } from 'react-native-webview';
/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import CartItem from '../../components/CartItem/CartItem'
/* radio button */
import orderService from "../../services/orderService"

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

class PaymentOnline extends React.Component {
    static navigationOptions = { header: null }

    state = {

        value: 0,
        visible: false,
        value3Index: 0,
        data: {}
    };

   async componentDidMount() {
        console.log("hi");
        let responseData=await fetch('https://www.paytabs.com/apiv3/tokenized_transaction_prepare',{
            method:"POST",
            body: JSON.stringify({
                merchant_email:"beemallalex@gmail.com",
                secret_key:"vL8heE3VXm9HcAtC9mKfqxZZwBl3XFKtqSKExNAuaJbmkFZu1KKshJrNlMRjsCMSvxx2k7wvRIRboQGpAqRSajGv6yOyaBqF8YHt"
            }),
            // headers: {
            //     'Content-type': 'application/json; charset=UTF-8'
            // }
                
            
        }
        )
        const res = await responseData.json()
        console.log(res);
    }
    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} />
                </View>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image
                                source={require('../../assets/icons/back.png')}
                                style={{
                                    width: Dimensions.get('window').width * 10 * 1.2 / 375,
                                    height: Dimensions.get('window').height * 18 * 1.2 / 812,


                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>Payment</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                   
                        
                        {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity style={{
                            width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                        }}
                            onPress={() => { this.placeOrder() }}>
                            <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>PLACE ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View >



        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        height: '89%',
        backgroundColor: colors.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 0

    },

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    text: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    instructionText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 13
        ,
    },
    headerText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
    bottomMainView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 180 / 812,
    },
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
    },
    titleText: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        backgroundColor: colors.white
    },
    Text: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 13,
        backgroundColor: colors.white
    }
});
const mapStateToProps = state => ({

    cartReducer: state.cartReducer
})
const mapDispatchToProps = {
    setCartModifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentOnline)