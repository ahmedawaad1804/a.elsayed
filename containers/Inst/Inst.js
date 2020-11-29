import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Platform, Animated, Alert, UIManager, I18nManager, CheckBox, ActivityIndicator, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
export default class Inst extends React.Component {

  static navigationOptions = { header: null }

  state = {
    data: {}
  }
  componentDidMount() {

    dataService.getBrief().then(res => {
      // console.log(res.data.result[0]);
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
<ScrollView showsVerticalScrollIndicator={false}>
            {/* <Text style={styles.headerText}>{ I18nManager.isRTL ? "نبذة عنا" : 'Brief' }</Text> */}
            <Text style={styles.text}>{I18nManager.isRTL ? `- بي مول غير مسئولة عن استرجاع او استرداد اي منتج بعد اتمام عملية الاستلام من المندوب لذا يرجى التأكد من المنتج قبل مغادرة المندوب
- لا يمكن استخدام المنتج قبل عملية الاستلام من المندوب 
- المنتج لا يمكن استرداده ولكن يمكن استبداله في حالة واحدة فقط و هي ( ضد عيوب الصناعة ) فقط.
- المنتج المسترجع ضد عيوب الصناعة لا يمكن استبداله الا داخل العبوة الأصلية و الرقم تسلسلي أو (UPC) الباركود الدولي (وهو باركود مكون من 12 رقم يتم وضعه على غلاف سلع التجزئة)
- المنتجات التي لا يمكن إرجاعها لدواعي النظافة الشخصية أو لدواعي السلامة
* بعض منتجات البقالة
* بعض منتجات التنظيف المنزلي والمنتجات الخاصة بالعناية الشخصية
* بعض مستحضرات التجميل والعناية الشخصية
* بعض ماكينات العناية الشخصية
* الثياب الداخلية والملابس الداخلية والجوارب والجوارب النسائية وملابس السباحة
*  طعام الحيوانات الأليفة والمنتجات المشابهة
سوف نقوم بتقييم جميع السلع التي تم إرجاعها والتحقق منها قبل الاستبدال، و إذا لم نتمكن من العثور على السبب المذكور للإرجاع أو إذا كانت السلعة غير مؤهلة للإرجاع، سوف نرسل هذه السلعة إليك مرة أخرى دون تقديم مبلغ مسترد
ملاحظة : بعض المنتجات لها سياسات أو متطلبات مختلفه مرتبطة بها..` : `- Beemall is not responsible for the return or refund of any product  after completing the receipt process from the representative.
So please confirm That product is your product before the delegate leaves.
- The product cannot be used before receiving from the representative
- The product is not refundable, But it can be exchanged in one case only (against manufacturing defects) only.
- The returned product against manufacturing defects can only be exchanged inside the original packaging and the serial number (or UPC) international barcode (which is a 12-digit barcode that is placed on the retail packaging)
Products that cannot be returned for personal hygiene or safety reasons
* Some grocery products
* Some household cleaning products and personal care products
* Some cosmetics and personal care
* Some personal care machines
* Underwear, socks, pantyhose and swimwear
* Pet food and similar products
We will evaluate and verify all returned items before exchange, and if we cannot find the mentioned reason for the return or if the item is not eligible for a return, we will send this item back to you without providing a refund.
Note: Some products have different policies or requirements attached to them.` }</Text>
</ScrollView>
            {/* <Text style={styles.headerText}>{ I18nManager.isRTL ? "تابعنا" : 'Follow us' }</Text> */}
            {/* <Text style={styles.text}>{this.state.data.followUs}</Text> */}
            

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
    fontFamily: 'Cairo-SemiBold',
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
    paddingHorizontal:10
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
    color:'#346EDC'
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
    marginHorizontal:10
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  }
});
