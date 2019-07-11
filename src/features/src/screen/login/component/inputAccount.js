import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {Addphone, Addpassword} from './../../../libraries/redux/action';
import countries from './../countries.json';
import ModalCountries from 'features/src/libraries/component/ModalCountries';

// export const getAllCountries = () => {
//   let countriesList = [];

//   countryNameList.map(name => {
//       countriesList.push({ ...countries[name], code: name });
//   })
//   return countriesList;
// }

class InputAccount extends Component {
  constructor (props) {
    super (props);
    this.state = {
      check: true,
      phone: '',
      password: '',
      countrySelected: 'VN',
      checkcountries: false,
      img: countries['VN'].flag,
      ma: countries['VN'].callingCode,
      phonemv: '',
      value: '',
      txtphone: '',
    };
  }
  reset = (ma, img) => {
    // for(var i =0 ; this.state.phone.length)
    this.setState ({
      checkcountries: false,
      img: img,
      ma: ma,
      value: ma,
      //  phonemv : ma +
    });
  };
  showpass = () => {
    this.setState ({
      check: !this.state.check,
    });
  };

  handlePhone = text => {
    this.setState ({
      phone: text,
      value: text,
    });
    let newt = '';
    for (var i = 0; i < text.length; i++) {
      console.log (text[i], 'tmpi');
      if (text[0] == 0) {
        if (i !== 0) {
          newt = newt.concat (text[i]);
        }
      } else {
        newt = text;
      }
    }
    this.setState ({
      txtphone: newt,
    });
    this.props.setnumber && this.props.setnumber(newt,this.state.ma);
  };
  handlePassword = text => {
    this.setState ({
      password: text,
    });
  };
  textinput = txt => {
    return (
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder={txt}
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={this.handlePhone}
      />
    );
  };
  onFlagPressed = () => {
    this.setState ({
      checkcountries: !this.state.checkcountries,
    });
  };
  textinputphone = () => {
    return (
      <View style={styles.viewnumber}>
        <TouchableOpacity onPress={this.onFlagPressed}>
          <Image
            resizeMode="stretch"
            source={{uri: this.state.img}}
            style={styles.imageCountryFlag}
          />
        </TouchableOpacity>
        <Text style={styles.txtPhone}>+{this.state.ma}</Text>
        <TextInput
          style={styles.inputphone}
          underlineColorAndroid="transparent"
          placeholder="Phone number"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handlePhone}
        />
        {this.state.checkcountries === true
          ? <ModalCountries
              check={this.state.checkcountries}
              reset={this.reset}
              countries={countries}
            />
          : <View />}
      </View>
    );
  };
  render () {
    console.log (this.state.txtphone, 'value');
    const {phone, password} = this.state;
    // switch (this.props.type) {
    //   case 'signupphone':
    //     let num = '+' + this.state.ma + this.state.txtphone;
    //     this.props.Addphone (num);
    //     break;
    //   default:
    //     this.props.Addphone (phone);
    //     break;
    // }
    let num = '+' + this.state.ma + this.state.txtphone;
   
    this.props.Addphone (num);
    this.props.Addpassword (password);
    // let txt = !this.props.type ? 'Email/Phone number' : 'Email';
    return (
      <View>
        {this.textinputphone ()}
        {this.props.forgot
          ? <View />
          : <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#000000"
                autoCapitalize="none"
                onChangeText={this.handlePassword}
                secureTextEntry={this.state.check}
              />
              <TouchableOpacity onPress={this.showpass} style={styles.showpass}>
                <Image
                  style={styles.eyes}
                  source={require ('.//..//..//..//img/Union2.png')}
                />
              </TouchableOpacity>
            </View>}

      </View>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatToProps = dispatch => {
  return {
    Addphone: taskPhone => dispatch (Addphone (taskPhone)),
    Addpassword: taskPassword => dispatch (Addpassword (taskPassword)),
  };
};
export default connect (mapStateToProps, mapDispatToProps) (InputAccount);

const styles = StyleSheet.create ({
  input: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: 40,
    margin: 0,
    color: '#183D57',
  },
  inputphone: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: 40,
    marginLeft: 5,
    color: '#183D57',
  },
  showpass: {
    position: 'absolute',
    bottom: 12,
    right: 0,
  },
  eyes: {
    height: 11,
    width: 20,
    tintColor: '#000000',
  },
  viewnumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCountryFlag: {
    width: 35,
    height: 25,
    marginRight: 3,
  },
  txtPhone: {
    color: 'black',
    fontSize: 14,
    marginRight: 3,
  },
});
