import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Modall from "..//..//..//libraries/component/Modal"
export default class ToolTip extends Component {
  constructor (props) {
    super (props);
    this.state = {
      toolTipVisible: false,
      check:false
    };
  }
  report = () => {
    this.setState ({toolTipVisible: true, check:false});
  };
  modal = () => {
    this.setState ({check: !this.state.check,toolTipVisible: false});
  };
  render () {
    console.log(this.props.indexx,'index')
    styles.contentst= this.props.indexx === 'chan' ? styles.contentst1 : styles.contentst2
  
    return (
      <Tooltip
        isVisible={this.state.toolTipVisible}
        content={
          <TouchableOpacity onPress={this.modal}>
            <Text style={styles.txtrp}>Report & Block</Text>
          </TouchableOpacity>
        }
        placement="bottom"
        onClose={() => this.setState ({toolTipVisible: false})}
        contentStyle={styles.contentst}
      >
        <TouchableOpacity onPress={this.report} style={styles.report}>
          <Image
            style={styles.imgdots}
            source={require ('..//..//..//img//three-dots-menu.png')}
          />
        </TouchableOpacity>
        {this.state.check === true ?  <Modall check={this.state.check}  />: <View/>} 
      </Tooltip>
    );
  }
}

const styles = StyleSheet.create ({
  txtrp: {
    color: '#2A404B',
  },
  contentst2: {
   left: 15,
  },
  contentst1: {
    right:50
  },
  imgdots: {
    height: 7,
    width: 25,
  },
  report: {
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
