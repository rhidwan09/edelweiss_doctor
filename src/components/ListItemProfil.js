import React, {Component} from 'react';
import {View} from 'react-native';

import ListItem from './ListItem';

class ListItemProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <ListItem
          label="Phone Number"
          value={data.mobile}
          icon="smartphone-outline"
        />
        <ListItem label="Email" value={data.email} icon="email-outline" />
        <ListItem
          label="Graduation"
          value={data.graduate_institution}
          icon="award-outline"
        />
        <ListItem label="Address" value={data.street} icon="pin-outline" />
      </View>
    );
  }
}

export default ListItemProfil;
