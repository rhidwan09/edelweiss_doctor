import React, {Component} from 'react';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {ApplicationStyles, Fonts, Colors} from '../themes';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {label} = this.props;
    return (
      <View style={style.wrappLoading}>
        <Layout style={style.contentLoading}>
          <Spinner size="medium" status="primary" />
          <Text category="s1" style={{color: Colors.DARK100, marginTop: 12}}>
            {label}
          </Text>
        </Layout>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrappLoading: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  contentLoading: {
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
});
