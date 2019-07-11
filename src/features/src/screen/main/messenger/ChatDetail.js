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
  AsyncStorage,
  Dimensions
} from "react-native";
import Header from ".//..//..//..//libraries/component/Header";
import constants from "..//..//..//libraries/utils/constants";
import Container from "../../../libraries/component/Container";
const ITEM_WIDTH = Dimensions.get("window").width;
class FlatListItem extends Component {
  render() {
    return (
      <View>
        {this.props.item.id === 1 ? (
          <View style={styles.item}>
            <View style={styles.viewAvt}>
              <Image style={styles.avt} source={this.props.item.source} />
            </View>

            <View style={styles.viewContent}>
              <Text style={styles.content}>{this.props.item.content}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.item2}>
            <View />
            <View style={styles.viewContent}>
              <Text style={styles.content2}>{this.props.item.content}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

class ViewChatDetail extends Component {
  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={constants.datachat}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} {...this.props} />;
          }}
        />
        <View style={styles.bottom}>
          <View style={styles.viewSent}>
            <TouchableOpacity>
              <Image
                style={styles.img}
                source={require("..//..//..//img/Shape.png")}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type a message..."
              placeholderTextColor="#929292"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <TouchableOpacity>
              <Image
                style={styles.img}
                source={require("..//..//..//img/sent.png")}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container txt>
         <Header text="Nguyen Hoang Hiep" back {...this.props} />
         <ViewChatDetail {...this.props} />
      </Container>
    )
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7"
  },
  item: {
    flexDirection: "row",
    margin: 10,

    marginBottom: 0
  },
  item2: {
    flexDirection: "row",
    margin: 10,

    justifyContent: "space-between",
    marginBottom: 0
  },
  viewAvt: {},
  avt: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  viewContent: {
    maxWidth: ITEM_WIDTH * 0.7
  },
  content: {
    marginLeft: 10,
    borderColor: "#B3B3B3",
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
    fontSize: 14
  },
  content2: {
    marginLeft: 10,
    backgroundColor: "#EEEEEE",
    padding: 5,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
    fontSize: 14
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  },
  viewSent: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  input: {
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#CECECE",
    height: 40,
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 20
  },
  img: {
    height: 20,
    width: 25
  }
});
