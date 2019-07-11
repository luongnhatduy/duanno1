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
import Header from '..//..//..//..//libraries/component/Header';
import ListChat from '..//..//..//..//libraries/component/ListChat';
import Container from '../../../../libraries/component/Container';
const ITEM_WIDTH = Dimensions.get ('window').width;

class ViewVip extends Component {
  onPress = () => {
    this.props.navigation.navigate ('UpgradeVip');
  };
  render () {
    return (
      <View style={styles.contai}>
        <ScrollView>
          <View style={styles.viewTop}>
            <Image
              style={styles.img1}
              source={require ('..//..//..//..//img/hoa.png')}
            />
            <Image
              style={styles.img2}
              source={require ('..//..//..//..//img/vong1.png')}
            />
            <Image
              style={styles.img3}
              source={require ('..//..//..//..//img/vong1.png')}
            />
            <Image
              style={styles.img4}
              source={require ('..//..//..//..//img/avt.png')}
            />
            <Image
              style={styles.img5}
              source={require ('..//..//..//..//img/VipMember.png')}
              resizeMode="stretch"
            />
            <Text style={styles.Congratulations}>Congratulations</Text>
            <Text style={styles.date}>Expiration Date: Oct 31, 2019</Text>
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.button} onPress={this.onPress}>
                <Text style={styles.renew}>Renewed</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.vm}>
            <Image
              style={styles.vuongmien}
              source={require ('..//..//..//..//img/star.png')}
              resizeMode="stretch"
            />
            <Text style={styles.Privilege}>VIP PRIVILEGE</Text>
          </View>
          <ListChat list="vip" {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

export default class Vip extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <Container txt>
        <Header back text="Vip" {...this.props} />
        <View style={styles.container}>
          <ViewVip {...this.props} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contai: {
    flex: 1,
  },
  viewTop: {
    backgroundColor: '#183D57',
    margin: 0,
    height: 400,
    alignItems: 'center',
  },
  img1: {
    height: 150,
    width: '75%',
  },
  img2: {
    marginTop: -100,
    height: ITEM_WIDTH * 0.4,
    width: ITEM_WIDTH * 0.4,
  },
  img3: {
    marginTop: -ITEM_WIDTH * 0.36,
    height: ITEM_WIDTH * 0.32,
    width: ITEM_WIDTH * 0.32,
  },
  img4: {
    marginTop: -ITEM_WIDTH * 0.285,
    height: ITEM_WIDTH * 0.25,
    width: ITEM_WIDTH * 0.25,
  },
  img5: {
    marginTop: -ITEM_WIDTH * 0.055,
    height: 55,
    width: ITEM_WIDTH * 0.6,
  },
  Congratulations: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 15,
  },
  date: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  button: {
    width: ITEM_WIDTH * 0.45,
    height: 47,
    backgroundColor: '#FFCB78',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renew: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vm: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vuongmien: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  Privilege: {
    color: '#183D57',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
});
