import React from 'react';
/* services */
import authService from '../../services/authService'

import { StyleSheet, Text, View, CheckBox, ActivityIndicator, KeyboardAvoidingView,I18nManager,TouchableWithoutFeedback,Keyboard, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';
/* padding */
import Padv from '../../components/ViewPad/PadV'

class Register extends React.Component {
  state = {

    errorMessage: " ",
    _error: false,
    //all equals nuu
    username: "",
    password: "",
    phonenumber: "",
    email: "aaa@aaa.com",


    _checkReg: false
  }

  static navigationOptions = { header: null }
  // static navigationOptions = ({ navigation, screenProps }) => ({

  //   headerStyle: {
  //     backgroundColor: colors.primary,
  //     elevation: 0, // remove shadow on Android
  //     shadowOpacity: 0, // remove shadow on iOS
  //   },
  //   headerLeft: (<TouchableOpacity style={{ marginBottom: 30, marginLeft: 30, padding: 15 }} onPress={() => { navigation.pop() }}>
  //     <Image
  //       source={require('../../assets/icons/back.png')}
  //       style={{
  //         width: Dimensions.get('window').width * 10 / 375,
  //         height: Dimensions.get('window').height * 18 / 812,
  //       }}
  //     />
  //   </TouchableOpacity>),
  //   headerTitle: (
  //     <View style={{
  //       width: Dimensions.get('window').width * 1 / 2,
  //       height:90,
  //       marginLeft: 40, alignItems: 'center', marginBottom: 30,
  //     }}>
  //       <Text style={{
  //         fontFamily: 'Cairo-Regular',
  //         fontSize: 20,
  //       }}>bbb</Text>
  //     </View>
  //   ),


  // });

  _handleUsername(username) {
    this.setState({ username })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
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
  _handleEmail(email) {
    this.setState({ email })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
  }



  _handleSubmit() {
    this.setState({ _checkReg: true })
    if (this.state.phonenumber) {
      if (this.state.phonenumber.length <= 10) {
        this.setState({ _checkReg: false })
        this.setState({ _error: true })
        this.setState({ errorMessage: "Enter a valid Phone number" })

      }
    }
    else {
      this.setState({ _checkReg: false })
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid Phone number" })
    }
    if (this.state.password) {
      if (this.state.password.length < 8) {
        this.setState({ _checkReg: false })
        this.setState({ _error: true })
        this.setState({ errorMessage: "Password minimum lenght 8 characters" })

      }
    }
    else {
      this.setState({ _checkReg: false })
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid Password" })
    }
    if (!this.state.username) {
      this.setState({ _checkReg: false })
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid username" })
    }

    setTimeout(() => {

      if (!this.state._error) { // invert flag

        authService.register(this.state.phonenumber, this.state.password, this.state.username, this.state.email).then(async response => {
          //save token and navigatexf
          console.log(response.data.status);



          await this._checkValidNumber(this.state.phonenumber)


        }
        ).catch(err => {
          console.log(err.response.data)
          this.setState({ _error: true })
          this.setState({ errorMessage: err.response.data.status })
          this.setState({ _checkReg: false })

        }
        )

      }
      else {
        this.setState({ _checkReg: false })
      }
    }, 500);

  }
  _checkValidNumber(number) {
    authService.sendOTP(number).then(response => {
      //save token and navigatexf
      if (response.data.status == "success") {
        this.setState({ _checkReg: false })

        this.props.navigation.navigate("Verification", { phonenumber: this.state.phonenumber })

      }
    }
    ).catch(err => {
      console.log(err.response.data)

      this.setState({ _checkReg: false })
      this.setState({ _error: true })
      this.setState({ errorMessage: err.response.data.status })

    }
    )

  }
  componentDidMount() {


  }
  _validateEmail(email) {
    var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(email);
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
            <Text style={{
              fontFamily: 'Cairo-Regular',
              fontSize: 20,
            }}>{I18nManager.isRTL ? "التسجيل" : "Register"}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          </View>

        </View>
        <KeyboardAvoidingView   style={styles.mainContainer}>
          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * (Header.HEIGHT) / 812 }}></View>
          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <View style={styles.textView}>
              <View style={{}}>
                <Text style={styles.headerText}>{I18nManager.isRTL ? "تسجيل الحساب" : "Register Account"}</Text>
                <Text style={styles.instructionText}>{I18nManager.isRTL ? "من فضلك املاء البيانات التالية" : "Please fill below info"}</Text>
              </View>
            </View>
            <Image source={require("../../assets/icons/1of1.png")}
              style={styles.progressImage} />
          </View>
          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 19 / 812 }}></View>
          {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
          {!this.state._error && (<Padv height={22} />)}
          <View style={[styles.yellowContainer, styles.yellowUpperOnly]}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/user.png")}
                style={styles.imageStyle} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={I18nManager.isRTL ? "اسم المستخدم" : "Username"}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                autoCapitalize='none'
                onChangeText={(text) => this._handleUsername(text)}
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 20 / 812 }}></View>
          <View style={[styles.yellowContainer, styles.yellowUpperOnly]}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/password.png")}
                style={styles.imageStyle} />
            </View>

            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={I18nManager.isRTL ? "الرقم السري" : "Password"}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                autoCapitalize='none'
                onChangeText={(text) => this._handlePassword(text)}
                secureTextEntry
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 20 / 812 }}></View>

          <View style={[styles.yellowContainer, styles.yellowUpperOnly]}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/pad.png")}
                style={styles.imageStylePad} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={I18nManager.isRTL ? "رقم الهاتف" : "Phone Number"}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                autoCapitalize='none'
                keyboardType={Platform.OS ? "numeric" : "number-pad"}

                onChangeText={(text) => this._handlePhoneNumber(text)}
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 20 / 812 }}></View>

          <View style={[styles.yellowContainer, styles.yellowUpperOnly]}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/envlop.png")}
                style={styles.imageStyleEnv} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={I18nManager.isRTL ? "البريد الالكتروني" : "Email Adress"}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                autoCapitalize='none'
                onChangeText={(text) => this._handleEmail(text)}
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 28 / 812 }}></View>

          {/* <KeyboardAvoidingView behavior='height' > */}

          <TouchableOpacity style={styles.tOpacity}
            disabled={this.state._checkReg}
            onPress={() => this._handleSubmit()}>
            {
              this.state._checkReg && (<ActivityIndicator size={20} color={colors.black} />)

            }
            {
              !this.state._checkReg && (<Text style={styles.text}>{I18nManager.isRTL ? "تسجيل" : "REGISTER"}</Text>)
            }
          </TouchableOpacity>

          {/* </KeyboardAvoidingView> */}






        </KeyboardAvoidingView>
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
  mainContainer: {
    width: '100%',
    height: '89%',
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF064',
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
    padding: 10
  },
  imageStyleEnv: {
    width: 30 / 1.2,
    height: 25 / 1.2,
    padding: 0,
    resizeMode: "contain"
  },
  imageStylePad: {
    width: 39 / 2.3,
    height: 54 / 2.3,
    padding: 0
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
    textAlign: (I18nManager.isRTL && Platform.OS==='ios') ? 'right' : null
  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 130,
    marginRight: 70,

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
    fontSize: 20,
    textAlign: (I18nManager.isRTL && Platform.OS==='ios') ? 'left' : null
    ,
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
  },
  progressImage: {
    marginRight: 25,
    height: 167 / 3.5,
    width: 197 / 3.5
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  },
  headerContainer: {
    width: Dimensions.get('window').width,
    height: "11%",
    backgroundColor: colors.primary,
    alignContent: "center", justifyContent: 'center',
    flexDirection: 'row'
},
});
const mapStateToProps = state => ({
  www: state.www
})
export default connect(mapStateToProps)(Register)