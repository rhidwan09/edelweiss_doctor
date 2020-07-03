import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Colors} from '../themes';

class HeaderStatusbarIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: 1,
          backgroundColor: Colors.DARK100,
        }}
      />
    );
  }
}

export default HeaderStatusbarIOS;
