import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, I18nManager, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { getAdress } from '../../actions/adressAction'
import { Header } from 'react-navigation-stack';
/* toast */
// import Toast from 'react-native-simple-toast';
/*expo permissions */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
/* menu */

import AdressMenu from "../../components/AdreesMenu/AdressMenu"
import AdressMenuCurrent from "../../components/AdreesMenu/AdressMenuCurrent"
class Adress extends React.Component {
    state = {

        data: [],

    };


    static navigationOptions = { header: null }
    componentDidMount() {
        
        this.setState({ data: this.props.adressReducer },()=>{
            // console.log(this.state.data);
        console.log(this.state.data.find(obj=>{return obj.current==true}));
        })
        // console.log(this.props.userReducer.address);
        this.unsubscribe = store.subscribe(() => {
            setTimeout(() => {

                this.setState({ data: this.props.adressReducer })

            }, 200);


        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    makeCurrent(adress) {
        // console.log(adress);
        if (!adress.current) {
            let temp = []
            this.state.data.forEach(obj => {
                if (obj != adress) {
                    obj.current = false
                }
                else { obj.current = true }
                temp.push(obj)
            })
            this.setState({ data: temp }, this.props.getAdress(this.state.data))
        }
        setTimeout(() => {
            dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err.message))

        }, 500)
    }
    deleteAdress(adress) {
        this.state.data.splice(this.state.data.findIndex(obj => obj == adress), 1);
        this.setState({ data: this.state.data }, this.props.getAdress(this.state.data))
        setTimeout(() => {
            dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

        }, 500)

    }
    async addAdress() {
        // let status = await Permissions.askAsync(Permissions.LOCATION)
        // // let status = await Location.getPermissionsAsync()
        // let location = await Location.getCurrentPositionAsync({})
        // if(location){
            this.props.navigation.navigate("AddAdress")
        // }
        
    }

    render() {
        return (
            <View style={styles.container}>
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
                        }}>{I18nManager.isRTL ? "العنوان" : "Adress"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    </View>

                </View>

                <View style={styles.mainContainer}>
                    {this.state.data.find(obj=>{return obj.current==true}) ? <View style={{ alignItems: 'flex-start', width: Dimensions.get('window').width, paddingHorizontal: 20 }}>
                        <Text style={styles.headerText}>{I18nManager.isRTL ? "العنوان الحالي" : "Current Address"}</Text>
                        <Text style={styles.subHeaderText}>{I18nManager.isRTL ? "إستلام الطلبات علي هذا العنوان" : "You will be receiving your orders on this address"}</Text>
                    </View> :
                        <View style={{ alignItems: 'flex-start', width: Dimensions.get('window').width, paddingHorizontal: 20 }}>
                            <Text style={styles.headerText}>{I18nManager.isRTL ? "لا يوجد عنوان حالي" : "No Current Address yet"}</Text>
                            <Text style={styles.subHeaderText}>{I18nManager.isRTL ? "برجاء إضافة عنوان " : "Please add an address"}</Text>
                        </View>}
                    {
                        this.state.data.map(item => {
                            if (item.current) { return <AdressMenu item={item} makeCurrent={(x) => this.makeCurrent(x)} deleteAdress={(x) => this.deleteAdress(x)} /> }
                        })
                    }
                    {/* <AdressMenu /> */}
                    <View style={{ justifyContent: 'center', width: Dimensions.get('window').width, paddingHorizontal: 20, flexDirection: 'row', marginVertical: 7 }}>
                        <View style={{ flex: 1, }}>

                            <Text style={styles.headerText}>{I18nManager.isRTL ? "قائمة العناوين" : "My Address List"}</Text>

                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'center' }}>

                            <TouchableOpacity style={{ alignItems: "flex-end", justifyContent: 'center' }} onPress={() => { this.addAdress() }}>
                                <Text style={[styles.addText, { backgroundColor: colors.primary, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 50 }]}>{I18nManager.isRTL ? "إضافة +" : "Add +"}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <FlatList
                        style={{
                            width: Dimensions.get('window').width,
                        }}
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) =>


                            !item.item.current ?
                                (<AdressMenu item={item.item} makeCurrent={(x) => this.makeCurrent(x)} deleteAdress={(x) => this.deleteAdress(x)} />)
                                : null
                        } />
                </View>
            </View>
        );
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
        padding: 20,
        paddingBottom: 0

    },
    detailsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',

        padding: 0
    },
    discountBadge: {
        backgroundColor: colors.red,
        width: "17%",
        height: "4%",
        position: 'absolute',
        right: 20,
        top: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeBadge: {
        width: "17%",
        height: "4%",
        position: 'absolute',
        left: 20,
        top: 20,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    discountText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        color: colors.white
    },

    heartImage: {
        resizeMode: "contain",
        height: "100%"

    },
    productImage: {
        // width: Dimensions.get('window').width * 9 / 20,
        width: Dimensions.get('window').width * 190 / 375,
        height: Dimensions.get('window').height * 245 / 812,
        // height: '30.1%',
        resizeMode: "contain",
        marginTop: 20
    },

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    headerText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 22,

    },
    subHeaderText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
    },
    flexItem: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 80 / 812,
        marginTop: 20,
        marginHorizontal: Dimensions.get('window').width * (375 - 343) / (375 * 2),
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

    IconContainer: {
        flexDirection: 'row'
    },
    Icon: {
        width: 17,
        height: 17,
        resizeMode: "contain",

    },
    smallIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",

    },
    popUp: {
        width: Dimensions.get('window').width * 141 / 375,
        height: Dimensions.get('window').height * 102 / 812,
        backgroundColor: colors.white,
        position: 'absolute',
        right: Dimensions.get('window').width * 28 / 375,
        top: Dimensions.get('window').height * 40 / 812,
        zIndex: 10,
    },
    addText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 13,

    }

});
const mapStateToProps = state => ({
    adressReducer: state.adressReducer,
    userReducer: state.userReducer,
})
const mapDispatchToProps = {
    getAdress
};
export default connect(mapStateToProps, mapDispatchToProps)(Adress)