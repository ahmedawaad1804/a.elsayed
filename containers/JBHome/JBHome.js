import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions, Text, I18nManager } from 'react-native';
/* colors */
import colors from '../../colors'

import { refreshtProducts, firstGetProducts } from '../../actions/product'
import { setUser } from '../../actions/userAction'
import { addAdress, getAdress } from '../../actions/adressAction'
import store from '../../store'
import { connect } from 'react-redux'
/* token */
import { getToken, removeToken } from '../../utility/storage'

import authService from '../../services/authService'

class JBHome extends React.Component {
  state = {
    username: " ",

  }
  async componentDidMount() {
    // console.log("did mount");
    let token = await getToken()
    if (token) {
      authService.getUserData().then(async res => {
        // this.setState({ username:res.data.user.username })


        console.log(res.data.user);
        if (res.data.user) {
          this.props.getAdress(res.data.user.address)
          this.props.setUser(res.data.user)
          this.props.navigation.navigate("MainStack")
        }
        else {
          await removeToken()
          this.props.navigation.navigate("AuthStack")
        }

      }).catch(async err => {
        console.log(err.response.data);
        await removeToken()
        this.props.navigation.navigate("AuthStack")
      })



    }
    // else{this.setState({username:"not"})}

    // setTimeout(() => {




    // }, 3000);


  }


  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.mainImageView}>

        </View>
        <Text style={{ fontSize: 50, marginLeft: 40, fontFamily: "Cairo-Regular" }}>{I18nManager.isRTL ? "مرحبا ..." : "Welcome ..."}</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* <Text style={{ fontSize: 30, marginLeft: 60, marginRight: 40, fontFamily: "Cairo-Regular" }}>{this.state.username}</Text> */}
          <ActivityIndicator size={50} color={colors.white} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight
  },
});
const mapDispatchToProps = {
  refreshtProducts,
  firstGetProducts,
  setUser,
  addAdress,
  getAdress
};
const mapStateToProps = state => ({
  loginReducer: state.loginReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(JBHome)

