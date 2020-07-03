import React, {Component} from 'react';
import {StatusBar, View, StyleSheet, Platform} from 'react-native';
import {Colors} from '../themes';

export default class HeaderStatusbar extends Component {
  render() {
    const {barStyle, background, translucent} = this.props;
    const height = Platform.OS === 'ios' ? 20 : 0;
    return (
      <View style={[height, styles.container]}>
        <StatusBar
          animated={true}
          translucent={translucent ? true : false}
          showHideTransition={'fade'}
          barStyle={barStyle ? barStyle : 'dark-content'}
          backgroundColor={background ? background : Colors.snow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 0,
  },
});
