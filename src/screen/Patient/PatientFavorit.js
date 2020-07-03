import React, { Component } from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-navigation';
import { View, ScrollView, FlatList } from 'react-native';
import { ApplicationStyles, Colors } from '../../themes';
import { EMPTY_USER_IMAGE, Get } from '../../services/API';
import { getItem, saveItem } from '../../services';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import Empty from '../../components/Empty';

export default class PatientFavorit extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getPatient();
  }

  getPatient() {
    // this.setState({
    //   loading: true,
    // });
    getItem('doctor').then((res) => {
      Get('edelweiss.physician.favorite/get')
        .then((res) => {
          res.results.reduce((r, a) => {
            console.warn('pasien', a.patient);
            // this.setState({
            //   data: a.schedule,
            //   loading: false,
            // });
          }, {});
        })
        .catch((err) => {
          console.warn('err', err);
        });
    });
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
      <SafeAreaView style={ApplicationStyles.screen.mainContainer}>
        <TopNavigation
          //   title={this.data.name}
          title="Pasien Favorit"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Empty
            // img={require('../../assets/images/empty-and-lost.json')}
            text="Tidak ada Pasien Favorit saat ini"
            size={20}
          />
        </View>




      </SafeAreaView>
    );
  }
}
