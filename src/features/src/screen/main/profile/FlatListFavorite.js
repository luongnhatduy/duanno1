import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';
const ITEM_WIDTH = Dimensions.get ('window').width;
import {connect} from 'react-redux';
import FlatListItem from './FlatListItem';
import constants from '..//..//..//libraries/utils/constants';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
import {Tangdem, AddID} from './../../../libraries/redux/action';
import apis from 'features/src/libraries/Apis/Apis';
class FlatListFavorite extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
      d: 0,
      dt: [],
      object:{}
    };
  }
  keyExtractor = (item, index) => index.toString ();
  componentDidMount () {
    console.log (this.props.id, 'id');
    showLoading ();
    apis
      .fetch (apis.PATH.USER_HOBBIES + '?hobbies_id=' + this.props.id, true)
      .then (res => {
        console.log (res, 'hobbies');
        if (res.code === 200) {
          hideLoading ();
          this.setState ({
            data: res.data,
          });
          for (i = 0; i < res.data.length; i++) {
            console.log(res.data[i].id,'iddd')
            if (res.data[i].selected === 1) {
              const newData = [...this.state.dt,res.data[i].id];
              this.setState ({dt: newData,d : this.state.d+1});
              this.props.AddID (this.state.dt);
            }
          }
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
    // switch (this.props.text) {
    //   case "Music":
    //     this.setState({
    //       r: constants.Music
    //     });
    //     break;
    //   case "Cinema":
    //     this.setState({
    //       r: constants.Cinema
    //     });
    //     break;
    //   case "Book":
    //     this.setState({
    //       r: constants.Book
    //     });
    //     break;
    //   case "Going out":
    //     this.setState({
    //       r: constants.Goingout
    //     });
    //     break;
    //   case "Dish":
    //     this.setState({
    //       r: constants.Dish
    //     });
    //     break;
    //   case "Soccer":
    //     this.setState({
    //       r: constants.Soccer
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }
  dem = async id => {
    console.log (id, 'id');
    this.state.dt.push (id);
    this.setState ({
      d: this.state.d + 1,
      // dt : this.state.dt + id
    });
    this.props.AddID (this.state.dt);
    AsyncStorage.setItem ('DATAID', `${this.state.dt}`);
  };
  dem2 = id => {
    console.log (id, 'id');
    for (var i = 0; i < this.state.dt.length; i++) {
      if (this.state.dt[i] === id) {
        this.state.dt.splice (i, 1);
      }
    }
    this.setState ({
      d: this.state.d - 1,
      ///dt : this.state.dt + id
    });
    this.props.AddID (this.state.dt);
    AsyncStorage.setItem ('DATAID', `${this.state.dt}`);
  };
  keyExtractor = (item, index) => index.toString ();
  render () {
    
    console.log (this.state.d, this.state.dt, 'dem');
    this.props.Tangdem (this.state.d);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          numColumns={4}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                {...this.props}
                dem={this.dem}
                dem2={this.dem2}
                limit={this.props.limit}
              />
            );
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatToProps = dispatch => {
  return {
    Tangdem: taskDem => dispatch (Tangdem (taskDem)),
    AddID: taskId => dispatch (AddID (taskId)),
  };
};
export default connect (mapStateToProps, mapDispatToProps) (FlatListFavorite);
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  viewitem: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    height: (ITEM_WIDTH - 60) / 4,
    width: (ITEM_WIDTH - 60) / 4,
    borderRadius: (ITEM_WIDTH - 60) / 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  img1: {
    height: 50,
    width: 50,
  },
  img2: {
    height: 12,
    width: 50,
  },
  txt: {
    color: 'black',
  },
});
