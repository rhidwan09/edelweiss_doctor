import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import {Fonts} from '../themes';

export default class CardMenuItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {navigation, data, task} = this.props;

    return (
      <TouchableOpacity
        style={[{backgroundColor: this.props.data.color}, style.cardMenu]}
        onPress={() =>
          navigation.navigate(this.props.data.link, {course: data})
        }>
        <Text numberOfLines={2} style={Fonts.style.labelMenu}>
          {this.props.data.title}
        </Text>
        <Text numberOfLines={2} style={Fonts.style.labelsubMenu}>
          {this.props.data.task}
        </Text>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  cardMenu: {
    justifyContent: 'flex-end',
    width: 150,
    borderRadius: 6,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 15,
    marginHorizontal: 5,
  },
});
