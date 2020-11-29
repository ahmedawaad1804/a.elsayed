import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, I18nManager,Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
import OrderItem from '../../components/OrderItem/OrderItem'
import dataService from '../../services/dataService';
import orderService from '../../services/orderService';
class MainCategory extends React.Component {
    state = {
        orderTypes: [
            "Ongoing",
            "History",


        ],
        orderTypesAR: [
            "الحالية",
            "السابقة",


        ],
        orders: [
         
        ],
        ordersHistory: [
            
        ],
        counter: this.props.cartReducer.length,
        _isPressed: 0,
        loop: [],
        data: [],
        _isDataLoaded: false,
        refreshing: false,
        _isLogIn: false,
        user: {},


    };

    componentDidMount() {
        store.subscribe(() => {
            this.setState({ counter: this.props.cartReducer.length })
            // console.log("subscribed");
        });
        orderService.getClientOrders().then(res => {
            // console.log(res.data);
            this.setState({ loop: res.data })
            this.setState({ data: res.data },()=>{this._handlePress(0)})
        }).catch(err => { console.log(err); })
        this.interval = setInterval(() => {
            
             orderService.getClientOrders().then(res => {
            // console.log(res.data);
            this.setState({ loop: res.data })
            // this.setState({ data: res.data })
        }).catch(err => { console.log(err); })
        }, 5000);

        // this.setState({ loop: this.state.orders })
        this.setState({ _isDataLoaded: true })
        /// test
        // console.log(this.props.loginReducer);
        if (this.props.loginReducer) {
            this.setState({ _isLogIn: true })
        }
        if (this.props.userReducer) {
            this.setState({ user: this.props.userReducer })
        }

    }
    componentWillUnmount() {

        clearInterval(this.interval)
    }
    _handlePress  (item)  {
        console.log("jkkk");
        this.setState({ _isPressed: item })
        console.log(item);
        let temp = []

        if(item==0){
            this.state.loop.forEach(element=>{
                if(element.status!="canceled" && element.status!="completed"&&element.status!="canceled by admin"){
                    temp.push(element)
                } 
            })
            this.setState({data:temp})
        }else{
            this.state.loop.forEach(element=>{
                if(element.status=="canceled" ||element.status=="completed"||element.status=="canceled by admin"){
                    temp.push(element)
                }
            })
            this.setState({data:temp})
        }
        // item == 0 ? this.setState({ loop: this.state.orders }) : this.setState({ loop: this.state.ordersHistory })

    }
    onRefresh = () => {
        console.log("onRefresh");
        this.setState({ refreshing: true })
        orderService.getClientOrders().then(res => {
            console.log(res.data);
            this.setState({ loop: res.data })
            this.setState({ data: res.data })
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
openOrder(id){
    console.log(id);
    this.props.navigation.navigate("MyOrder",{id})


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
                        }}>{I18nManager.isRTL ? "طلباتي" : "My orders"}</Text>
                    </View>
                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                     {this.state._isLogIn &&  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}
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

                {this.state._isLogIn && <View style={styles.mainContainer}>


                    {this.state._isDataLoaded && <View style={{ justifyContent: 'center', height: Dimensions.get('window').height * 46 / 812, alignItems: 'center', marginBottom: 15 }}>
                        <ScrollView style={{ backgroundColor: colors.fade, borderRadius: 40 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                               (I18nManager.isRTL ? this.state.orderTypesAR:  this.state.orderTypes).map((item, key) => (

                                    <TouchableOpacity style={{ backgroundColor: this.state._isPressed === key ? colors.primary : colors.fade, borderRadius: 40, width: Dimensions.get('window').width * 343 / (375 * 2), height: "100%", alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}
                                        onPress={() => { this._handlePress(key) }}>
                                        <Text style={{ fontSize: 16, padding: 10 }}>{item}</Text>
                                    </TouchableOpacity>


                                )

                                )
                            }
                        </ScrollView>
                    </View>}

                    {this.state._isDataLoaded && <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            // ListHeaderComponent={this._headerItem}
                            // maxToRenderPerBatch={20}
                            // updateCellsBatchingPeriod={20}
                            // legacyImplementation={false}
                            // initialNumToRender={50}
                            // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                            contentContainerStyle={{ paddingBottom: 100 }}
                            data={this.state.data}

                            renderItem={({ item }) => (

                                // <Text>sd</Text>
                                <OrderItem
                                    handlePress={() => this.openOrder(item)}
                                    src={item}



                                />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            style={{ width: '100%' }}
                            keyExtractor={(item, index) => index}
                            horizontal={false}
                            numColumns={1}
                        />



                    </View>}

                    {
                        !this.state._isDataLoaded &&
                        <ActivityIndicator size={70} color={colors.primary} />
                    }


                </View>
                }
                {
                    !this.state._isLogIn && <View style={[styles.mainContainer, { justifyContent: 'center' }]}>
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
            </View>



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
    loginReducer: state.loginReducer,
    cartReducer: state.cartReducer,
    productsReducer: state.productsReducer,
    userReducer: state.userReducer,

})
const mapDispatchToProps = {
    setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainCategory)