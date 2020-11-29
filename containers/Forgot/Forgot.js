import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, ActivityIndicator, Platform, Button, Input, ScrollView, I18nManager, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';
/* padding */
import Padv from '../../components/ViewPad/PadV'
class Forgot extends React.Component {
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
  //       }}>Forgot Password</Text>
  //     </View>
  //   ),


  // });

  state = {
    checked: false,
    phonenumber: null,
    _checkReset: false,
    _error: false,
    errorMessage: " "
  }
  componentDidMount() {

    console.log('forgot');

  }
  _handlePhoneNumber(phonenumber) {
    this.setState({ phonenumber })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
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


    setTimeout(() => {

      if (!this.state._error) {


        this.setState({ _checkReset: true })
        authService.sendOTP(this.state.phonenumber).then(response => {
          //save token and navigatexf
          // console.log(response.data.status);

          this.props.navigation.navigate("VerificationReset", { phonenumber: this.state.phonenumber })
          this.setState({ _checkReset: false })


        }
        ).catch(err => {
          console.log(err.response.data.status)
          this.setState({ _error: true })
          this.setState({ errorMessage: err.response.data.status })
          this.setState({ _checkReset: false })

        }
        )
      }
    }, 500);


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
              }}>{I18nManager.isRTL ? "إستعادة" : "Retrieve"}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            </View>

          </View>
          <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * (Header.HEIGHT) / 812 }}></View>
            <View style={styles.textView}>
              <Text style={styles.instructionText}>{I18nManager.isRTL ? "ادخل رقم الهاتف المرتبط بحسابك" : "Enter the phone number associated with your account"}</Text>
            </View>
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
                  placeholder={I18nManager.isRTL ? "رقم الهاتف" : "Phone Number"}
                  placeholderTextColor={'#ccc'}
                  width={Dimensions.get('window').width * 3 / 5}
                  value={this.state.phonenumber}

                  keyboardType={Platform.OS ? "numeric" : "number-pad"}
                  autoCapitalize='none'
                  onChangeText={(text) => this._handlePhoneNumber(text)}

                />
              </View>
            </View>

            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 28 / 812 }}></View>

            <TouchableOpacity style={styles.tOpacity}
              disabled={this.state._checkReset}
              onPress={() => this._handleSubmit()}>
              {
                this.state._checkReset && (<ActivityIndicator size={20} color={colors.black} />)

              }
              {
                !this.state._checkReset && (<Text style={styles.text}>{I18nManager.isRTL ? "إستعادة" : "RESET PASSWORD"}</Text>)
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
    height: 25 / 1.1,
    resizeMode: 'contain'
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    textAlign: (I18nManager.isRTL && Platform.OS==='ios') ? 'right' : null,
    fontFamily: 'Cairo-Bold',


  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 85,
    marginRight: 85
    ,
  },
  instructionText: {
    marginLeft: Dimensions.get('window').width * 32 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 14
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
export default connect(mapStateToProps)(Forgot)