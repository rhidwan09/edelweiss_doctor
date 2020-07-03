import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Icon, Divider} from '@ui-kitten/components';

import {Fonts} from '../themes';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {label, value, icon} = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Icon style={style.icon} fill="#11a0db" name={icon} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={Fonts.style.labelProfile}>{label}</Text>
            <Text style={Fonts.style.labelProfile}>{value}</Text>
          </View>
        </View>
        <Divider />
      </View>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
    marginRight: 25,
  },
});

export default ListItem;
