import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Container from '../../../libraries/component/Container';
import Header from '../../../libraries/component/Header';
import constants from '../../../libraries/utils/constants';
import NavigationService from '../../../config/NavigationService';
import Favorite from '../../main/profile/Favorite';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import apis from 'features/src/libraries/Apis/Apis';
const ITEM_WIDTH = Dimensions.get ('window').width;

export default class Infomation extends Component {
 

  state = {
    txt: constants.datakb[4].title,
    place: constants.datakb[4].content,
    d: 1,
    titlebt: 'Next',
    cl1: 'black',
    clbr1: 'white',
    cl2: 'black',
    clbr2: 'white',
    username: '',
    usergender: 1,
    date: moment ().format ('YYYY-MM-DD'),
    check: false,
    messenger1: 'Name is required',
    messenger2: 'Birth date is required',
  };
  gender1 = () => {
    this.setState ({
      cl1: '#FFCB78',
      clbr1: '#FFCB78',
      cl2: 'black',
      clbr2: 'white',
    });
  };
  gender2 = () => {
    this.setState ({
      cl2: '#FFCB78',
      clbr2: '#FFCB78',
      cl1: 'black',
      clbr1: 'white',
    });
  };
  next = () => {
    this.props.navigation.navigate('Hobbies')
  };
  handlePhone = text => {
    this.setState ({
      username: text,
    });
  };
  hobbies = () => {
    return (
      <View>
           <Favorite dt="yourself" {...this.props} />
      </View>
    );
  };
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  componentDidMount () {
    this.setState ({
      check: false,
    });
  }
  render () {
    return (
      <Container txt>
        <Header
         back
          text="Personal Information"
          save='Skip'
          {...this.props}
        />
        <View style={styles.viewtxt}>
            <Text style={styles.txt}>Update</Text>
            <Text style={styles.txt}>yourself</Text>
          </View>
        <View style={styles.container}>
          <View style={styles.viewht}>
            {this.hobbies ()}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.next}>
                <Text style={styles.txtNext}>Next</Text>
              </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  viewht: {
    width: '100%',
   // maxHeight: ITEM_WIDTH - 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 110,
  },

  viewtxt: {
    marginLeft:20,
    marginTop: 60,
    marginBottom: 60,
  },
  txt: {
    color: '#183D57',
    fontSize: 26,
    fontWeight: 'bold',
   
  },
  viewip: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#183D57',
    height: 40,
    margin: 0,
  },
  button: {
    position:'absolute',
    height: 50,
    width: '90%',
    backgroundColor: '#183D57',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
    bottom:50
  },
  vbutton: {
    height: 50,
    width: '90%',
    backgroundColor: '#416B88',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
  },
  txtNext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  viewGender: {
    alignItems: 'center',
    width: '100%',
  },
  btgender: {
    height: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
    borderWidth: 1,
  },
  txtgen: {
    fontSize: 16,
    color: 'black',
  },
  info: {
    width: '90%',
  },
  birday: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#183D57',
    borderBottomWidth: 1,
    //paddingBottom: 5,
    alignItems: 'center',
  },
  txtbird: {
    fontSize: 14,
    color: '#183D57',
  },
  calenda: {
    width: 16,
    height: 17,
    tintColor: '#183D57',
    marginRight: 2,
  },
});
