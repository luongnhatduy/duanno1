import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Container from '../../../../libraries/component/Container';
import Header from '../../../../libraries/component/Header';

class Item extends Component {
  render() {
    return (
      <View style={styles.viewitem}>
        <View style={styles.viewitemhead}>
          <Image
            style={styles.img}
            source={this.props.img}
            resizeMode="stretch"
          />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={this.props.place}
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handlePhone}
        />
      </View>
    );
  }
}
export default class Protect extends Component {
  texthead = () => (
    <View style={styles.viewhead}>
      <Text style={styles.texthead}>
          User protection function. When this function is turned on, after the set time, if not, it will send a message to the preset sms / email to avoid a dangerous situation for participants
      </Text>
      <Item
        title="Phone number"
        place="0989 345 999"
        img={require('..//..//..//..//img/smartphone.png')}
      />
      <Item
        title="Email"
        place="email@email.com"
        img={require('..//..//..//..//img/email.png')}
      />
      <Item
        title="Time"
        place="18:00 hrs"
        img={require('..//..//..//..//img/cl.png')}
      />
    </View>
  );

  textbottom = () => (
    <View style={styles.viewbottom}>
      <Text style={styles.texttt}>
          Your messenger
      </Text>
      <View style={styles.viewbt}>
        <ScrollView>
            <Text style={styles.txtbt}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </Text>
          </ScrollView>
      </View>
    </View>
  );

  render() {
    return (
      <Container txt>
        <Header back save="Save" text="Protect user" {...this.props} />
        {this.texthead()}
        {this.textbottom()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  viewhead: {
    margin: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: 'white',
  },
  texthead: {
    color: '#888888',
    fontSize: 14,
    fontStyle: 'italic',
    margin: 10,
    marginTop: 7,
  },
  viewitem: {
    padding: 10,

    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    width: '100%',
  },
  viewitemhead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 25,
    width: 22,
  },
  title: {
    color: '#888888',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    marginTop: 7,
    height: 40,
    margin: 0,
  },
  viewbottom: {
    marginTop: 30,
  },
  texttt: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#888888',
    margin: 10,
  },
  viewbt: {
    borderBottomColor: '#888888',
    borderTopColor: '#888888',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 10,
  },
  txtbt: {
    fontSize: 14,
    color: '#888888',
  },
});
