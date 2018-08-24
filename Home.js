import React, {Component} from 'react'
import {
  Container, Header, Content, Text, Fab, Button, Icon,
  Card, CardItem, Spinner
} from 'native-base'

import {Image, FlatList, View, } from 'react-native'

import firebase from 'react-native-firebase'

export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      listBeaches:[],
      loading: false
    }
  }

  componentDidMount(){
    //get the list of Beaches from firebase
    this.setState({loading:true})
    var listOfDocs = []
    firebase.firestore().collection('beaches')
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
      this.setState({listBeaches: [...listOfDocs, ...this.state.listBeaches],
        loading:false
      })
    })
  }

  render(){
    const {listBeaches, loading} = this.state
    console.log(listBeaches)
    if (loading){
      return(<Spinner />)
    }
    return(
      <Container>
        <Content >
          <FlatList
            data={listBeaches}
            keyExtractor={(item)=>item.id}
            renderItem={(beach)=>(
              <Card>
                <CardItem cardBody>
                  <Image source={{uri: beach.img}}
                    style={{width: null, height:300}}
                   />
                </CardItem>
              </Card>
            )}
          />

        </Content>
        <Fab
          onPress={()=>console.log('hey')}
        >
          <Icon name='ios-return-right' />
        </Fab>
      </Container>
    )
  }
}
