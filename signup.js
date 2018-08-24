
import React, {Component} from 'react';
import {Platform, StyleSheet, View, AsyncStorage} from 'react-native';
import Home from './Home'

import {
  Container, Header, Content, Form, Item, Label,
  Input, Button, Text, Spinner
} from 'native-base';

import firebase from 'react-native-firebase'

export default class Signup extends Component<Props> {
  //signup if and send the user info to database

  state = {
    loading: false,
    user:null,
    name:'',
    gender:'',
    phone:'',
    email:'',
    password:'',
    errMsg:null
  }

  signUp(){
    const {email, password, gender, phone, name} = this.state
    //console.log(gender)
    //console.log(gender)
    //console.log(name)

    //when button pressed first of all, loading is set to true so
    //that the Spinner can start
    this.setState({loading: true})

    //we signup and send additional user info to database
    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user)=>{
        //send info to db
        firebase.firestore().collection('users').add({
          name: name,
          gender: gender,
          email: email,
          phone: phone
        }).then((res)=>{
          console.log(res)
          //save the data for user in async storage
          AsyncStorage.setItem('UserInfo', JSON.stringify(
            {name, gender, phone}
          ), (err)=>{
            //if(!err){
              //move to Home
              this.setState({loading:false})
              this.props.navigation.replace('Home')
            //}
          })

        })
        .catch(err=>this.setState({errMsg: err.message}))
      })
      .catch(err=>this.setState({errMsg: err.message}))//show error on signup

  }

  render() {
    //console.log('user in render:', this.state.user)
    return (
      <Container>
        <Content>
          {this.state.errMsg}
          {this.state.loading?(<Spinner />):null}
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={(name)=>this.setState({name})} />
            </Item>
            <Item floatingLabel>
              <Label>phone</Label>
              <Input onChangeText={(phone)=>this.setState({phone})}/>
            </Item>
            <Item floatingLabel>
              <Label>Gender</Label>
              <Input onChangeText={(gender)=>this.setState({gender})}/>
            </Item>
            <Item floatingLabel>
              <Label>email</Label>
              <Input onChangeText={(email)=>this.setState({email})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password)=>this.setState({password})}/>
            </Item>
            <Button
              rounded
              style={{width: 200, marginTop: 40, alignSelf:'center',
              justifyContent:'center'}}
              onPress={()=>this.signUp()}
              >
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
