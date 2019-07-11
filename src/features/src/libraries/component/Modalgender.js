import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

export default class Modalgender extends Component {
  state = {
    isModalVisible: this.props.check,
  };
  report1 = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
    this.props.reset ('Male');
  };
  report2 = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
    this.props.reset ('Female');
  };
  report3 = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
    this.props.reset ('Non-binary');
  };
  componentDidMount () {
    this.setState ({
      isModalVisible: this.props.check,
    });
  }
  render () {
    console.log (this.state.isModalVisible, 'ismoda');
    return (
      <Modal isVisible={this.state.isModalVisible}>
        <View style={styles.viewrp}>
          <TouchableOpacity style={styles.btct} onPress={this.report1}>
            <Text style={styles.txtrp}>
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btct} onPress={this.report2}>
            <Text style={styles.txtrp}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btct} onPress={this.report3}>
            <Text style={styles.txtrp}>
              Non-binary
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create ({
  viewrp: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reportContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    width: '100%',
  },
  btct: {
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtrp: {
    fontSize: 14,
    color:'black'
  },
});
