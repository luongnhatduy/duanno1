import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  FlatList,
  AsyncStorage,
  Dimensions
} from "react-native";
import Header from "..//component/Header";
import Item from "..//component/Item";
import ListHome from "./ListHome";
const ITEM_WIDTH = Dimensions.get("window").width;

export default class Criteria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true
    };
  }

  check = () => {
    this.setState({
      check: !this.state.check
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.check=== true ? (
          <View style={{flex:1}}>
            <Item
              img1={require("..//..//img/age.png")}
              up="Age"
              content="18 - 24"
              img2={require("..//..//img/next.png")}
            />
            <Item
              img1={require("..//..//img/gender1.png")}
              up="Gender"
              content="Male"
              img2={require("..//..//img/next.png")}
            />
            <Item
              img1={require("..//..//img/level.png")}
              up="Level"
              content="70% - 90%"
              img2={require("..//..//img/next.png")}
            />
            <View style={styles.search}>
              <TouchableOpacity style={styles.button} onPress={this.check}>
                <Text style={styles.txt}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ListHome {...this.props}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    flex: 1
  },
  search: {
    flex: 1,
    justifyContent: "flex-end"
  },
  button: {
    height: 50,
    margin: 50,
    backgroundColor: "#183D57",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 30
  },
  txt: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white"
  }
});
