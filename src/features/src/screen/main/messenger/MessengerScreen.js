import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import Header from ".//..//..//..//libraries/component/Header"
import ListChat from "..//..//..//libraries/component/ListChat"
import Container from "../../../libraries/component/Container";
export default class MessengerScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("..//..//..//img//chat.png")}
        style={{
          width: 33,
          height: 25,
          tintColor
        }}
        resizeMode="stretch"
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <Container style={styles.container} txt >
        <Header banner />
        <ListChat list="listchat" {...this.props}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
 container:{
   flex:1
 }
});
