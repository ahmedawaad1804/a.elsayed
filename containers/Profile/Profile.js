import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, I18nManager, Input,Linking, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
/* token */
import { getToken, removeToken } from '../../utility/storage'
/* action */
import { setLogout } from '../../actions/loginAction'
import { removeUser } from '../../actions/userAction'
class Profile extends React.Component {
    static navigationOptions = { header: null }
    state = {

        counter: 0,
        _isPressed: 0,
        loop: [],
        _isDataLoaded: false,
        refreshing: false,
        _isLogIn: false,
        user: {},
        adress: []


    };
    goToAdress() {
        this.props.navigation.navigate("Adress")
    }
    componentDidMount() {
        this.setState({ adress: this.props.adressReducer })
        this.unsubscribe = store.subscribe(() => {
            console.log("update");
            setTimeout(() => {
                this.setState({ adress: this.props.adressReducer })

            }, 400);


        });
        this.setState({ loop: this.state.orders })
        // console.log(this.props.userReducer);
        this.setState({ _isDataLoaded: true })
        if (this.props.loginReducer) {
            this.setState({ _isLogIn: true })
        }
        if (this.props.userReducer) {
            this.setState({ user: this.props.userReducer })
        }

    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    _handleLogin = () => {
        this.props.navigation.navigate("Login")
    }
    _handleRegister = () => {
        this.props.navigation.navigate("Register")
    }
    async logout() {
        await removeToken()
        this.props.setLogout()
        this.props.removeUser()

        this.props.navigation.navigate("MainScreenLoading")

    }
    about() {
        this.props.navigation.navigate("About")

    }
    Inst() {
        this.props.navigation.navigate("Inst")

    }
    setting() {
        this.props.navigation.navigate("Setting")

    }
    contactUs() {
        this.props.navigation.navigate("ContactUs")

    }
    dialCall(phoneNumber) {

        // let phoneNumber = '';
        console.log(phoneNumber);
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        }
        else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
        // Linking.openURL('https://www.instagram.com/beemallegypt/');
        // Linking.openURL('whatsapp://send?text=hello&phone=+201101102604')

    };
    render() {
        return (
            <View style={styles.container}>
                {this.state._isLogIn && <View style={styles.headerContainer}>

                    <View style={styles.imageContainer}>
                        <Image source={{ uri: this.state.user.imageName }}
                            onError={() => this.setState({ error: true })}
                            style={styles.mainImageStyle} />
                    </View>
                    <Text style={{ fontFamily: 'Cairo-SemiBold', fontSize: 22 }}>{this.state.user.username}</Text>
                    <View style={styles.phoneIconContainer}>
                        <Image source={require("../../assets/icons/phone.png")}
                            style={styles.phoneIcon} />
                        <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}> (02) 0{this.state.user.phoneNumber}    </Text>
                    </View>



                </View>}

                {this.state._isLogIn && <View style={styles.mainContainer}>

                    <TouchableOpacity style={styles.flexItem} onPress={() => this.goToAdress()}>
                        <View style={{ flex: 1.5, alignItems: 'center' }}>
                            <Image source={require("../../assets/icons/marker.png")}
                                style={styles.phoneIcon} />
                        </View>
                        <View style={{ flex: 7.5, }}>
                            {
                                this.state.adress.length ?
                                this.state.adress.find(obj=>{return obj.current==true})?
                                    this.state.adress.map(item => {
                                        
                                        if (item.current) {
                                            // console.log(item);
                                            // console.log("item");
                                            return <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{item.street} {item.route} {item.neighbourhood} {item.administrative_area} {item.city}</Text>
                                        }
                                    })
                                    :<Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "لا يوجد عنوان حالي  " : " No current address "}</Text>
                                    
                                    : <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? " لا يوجد عنوان  " : " No address yet "}</Text>}
                        </View>
                        <View style={{ flex: 2.5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 13 }}>{I18nManager.isRTL ? " التحكم " : " Manage "}</Text>
                            <Image source={require("../../assets/icons/setting.png")}
                                style={styles.phoneIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexItem}>
                        <View style={{ flex: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require("../../assets/icons/currency.png")}
                                style={styles.currencyIcon} />
                        </View>
                        <View style={{ flex: 6, }}>
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>Awarded Points</Text>
                            <Text style={{ fontFamily: 'Cairo-SemiBold', fontSize: 18 }}>0<Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}> Point</Text></Text>
                        </View>
                        <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 13 }}>{I18nManager.isRTL ? " تقييم " : " Review "}  </Text>
                            <Image source={require("../../assets/icons/rightArrow.png")}
                                style={styles.phoneIcon} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.miniItemContainer}>
                    <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.about() }}>
                            <Image source={require("../../assets/icons/aboutUs.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "من نحن ؟" : "About"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.setting() }}>
                            <Image source={require("../../assets/icons/twoSetting.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? " الضبط" : "Setting"} </Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.logout() }}>
                            <Image source={require("../../assets/icons/logOut.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "الخروج" : "Logout"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.miniItemContainer}>
                        <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.dialCall('01066311099') }} >
                            <Image source={require("../../assets/icons/telephone.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "كلمنا" : "Call Us"} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.contactUs() }}>
                            <Image source={require("../../assets/icons/contactUs.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "راسلنا" : "Contact us"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.miniItem}
                            onPress={() => { this.Inst() }}>
                            <Image source={require("../../assets/icons/inst.png")}
                                style={styles.miniItemImage} />
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{I18nManager.isRTL ? "تعليمات" : "Instructions"}</Text>
                        </TouchableOpacity>
                       
                    </View>

                </View>
                }
                {
                    !this.state._isLogIn && <View style={[styles.mainContainer, { justifyContent: 'center', height: "100%" }]}>
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

    mainContainer: {
        width: '100%',
        height: '63%',
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
        height: "37%",
        backgroundColor: colors.primary,
        // opacity:.3,
        alignItems: "center", justifyContent: 'center',


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
    mainImageStyle: {
        width: Dimensions.get('window').width * 120 / 375,
        height: Dimensions.get('window').width * 120 / 375,
        overflow: 'hidden',
        // resizeMode: "contain",
        borderRadius: 120,
        // borderRadius:2
    },
    imageContainer: {
        width: Dimensions.get('window').width * 120 / 375 + 5,
        height: Dimensions.get('window').width * 120 / 375 + 5,
        // backgroundColor:'red',
        borderRadius: 120,
        borderWidth: 5,
        borderColor: "#FFDE00",
        alignItems: 'center',
        justifyContent: 'center'



    },
    phoneIcon: {
        width: 17,
        height: 17,
        resizeMode: "contain",

    },
    currencyIcon: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",

    },
    phoneIconContainer: {
        flexDirection: 'row'
    },
    flexItem: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 80 / 812,
        marginTop: 20,
        flexDirection: 'row',
        padding: 5,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        // borderWidth:3,
        backgroundColor: colors.white,
        borderRadius: 15,

    },
    miniItem: {
        width: Dimensions.get('window').height * 80 / 812,
        height: Dimensions.get('window').height * 80 / 812,
        marginHorizontal: ((Dimensions.get('window').width * 343 / 375) - ((Dimensions.get('window').height * 80 / 812) * 4)) / 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        // borderWidth:3,
        backgroundColor: colors.white,
        borderRadius: 15,
    },
    miniItemContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        width: Dimensions.get('window').width * 343 / 375,

    },
    miniItemImage: {
        width: "50%",
        height: "50%",
        resizeMode: "contain",
    }
});
const mapStateToProps = state => ({
    cartReducer: state.cartReducer,
    loginReducer: state.loginReducer,
    userReducer: state.userReducer,
    adressReducer: state.adressReducer,
})
const mapDispatchToProps = {
    setCart,
    setLogout,
    removeUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile)