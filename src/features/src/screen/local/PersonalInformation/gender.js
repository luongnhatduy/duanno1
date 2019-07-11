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
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
const ITEM_WIDTH = Dimensions.get ('window').width;

export default class Gender extends Component {
 

  state = {
    txt: constants.datakb[2].title,
    place: constants.datakb[2].content,
    d: 1,
    titlebt: 'Next',
    cl1: 'black',
    clbr1: 'white',
    cl2: 'black',
    clbr2: 'white',
    cl3: 'black',
    clbr3: 'white',
    username: '',
    usergender: 0,
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
      cl3: 'black',
      clbr3: 'white',
      usergender : 1
    });
  };
  gender2 = () => {
    this.setState ({
      cl3: 'black',
      clbr3: 'white',
      cl2: '#FFCB78',
      clbr2: '#FFCB78',
      cl1: 'black',
      clbr1: 'white',
      usergender : 2
    });
  };
  gender3 = () => {
    this.setState ({
      cl2: 'black',
      clbr2: 'white',
      cl3: '#FFCB78',
      clbr3: '#FFCB78',
      cl1: 'black',
      clbr1: 'white',
      usergender : 3
    });
  };
  next = () => {
    showLoading();
    apis
        .post (
          apis.PATH.UPDATE_USER,
          {
            gender: this.state.usergender,
          },
          true
        )
        .then (res => {
            hideLoading();
            this.props.navigation.navigate('Information');
          console.log (res, 'gender');
        })
        .catch (err => {
            hideLoading();
          console.log ('loi', err);
        });
  };

  viewgender = () => {
    return (
      <View style={styles.viewGender}>
        <TouchableOpacity
          style={[
            styles.btgender,
            {backgroundColor: this.state.clbr1, borderColor: this.state.cl1},
          ]}
          onPress={this.gender1}
        >
          <Text style={styles.txtgen}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btgender,
            {backgroundColor: this.state.clbr2, borderColor: this.state.cl2},
          ]}
          onPress={this.gender2}
        >
          <Text style={styles.txtgen}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btgender,
            {backgroundColor: this.state.clbr3, borderColor: this.state.cl3},
          ]}
          onPress={this.gender3}
        >
          <Text style={styles.txtgen}>Non-binary</Text>
        </TouchableOpacity>
        {}
      </View>
    );
  };
  handlePhone = text => {
    this.setState ({
      username: text,
    });
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
         // btback={this.back}
          {...this.props}
        />
        <View style={styles.container}>
          <View style={styles.viewtxt}>
            <Text style={styles.txt}>{this.state.txt}</Text>
          </View>

          <View style={styles.viewht}>
            {this.viewgender ()}
          </View>
          {this.state.usergender === 0 
            ? <View style={styles.vbutton}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </View>
            : <TouchableOpacity style={styles.button} onPress={this.next}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </TouchableOpacity>}

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
    maxHeight: ITEM_WIDTH - 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },

  viewtxt: {
    alignItems: 'center',
  },
  txt: {
    color: '#183D57',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 60,
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
    height: 50,
    width: '90%',
    backgroundColor: '#183D57',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
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
