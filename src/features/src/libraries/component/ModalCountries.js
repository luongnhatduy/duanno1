import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import countries from './../../screen/login/countries.json';
import countryNameList from './countries_name.json';

export const getAllCountries = () => {
  let countriesList = [];

  countryNameList.map (name => {
    countriesList.push ({...countries[name], code: name});
  });
  return countriesList;
};

class FlatListItem extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }
  onPress=()=>{
    this.props.okkk(this.props.item.callingCode,this.props.item.flag)
  }
  render () {
    return (
     
        <TouchableOpacity style={styles.contentContainer} onPress={this.onPress}>
          <Image
            resizeMode="contain"
            source={{uri: this.props.item.flag}}
            style={styles.imageStyle}
          />
            <Text numberOfLines={1} style={styles.txtname}>
              {this.props.item.name.common}
            </Text>
          <Text>
            (+{this.props.item.callingCode})
          </Text>
        </TouchableOpacity>
     
    );
  }
}

export default class ModalCountries extends Component {
  state = {
    isModalVisible: this.props.check,
    data: getAllCountries (),
  };
  okkk = (ma,img) => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
    this.props.reset (ma,img);
  };
  render () {
    console.log (this.state.data);
    return (
      <Modal isVisible={this.state.isModalVisible}>
        <View style={styles.viewrp}>
         
            <FlatList
              data={this.state.data}
              keyExtractor={this.keyExtractor}
              renderItem={({item, index}) => {
                return (
                  <FlatListItem item={item} index={index} okkk={this.okkk} {...this.props} />
                );
              }}
            />
        

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
  item: {
    flexDirection: 'row',
    padding: 10,
  },
  container: {
   
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9d9',
  },
  imageStyle: {
    width: 40,
    height: 25,
    marginRight: 5,
  },

  txtname: {
    maxWidth:'70%'
  },
  viewname:{
  
  }
});
