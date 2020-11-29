import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Platform, Animated, Alert, UIManager, Keyboard, I18nManager, CheckBox, TouchableWithoutFeedback, ActivityIndicator, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* localization */
import { Restart } from 'fiction-expo-restart';
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
import RNRestart from 'react-native-restart';
import * as Localization from 'expo-localization';
import { IMLocalized, init } from '../../utilities/IMLocalized';
/* token */
import { setToken } from '../../utility/storage'
/* colors */
import colors from '../../colors'
/* padding */
import Padv from '../../components/ViewPad/PadV'
/* services */
import authService from '../../services/authService'
/* redux*/
import { getProducts } from '../../actions/product'
import { setLogin } from '../../actions/loginAction'
/* facebook */
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Facebook from 'expo-facebook';

/* google */
import * as Google from 'expo-google-app-auth';
// ios clientID=628256299763-a7af1lisn6f4vh8vt6g2uhu4l8sp8k31.apps.googleusercontent.com
import i18n from 'i18n-js';
import dataService from '../../services/dataService';


export default class ContactUs extends React.Component {

  static navigationOptions = { header: null }

  state = {
    data: {},
    Message: "",
    Subject: "",
    visible: false,
    category:"",
    message:""
  }
  componentDidMount() {
   
  }
  _handleMessage(message) {
    this.setState({ message })

  }
  _handleSubject(category) {
    this.setState({ category })

  }
  _send() {
    this.setState({ visible: true })
    console.log();
    dataService.sendMessage( this.state.message,  this.state.category ).then(res => {
      // console.log("yes");
      setTimeout(() => {
        this.setState({ visible: false })

        this.props.navigation.navigate("Home")

      }, 2000);
    }).catch(err=>{
      console.log(err);
      setTimeout(() => {
        this.setState({ visible: false })

        this.props.navigation.navigate("Home")

      }, 2000);
    })

  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={[styles.container, { height: this.state.animeHeight }]}>
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} />
          </View>
          <KeyboardAvoidingView style={styles.mainImageView}>

            <Image source={require("../../assets/logo.png")}
              style={[styles.mainImageStyle, { marginBottom: 20 }]} />
          </KeyboardAvoidingView>

          <View style={styles.mainContainer}>
            <View style={[styles.yellowContainer]}>

              <View style={styles.iconView}>
                <Image source={require("../../assets/icons/subject.png")}
                  style={styles.imageStyle} />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={I18nManager.isRTL ? "الموضوع" : "Subject"}
                  value={this.state.phonenumber}
                  placeholderTextColor={'#ccc'}
                  width={Dimensions.get('window').width * 3 / 5}

                  autoCapitalize='none'
                  onChangeText={(text) => this._handleSubject(text)}
                />
              </View>
            </View>



            <View style={[styles.yellowContainerMessage,]}>

              <View style={styles.iconView}>
                <Image source={require("../../assets/icons/message.png")}
                  style={styles.imageStyle} />
              </View>
              <View style={styles.textInputViewM}>
                <TextInput
                  style={styles.textInputStyleM}
                  placeholder={I18nManager.isRTL ? "الرسالة" : "Message"}
                  value={this.state.phonenumber}
                  placeholderTextColor={'#ccc'}
                  width={Dimensions.get('window').width * 3 / 5}

                  autoCapitalize='none'
                  onChangeText={(text) => this._handleMessage(text)}
                  multiline
                />
              </View>
            </View>
            <TouchableOpacity style={styles.tOpacity}
              // disabled={this.state._ckeckSignIn}
              onPress={() => this._send()}>
              <Text style={styles.text}>{I18nManager.isRTL ? "إرسال" : "Send"}</Text>

            </TouchableOpacity>




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

    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 20
  },
  mainContainer: {
    width: '100%',
    height: '65%',
    padding: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }, yellowUpperOnly: {
    marginTop: 150
  }
  ,
  yellowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDFDDD',
    borderRadius: 35,
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  yellowContainerMessage: {
    flexDirection: 'row',
    backgroundColor: '#FDFDDD',
    borderRadius: 35,
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 220 / 812,
    marginTop: Dimensions.get('window').height * 20 / 812,
  },
  iconView: {
    borderTopLeftRadius: I18nManager.isRTL ? 0 : 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopRightRadius: I18nManager.isRTL ? 35 : 0,
    // I18nManager.isRTL
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF064',
    width: Dimensions.get('window').width * 54 / 375,
    height: Dimensions.get('window').height * 46 / 812,

  },
  iconViewEye: {

    alignItems: 'center',
    justifyContent: 'center',

    width: Dimensions.get('window').width * 54 / 375,
    height: Dimensions.get('window').height * 46 / 812,

  },
  tOpacity: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 10,
    height: 10,
    padding: 10,
    resizeMode: "contain"
  },
  imageStyleEye: {
    width: 10,
    height: 10,
    padding: 10,
    resizeMode: "contain"
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },

  textInputStyle: {
    paddingHorizontal: 10,
    fontFamily: 'Cairo-Bold',
    textAlign: I18nManager.isRTL && Platform.OS === "ios" ? 'right' : null

  },
  text: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14
  },
  textBelow: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    padding: 15
  },
  textInputViewM: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    height: Dimensions.get('window').height * 220 / 812,
    padding: 10
  },

  textInputStyleM: {
    fontFamily: 'Cairo-Bold',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    textAlign: I18nManager.isRTL && Platform.OS === "ios" ? 'right' : null,
    height: Dimensions.get('window').height * 180 / 812,
  },
  text: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14
  },
  textBelow: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    padding: 15
  },
  textInputViewPass: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 110) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },

  titleText: {
    // marginLeft: Dimensions.get('window').width * 32 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 20
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: 50

  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  mainImageView: {

  },
  mainImageStyle: {

  },
  iconStyle: {
    height: Dimensions.get('window').height * 46 / 812,
    resizeMode: 'contain',
    marginHorizontal: 10
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  tOpacity: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
    marginTop: Dimensions.get('window').height * 20 / 812,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
