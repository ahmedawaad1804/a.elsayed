import React from 'react';
import { StyleSheet, Text, View, RefreshControl, I18nManager, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';

import { freeCart } from '../../actions/product'

/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCartModifications } from '../../actions/product'
import { Header } from 'react-navigation-stack';
import io from 'socket.io-client'

/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import CartItem from '../../components/CartItem/CartItem'
/* radio button */
import orderService from "../../services/orderService"

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

class Payment extends React.Component {
    static navigationOptions = { header: null }

    state = {

        value: 0,
        visible: false,
        value3Index: 0,
        data: {}
    };

    componentDidMount() {

        this.setState({ data: this.props.navigation.state.params })
        console.log(this.props.navigation.state.params);
        // const socket = socketIOClient("http://192.168.1.6:3001");
        // socket.on("FromAPI", data => {
        //     console.log(data);
        //   });
        // this.socket.on("chat message", mssg => {
        //   console.log("mssg recieved in client:", mssg)
        // })
    }
    componentWillUnmount() {
        console.log("unumount")
        // this.socket.disconnect();
    }
   async  placeOrder() {
        // console.log(this.state.data.products);
        this.setState({ visible: true })
        this.props.freeCart()
        if (this.state.value3Index == 0) {
            let tempProductsArr = []
            this.state.data.products.forEach(element => {
                tempProductsArr.push({ count: element.count, productId: element.item._id,product: element.item,prodNontes:element.prodNontes })
            })
           await orderService.placeOrder({
                products: tempProductsArr,
                totalOrder: this.state.data.totalOrder,
                scheduled: this.state.data.scheduled,
                scheduledDate: this.state.data.scheduledDate,
                address: this.state.data.address,
                paymentType: "cdff",
                paymentInfo: null,
                promo: this.state.data.promoCode,
                notes:this.state.data.notes


            }).then(res => {
                console.log(res.data);
                this.props.navigation.navigate("Purshased",true)
            }).catch(err => {
                console.log(err.response.data);
                this.props.navigation.navigate("Purshased",false)

            })
            this.setState({ visible: false })
        }
        else if (this.state.value3Index == 1) {
            this.props.navigation.navigate("PaymentOnline")
            this.setState({ visible: false })
        }
        
        
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
                        }}>{I18nManager.isRTL ? "الدفع" : "Payment"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                    <View style={{ alignItems: 'flex-start', width: "100%", marginTop: 20 }}>
                        <Text style={styles.titleText}>{I18nManager.isRTL ? "طريقة الدفع" : "Payment Method"}</Text>
                        <Text style={styles.Text}>{I18nManager.isRTL ? "اختر طريقة دفعك المفضلة" : "Select your preferred payment method"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: 50, paddingHorizontal: 40 }}>
                        <RadioForm

                            initial={0}
                            buttonColor={colors.primary}

                        >
                            {
                                [{ label: I18nManager.isRTL ? " الدفع عند التوصيل " : 'Cash On Delivery', value: 0 }
                                    // , { label: I18nManager.isRTL ? "بطاقة إئتمان" : 'Credit Card', value: 1 }
                                ].map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.state.value3Index === i}
                                            onPress={(value) => { this.setState({ value3Index: value }, () => { console.log(this.state.value3Index); }) }}
                                            borderWidth={1}
                                            buttonInnerColor={'#000'}
                                            buttonOuterColor={this.state.value3Index === i ? colors.primary : '#ccc'}
                                            buttonSize={15}
                                            buttonOuterSize={35}
                                            buttonStyle={{ backgroundColor: this.state.value3Index === i ? colors.primary : "#ccc" }}
                                            buttonWrapStyle={{ marginVertical: 5 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={(value) => { this.setState({ value3Index: value }) }}
                                            // onPress={onPress}
                                            labelStyle={{ fontSize: 16, color: colors.black, fontFamily: 'Cairo-Regular', }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity style={{
                            width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                        }}
                            onPress={() => { this.placeOrder() }}>
                            <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>{I18nManager.isRTL ? "طلب الاوردر" : "PLACE ORDER"}</Text>
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
    freeCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment)