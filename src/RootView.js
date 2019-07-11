import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import NoInternetComponent from 'components/NoInternet';
import VersionChecker from 'components/VersionChecker';
import StoreRatingModal from 'components/StoreRating/StoreRatingModal';

class RootView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}

        <NoInternetComponent />

        <StoreRatingModal />
        <VersionChecker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootView;
