import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList,I18nManager, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
class Cart extends React.Component {
    static navigationOptions = { header: null }

    state = {

        data: [],
        cost: 0,
        VAT: 0,
        deliveryCost: 0,
        total: 0,
        visible: false,
        errorMessage: " ",
        _error: false,
        _isLogIn: false,
    };

    componentDidMount() {
        console.log("_______________cart reducer___________________________");
        
        console.log(this.props.cartReducer);
        
        this.setState({ data: this.props.cartReducer }, () => { this.calculate(); console.log(this.state.data);
         })
         if (this.props.loginReducer) {
            this.setState({ _isLogIn: true })
        }

    }

    _increase(item) {
//( JSON.stringify(obj.item.extraArray) === JSON.stringify(action.payload.item.extraArray) )
        this.state.data.find(obj => obj.item._id == item.item._id && JSON.stringify(obj.item.extraArray) === JSON.stringify(item.item.extraArray)).count++
        this.setState({ data: this.state.data })
        this.props.setCartModifications(this.state.data)
        this.calculate()



    }
    _decrease(item) {
        this.preventDefault = true;
        if (this.state.data.find(obj => obj.item._id == item.item._id && JSON.stringify(obj.item.extraArray) === JSON.stringify(item.item.extraArray)).count > 0) {
            this.state.data.find(obj => obj.item._id == item.item._id && JSON.stringify(obj.item.extraArray) === JSON.stringify(item.item.extraArray)).count--
            this.setState({ data: this.state.data })
            this.props.setCartModifications(this.state.data)
            this.calculate()

        }
        this.preventDefault = false;
    }
    _delete(item) {
        this.state.data.splice(this.state.data.findIndex(obj => obj.item._id == item.item._id && JSON.stringify(obj.item.extraArray) === JSON.stringify(item.item.extraArray)), 1);
        this.setState({ data: this.state.data })
        this.calculate()
    }
    calculate() {

        let sum = 0;
        this.state.data.map(item => {
            sum += item.item.discountPrice * item.count

        })
        this.setState({ cost: sum })
    }
    continue() {
        // if(this.state.data.length){
        this.setState({ visible: true })
        // console.log(this.props.cartReducer);
        // console.log(this.state.data);
        let temp = []
        this.state.data.map(item => {
            temp.push({
                productId: item.item._id,
                quantity: item.count,
                productNameEN: item.item.productNameEN,
                productNameAR: item.item.productNameAR
            })
        })
        if(this.state.data.length!=0){
        orderService.checkOrder(temp).then(response => {
            console.log(response.data);
            if (response.data.notFound.length == 0) {
                this.props.navigation.navigate("CartProgress",{totalPrice:this.state.cost})
            }
            else {
                let itemsError = ""
                response.data.notFound.forEach(element => {
                    itemsError += element.productNameEN
                });
                this.setState({ errorMessage: "Item(s) " + itemsError + " not found" })
                // console.log("Item(s) "+itemsError+ " not found");
            }
        }).catch(err => {
            this.setState({ errorMessage: err.response.data.status })
        })}
        else {this.setState({ errorMessage:"No items Added" })}

        // this.props.navigation.navigate("CartProgress")
        this.setState({ visible: false })


        // }
    }
    async save() {
        try {
            await AsyncStorage.setItem(
                'cart', JSON.stringify(this.props.cartReducer)
            );

            // Toast.show("Cart Saved");

        } catch (error) {
            // Error saving data
            console.log(error);

        }



    }
    openItem(item){
        // console.log("-------------------------------");
        // console.log(item);
        
            this.props.navigation.navigate("ProductInfoCart", { item: item })
        
         
        
    }
    _handleLogin = () => {
        this.props.navigation.navigate("Login")
    }
    _handleRegister = () => {
        this.props.navigation.navigate("Register")
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
                        }}>{I18nManager.isRTL?"سلة الشراء":"Cart"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                {this.state._isLogIn &&  <View style={styles.mainContainer}>
                 <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>

                        <FlatList

                            // style={{width: Dimensions.get('window').width} }
                            key={item => { item.id }}
                            showsVerticalScrollIndicator={false}
                            // contentContainerStyle={styles.grid}
                            data={this.state.data}
                            renderItem={({ item }) =>
                                <View style={styles.orderOpacity}>
                                    <TouchableOpacity onPress={()=>{this.openItem(item)}} style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={{uri:`http://www.beemallshop.com/img/productImages/${item.item.images[0]}`}}
                                            style={styles.imageStyle}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.openItem(item)}} style={{ flex: 10, justifyContent: 'center' ,marginHorizontal:5}}>
                                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>{I18nManager.isRTL?item.item.productNameAR:item.item.productNameEN}</Text>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{item.item.discountPrice.toFixed(2)} {I18nManager.isRTL?"ج.م":"EGP"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{  alignItems: 'center', justifyContent: 'center' ,flex:1}}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: "40%", width: "100%" }}
                                            onPress={() => this._delete(item)}>
                                            <Image
                                                source={require('../../assets/icons/delete.png')}
                                                style={{ width:"100%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{  alignItems: 'center', justifyContent: 'center',flex:2 }}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "100%" }}
                                            onPress={() => this._increase(item)}>
                                            <Image
                                                source={require('../../assets/icons/plus.png')}
                                                style={{ width: "20%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: colors.fade, marginVertical:5, alignItems: 'center', justifyContent: 'center', width: "60%" }}>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" ,padding:0}}>{item.count}</Text>
                                        </View>
                                        <TouchableOpacity style={{  alignItems: 'center', justifyContent: 'center', width: "100%" }}
                                            onPress={() => this._decrease(item)}>
                                            <Image
                                                source={require('../../assets/icons/minus.png')}
                                                style={{ width: "20%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>















                            }

                        >
                            {/* <RefreshControl  refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} /> */}

                        </FlatList>



                    </View>
                      <View style={styles.bottomMainView}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems:'center', paddingRight: 5 }}>
                                <Text style={{ fontSize: 16, fontFamily: "Cairo-Bold",color:colors.gold  }}>{I18nManager.isRTL?"تكلفة المنتجات":"Products cost"} </Text>
                                {/* <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>VAT 12%</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Delivery</Text> */}
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingRight: 5 }}>
                                <Text style={{ fontSize: 16, fontFamily: "Cairo-Bold",color:colors.gold }}>{I18nManager.isRTL?"ج.م":"EGP"} {this.state.cost}</Text>
                                {/* <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.VAT}</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.deliveryCost}</Text> */}
                            </View>
                          
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: colors.primary
                                }}
                                    onPress={() => { this.save() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>{I18nManager.isRTL?"حفـظ":"SAVE FOR LATER"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                                }}
                                    onPress={() => { this.continue() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>{I18nManager.isRTL?"المتابعة":"CONTINUE"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    


                </View>}
                {
                    !this.state._isLogIn && <View style={[styles.mainContainer, { justifyContent: 'center',alignItems:'center' }]}>
                        <View style={{ alignItems: 'flex-start', width: "100%" }}>
                            <Text style={styles.headerText}>{I18nManager.isRTL ? "انت لست مسجل دخول" : "You arn't logged in"}</Text>
                            <Text style={styles.instructionText}>{I18nManager.isRTL ? "قم بتسجيل الدخول" : "Please log in"}</Text>
                        </View>
                        <TouchableOpacity style={styles.tOpacity}
                            // disabled={this.state._ckeckSignIn}
                            onPress={() => this._handleLogin()}>
                            <Text style={styles.text}>{I18nManager.isRTL ? "تسجيل الدخول" : "Login"}</Text>


                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tOpacity}
                            // disabled={this.state._ckeckSignIn}
                            onPress={() => this._handleRegister()}>
                            <Text style={styles.text}>{I18nManager.isRTL ?  "تسجيل" : "Register"}</Text>


                        </TouchableOpacity>


                    </View>

                }

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
        paddingTop: 0,
        paddingBottom: 0,

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
        width: Dimensions.get('window').width * 360 / 375,
        height: Dimensions.get('window').height * 150 / 812,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        flexDirection: "row",
        borderBottomWidth:2
    },
    imageStyle: {
        height: Dimensions.get('window').height*2/20,
        width: Dimensions.get('window').height*2/20,
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
const mapStateToProps = state => ({
    loginReducer: state.loginReducer,
    cartReducer: state.cartReducer
})
const mapDispatchToProps = {
    setCartModifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)