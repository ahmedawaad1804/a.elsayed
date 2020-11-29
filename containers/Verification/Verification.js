import React from 'react';
import { StyleSheet, Text, View, CheckBox, ActivityIndicator, TouchableHighlight, Button, Input,I18nManager,Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* service */
import authService from '../../services/authService'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';
/* token */
import { setToken } from '../../utility/storage'
import { setLogin } from '../../actions/loginAction'

/* confirmation */
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPTextInput from 'react-native-otp-textinput'

class Verification extends React.Component {
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
  //       marginLeft: 40, alignItems: 'center', marginBottom: 30,
  //     }}>
  //       <Text style={{
  //         fontFamily: 'Cairo-Regular',
  //         fontSize: 20,
  //       }}>Register</Text>
  //     </View>
  //   ),


  // });

  state = {
    code: '',
    _checkVer: false,
    _error: false,
    errorMessage: " "
  }
  _checkOTP() {
    this.setState({ _checkVer: true })
    setTimeout(() => {
      this.setState({ _checkVer: false })
    }, 1000);

    authService.verifyOTP(this.props.navigation.getParam("phonenumber"), this.state.code).then(response => {

      setToken(response.data.token)
      this.props.setLogin("n")
      this.props.navigation.navigate("JBHome")
      this.setState({ _checkVer: false })


    }
    ).catch(err => {
      console.log(err.response.data)
      this.setState({ _error: true })
      this.setState({ errorMessage: err.response.data.status })
      this.setState({ _checkVer: false })
    }
    )

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
              }}>{I18nManager.isRTL ? "التفعيل" : "Verification"}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            </View>

          </View>
          <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * (Header.HEIGHT) / 812 }}></View>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
              <View style={styles.textView}>
                <View style={{}}>
                  <Text style={styles.headerText}>{I18nManager.isRTL ? "قم بتفعيل الهاتف" : "Verify Phone Number"}</Text>
                  <Text style={styles.instructionText}>{I18nManager.isRTL ? "ادخل الاربعة ارقام المرسلة" : "Enter 4 digits pin code"}</Text>
                </View>
              </View>
              <Image source={require("../../assets/icons/1of2.png")}
                style={styles.progressImage} />
            </View>

            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 3 / 812 }}></View>
            {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
            {!this.state._error && (<Padv height={22} />)}
            <View style={styles.yellowContainer}>
              <View style={styles.iconView}>
                <Image source={require("../../assets/icons/shield.png")}
                  style={styles.imageStyleShield} />
              </View>
              <View style={styles.textInputView}>

                <OTPTextInput inputCount={4}
                  textInputStyle

                  handleTextChange={code => {
                    this.setState({ code })
                    this.setState({ errorMessage: " " })

                  }}
                  containerStyle={styles.containerStyle}
                  textInputStyle={styles.textInputStyle}
                  offTintColor={colors.fade}
                ></OTPTextInput>
              </View>
            </View>



            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 28 / 812 }}></View>


            <TouchableOpacity style={styles.tOpacity}
              disabled={this.state._checkVer}
              onPress={() => {
                this._checkOTP();
              }}
            >
              {
                this.state._checkVer && (<ActivityIndicator size={20} color={colors.black} />)

              }
              {
                !this.state._checkVer && (<Text style={styles.text}>{I18nManager.isRTL ? "تفعيل" : "VERIFY"}</Text>)
              }
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
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: colors.fade,
    borderRadius: 35,
    width: Dimensions.get('window').width * 224 / 375,
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
  imageStyleShield: {
    width: 50 / 2.2,
    height: 54 / 2.2,
    padding: 10
  },
  imageStyleEnv: {
    width: 30 / 1.2,
    height: 25 / 1.2,
    padding: 0
  },
  imageStylePad: {
    width: 39 / 2.3,
    height: 54 / 2.3,
    padding: 0
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (224 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    backgroundColor: 'red',


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
    fontSize: 20
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
  }, containerStyle: {
    width: 50,
    paddingBottom: 7
  }, textInputStyle: {
    width: (Dimensions.get('window').width - 130) / 9,
    fontFamily: 'Cairo-Bold'
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
const mapDispatchToProps = {
  setLogin
};
export default connect(mapStateToProps, mapDispatchToProps)(Verification)