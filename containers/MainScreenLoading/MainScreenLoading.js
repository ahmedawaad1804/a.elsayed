import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
/* colors */
import colors from '../../colors'
/* actions */
import { refreshtProducts, firstGetProducts, setCartModifications } from '../../actions/product'
import { getBestSeller } from '../../actions/bestSeller'
import { getCategory } from '../../actions/Category'
import { getAdress } from '../../actions/adressAction'
import store from '../../store'
import { connect } from 'react-redux'

import dataService from '../../services/dataService'
/* storage */
import { AsyncStorage } from 'react-native';
import { getToken, removeToken } from '../../utility/storage'
import authService from '../../services/authService';
/*actions */
import {setLogin} from '../../actions/loginAction'
class MainScreenLoading extends React.Component {

  async componentDidMount() {
    this.props.getBestSeller()
    this.props.getCategory()
    const loginStatus = await getToken();
    console.log(loginStatus);
    if (loginStatus) {
      await authService.checkToken().then(async res => {
        // console.log(res.data.status);
        if (res.data.status == 'valid') {
          this.props.setLogin("n")


          this.props.navigation.navigate("JBHome")
        }
        else {
          await removeToken()
          this.props.navigation.navigate("AuthStack")
        }
      }).catch(async err => {
        await removeToken()
        this.props.navigation.navigate("AuthStack")

      })
      // check if token available
      // this.props.navigation.navigate("JBHome")

    }
    else {
      await removeToken()
      this.props.navigation.navigate("AuthStack")
    }
    
    // this.props.getAdress()

    this.getCart()



  }
  async getCart() {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart != null) {
        this.props.setCartModifications(JSON.parse(cart))
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);

    }
  }

  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.mainImageView}>
          <Image source={require("../../assets/logo.png")}
            style={styles.mainImageStyle} />
        </View>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 60 / 812 }}></View>

        <ActivityIndicator size={70} color={colors.white} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight
  },
});
const mapDispatchToProps = {
  refreshtProducts,
  firstGetProducts,
  getBestSeller,
  getCategory,
  setCartModifications,
  getAdress,
  setLogin
};
const mapStateToProps = state => ({
  productsReducer: state.productsReducer,
  cartReducer: state.cartReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenLoading)

