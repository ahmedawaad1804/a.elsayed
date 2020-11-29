import React from 'react';
import { StyleSheet, Text, View ,Button,TouchableOpacity,Dimensions } from 'react-native';
import store from '../../store'
import {connect} from 'react-redux'
/* colors */
import colors from '../../colors'
 class Selection extends React.Component {


    render(){
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.tOpacity}
       onPress={()=>{this.props.navigation.navigate('Login')}}>
          <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tOpacity}
       onPress={()=>{this.props.navigation.navigate('AuthStack')}}>
          <Text style={styles.text}>Login & Register</Text>
      </TouchableOpacity>
      </View>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerContainer:{
    
    width:'100%',
    height:'69%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
  },
  tOpacity:{
    width:  Dimensions.get('window').width * 343/375,
    height:  Dimensions.get('window').height * 46/812,
    borderRadius:50,
    backgroundColor:colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily:'Cairo-Bold',
    fontSize:14
  }
});
const mapStateToProps =state =>({
  www :state.www
})
export default connect(mapStateToProps)(Selection)