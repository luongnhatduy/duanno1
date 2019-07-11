import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image,Platform,Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
const ITEM_WIDTH = Dimensions.get ('window').width;

export default class ModalLogin extends Component {
  state = {
    isModalVisible: this.props.check,
  };

  back = () => {
    console.log('ssssssss')
    this.setState ({
      isModalVisible: !this.state.isModalVisible,
    });
    this.props.reset ();
  };
    // componentDidMount () {
    //   this.setState ({
    //     isModalVisible : this.props.check
    //   });
    // }
  render () {
    console.log (this.state.isModalVisible, 'ismodal', this.props.check);
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress={this.back}
        style={styles.modal}
        backdropOpacity	={0.2}
      >
        <View style={styles.container}>
          <Text>{this.props.messenger}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create ({
  modal: {
    position: 'absolute',
    ...Platform.select ({
      ios: {
        top: getStatusBarHeight () +10,
      },
      android: {
       
      },
    }),
    width:"100%",
    margin: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4E3E',
    height: 40,
    width:'100%'
  },
});
