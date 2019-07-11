import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  FlatList,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import constants from '..//utils/constants';
import ToolTip from "..//..//screen/main/component/ToolTip.js"

const ITEM_WIDTH = Dimensions.get ('window').width;
class FlatListItem extends Component {
  
  detail = () => {
    this.props.navigation.navigate ('Detail');
  };
  
  render () {
    let k = this.props.index % 2 ===0 ? 'chan' : 'le'
    return (
      <TouchableOpacity style={styles.iitem} onPress={this.detail}>
        <View style={styles.phantram}>
          <Text style={styles.txtpt}>85%</Text>
        </View>
        <TouchableOpacity onPress={this.report} style={styles.report}>
               <ToolTip  indexx={k} {...this.props}/>
        </TouchableOpacity>

        <Image
          style={styles.imgContent}
          source={this.props.item.source}
          resizeMode="stretch"
        />
        <Image
          style={styles.ingmo}
          source={require ('..//..//img//Rectangle.png')}
          resizeMode="stretch"
        />
        <Text style={styles.name}>Nguyen Hoang Hiep, 23</Text>


      </TouchableOpacity>
    );
  }
}

class ViewFlatList extends Component {
  keyExtractor = (item, index) => index.toString ();
  fillter = () => {
    this.props.navigation.navigate ('Fillter');
  };
  render () {
    return (
      <View style={styles.container}>
        <FlatList
         style={styles.flatlist}
          data={constants.data}
          keyExtractor={this.keyExtractor}
          numColumns={2}
          renderItem={({item, index}) => {
            return <FlatListItem item={item} index={index} {...this.props} />;
          }}
        />
        <TouchableOpacity style={styles.btfilter} onPress={this.fillter}>
          <Image
            style={styles.fillter}
            source={require ('..//..//img/fillter.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default class ListHome extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return <ViewFlatList {...this.props} />;
  }
}
const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    alignItems:'center'
  },
  imgContent: {
    height: (ITEM_WIDTH-4) * 0.6,
    width: (ITEM_WIDTH-4) / 2,
    margin: 0,
  },
  ingmo: {
    position: 'absolute',
    width: (ITEM_WIDTH-24) / 2,
    height: 50,
    zIndex: 1,
    bottom: 5,
    right:6
  },
  flatlist:{
    marginTop:3
  },
  iitem: {
    alignItems: 'center',
    
  },
  phantram: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FE5455',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  txtpt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgdots: {
    height: 5,
    width: 18,
  },
  report: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,

    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1,
    bottom: 10,
    fontSize: ITEM_WIDTH/26
  },
  
  btfilter: {
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#FFCB78',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillter: {
    width: 20,
    height: 20,
  },
  
  
});
