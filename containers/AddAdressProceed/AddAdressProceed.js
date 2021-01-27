import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Picker, Button, Animated, Input, ScrollView, I18nManager, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCart } from '../../actions/product'
import { Header } from 'react-navigation-stack';
/* toast */
// import Toast from 'react-native-simple-toast';
/* padding */
import Padv from '../../components/ViewPad/PadV'
/*actions */
import { addAdress } from '../../actions/adressAction'
/* menu */
import { Dropdown } from 'react-native-material-dropdown-v2';
/*expo permissions */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import adressService from '../../services/adressService'
import dataService from '../../services/dataService';
class AddAdressProceed extends React.Component {
    state = {
        visible: false,
        country: "Egypt",
        city: '',
        administrative_area: '',
        neighbourhood: '',
        route: '',
        street: '',
        appartement: '',
        lat: 0,
        long: 0,


        errorMessage: " ",
        _error: false,
        _isLoading: false,
        house: '',
        floor: '',
        notes: ''

    };


    static navigationOptions = { header: null }
    componentDidMount() {
        console.log(this.props.navigation.state.params);
        this.setState({
            house: this.props.navigation.state.params.street,
            street: this.props.navigation.state.params.route,
            neighbourhood: this.props.navigation.state.params.neighbourhood,
            administrative_area: this.props.navigation.state.params.administrative_area,
            city: this.props.navigation.state.params.city,
            // notes:this.props.navigation.state.params.country,
            lat: this.props.navigation.state.params.latitude,
            long: this.props.navigation.state.params.longitude
        })


    }


    getLocationAsync = async () => {



    }
    _floor(text) { this.setState({ floor: text }) }
    _house(text) { this.setState({ house: text }) }
    _street(text) { this.setState({ street: text }) }
    _neighbourhood(text) { this.setState({ neighbourhood: text }) }
    _city(text) { this.setState({ city: text }) }
    _notes(text) { this.setState({ notes: text }) }
    async AddTypedAddress() {
        if (this.state.neighbourhood != '' && this.state.street != '' && this.state.house != ''
            && this.state.administrative_area != ''
            && this.state.city != ''
        ) {
            this.setState({ visible: true })
            await this.props.addAdress({
                street: this.state.floor + " " + this.state.house,
                route: this.state.street,
                neighbourhood: this.state.neighbourhood,
                administrative_area: this.state.administrative_area,
                city: this.state.city,
                country: this.state.notes,
                current: false,
                lat: this.state.lat,
                long: this.state.long,
            },
                setTimeout(() => {
                    dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

                }, 500)
            )

            this.props.navigation.navigate("Adress")

            this.setState({ visible: false })
        }
        else {
            this.setState({ _error: true })
            this.setState({ errorMessage: I18nManager.isRTL ? "يرجي إضافة عنوان صحيح" : "Enter a valid Adress" })
        }
    }
    addAdressToReducer() {
        if (this.state.country && this.state.city && this.state.administrative_area
            && this.state.neighbourhood && this.state.route && this.state.appartement) {
            this.props.addAdress({
                street: this.state.street,
                route: this.state.route,
                neighbourhood: this.state.neighbourhood,
                administrative_area: this.state.administrative_area,
                city: this.state.city,
                country: this.state.country,
                current: false,
                lat: null,
                long: null
            })
            setTimeout(() => {
                dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

            }, 500)

        }
        else {
            this.setState({ _error: true })
            this.setState({ errorMessage: I18nManager.isRTL ? "يرجي إضافة عنوان صحيح" : "Enter a valid Adress" })

        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

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
                            <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 20, }}>{I18nManager.isRTL ? "أضافة عنوان" : "Add Adress"}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        </View>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} />
                    </View>
                    <View style={styles.mainContainer}>
                            {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
                            {!this.state._error && (<Padv height={22} />)}
                            <ScrollView>

                            <Text style={[styles.addressText, { flex: 0 }]}>{I18nManager.isRTL ? "اكتب عنوانك بالتفصيل" : "ُEnter your detailed address"}</Text>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? "رقم المنزل" : "ُHouse no."}</Text>

                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={I18nManager.isRTL ? "رقم المنزل" : "House number"}
                                    value={this.state.house}
                                    placeholderTextColor={'#ccc'}
                                    // width={Dimensions.get('window').width * 343 / 375}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._house(text)}
                                />
                            </View>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? " (اختياري) الدور" : "floor (optional)"}</Text>

                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={I18nManager.isRTL ? "الدور" : "floor"}
                                    value={this.state.floor}
                                    placeholderTextColor={'#ccc'}
                                    // width={Dimensions.get('window').width * 343 / 375}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._floor(text)}
                                />
                            </View>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? "الشارع" : "street"}</Text>

                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={I18nManager.isRTL ? "الشارع" : "street"}
                                    value={this.state.street}
                                    placeholderTextColor={'#ccc'}
                                    // width={Dimensions.get('window').width * 343 / 375}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._street(text)}
                                />
                            </View>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? "المنطقة" : "Area"}</Text>

                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={I18nManager.isRTL ? "المنطقة" : "Area"}
                                    value={this.state.neighbourhood}
                                    placeholderTextColor={'#ccc'}
                                    // width={Dimensions.get('window').width * 343 / 375}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._neighbourhood(text)}
                                />
                            </View>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? "المدينة" : "City"}</Text>

                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={I18nManager.isRTL ? "المدينة" : "City"}
                                    value={this.state.city}
                                    placeholderTextColor={'#ccc'}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._city(text)}
                                />
                            </View>
                            <View style={styles.textInputView}>
                                <Text style={styles.addressText}>{I18nManager.isRTL ? " (اختياري) ملاحظات" : "Notes (optional)"}</Text>

                                <TextInput
                                    style={[styles.textInputStyle, { height: Dimensions.get('window').height * 2 / 10 }]}
                                    placeholder={I18nManager.isRTL ? "ملاحظات" : "Notes"}
                                    value={this.state.notes}
                                    placeholderTextColor={'#ccc'}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this._notes(text)}
                                />
                            </View>
                            <TouchableOpacity style={[styles.tOpacity, { flexDirection: 'row' }]} onPress={() => { this.AddTypedAddress() }}>
                                <Text style={styles.text}>{I18nManager.isRTL ? "اضف العنوان" : "Add address"}</Text>

                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    textInputStyle: {
        paddingHorizontal: 10,
        flex: 10,
        fontFamily: 'Cairo-Bold',
        backgroundColor: colors.fade,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 20,

    },
    addressText: {
        flex: 3,
        fontFamily: 'Cairo-Bold',
    },
    textInputView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 343 / 375,
        // height: Dimensions.get('window').height * 46 / 812,
        // backgroundColor: 'red',
        flexDirection: 'row',
        marginVertical: 5
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
        justifyContent: 'flex-start',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // paddingHorizontal: 20,
        // padding: 20,
        // paddingBottom: 0,
        // backgroundColor:'red'

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
        fontSize: 14
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

    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    yellowContainer: {
        flexDirection: 'row',
        backgroundColor: '#FDFDDD',
        borderRadius: 35,
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
    },

    errorText: {
        color: 'red',
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width * (343) / 375,

    },

});
const mapStateToProps = state => ({
    adressReducer: state.adressReducer
})
const mapDispatchToProps = {
    addAdress,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAdressProceed)