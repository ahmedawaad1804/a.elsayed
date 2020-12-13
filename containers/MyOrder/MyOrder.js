import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, I18nManager, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import CartItem from '../../components/CartItem/CartItem'
/* storage */
import { AsyncStorage } from 'react-native';
import dataService from '../../services/dataService';
import orderService from "../../services/orderService"
class MyOrder extends React.Component {
    static navigationOptions = { header: null }

    state = {
        order: {},
        data: [],
        cost: 0,
        VAT: 0,
        deliveryCost: 0,
        total: 0,
        visible: false,
        errorMessage: " ",
        _error: false,
        products: [],
        minutes:15,
        hours:1
    };

    componentDidMount() {
        // console.log(this.props.navigation.state.params);

        
        for (const prod of this.props.navigation.state.params.id.products) {
            // tempArr.push({
            //     count:prod.count  
            // })
           prod.item=prod.productId
        }

        this.setState({ order: this.props.navigation.state.params.id, products: this.props.navigation.state.params.id.products })
        // console.log(this.props.navigation.state.params.id.products );
        // console.log(this.state.order.timeForDilvery);
        if(this.state.order.timeForDilvery){
        this.setState({
            hours:parseInt(this.state.order.timeForDilvery/60) ,minutes:this.state.order.timeForDilvery%60
        })}
    }
    cancel() {
        this.props.navigation.navigate("CancelOrder", { orderID: this.state.order._id })

    }
    openItem(item){
        // console.log("-------------------------------");
        // console.log(item);
        
            this.props.navigation.navigate("ProductInfoCart", { item: item })
        
         
        
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
                        }}>{I18nManager.isRTL ? "الاوردر" : "Order"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                        <View style={{ justifyContent: 'flex-start', width: Dimensions.get('window').width - 20,marginBottom:20 }}>
                            <Text style={styles.descText}>{I18nManager.isRTL ? "رقم الاوردر" : "Order Id"} :   {this.state.order.orderTimeID}</Text>
                            <Text style={styles.descText}>{I18nManager.isRTL ? "السعر" : "Price"} :   { Number.parseFloat(this.state.order.totalOrder).toFixed(2)}</Text>
                            <Text style={styles.descText}>{I18nManager.isRTL ? "التاريخ" : "Date"} :   {this.state.order.Date}</Text>
                            <Text style={styles.descText}>{I18nManager.isRTL ? "الحالة" : "Status"} :   {this.state.order.status}</Text>
                            <Text style={styles.descText}>{I18nManager.isRTL ? "وقت التوصيل" : "Time for delivery"} :   {this.state.hours}   {I18nManager.isRTL ? "ساعة" : "hours"} {this.state.minutes}   {I18nManager.isRTL ? "دقيقة" : "minutes"}</Text>
                            {this.props.navigation.state.params.id.promo &&<Text style={styles.descText}>{I18nManager.isRTL ? "كود الخصم" : "Promo Code"} :   {this.props.navigation.state.params.id.promo.promoName}</Text>}
                            {this.props.navigation.state.params.id.promo &&<Text style={styles.descTextPrice}>{I18nManager.isRTL ? "قيمة الخصم" : "Promo Discount"} :   {this.props.navigation.state.params.id.promo.discount}</Text>}
                        </View>
                        <FlatList


                            key={item => { item.id }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.grid}
                            data={this.state.products}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.orderOpacity} onPress={()=>{this.openItem(item)}} >
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={{ uri: `http://www.beemallshop.com/img/productImages/${item.productId.images[0]}` }}
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center' }}>
                                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold",alignSelf:'flex-start' }}>{I18nManager.isRTL ? item.productId.productNameAR : item.productId.productNameEN}</Text>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold",alignSelf:'flex-start' }}> {I18nManager.isRTL ? "السعر" : "Price"}  {Number.parseFloat(item.PurchasingPrice).toFixed(2)} {I18nManager.isRTL ? "ج.م" : "EGP"}</Text>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold",alignSelf:'flex-start' }}> {I18nManager.isRTL ? "العدد" : "Count"}  {item.count} </Text>
                                        </View>
                                    </View>


                                </TouchableOpacity>















                            }

                        >
                            {/* <RefreshControl  refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} /> */}

                        </FlatList>



                    </View>

                    <View style={styles.bottomMainView}>

                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                {!(this.props.navigation.state.params.id.status === "canceled") && <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: colors.primary
                                }}
                                    onPress={() => { this.cancel() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>{I18nManager.isRTL ? "الغاء" : "CANCEL"}</Text>
                                </TouchableOpacity>}
                            </View>
                            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                                }}
                                    onPress={() => { this.continue() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>{I18nManager.isRTL?"المتابعة":"CONTINUE"}</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
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
    descText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        alignSelf:'flex-start'
    },
    descTextPrice: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color:'green'
    },
    headerText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
    bottomMainView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 100 / 812,
    },
    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 130 / 812,
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
    errorText: {
        color: 'red',
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width * (343) / 375,

    }
});

export default connect()(MyOrder)