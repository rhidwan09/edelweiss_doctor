import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '../themes';

class Empty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {img, text, size} = this.props;
    return (
      <View style={styles.emptyScreen}>
        <View style={{width: size ? size : 160, height: size ? size : 160}}>
          {/* <LottieView source={image} autoPlay loop resizeMode="cover" /> */}
        </View>
        <Text style={styles.emptyText}>
          {text ? text : 'Data tidak ditemukan.'}
        </Text>
      </View>
    );
  }
}

export default Empty;

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyText: {
    // marginTop: -5,
    color: '#86868F',
    fontFamily: Colors.PRIMARYFONTBOLD,
    fontSize: Fonts.size.medium,
  },
});
