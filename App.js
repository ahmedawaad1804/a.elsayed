import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, SafeAreaView, I18nManager, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
/* notification */
import NetInfo from "@react-native-community/netinfo";
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
import Spinner from 'react-native-loading-spinner-overlay';
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
i18n.locale = I18nManager.isRTL ? "ar" : 'en'
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      visible: false
    };
  }
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {

      this.setState({ visible: !state.isConnected })
    });



  }
  componentWillUnmount() {
    this.unsubscribe();
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

      <View style={styles.container}>
        <Spinner visible={this.state.visible} textContent={I18nManager.isRTL ? "يرجي الاتصال بشبكة انترنت" : "Please connect to an internet network"} textStyle={{ color: colors.black }} />
        <SafeAreaView style={styles.topSafeArea}
        >
          <StatusBar

            backgroundColor={colors.primary}
            barStyle="dark-content"
            drawBehind={true}
            visible={true}


          />
        </SafeAreaView>
        <View style={styles.container}>


          <Provider store={store}>
            <Navigation />
          </Provider>

        </View >
      </View>

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
    backgroundColor: "red",
    // marginTop: Expo.Constants.statusBarHeight,
    // marginBottom: Expo.Constants.statusBarHeight,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: colors.primary,
  },
});
