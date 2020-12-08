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
// import MapView from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
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
class AddAdressMap extends React.Component {
    state = {
        isMapReady:false,
        longitude:0,
        latitude:0,
        street : " ",
route : " ",
neighbourhood : " ",
administrative_area:" ",
city :" ",
country : " ",

visible:true
    };


    static navigationOptions = { header: null }
   async componentDidMount() {
         
           this.setState({latitude:this.props.navigation.state.params.coords.latitude,longitude:this.props.navigation.state.params.coords.longitude})
           
    }


    getLocationAsync = async () => {
        this.setState({ visible: true })
        setTimeout(() => {
            this.setState({ visible: false })
        }, 6000);
        let status = await Permissions.askAsync(Permissions.LOCATION)
        // let status = await Location.getPermissionsAsync()
        let location = await Location.getCurrentPositionAsync({})
        this.setState({ location })
        Geocoder.init("AIzaSyD7arViUQWyZhROPL4HKcujDdNy_fi2XW4", { language:  "ar" });
        Geocoder.from(this.state.location.coords.latitude, this.state.location.coords.longitude)
            .then(json => {
                console.log(json.results[0].address_components);
                let street = json.results[0].address_components[0] ? json.results[0].address_components[0].long_name : " "
                let route = json.results[0].address_components[1] ? json.results[0].address_components[1].long_name : " "
                let neighbourhood = json.results[0].address_components[2] ? json.results[0].address_components[2].long_name : " ";
                let administrative_area = json.results[0].address_components[3] ? json.results[0].address_components[3].long_name : " ";
                let city = json.results[0].address_components[4] ? json.results[0].address_components[4].long_name : " ";
                let country = json.results[0].address_components[5] ? json.results[0].address_components[5].long_name : " ";
                this.props.addAdress({
                    street,
                    route,
                    neighbourhood,
                    administrative_area,
                    city,
                    country,
                    current: false,
                    lat: this.state.location.coords.latitude,
                    long: this.state.location.coords.longitude,
                },

                    // console.log("any")
                    setTimeout(() => {
                        dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

                    }, 500)
                )
                console.log(json.results[0]);
                // console.log("done");
                this.props.navigation.goBack()
                this.setState({ visible: false })


            })
            .catch(error => {
                console.warn(error)
                this.props.navigation.goBack()
                this.setState({ visible: false })
            });


    }
    // addAdressToReducer() {
    //     if (this.state.country && this.state.city && this.state.administrative_area
    //         && this.state.neighbourhood && this.state.route && this.state.appartement) {
    //         this.props.addAdress({
    //             street: this.state.street,
    //             route: this.state.route,
    //             neighbourhood: this.state.neighbourhood,
    //             administrative_area: this.state.administrative_area,
    //             city: this.state.city,
    //             country: this.state.country,
    //             current: false,
    //             lat: null,
    //             long: null
    //         })
    //         setTimeout(() => {
    //             dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

    //         }, 500)

    //     }
    //     else {
    //         this.setState({ _error: true })
    //         this.setState({ errorMessage: I18nManager.isRTL ? "يرجي إضافة عنوان صحيح" : "Enter a valid Adress" })

    //     }
    // }
    onMapLayout = () => {
        // console.log("any");
        this.setState({ isMapReady: true });
        // this.setState({ _IsCoords: true })

    }
  
    rigonComplete(region){
        
        // console.log(region);
        this.setState({
            latitude:region.latitude,
            longitude:region.longitude
        })
        this.debounceFunction(() => this._handleSearch(region), 2500)
    }
    debounceFunction(func, delay) {
        // Cancels the setTimeout method execution
        clearTimeout(this.timerId)
    
        // Executes the func after delay time.
        this.timerId = setTimeout(func, delay)
      }
      onRegionChange(){
        this.setState({ visible: true })
      }
      _handleSearch(region){
        
        console.log(region);
        Geocoder.init("AIzaSyD7arViUQWyZhROPL4HKcujDdNy_fi2XW4", { language:  "ar" });
        Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                console.log(json.results[0].address_components);
                this.setState({ street : json.results[0].address_components[0] ? json.results[0].address_components[0].long_name : " "})
                this.setState({ route : json.results[0].address_components[1] ? json.results[0].address_components[1].long_name : " "})
                this.setState({ neighbourhood : json.results[0].address_components[2] ? json.results[0].address_components[2].long_name : " "})
                this.setState({ administrative_area : json.results[0].address_components[3] ? json.results[0].address_components[3].long_name : " "})
                this.setState({ city : json.results[0].address_components[4] ? json.results[0].address_components[4].long_name : " "})
                this.setState({ country : json.results[0].address_components[5] ? json.results[0].address_components[5].long_name : " "})
                
                this.props.addAdress({
                    street,
                    route,
                    neighbourhood,
                    administrative_area,
                    city,
                    country,
                    current: false,
                    lat: this.state.location.coords.latitude,
                    long: this.state.location.coords.longitude,
                },

                    // console.log("any")
                    setTimeout(() => {
                        dataService.addAdress(this.props.adressReducer).then().catch(err => console.log(err))

                    }, 500)
                )
                console.log(json.results[0]);
                // console.log("done");
                // this.props.navigation.goBack()
                this.setState({ visible: false })


            })
            .catch(error => {
                console.warn(error)
                // this.props.navigation.goBack()
                this.setState({ visible: false })
            });
      }
    render() {
        return (
            <View style={styles.container}>
           

           

                <MapView
                    style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                    initialRegion={{
                        latitude:  this.state.latitude,
                        longitude:  this.state.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                        // zoomLevel:2
                    }}
                    onRegionChange={()=>{this.onRegionChange()}}
                    onRegionChangeComplete={(r)=>{this.rigonComplete(r)}}
                    ref={map => {this.map = map}}
                    onLayout={() => this.onMapLayout()}
                // onPress={() => console.log("f")}
                >
                    </MapView>
                    <View style={{width:Dimensions.get('window').width*8/10,
                         height:80,
                         position:'absolute',
                         alignSelf:'center',
                         bottom:20,
                         backgroundColor:"#5189f24D",
                         borderRadius:15,
                         justifyContent:'center',
                         alignItems:'center',
                         padding:20,
                         flexDirection:'row'
                        }}>
                         <View style={{flex:5}}> 
                            {this.state.visible?(<ActivityIndicator size={20} color={colors.black} />):
                            <Text style={styles.textAdd}>
                              {this.state.street } , 
                              {this.state.route } ,
                              {this.state.neighbourhood } ,
                              {this.state.administrative_area } ,
                              {this.state.city } ,
                              {this.state.country }
                            </Text>}
                            </View>
                            <TouchableOpacity style={styles.touchable}>
                                <Text>add</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <Image source={require("../../assets/icons/mappin.png")}
            style={styles.mainImageStyle} />
                  


                </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
   touchable:{
       width:Dimensions.get('window').width*8/10,
       flex:1,
       backgroundColor:'red',
       height:60
   },
    
    mainImageStyle:{
        width: 30,
        height: 30,
        resizeMode: "contain",
        position:'absolute',
        top:Dimensions.get('window').height *1/2-15,
        right:Dimensions.get('window').width * 1/2-15,
    },
    textAdd:{
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
    }
});
const mapStateToProps = state => ({
    adressReducer: state.adressReducer
})
const mapDispatchToProps = {
    addAdress,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAdressMap)