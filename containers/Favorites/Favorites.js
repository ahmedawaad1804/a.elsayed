import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, I18nManager, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCart } from '../../actions/product'
import { Header } from 'react-navigation-stack';
/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import Product from '../../components/Product/Product'
/* services */
import dataService from '../../services/dataService'
import likeService from '../../services/likeService'

class Favorites extends React.Component {
    state = {
        category: [],
        itemData: [],
        data: [],
        counter: this.props.cartReducer.length,
        _isPressed: -1,
        _isDataLoaded: false,
        refreshing: false,
        _isLogIn: false,
        user: {}


    };

    componentDidMount() {
        store.subscribe(() => {
            this.setState({ counter: this.props.cartReducer.length })
            // console.log("subscribed");


        });
        likeService.getLikes().then(res => {
            // console.log(res.data.likes);
            this.setState({ itemData: res.data.likes })
            this.setState({ data: res.data.likes })
            ////
            let temp, arr = []
            temp = [...res.data.likes]
            console.log("/////////////");
            for (let index = 0; index < temp.length; index++) {
                let flag=true
                for (let indexInternal = 0; indexInternal < arr.length; indexInternal++) {
                    console.log(temp[index].mainCategory._id);
                    console.log(arr[indexInternal]._id);
                    if(temp[index].mainCategory._id==arr[indexInternal]._id){
                        flag=false
                    }
                }
                console.log("cc");

                if(!flag){continue}
                arr.push(temp[index].mainCategory)
                console.log("dd");
                
            }
//             temp.forEach(
//                 element => {
//                     console.log(temp.indexOf(element.mainCategory));
// // console.log(element.mainCategory);
                    
//                     if (arr.map((obj) => {return !(obj._id === element.mainCategory._id) }).reverse()[0] ) {
//                         arr.push(element.mainCategory)
//                     }

//                     // console.log(arr);

//                 }
//             )
            arr.unshift({ nameEN: "All", _id: -1, nameAR: 'الكل' })
            // console.log(arr);
            ////


            this.setState({ category: arr })
            // console.log(category);
        }).catch(err => { console.log(err); })
        // this.setState({ itemData: this.props.bestsellerReducer })

        this.setState({ _isDataLoaded: true })
        if (this.props.loginReducer) {
            this.setState({ _isLogIn: true })
        }
        if (this.props.userReducer) {
            this.setState({ user: this.props.userReducer })
        }

    }


    _handlePress = (item) => {
        this.setState({ _isPressed: item._id })
        // console.log(item);
        if (item._id == -1) {
            this.setState({ data: this.state.itemData })
        }
        else {

            let temp = []
            this.state.itemData.map(product => {

                if (product.mainCategory._id === item._id) { temp.push(product) }
            })
            console.log(temp);
            this.setState({ data: temp })


        }
        // item == 0 ? this.setState({ loop: this.state.orders }) : this.setState({ loop: this.state.ordersHistory })

    }
    onRefresh = () => {
        console.log("onRefresh");
        this.setState({ refreshing: true })
        // this.props.refreshOrders()
        likeService.getLikes().then(res => {
            console.log(res.data.likes);
            this.setState({ itemData: res.data.likes })
            this.setState({ data: res.data.likes })
            ////
            let temp, arr = []
            temp = [...res.data.likes]
            for (let index = 0; index < temp.length; index++) {
                let flag=true
                for (let indexInternal = 0; indexInternal < arr.length; indexInternal++) {
                    console.log(temp[index].mainCategory._id);
                    console.log(arr[indexInternal]._id);
                    if(temp[index].mainCategory._id==arr[indexInternal]._id){
                        flag=false
                    }
                }
                console.log("cc");

                if(!flag){continue}
                arr.push(temp[index].mainCategory)
                console.log("dd");
                
            }
            arr.unshift({ nameEN: "All", _id: -1, nameAR: 'الكل' })
            console.log(arr);
            ////


            this.setState({ category: arr })
            // console.log(category);
            this.setState({ refreshing: false })

        }).catch(err => {
            console.log(err);
            this.setState({ refreshing: false })
        })


    }
    _handleLogin = () => {
        this.props.navigation.navigate("Login")
    }
    _handleRegister = () => {
        this.props.navigation.navigate("Register")
    }
    handleCartAddOne(){

    }
    handleLike(){
        
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 20 }} >

                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>{I18nManager.isRTL ? "المفضلة" : "Favorites"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state._isLogIn && <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}
                        onPress={() => { this.props.navigation.navigate("Cart") }}>
                            <Image source={require("../../assets/icons/cart.png")}
                                style={styles.cartImageStyle} />
                            {this.state.counter > 0 ? (<Badge
                                value={this.state.counter}
                                status="error"
                                badgeStyle={{ backgroundColor: colors.badge }}
                                containerStyle={{ position: 'relative', top: 10, right: 10 }}
                                textStyle={{ fontFamily: 'Cairo-Bold', fontSize: 12, margin: -3 }}
                            />) : null}
                        </TouchableOpacity>}
                    </View>

                </View>

                {this.state._isLogIn &&
                    < View style={styles.mainContainer}>





                        <View>
                            <View style={{ justifyContent: 'center', height: Dimensions.get('window').height * 46 / 812, alignItems: 'center', marginBottom: 15, paddingHorizontal: 20, }}>
                                <ScrollView style={{ backgroundColor: colors.fade, borderRadius: 40 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        this.state.category.map((item, key) => (

                                            <TouchableOpacity style={{
                                                backgroundColor: this.state._isPressed === item._id ? colors.primary : colors.fade, borderRadius: 40,
                                                // width: Dimensions.get('window').width * 343 / (375 * 2),
                                                paddingHorizontal: 20,
                                                height: "100%", alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'
                                            }}
                                                onPress={() => { this._handlePress(item) }}>
                                                <Text style={{ fontSize: 16, padding: 10, fontFamily: "Cairo-Regular" }}>{I18nManager.isRTL ? item.nameAR : item.nameEN}</Text>
                                            </TouchableOpacity>


                                        )

                                        )
                                    }
                                </ScrollView>
                            </View>

                            <View style={{ marginBottom: Dimensions.get('window').height * 120 / 812 }}>
                                <FlatList
                                    // disableVirtualization={false}
                                    showsVerticalScrollIndicator={false}
                                    maxToRenderPerBatch={20}
                                    updateCellsBatchingPeriod={20}
                                    legacyImplementation={false}
                                    initialNumToRender={50}
                                    keyExtractor={(item) => item.toString()}
                                    // initialNumToRender={50}
                                    // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                                    // contentContainerStyle={{ paddingBottom: 0 }}
                                    data={this.state.data}

                                    renderItem={({ item }) => (
                                        // <Text>sd</Text>
                                        <Product
                                            // handlePress={() => this.handlePress(item)}
                                            src={item}
                                            handleLike={(e) => { this.handleLike(e, item) }}
                                            handleCartAddOne={() => this.handleCartAddOne(item)}


                                        />

                                    )}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.onRefresh}
                                        />
                                    }
                                    // style={{ width: '100%' }}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}
                                    numColumns={2}
                                />



                            </View>
                        </View>




                    </View>}

                {!this.state._isLogIn && <View style={[styles.mainContainer, { justifyContent: 'center' }]}>
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
        alignItems: 'center',
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
        marginHorizontal: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 13
        ,
    },
    headerText: {
        marginHorizontal: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
});
const mapStateToProps = state => ({
    cartReducer: state.cartReducer,
    productsReducer: state.productsReducer,
    bestsellerReducer: state.bestsellerReducer,
    userReducer: state.userReducer,
    loginReducer: state.loginReducer,
})
const mapDispatchToProps = {
    setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)