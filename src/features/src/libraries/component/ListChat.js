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
import constants from "..//utils/constants";
class FlatListItem extends Component {
  detail = () => {
    this.props.navigation.navigate("ChatDetail");
  };
  render() {
    return (
      <View>
        {this.props.list === "listchat" ? (
          <TouchableOpacity style={styles.iitem} onPress={this.detail}>
            <View style={styles.left}>
              <View>
                <Image style={styles.img} source={this.props.item.source} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{this.props.item.name}</Text>
                <Text style={styles.content}>{this.props.item.content}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.date}>May 17</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iitem} onPress={this.detail}>
            <View style={styles.left}>
              <View>
                <Image style={styles.img1} source={this.props.item.source} resizeMode="contain" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name1}>{this.props.item.name}</Text>
                <Text style={styles.content}>{this.props.item.content}</Text>
              </View>
            </View>
           
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

class ViewFlatList extends Component {
  state = {
    rr: [],
  };
  componentDidMount() {
    switch (this.props.list) {
      case "listchat":
        this.setState({
          rr: constants.data1
        });
        break;
      case "vip":
        this.setState({
          rr: constants.dataVip
        });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.rr}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} {...this.props} />;
          }}
        />
      </View>
    );
  }
}
export default class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  keyExtractor = (item, index) => index.toString();
  render() {
    return <ViewFlatList {...this.props} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    flex: 1
  },
  iitem: {
    margin: 3,

    flexDirection: "row"
  },
  img: {
    borderRadius: 35,
    height: 70,
    width: 70,
    margin: 7
  },
  img1: {
    
    height: 25,
    width: 35,
    margin: 25,
    marginTop:15,marginBottom:15
  },
  left: {
    flexDirection: "row",
    flex: 9
  },
  name: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  name1: {
    color: "black",
    
    fontSize: 16,
    
  },
  right: {
    flex: 2,
    alignItems: "flex-end"
  },
  date: {
    color: "black",
    marginTop: 10,
    right: 10
  },
  content: {
    color: "#888888"
  }
});
