import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import Container from '../../../../libraries/component/Container';
import Header from '../../../../libraries/component/Header';
import Sliderr from '..//..//..//main/component/Slider';
import Favorite from '../Favorite';
import {connect} from 'react-redux';
import apis from 'features/src/libraries/Apis/Apis';
import {Profile} from '..//..//..//..//libraries/redux/action'

const ITEM_WIDTH = Dimensions.get ('window').width;
class FlatListItem extends Component {
  render () {
    console.log(this.props.item,'sdfdsf');
    return (
      <View style={styles.viewim}>
        <Image style={styles.img} source={{uri: this.props.item}} />
      </View>
    );
  }
}
class Aboutme extends Component {
  constructor (props) {
    super (props);
    this.state = {
      img: '',
      name: '',
      age: '',
      data: [],
    };
  }
  loadData=()=>{
  }
  componentDidMount () {
   this.setState({
    data : this.props.task.taskoj
   })
  }
  editinfo = () => {
    let data = this.state.data
    this.props.navigation.navigate ('EditInfo',{data});
  };
  render () {
    console.log(this.props.task.taskoj,'dataredux')
    let gen =''
    switch (this.props.task.taskoj.gender ) {
      case 1:
         gen = 'Male';
        break;
      case 2:
         gen = 'Female';
        break;
      default:
          gen = 'Non-binary';
        break;
    }
    return (
      <Container txt>
        <Header text="About me" back {...this.props} loadData={this.loadData}  />
        <ScrollView>
          <View style={styles.viewto}>
            <View style={styles.info}>

              <View style={styles.viewavt}>
                <TouchableOpacity onPress={this.editinfo}>
                  {this.props.task.taskoj && this.props.task.taskoj.avatar && this.props.task.taskoj.avatar.length > 0
                    ? <Image
                        style={styles.avt}
                        source={{uri: this.props.task.taskoj.avatar }}
                      />
                    : <Image
                        style={styles.avt}
                        source={require ('..//..//..//..//img/avatar.jpg')}
                      />}

                </TouchableOpacity>
                <Image
                  style={styles.edit1}
                  source={require ('..//..//..//..//img/sao.png')}
                />
              </View>
              <View style={styles.infoLeft}>
                <View style={styles.viewName}>
                  <Text style={styles.name} numberOfLines={1}>
                    {this.props.task.taskoj && this.props.task.taskoj.full_name }
                  </Text>
                  <TouchableOpacity onPress={this.editinfo}>
                    <Image
                      style={styles.edit}
                      source={require ('..//..//..//..//img/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewAge}>
                  <Text style={styles.age}>{this.props.task.taskoj && this.props.task.taskoj.age }, {gen}</Text>
                </View>
                <View style={styles.viewContentt}>
                  <Text style={styles.age}>{this.props.task.taskoj && this.props.task.taskoj.status_content} </Text>
                </View>
                <View style={styles.viewImgme}>
                  {/* <Image
                    style={styles.imgme}
                    source={require ('..//..//..//..//img/imgme.png')}
                    resizeMode="stretch"
                  />
                  <Image
                    style={styles.imgme}
                    source={require ('..//..//..//..//img/imgme.png')}
                    resizeMode="stretch"
                  /> */}
                  <FlatList
                  data={this.props.task.taskoj.image_user }
                  keyExtractor={this.keyExtractor}
                  extraData={this.state}
                  renderItem={({item, index}) => {
                    return (
                      <FlatListItem item={item} index={index} {...this.props} />
                    );
                  }}
                  horizontal
                />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.viewcenter}>
            <Text style={styles.title3}  >Information</Text>
            <Favorite dt="yourself" detail="ss" {...this.props} />
          </View>
          <View style={styles.viewcenter}>
            <Text style={styles.title3}>
            Hobbies
            </Text>
            <Favorite favor {...this.props} />
          </View>
          <View style={styles.bt} />
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
    return {
      Profile: taskoj => dispatch (Profile (taskoj)),
    }
}
export default connect (mapStatetoProps,mapDispatToProps) (Aboutme);
const styles = StyleSheet.create ({
  title1: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  viewtt: {
    width: '100%',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  viewto: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  viewcenter: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 15,
    paddingBottom: 10,
  },
  title2: {
    fontSize: 16,
    color: '#888888',
    fontWeight: 'bold',
    margin: 10,
  },
  title3: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'italic',
    margin: 10,
  },
  bt: {
    height: 15,
  },
  viewtop: {
    marginTop: 60,
  },
  
  info: {
    padding: 10,
   
    backgroundColor: 'white',
    // width: ITEM_WIDTH * 0.95,
    width: ITEM_WIDTH,
    flexDirection: 'row',
    // borderRadius: 10,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // elevation: 5,
  },
  viewavt: {
    marginTop:0,
    
    height: 110,
    width: 110,
  },
  avt: {
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  edit1: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 35,
    width: 35,
  },
  infoLeft: {
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
  viewName: {
    flexDirection: 'row',
  },
  edit: {
    height: 24,
    width: 24,
    marginTop: -4,
    marginLeft: 5,
    tintColor: '#FFCB78',
  },

  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth:ITEM_WIDTH-159,
    
  },
  viewAge: {
    marginTop: 10,
  },
  viewContent: {
    marginTop: 5,
  },
  viewContentt: {
    flexDirection: 'row',
    marginTop: 10,
  },
  viewImgme: {
    flexDirection: 'row',
  },
  imgme: {
  },
  viewim:{
  },
  img: {
    height: 65,
    width: 55,
    borderRadius: 10,
    marginRight: 5,
  },
  age: {
    color: '#323232',
    fontStyle: 'italic',
    maxWidth:ITEM_WIDTH-159,
  },
});
