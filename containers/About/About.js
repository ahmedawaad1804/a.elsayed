import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Platform, Animated, Alert, UIManager, I18nManager, CheckBox,Linking, ActivityIndicator, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* localization */
import { Restart } from 'fiction-expo-restart';

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
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
/* google */
import * as Google from 'expo-google-app-auth';
// ios clientID=628256299763-a7af1lisn6f4vh8vt6g2uhu4l8sp8k31.apps.googleusercontent.com
import i18n from 'i18n-js';
import dataService from '../../services/dataService';

i18n.translations = {
  en: require('../../utilities/en.json'),
  ar: require('../../utilities/ar.json'),
};
export default class About extends React.Component {

  static navigationOptions = { header: null }

  state = {
    data: {}
  }
  componentDidMount() {

    dataService.getBrief().then(res => {
      if(res.data.result[0]){
      this.setState({ data: res.data.result[0] })}
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  render() {
    return (
      <Animated.View style={[styles.container, { height: this.state.animeHeight }]}>
        <KeyboardAvoidingView style={styles.mainImageView}>

          <Image source={require("../../assets/logo.png")}
            style={[styles.mainImageStyle, { marginBottom: 20 }]} />
        </KeyboardAvoidingView>

        <View style={styles.mainContainer}>

            <Text style={styles.headerText}>{ I18nManager.isRTL ?  "نبذة عنا" : 'Brief'}</Text>
            <ScrollView scrollIndicatorInsets={true} persistentScrollbar={true}>
            <Text style={styles.text}>
            تطبيق رائد في مجال التسوق الالكتروني للمنتجات المختلفة في منصة واحدة تشمل العديد من السلع المتنوعة فالسوق العام مثل " سوبر ماركت - مخابز - جزارة - مطاعم - حلواني - صيدلية - مستحضرات تجميل - ملابس - اكسسوارات - العاب اطفال - اجهزة الموبايل وملحقاته  - اجهزة الاكترونية - مكملات غدائية والادوات الرياضية - مستلزمات الحيونات الاليفة - ادوات مكتبية - كتب - هدايا و ورود - خدمة مشاوير 🛵 - وغيرها "
خدامتنا :
- توفير المنتجات المتنوعة حسب الطلب في مكان واحد 📦 ، و اوردر واحد ، وسعر توصيل واحد فقط. 
- توفير خدمة مشاوير 🛵 لغرض توصيل وايصال اي منتج او غرض خاص من مكان لمكان.
- توفير خدمة الصيدلية 💊 وذلك بأرسال الروشيته الخاصة بك عن طريق خاصية محددة بالتطبيق في زمن قياسي.
- استخدام فلتر البحث الذكي 🔍 لايجاد الصنف او المنتج المحدد.
- Beemall توفر اكبر منصة للعروض الخاصة والخصومات القوية والاسعار المنافسة فالسوق العام💰.
- توفر ايضا خاصية تتبع الاوردر الخاص بك والتأكد من تعقيمه وتغليفه.
- توفر امكانية الدفع كاش او عن طريق البطاقة الخاصة بك اونلاين 💳.
" قم بحفظ بياناتك العامة وبيانات البطاقة البنكية الخاصة بك في سرية تامة 🔒 وامان كامل لستهيل عملية الطلب والدفع اونلاين "
- توفر خاصية الاشعارات لتنبيهك بعروض الخصم الحصرية و كل ماهو جديد بالتطبيق.
للتواصل 📧 : info@beemallshop.com
            </Text></ScrollView>
            <Text style={styles.headerText}>{ I18nManager.isRTL ?"تابعنا" : 'Follow us'   }</Text>
            
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:"100%",marginTop:20}}>
              <TouchableOpacity onPress={()=>{Linking.openURL('https://twitter.com/beemallegypt?s=11');}}>
            <Image source={require("../../assets/icons/tw.png")}
            style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL('fb://page/109946370745674');}}>
            <Image source={require("../../assets/icons/fb.png")}
            style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL('https://www.instagram.com/beemallegypt/');}}>
            <Image source={require("../../assets/icons/insta.png")}
            style={styles.iconStyle} />
            </TouchableOpacity>
         
            </View>

        </View>

      </Animated.View>
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
    fontFamily: 'Cairo-Bold',
    fontSize: 20
  },
  mainContainer: {
    width: '100%',
    height: '65%',
    padding: 50,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal:20
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
  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    marginHorizontal:7
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
  iconStyle: {
    height: Dimensions.get('window').height * 46 / 812,
    resizeMode:'contain',
    marginHorizontal:0
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  }
});
