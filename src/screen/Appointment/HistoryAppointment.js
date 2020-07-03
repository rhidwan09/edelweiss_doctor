import React, { Component } from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
  Button,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-navigation';
import { View, ScrollView } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { ApplicationStyles, Colors } from '../../themes';
import { EMPTY_USER_IMAGE, Get } from '../../services/API';
import { getItem, saveItem } from '../../services';

import AppointmentList from '../../components/AppointmentList';
import Empty from '../../components/Empty';

export default class HistoryAppointment extends Component {
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
    this.getEncounter();
  }

  getEncounter() {
    this.setState({
      loading: true,
    });
    getItem('doctor').then((res) => {
      Get(
        `edelweiss.encounter?filters=[('doctor','=',${res[0].id}),('state','=','finished')]`,
      )
        .then((res) => {
          if (res.hasOwnProperty('results')) {
            this.setState({
              data: res.results,
            });
          } else {
            this.setState({
              data: [],
            });
          }
          this.setState({
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            data: [],
            loading: false,
          });
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
      <SafeAreaView style={[ApplicationStyles.screen.mainContainer]}>
        <TopNavigation
          //   title={this.data.name}
          title="History Appoinment"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />

        {this.state.loading && (
          <View style={ApplicationStyles.screen.container}>
            <SkeletonContent
              containerStyle={{ width: 365 }}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingNews}
              layout={[
                { key: 'someId', width: 365, height: 100, marginBottom: 8 },
                { key: 'someId', width: 200, height: 20, marginBottom: 8 },
                { key: 'someId', width: 165, height: 10, marginBottom: 8 },
              ]}
            />
          </View>
        )}

        {this.state.data.length == 0 && !this.state.loading && (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Empty
              // img={require('../../assets/images/empty-and-lost.json')}
              text="Belum Ada History Konsultasi"
              size={250}
            />
          </View>
        )}

        {!this.state.loading && (
          <ScrollView style={{ flex: 1 }}>
            <View style={[ApplicationStyles.screen.container]}>
              {this.state.data.map((item, index) => {
                return (
                  <AppointmentList
                    data={item}
                    schedule={false}
                    navigation={() =>
                      navigation.navigate('DetailNews', { data: item })
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
