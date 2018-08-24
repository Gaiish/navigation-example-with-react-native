import React, {Component} from 'react'
import {
  Container, Header, Content, Text, Fab, Button, Icon,
  Card, CardItem, Spinner, Body
} from 'native-base'

import {Image, FlatList, View, } from 'react-native'

import firebase from 'react-native-firebase'

export default class Cars extends Component{
  constructor(props){
    super(props)
    this.state = {
      listCars:[],
      loading: false
    }
  }

  componentDidMount(){
    //get the list of Beaches from firebase
    //this.setState({loading:true, listBeaches:[]})
    var listOfDocs = []
    firebase.firestore().collection('cars')
    .onSnapshot((docs)=>{
      docs.forEach((doc)=>{
        //alert(doc.data().name)
        const {name, img} = doc.data()
        listOfDocs.unshift(
          {
            name: name,
            img: img,
            id: doc.id
          }
        )
        //alert(img)
      })
      this.setState({listCars: [...listOfDocs],
        loading:false
      })
    })
  }

  render(){
    const {listCars, loading} = this.state
    //alert(listBeaches)
    if (loading){
      return(<Spinner />)
    }
    return(
      <Container>
        <Content >
          <FlatList
            data={listCars}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
              //alert(item.name)
              return(
                <Card>
                  <CardItem cardBody>
                    <Image source={{uri: item.img}}
                      style={{width: 400, height:300}}
                     />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{item.name}</Text>
                    </Body>
                  </CardItem>
                </Card>
              )
            }}
          />

        </Content>
      </Container>
    )
  }
}
