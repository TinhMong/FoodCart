import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, LogBox } from 'react-native';
var { width } = Dimensions.get("window")

import Food from './src/Food';
import Cart from './src/Cart';


LogBox.ignoreAllLogs();

export default class Example extends Component {

  constructor(props) {
     super(props);
     this.state = {
       module:1,
     };
  }

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.module==1? <Food />
          :<Cart />
        }
        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:1})}>
            <Text>Food</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:2})}> 
            <Text>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomTab:{
    height:60,
    width:width,
    backgroundColor:'orange',
    flexDirection:'row',
    justifyContent:'space-between',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
  },
  itemTab:{
    width:width/2,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  }
})