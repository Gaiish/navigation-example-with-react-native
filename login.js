
import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Home from './Home'

import {
  Container, Header, Content, Form, Item, Label,
  Input, Button, Text, Spinner
} from 'native-base';

import firebase from 'react-native-firebase'

export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      user:null,
      email:'',
      password:'',
      errMsg:null
    }
  }


  signIn(){
    const {email, password} = this.state

    //when button pressed first of all, loading is set to true so
    //that the Spinner can start
    this.setState({loading: true})

    //we login
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user)=>{
        //console.log('user in create:',user)

        this.setState({loading:false})
        this.props.navigation.replace('Home')
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
              onPress={()=>this.signIn()}
              >
              <Text>Sign In</Text>
            </Button>
            <Button transparent
              rounded
              style={{width: 200, marginTop: 40, alignSelf:'center',
              justifyContent:'center'}}
              onPress={()=>this.props.navigation.navigate('Signup')}
              >
              <Text>Sign Up</Text>
            </Button>
            {this.state.loading?(<Spinner />):null}
          </Form>
        </Content>
      </Container>
    );
  }
}
