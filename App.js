import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, SafeAreaView, I18nManager,TouchableWithoutFeedback,Keyboard } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
/* notification */

/*screens */
import Navigation from './containers/Navigation/Navigation'
/* redux */
import { Provider } from 'react-redux'
import store from './store'
/* colors */
import colors from './colors'
/* fonts */
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
/* fonts */
const fetchFonts = () => {
  return Font.loadAsync({
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Black': require('./assets/fonts/Cairo-Black.ttf'),
    'Cairo-ExtraLight': require('./assets/fonts/Cairo-ExtraLight.ttf'),
    'Cairo-Light': require('./assets/fonts/Cairo-Light.ttf'),
    'Cairo-SemiBold': require('./assets/fonts/Cairo-SemiBold.ttf'),

  });
};
import i18n from 'i18n-js';

// Set the locale once at the beginning of your app.
console.log(I18nManager.isRTL);
i18n.locale = I18nManager.isRTL ? "ar" : 'en'
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false
    };
  }
  componentDidMount() {
    // store.dispatch(getProducts())

    // console.log( StatusBar);

  }
  render() {
    if (!this.state.dataLoaded) {
      return (

        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => { this.setState({ dataLoaded: true }) }}
        // style={styles.container}
        />

      )
    }
    return (
      // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={styles.container}>
          <SafeAreaView style={styles.topSafeArea}
           >
              <StatusBar
              //  style="light"
              // hidden={true}
              backgroundColor={colors.primary}
              barStyle="dark-content"
              drawBehind={true}
            visible={true}
            // backgroundColor={colors.primary}
            // translucent
            // showHideTransition= 'slide'

            />
           </SafeAreaView>
          <View style={styles.container}>

           
            <Provider store={store}>
              <Navigation />
            </Provider>

          </View >
        </View>
      //  {/* </TouchableWithoutFeedback> */}

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Dimensions.get('window').height+Expo.Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    // backgroundColor: '#ccc',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"red",
    // marginTop: Expo.Constants.statusBarHeight,
    // marginBottom: Expo.Constants.statusBarHeight,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: colors.primary,
  },
});
