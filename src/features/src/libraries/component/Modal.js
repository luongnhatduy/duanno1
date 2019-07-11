import React, {Component} from 'react';
import {Text, StyleSheet, View,TouchableOpacity,Image} from 'react-native';
import Modal from 'react-native-modal';

export default class Modall extends Component {
  state = {
    isModalVisible: this.props.check,
    isModalVisible2: false,
  };
  report = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible})
  };
  rp = () => {
    this.setState ({
      isModalVisible2: !this.state.isModalVisible2,
    });
  };
  componentDidMount () {
    this.setState ({
      isModalVisible2: false,
      isModalVisible : this.props.check
    });
  }
  render () {
    console.log(this.state.isModalVisible,'ismoda')
    return (
      <Modal isVisible={this.state.isModalVisible}>
        {this.state.isModalVisible2 === false
          ? <View style={styles.viewrp}>
              <View style={styles.rptop}>
                <Text style={styles.txtrpuser}>Report User</Text>
                <Text style={styles.txtrp}>
                  Please tell us what they did?
                </Text>
              </View>

              <View style={styles.reportContent}>
                <TouchableOpacity style={styles.btct} onPress={this.rp}>
                  <Text style={styles.txtrp}>
                    Inappropriate content & messages
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btct} onPress={this.rp}>
                  <Text style={styles.txtrp}>
                    Inappropriate Offline Behavior
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btct} onPress={this.rp}>
                  <Text style={styles.txtrp}>Underaged user</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btct1} onPress={this.rp}>
                  <Text style={styles.txtrp}>Spam/Scam</Text>
                </TouchableOpacity>

              </View>
              <View style={styles.rptop}>
                <TouchableOpacity onPress={this.report} style={styles.btcancel}>
                  <Image
                    style={styles.imgx}
                    source={require ('.//..//..//img/x.png')}
                  />
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <View style={styles.rpss}>
              <Image
                style={styles.checked}
                source={require ('..//..//img/checked.png')}
              />
              <Text style={[styles.txtrpuser, {margin: 20}]}>SUCCESS</Text>
              <Text style={styles.txtrp}>YOUR REPORT HAS BEEN SENT</Text>
              <Text style={[styles.txtrp, {marginBottom: 20}]}>
                THANK YOU SUPPORTING FOR US
              </Text>
              <TouchableOpacity onPress={this.report} style={styles.ok}>
                <Text style={styles.txtok}>Ok</Text>
              </TouchableOpacity>
            </View>}
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
  rptop: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtrpuser: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  txtrp: {
    fontSize: 14,
  },

  imgx: {
    width: 15,
    height: 15,
    tintColor: '#CCCCCC',
    marginRight: 3,
  },
  cancel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 3,
  },
  btcancel: {
    flexDirection: 'row',
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
  btct1: {
    paddingBottom: 15,
    paddingTop: 15,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    height: 60,
    width: 60,
  },
  ok: {
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A8F73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtok: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rpss: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});
