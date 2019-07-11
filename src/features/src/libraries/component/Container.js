import React, { PureComponent } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
 
  render() {
    styles.statusbar = this.props.txt ? styles.statusbar1 : styles.statusbar2
    return (
      <View style={styles.container}>
        {this.props.txt ? (<StatusBar backgroundColor="#183D57" barStyle="light-content" />):(<StatusBar backgroundColor="#F7F7F7" barStyle="dark-content" />)}
        <View style={styles.statusbar}></View>
            {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  statusbar1:{
    width:'100%',
    ...Platform.select ({
      ios: {
        backgroundColor: "#183D57",
        height: getStatusBarHeight()
      },
      android: {
        height:0
      },
    }),
  },
  statusbar2:{
    width:'100%',
    ...Platform.select ({
      ios: {
        backgroundColor: "#F7F7F7",
        height: getStatusBarHeight()
      },
      android: {
        height:0
      },
    }),
  }
});
export default Container;
