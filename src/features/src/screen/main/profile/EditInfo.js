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
import Item from '..//..//..//libraries/component/Item';
import Container from '../../../libraries/component/Container';
import Header from '../..//..//libraries/component/Header';
import ImagePicker from 'react-native-image-crop-picker';
import apis from 'features/src/libraries/Apis/Apis';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
import {connect} from 'react-redux';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import {showFlashMessage} from 'helpers/Utils';
import constants from 'features/src/libraries/utils/constants';

const ITEM_WIDTH = Dimensions.get ('window').width;
class FlatListItem extends Component {
  delete=()=>{
     this.props.parentFlatList.setdataimg(this.props.index);
  }
  render () {
    return (
      <View style={styles.viewim}>
        <Image style={styles.img} source={{uri: this.props.item.image}} />
        <TouchableOpacity style={styles.btback} onPress={this.delete}>
          <Image
            style={styles.xback}
            source={require ('..//..//..//img/xback.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
class EditInfo extends Component {
  constructor (props) {
    super (props);
    this.state = {
      status: '',
      img: '',
      data: [],
      dtimg: [],
      gender: '',
      birdth: this.props.task.taskoj.birthday,
      name: this.props.task.taskoj.full_name,
      value: this.props.task.taskoj.status_content,
      check: false,
      messenger: '',
      deletekey : null
    };
  }
  componentDidMount () {
    switch (this.props.task.taskoj.gender) {
      case 1:
        this.setState ({
          gender: 'Male',
        });
        break;
      case 2:
        this.setState ({
          gender: 'Female',
        });
        break;
      case 3:
        this.setState ({
          gender: 'Non-binary',
        });
        break;
      default:  
        break;
    }
  }
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  setcheck = () => {
    this.setState ({
      check: true,
      messenger: 'The full name must be at least 2 characters.',
    });
  };
  handleStatus = text => {
    this.setState ({
      status: text,
      value: text,
    });
  };
  uploadImage = source => {
    showLoading ();
    apis
      .postUploadImg (source, true)
      .then (res => {
        console.log (res, 'upload anh');
        hideLoading ();
        if (res.code === 200) {
          this.setState ({
            data: res.data,
            load : false
          });
          for (i = 0; i < res.data.length; i++) {
            const newData = [...this.state.dtimg, res.data[i].name];
            this.setState ({dtimg: newData});
          }
        } else {
          this.setState ({
            load : false
          });
          showFlashMessage (res.msgdefault, constants.typeMessage.DANGER);
        }
      })
      .catch (err => {
        this.setState ({
          load : false
        });
        hideLoading ();
        showFlashMessage (
          'There was an error please try again',
          constants.typeMessage.DANGER
        );
        console.log (err, 'loi');
      });
  };

  setdataimg=(j)=>{
    console.log(j, 'day')
    const newData = [...this.state.dtimg]
    newData.splice(j,1)
    this.setState( { dtimg: newData })
    const newData2 = [...this.state.data]
    newData2.splice(j,1)
    this.setState( { data: newData2 })
  };

  uploadimg = () => {
    ImagePicker.openPicker ({
      multiple: true,
    }).then (images => {
      this.uploadImage (images);
    });
  };
  setgen = gen => {
    this.setState ({
      gender: gen,
    });
  };
  setbird = bird => {
    this.setState ({
      birdth: bird,
    });
  };
  setname = name => {
    this.setState ({
      name: name,
    });
  };
 
  keyExtractor = (item, index) => index.toString ();
  render () {
    // console.log(this.state.dtimg)
    return (
      <Container txt>
        <Header
          text="Profile"
          back
          save="Save"
          {...this.props}
          work="editinfo"
          name={this.state.name}
          gender={this.state.gender}
          birdth={this.state.birdth}
          status={this.state.value}
          dtimg={this.state.dtimg}
          setcheck={this.setcheck}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.viewTop}>
              <View style={styles.viewstt}>
                <Text style={styles.about}>Profile</Text>
              </View>
              <Item
                img1={require ('..//..//../img/name.png')}
                up="Name"
                content={this.props.navigation.state.params.data.full_name}
                setname={this.setname}
              />
              <Item
                img1={require ('..//..//..//img/age.png')}
                up="Birthday"
                content={this.props.navigation.state.params.data.birthday}
                check="date"
                setbird={this.setbird}
              />
              <Item
                img1={require ('..//..//..//img/gender1.png')}
                up="Gender"
                content={this.props.navigation.state.params.data.gender}
                check
                setgen={this.setgen}
              />
            </View>

            <View style={styles.viewStatusTop}>
              <View style={styles.viewstt}>
                <Text style={styles.about}>Status</Text>
              </View>

              <View style={styles.viewtxtip}>
                <TextInput
                  value={this.state.value}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="What are you thinking..."
                  placeholderTextColor="#929292"
                  autoCapitalize="none"
                  onChangeText={this.handleStatus}
                  editable={true}
                  maxLength={60}
                />
              </View>

              <View style={styles.sotu}>
                <Text style={styles.txtsotu}>
                  {this.state.status.length}/60
                </Text>
              </View>
            </View>
            <View style={styles.viewStatusTop}>
              <View style={styles.viewstt}>
                <Text style={styles.about}>Featured photos</Text>
              </View>
              <View style={styles.viewbottom}>
                <TouchableOpacity
                  style={styles.viewadd}
                  onPress={this.uploadimg}
                >
                  <Image
                    style={styles.addimg}
                    source={require ('.//..//..//.//..//img/cong.png')}
                  />
                </TouchableOpacity>
                <FlatList
                  data={this.state.data}
                  keyExtractor={this.keyExtractor}
                  extraData={this.state}
                  renderItem={({item, index}) => {
                    return (
                      <FlatListItem item={item} index={index} parentFlatList={this} {...this.props} />
                    );
                  }}
                  horizontal
                />
              </View>
            </View>
          </View>
          {this.state.check === true
            ? <ModalLogin
                check={this.state.check}
                messenger={this.state.messenger}
                reset={this.reset}
              />
            : <View />}
        </ScrollView>

      </Container>
    );
  }
}
const mapStatetoProps = state => {
  return {
    task: !state.taskReducers ? [] : state.taskReducers,
  };
};
const mapDispatToProps = dispatch => {
  return {};
};
export default connect (mapStatetoProps, mapDispatToProps) (EditInfo);
const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  search: {},
  button: {
    height: 50,
    margin: 50,
    backgroundColor: '#183D57',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  about: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewstt: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
  },
  viewtxtip: {
    paddingBottom: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
  },
  viewTop: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  viewStatus: {},
  input: {
    //marginTop: 10,
    maxWidth: '90%',
    height: 40,
    margin: 0,
  },
  sotu: {
    alignItems: 'flex-end',
    padding: 7,
  },
  viewStatusTop: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: 'white',
    marginTop: 20,
  },
  txtsotu: {
    color: '#929292',
  },
  viewimg: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: 20,
  },
  viewadd: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    width: ITEM_WIDTH / 3,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
  addimg: {
    height: 40,
    width: 40,
  },
  img: {
    width: ITEM_WIDTH / 3,
    height: 200,
    margin: 10,
    marginRight: 0,
    borderRadius: 10,
  },
  viewbottom: {
    flexDirection: 'row',
  },
  xback: {
    height: 30,
    width: 30,
  },
  btback: {
    position: 'absolute',
    right: 5,
    top: 15,
  },
});
