import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import ListHome from "./ListHome";

export default class TabBarTop extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "MyLike", title: "My like" },
      { key: "LikeMe", title: "Like me" }
    ]
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case "MyLike":
        return <ListHome {...this.props} />;

      case "LikeMe":
        return <ListHome {...this.props} />;
      default:
        return null;
    }
  };
  renderTabBar = props => {
    return (
      <View style={[styles.tabBar]}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.tabItem,
                {
                  borderBottomColor:
                    this.state.index === i ? "#FFCB78" : "#183D57",
                  borderBottomWidth: 2
                }
              ]}
              onPress={() => this.setState({ index: i })}
            >
              <View>
                <Text
                  style={[
                    styles.title,
                    { color: this.state.index === i ? "#FFCB78" : "white" }
                  ]}
                >
                  {route.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#183D57"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
