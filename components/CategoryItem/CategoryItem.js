import React from 'react';
import { StyleSheet, Text, View, CheckBox, I18nManager, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation-stack';

export default CategoryItem = (data) => {

  // console.log(data);


  return (
    <View>
      <TouchableOpacity style={styles.gridCell} onPress={data.click} >
        <Image style={styles.imageThumbnail} source={{ uri: `http://www.beemallshop.com/img/CatIcons/${data.src.icon}` }} />
          <Text style={styles.smallText}>{I18nManager.isRTL ? data.src.nameAR : data.src.nameEN}</Text>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 12 / 812 }}></View>
      </TouchableOpacity>
    </View>

  );

}

const styles = StyleSheet.create({
  advStyle: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 94 / 812
  },
  imageThumbnail: {

    width: Dimensions.get('window').width * 106 * .80 / 375,
    height: Dimensions.get('window').height * 95 * .75 / 812,
    resizeMode: "contain",
    marginTop: 5,
    // backgroundColor:'red'
    // , { width: 141 / 3, height: 118 / 3 }
  },
  gridCell: {
    width: Dimensions.get('window').width * 106 * .95 / 375,
    height: Dimensions.get('window').height * 130 * 1.05 / 812,//95
    borderRadius: 15,
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 5,
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    textAlign:'center'
  },


});
const mapStateToProps = state => ({
  www: state.www
})
