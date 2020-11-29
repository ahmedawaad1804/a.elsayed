import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, I18nManager, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

class MainCategoryItem extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    source: ""
  }
  componentDidMount() {
    // this.props
    console.log(this.props.src.nameAR);
    this.setState({ source: this.props.src.icon })
  }
  // shouldComponentUpdate(){
  //   console.log("amuy");

  //   return false
  // }

  // console.log(data);
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.gridCell} onPress={() => { this.props.click() }}>
          <Image style={styles.imageThumbnail} source={{ uri: `http://www.beemallshop.com/img/MainCatIcons/${this.state.source}` }}
            onError={() => { this.setState({ source: "Beauty" }) }} />
          <Text style={styles.smallText}>{I18nManager.isRTL ? this.props.src.nameAR : this.props.src.nameEN}</Text>
          <View style={{ backgroundColor: '#ccc', height: "5%" }}></View>
        </TouchableOpacity>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  // advStyle: {
  //   width: Dimensions.get('window').width * 343 / 375,
  //   height: Dimensions.get('window').height * 94 / 812
  // },
  imageThumbnail: {

    width: 106,
    height:40,
    resizeMode: "contain",
    marginTop: 5
    // , { width: 141 / 3, height: 118 / 3 }
  },
  gridCell: {
    width: 106,
    height: 90,
    borderRadius: 15,
    margin: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 2,
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    marginVertical: 2
  },


});
const mapStateToProps = state => ({
  www: state.www
})
export default MainCategoryItem
