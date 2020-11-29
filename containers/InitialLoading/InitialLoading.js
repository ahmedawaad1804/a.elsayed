import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';

import store from '../../store'


export default class InitialLoading extends React.Component {

componentDidMount(){
  
  console.log('InitialLoading');
  
}


    render(){
  return (
    <View style={styles.container}>
      <Text style={{fontFamily:'Cairo-Bold'}}>hidzxv</Text>
<Button onPress={()=>{this.props.navigation.navigate('stack')}} title='asd yala'></Button>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
