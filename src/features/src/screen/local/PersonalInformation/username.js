import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  AsyncStorage
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
import { showFlashMessage } from 'helpers/Utils';
const ITEM_WIDTH = Dimensions.get ('window').width;

export default class Username extends Component {

  state = {
    txt: constants.datakb[0].title,
    place: constants.datakb[0].content,
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
   
    checkname : false
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
  next = async() => {
    showLoading();
    apis
    .post (
      apis.PATH.UPDATE_USER,
      {
        full_name: this.state.username 
      },
      true
    )
    .then (res => {
        hideLoading();
        if(res.code===200){
          this.props.navigation.navigate('Birdth')
        }
       else{
         showFlashMessage(res.msgdefault,constants.typeMessage.DANGER)
       }
      console.log (res, 'username');
    })
    .catch (err => {
        hideLoading();
      console.log ('loi', err);
    });
  };
  next1 = async() => {
   showFlashMessage(this.state.messenger1,constants.typeMessage.DANGER)
  };
  handlePhone = text => {
    const newData =  text;
    this.setState ({
      username: text,
    });
    console.log(newData.length,'length')
    if(newData.length > 1 ){
        for( var i = 0; i <  newData.length; i++){ 
            if (  newData.charAt(i) === ' ' && newData.charAt(i+1) === ' ') {
              console.log(newData.charAt(i),newData.charAt(i+1),'err')
                this.setState ({
                    checkname : false,
                    messenger1:'Wrong name format'
                  });
                  break;
            }else{
              console.log(newData.charAt(i),newData.charAt(i+1),'tm')
                this.setState ({
                    checkname : true
                  });
            }
         }
    }else{
      console.log(newData.length,'lenght')
      if(newData.length === 0 ){
        this.setState ({
          checkname : false,
          messenger1:'Name is required'
      })
      }else{
        this.setState ({
          checkname : false,
          messenger1:'The name contains at least 2 characters'
      });
      }
        
    }
  };
  info = () => {
    console.log (this.state.username, 'name');
    return (
      <View style={styles.info}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={this.state.place}
          placeholderTextColor="#888888"
          autoCapitalize="none"
          maxLength={32}
          minLength={2}
          onChangeText={this.handlePhone}
        />
      </View>
    );
  };
  // reset = () => {
  //   this.setState ({
  //     check: false,
  //   });
  // };
  componentDidMount () {
    
    
  }
  render () {
    // switch (this.state.username) {
    //     case '':
    //       break;
    //     case '':
    //         break;
    //     default:
    //       this.setState ({
    //         bgr: '#183D57',
    //         color: 'white',
    //       });
    //       break;
    //   }
    
    // a = this.state.txt === 'My name is'
    //   ? this.state.username
    //   : this.state.date;
    // b = this.state.txt === 'My name is'
    //   ? ''
    //   : moment ().format ('YYYY-MM-DD');
    return (
      <Container txt>
        <Header text="Personal Information"{...this.props}/>
        <ScrollView>
        <View style={styles.viewtxt}>
          <Text style={styles.txt}>My name </Text>
          </View>
        <View style={styles.container}>
          <View style={styles.viewht}>
            {this.info()}
          </View>
          {this.state.checkname === false 
            ? <TouchableOpacity style={styles.button} onPress={this.next1}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.button} onPress={this.next}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </TouchableOpacity>}

        </View>
        </ScrollView>
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
    color:'#183D57'
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
