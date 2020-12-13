import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Platform, Animated, Alert, UIManager, I18nManager, Keyboard, Switch, CheckBox, ActivityIndicator, TouchableWithoutFeedback, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import * as AppleAuthentication from 'expo-apple-authentication';
import { connect } from 'react-redux'
/* localization */
import { Restart } from 'fiction-expo-restart';
import RNRestart from 'react-native-restart';
import * as Localization from 'expo-localization';
import { IMLocalized, init } from '../../utilities/IMLocalized';
/* menu */
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
/* google */
import * as Google from 'expo-google-app-auth';
// ios clientID=628256299763-a7af1lisn6f4vh8vt6g2uhu4l8sp8k31.apps.googleusercontent.com
import i18n from 'i18n-js';

i18n.translations = {
  en: require('../../utilities/en.json'),
  ar: require('../../utilities/ar.json'),
};
class Login extends React.Component {
  ////1209270809432735
  //3070973469686409
  FBlogIn = async () => {
    this.setState({ visible: true })
    Facebook.initializeAsync("3070973469686409")
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("3070973469686409", {
        permissions: ["public_profile"]
      });
      // console.log(type);
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const userData = await response.json()

        // console.log(token);
        const responseData = await fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,middle_name,picture,email&access_token=${token}`)
        // .then(response => response.json())
        // .then(data => console.log(data));
        const res = await responseData.json()
        // console.log(res);

        // this.setState({ lParams: await response.json().id })
        // this.setState({ fb: token })

        authService.checkFaceBookUser(userData.id).then(
          response => {
            if (response.data.status == "Exist") {
              // console.log(response.data.user);
              setToken(response.data.token)
              this.props.setLogin("f")
              this.setState({ visible: false })

              this.props.navigation.navigate("JBHome")

            }
            else if (response.data.status == "Not Exist") {
              console.log("Not Exist");
              this.setState({ visible: false })

              this.props.navigation.navigate("VerifyFBSignUp", { userData, token, fbImage: res.picture.data.url })
            }


          }

        ).catch(
          err => {
            console.log(err);
            this.setState({ visible: false })

          }
        )

        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        alert(`Facebook Login Error: Cancelled`);
      }
    } catch ({ message }) {
      this.setState({ visible: false, _error: true, errorMessage: message })
      console.log(message);
      console.log(`Facebook Loginr Error: ${message}`);
    }
    this.setState({ visible: false })

  };
  googleLogIn = async () => {
    this.setState({ visible: true })
    try {

      const { type, accessToken, user } = await Google.logInAsync({
        clientId: Platform.OS === 'android' ? "628256299763-6ufb00uro0ehiog4s8ud0hd3hs6jd0ft.apps.googleusercontent.com" : "628256299763-a7af1lisn6f4vh8vt6g2uhu4l8sp8k31.apps.googleusercontent.com",
        iosClientID: "628256299763-a7af1lisn6f4vh8vt6g2uhu4l8sp8k31.apps.googleusercontent.com",
        androidClientId: "628256299763-6ufb00uro0ehiog4s8ud0hd3hs6jd0ft.apps.googleusercontent.com",
        androidStandaloneAppClientId: "628256299763-0ekmucvo47ervaq6d6ge80trnkme17u4.apps.googleusercontent.com"
      });
      if (type === 'success') {
        // Then you can use the Google REST API
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const userData = await userInfoResponse.json()
        console.log(userData);
        authService.checkFaceBookUser(userData.id).then(
          response => {
            if (response.data.status == "Exist") {
              // console.log(response.data.user);
              console.log("Exist");

              setToken(response.data.token)
              this.props.setLogin("f")
              this.props.navigation.navigate("JBHome")
              this.setState({ visible: false })


            }
            else if (response.data.status == "Not Exist") {
              console.log("Not Exist");
              this.setState({ visible: false })

              this.props.navigation.navigate("VerifyFBSignUp", { userData, token: null, fbImage: userData.picture })
            }
          }

        ).catch(
          err => {
            console.log(err);
            this.setState({ visible: false, _error: true, errorMessage: err.response.data })

          }
        )
        // .then(res=>res.json())
        // .then(res=>
        //   {
        //     console.log(res);
        //   }).catch(err=>{console.log(err);})
      }

    } catch ({ message }) {
      console.log(message);
      this.setState({ visible: false, _error: true, errorMessage: message })

    }
    this.setState({ visible: false })

  };
  static navigationOptions = { header: null }

  state = {
    checked: false,
    _ckeckSignIn: false,
    phonenumber: null,
    password: null,
    phoneError: true,
    passwordError: true,
    errorMessage: " ",
    _error: false,
    showPass: true,
    visible: false,

    animeHeight: new Animated.Value(Dimensions.get('window').height * 2)
  }
  setMenuRef = ref => {

    this._menu = ref;
  };

  hideMenu = (string) => {

    this._menu.hide();
  };

  showMenu = (string) => {
    this._menu.show();
  }
  changeLang(item) {
    console.log(item);
    // if(item == 'ar'){console.log("any");}
    if (item == 'ar' && !I18nManager.isRTL) {
      setTimeout(() => {
        I18nManager.forceRTL(!I18nManager.isRTL)
        I18nManager.allowRTL(!I18nManager.isRTL)
        Restart();
      }, 500);

    }
    else if (item == 'en' && I18nManager.isRTL) {
      setTimeout(() => {
        I18nManager.forceRTL(!I18nManager.isRTL)
        I18nManager.allowRTL(!I18nManager.isRTL)
        Restart();
      }, 500);

    }
    else if (item == 'ar' && I18nManager.isRTL) {
      this.setState({ _error: true, errorMessage: "انت تستخدم اللغة العربية" })
    }
    else if (item == 'en' && !I18nManager.isRTL) {
      this.setState({ _error: true, errorMessage: "ُEnglish is used" })
    }

  }
  componentDidMount() {
    Animated.timing(this.state.animeHeight, {
      toValue: Dimensions.get('window').height,
      duration: 1000
    }).start();
    // store.dispatch(getProducts())
    // this.props.updateLang({asd:"asdsd"})
    this._handleRememberMeGet()
    console.log(I18nManager);
    // I18nManager.forceRTL(true)
    // console.log(Localization.locales);
    // i18n.locale = "cc"
    // console.log(i18n);
    // if (UIManager.setLayoutAnimationEnabledExperimental)
    // {UIManager.setLayoutAnimationEnabledExperimental(false);}
    // console.log(UIManager.setLayoutAnimationEnabledExperimental);


  }
  _handlePassword(password) {
    this.setState({ password })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
  }
  _handlePhoneNumber(phonenumber) {
    this.setState({ phonenumber })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
  }
  _test() {
    I18nManager.forceRTL(!I18nManager.isRTL)
    Restart();
  }
  _handleSubmit() {
    if (this.state.phonenumber) {
      if (this.state.phonenumber.length <= 10) {
        this.setState({ _error: true })
        this.setState({ errorMessage: "Enter a valid Phone number" })

      }
    }
    else {
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid Phone number" })
    }
    if (this.state.password) {
      if (this.state.password.length < 8) {
        this.setState({ _error: true, errorMessage: "Password minimum lenght 8 characters" })

      }
    }

    else {
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid password" })
    }

    setTimeout(() => {

      if (!this.state._error) {

        if (this.state.checked) {
          this._handleRememberMeSet(this.state.phonenumber, this.state.password)
        } else {
          AsyncStorage.removeItem('phonenumber')
          AsyncStorage.removeItem('password')
        }

        this.setState({ _ckeckSignIn: true })
        authService.login(this.state.phonenumber, this.state.password).then(response => {
          //save token and navigatexf
          setToken(response.data.token)
          this.props.setLogin("n")
          this.props.navigation.navigate("JBHome")

        }
        ).catch(err => {
          console.log(err.response.data.status)
          this.setState({ _error: true })
          this.setState({ errorMessage: err.response.data.status })
        }
        ).finally(() => {
          this.setState({ _ckeckSignIn: false })
        })

      }
    }, 500);


  }
  async _handleRememberMeSet(phonenumber, password) {

    try {
      await AsyncStorage.setItem(
        'phonenumber', phonenumber
      );
      await AsyncStorage.setItem(
        'password', password
      );
    } catch (error) {
      // Error saving data
      console.log(error);

    }

  }
  async _handleRememberMeGet() {

    try {
      const phonenumber = await AsyncStorage.getItem('phonenumber');
      const password = await AsyncStorage.getItem('password');

      this.setState({ phonenumber: phonenumber })
      this.setState({ password: password })



    } catch (error) {
      // Error retrieving data
      console.log(error);

    }


  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={[styles.container, { height: Dimensions.get('window').height }]}>
          <KeyboardAvoidingView style={styles.mainImageView}>

            <Image source={require("../../assets/logo.png")}
              style={[styles.mainImageStyle, { marginBottom: 20 }]} />
          </KeyboardAvoidingView>
          <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
              <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} />
            </View>

            {/* <Padv height={40} /> */}

            <View style={styles.iconViewLangCont}>
              <TouchableOpacity style={styles.iconViewLang} onPress={() => { this.showMenu() }}>
                <Image source={require("../../assets/icons/lang.png")}
                  style={styles.imageStyle} />
                <View style={{ position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center', height: "100%", width: 30 }}>
                  <Menu
                    style={{ borderRadius: 20, position: 'absolute', }}
                    ref={this.setMenuRef}
                  >
                    <MenuItem onPress={() => { this.hideMenu(), this.changeLang("ar") }}>
                      <Text>العربية</Text></MenuItem>
                    <MenuItem onPress={() => { this.hideMenu(), this.changeLang("en") }}
                    >
                      <Text styles={{ justifyContent: 'flex-end' }}>English</Text>

                    </MenuItem>

                  </Menu>

                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>{i18n.t('login')}</Text>
            </View>
            <Padv height={8} />
            {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
            {!this.state._error && (<Padv height={22} />)}

            <View style={[styles.yellowContainer,]}>

              <View style={styles.iconView}>
                <Image source={require("../../assets/icons/user.png")}
                  style={styles.imageStyle} />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={I18nManager.isRTL ? "رقم الهاتف" : "Phone Number"}
                  value={this.state.phonenumber}
                  placeholderTextColor={'#ccc'}
                  width={Dimensions.get('window').width * 3 / 5}
                  keyboardType={Platform.OS ? "numeric" : "number-pad"}

                  autoCapitalize='none'
                  onChangeText={(text) => this._handlePhoneNumber(text)}
                />
              </View>
            </View>


            <Padv height={20} />


            <View style={styles.yellowContainer}>
              <View style={styles.iconView}>
                <Image source={require("../../assets/icons/password.png")}
                  style={styles.imageStyle} />
              </View>
              <View style={styles.textInputViewPass}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.password}
                  placeholder={I18nManager.isRTL ? "الرقم السري" : "Password"}
                  placeholderTextColor={'#ccc'}
                  width={Dimensions.get('window').width * 3 / 5}

                  secureTextEntry={this.state.showPass}
                  autoCapitalize='none'
                  onChangeText={(text) => this._handlePassword(text)}
                />
              </View>
              <TouchableOpacity style={styles.iconViewEye}
                onPress={() => { this.setState({ showPass: !this.state.showPass }) }}
              >
                <Image source={require("../../assets/icons/eye.png")}
                  style={styles.imageStyleEye} />
              </TouchableOpacity>

            </View>
            <Padv height={30} />


            <TouchableOpacity style={styles.tOpacity}
              // disabled={this.state._ckeckSignIn}
              onPress={() => this._handleSubmit()}>
              {
                this.state._ckeckSignIn && (<ActivityIndicator size={20} color={colors.black} />)

              }
              {
                !this.state._ckeckSignIn && (<Text style={styles.text}>{i18n.t('login')}</Text>)
              }

            </TouchableOpacity>


            <Padv height={15} />


            <View style={{ flux: 1, flexDirection: 'row', alignItems: 'flex-start', width: Dimensions.get('window').width }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center', paddingHorizontal: 15
              }}>
                {Platform.OS === 'ios' ?
                  <Switch
                    center
                    value={this.state.checked}
                    onValueChange={() => { this.setState({ checked: !this.state.checked }) }}
                    trackColor={{ false: "#767577", true: colors.primary }}
                  /> :
                  <CheckBox
                    center
                    value={this.state.checked}
                    onValueChange={() => { this.setState({ checked: !this.state.checked }) }}

                  />}
                <Text style={styles.smallText}>{i18n.t('keepmein')}</Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Forgot") }}>
                  <Text style={styles.smallTextUnderLine}>{i18n.t('forget')}</Text>
                </TouchableOpacity>


              </View>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3f5c9a",
                  alignItems: "center",
                  justifyContent: "center",
                  width: Dimensions.get('window').width * 160 / 375,
                  height: Dimensions.get('window').height * 46 / 812,
                  borderColor: "#3f5c9a",
                  borderWidth: 1,
                  borderRadius: 50,
                  marginHorizontal: 5
                }}
                onPress={this.FBlogIn}
              >

                <FontAwesome name="facebook-f" size={20} color="white" />
              </TouchableOpacity>

              {true?<TouchableOpacity
                style={{
                  backgroundColor: "#de5246",
                  alignItems: "center",
                  justifyContent: "center",
                  width: Dimensions.get('window').width * 160 / 375,
                  height: Dimensions.get('window').height * 46 / 812,
                  borderColor: "#de5246",
                  borderWidth: 1,
                  borderRadius: 50,
                  marginHorizontal: 5

                }}
                onPress={this.googleLogIn}
              >

                <FontAwesome name="google" size={20} color="white" />
              </TouchableOpacity>:
                <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: Dimensions.get('window').width * 160 / 375,
                height: Dimensions.get('window').height * 46 / 812, 
                alignItems: "center",
                  justifyContent: "center",
                borderWidth: 1,
                borderRadius: 50,
                marginHorizontal: 5
              }}
                onPress={async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });
                    // signed in
                  } catch (e) {
                    if (e.code === 'ERR_CANCELED') {
                      // handle that the user canceled the sign-in flow
                    } else {
                      // handle other errors
                    }
                  }
                }}
              />}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', }}>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("Register") }}>
                <Text style={styles.textBelow}>{i18n.t('rgister')}</Text>
              </TouchableOpacity >
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }} >
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("MainTabNavigator") }}>
                  <Text style={styles.textBelow}>{i18n.t('skip')}</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  mainContainer: {
    width: '100%',
    height: '65%',
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
  iconViewLangCont: {
    flex: 1,
    flexDirection: "row",
    alignSelf: 'flex-end',
    marginHorizontal: 20
  },
  iconViewLang: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
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
  textInputViewPass: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 110) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    fontFamily: 'Cairo-Bold',
    textAlign: (I18nManager.isRTL ) ? 'right' : null
  },
  textInputStylePass: {
    paddingHorizontal: 10,
    fontFamily: 'Cairo-Bold',
    textAlign: (I18nManager.isRTL && Platform.OS === 'ios') ? 'right' : null
  },
  textInputStylePassAndroid: {
    paddingHorizontal: 10,
    fontFamily: 'Cairo-Bold',
    // textAlign: "right"
  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textBelow: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    padding: 15
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
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  },
  smallIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",

  },
});
const mapStateToProps = state => ({

  productsReducer: state.productsReducer,

})

const mapDispatchToProps = {
  getProducts,
  setLogin
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)