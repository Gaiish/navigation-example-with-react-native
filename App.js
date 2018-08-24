
import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Home from './Home'
import Signup from './signup'
import Login from './login'
import Cars from './Cars'

import {
  Container, Header, Content, Form, Item, Label,
  Input, Button, Text, Spinner
} from 'native-base';

import firebase from 'react-native-firebase'

import {createStackNavigator} from 'react-navigation'

class Entrance extends Component<Props> {//where do I direct him
  //home or login

  constructor(props){
    super(props)
  }


  componentDidMount(){
    //check if the guy is loggedIn or not
    firebase.auth().onAuthStateChanged((user)=>{
      if(user !==null){
        //the guy is loggedIn, so direct him to Home
        this.props.navigation.replace('Home')
      }
      this.props.navigation.replace('Login')
    })
  }

  render(){
    return(
      <Spinner />
    )
  }

}

const App = createStackNavigator({
  Home: Home,
  Signup: Signup,
  Login: Login,
  Entrance: Entrance,
  Cars: Cars
},
{
  initialRouteName: 'Entrance'
}
)
export default App
