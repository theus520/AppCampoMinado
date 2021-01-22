import React,{Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import params from './src/params'
import Field from './src/components/Field'

export default class App extends Component {
  render() {
    return(

      <View style style={styles.container}> 
      <Text style={styles.welcome}> iniciando o mines </Text>
   <Text style={styles.instructions}> tamanho da grade :
   {params.getRowsAmount()} x {params.getColumnsAmount()}
    </Text>

  <Field />

      </View>
    );
  }
}
 


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems : 'center',
   backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize:20,
  textAlign:'center',
 margin: 10,
 }
});




