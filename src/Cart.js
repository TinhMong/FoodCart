import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
var { width } = Dimensions.get('window')

import AsyncStorage from '@react-native-community/async-storage';

export default class Cart extends Component {

  constructor(props) 
  {
    super(props);
    this.state = {
      dataCart:[],
    };
  }

 componentDidMount()
 {
   AsyncStorage.getItem('key').then((cart)=>{
     if (cart !== null) {
       const cartfood = JSON.parse(cart)
       this.setState({dataCart:cartfood})
     }
   })
   .catch((err)=>{
     alert(err)
   })
 }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'orange'}}>
          <View style={{height:10}} />
          <Text style={{fontSize:32,fontWeight:'bold',color:'black'}}>               Cart food</Text>
          <View style={{height:10}} />
        </View>

        <View style={{flex:1}}>

          <ScrollView>
            {
              this.state.dataCart.map((item,i)=>{
                return(
                  <View style={{width:width-20,margin:10,backgroundColor:'flycolor',flexDirection:'row',borderBottomWidth:2,borderColor:'silver',paddingBottom:10}}>
                    <Image resizeMode={'contain'} style={{width:width/3,height:width/3}} source={{uri: item.food.image}}/>
                    <View style={{flex:1,backgroundColor:'flycolor',padding:10,justifyContent:'space-between'}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>{item.food.name}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <TouchableOpacity style={{backgroundColor:'red',padding:8,borderRadius:1000}} onPress={()=>this.onClickDeleteCart(i)}>
                            <Text style={{fontWeight:'bold',fontSize:10,color:'white'}}>x</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text>Describe the product</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>${item.price*item.quantity}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <TouchableOpacity style={{backgroundColor:'orange',padding:8,borderRadius:1000}} onPress={()=>this.onChangeQual(i,false)}>
                            <Text>-</Text>
                          </TouchableOpacity>
                          <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                          <TouchableOpacity style={{backgroundColor:'orange',padding:8,borderRadius:1000}} onPress={()=>this.onChangeQual(i,true)}>
                            <Text>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })
            }
            
            <View style={{height:20}} />
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>Total</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20 }}>${this.onLoadTotal()}</Text>
              </View>
            </View>

            <TouchableOpacity style={{
              backgroundColor:'orange',
              width:width-40,
              alignItems:'center',
              padding:10,
              borderRadius:5,
              margin:20
              }}onPress={()=>this.Checkout()}>
              <Text style={{
                fontSize:24,
                fontWeight:'bold',
                color:'white'
                }}>
                CHECKOUT
              </Text>
            </TouchableOpacity>

            <View style={{height:20}} />
          </ScrollView>
        </View>

      </View>
    );
  }

  onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
  }

  onLoadTotal()
  {    
    var total = 0
    const cart = this.state.dataCart
    for (var i = 0; i < cart.length; i++){
      total = total + (cart[i].price*cart[i].quantity)
    }
    return total
  }

  onClickDeleteCart(i)
  {
    const dataCar = this.state.dataCart
    dataCar.splice(i,1)
    this.setState({dataCart:dataCar})
    alert('Delete Cart')
    AsyncStorage.setItem('key',JSON.stringify(dataCar)); 
  }

  Checkout()
  {
    AsyncStorage.getItem('key').then((Cart)=>{
      if (Cart == null) {
        alert('Your cart is empty!')
      }
      else if(Cart.length == 2){
        alert('Your cart is empty!')
      }
      else{
        AsyncStorage.removeItem('key')
        const cartfood = []
        this.setState({dataCart:cartfood})
        alert('Buy Successfully!')
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

}
