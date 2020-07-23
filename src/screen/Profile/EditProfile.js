import React, { Component } from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
  Input,
  Text
} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-navigation';
import { View, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../themes';
import { EMPTY_USER_IMAGE, Get } from '../../services/API';
import { getItem, saveItem } from '../../services';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import Empty from '../../components/Empty';

class EditProfile extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const BackIcon = (props) => (
      <Icon {...props} fill={Colors.PRIMARYCOLOR} name="arrow-back" />
    );

    const navigateBack = () => {
      this.props.navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    return (
      <SafeAreaView style={[
        ApplicationStyles.screen.mainContainer,
        { backgroundColor: Colors.snow },
      ]}>
        <TopNavigation
          //   title={this.data.name}
          title="Edit Profil"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />
        <Layout style={[
          ApplicationStyles.screen.container
        ]}>
          <Layout>
            <Input
              size="medium"
              placeholder="Masukan Email"
              value={this.state.email}
              onChangeText={(val) => this.setState({ email: val })}
              labelStyle={Fonts.style.label}
              keyboardType="email-address"
              autoCapitalize={false}
              returnKeyType="next"
            />
          </Layout>
          <Layout style={{ marginTop: 5 }}>
            <Input
              size="medium"
              placeholder="Masukan Password"
              value={this.state.password}
              onChangeText={(val) => this.setState({ password: val })}
              labelStyle={styles.label}
              returnKeyType="done"
            />
          </Layout>
        </Layout>
      </SafeAreaView >
    );
  }
}

export default EditProfile;

const styles = StyleSheet.create({
  label: { color: Colors.DARK100, fontWeight: '700', marginBottom: 8 },
});
