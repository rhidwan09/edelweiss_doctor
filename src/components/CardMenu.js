import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { EMPTY_USER_IMAGE, Get } from '../services/API';

import { ApplicationStyles } from '../themes';

import CardMenuItems from './CardMenuItems';

export default class CardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    this.getEncounter();
  }

  getEncounter() {
    Get(
      "edelweiss.encounter?filters=[('encounter_type','in',['onsite','telehealth']),('state','in',['waiting','consulting'])]",
    )
      .then((res) => {
        const task = res.count;
        this.setState({
          loadingDoc: false,
          data: [
            {
              imageUrl: 'http://via.placeholder.com/160x160',
              title: 'Appointment',
              color: '#11a0db',
              task: `${task ? task : '0'} Task`,
              link: 'ListAppointment',
            },
            {
              imageUrl: 'http://via.placeholder.com/160x160',
              title: 'Schedule',
              color: '#ed1d85',
              link: 'ListSchedule',
            },
            {
              imageUrl: 'http://via.placeholder.com/160x160',
              title: 'Patients',
              color: '#5b388c',
              link: 'PatientFavorit',
            },
          ],
        });
      })
      .catch((err) => {
        this.setState({
          loadingNews: false,
        });
        console.warn('err', err);
      });
  }

  render() {
    return (
      <Layout>
        {this.state.loadingNews && (
          <View
            style={[
              ApplicationStyles.screen.container,
              { display: 'flex', flexDirection: 'row' },
            ]}>
            <SkeletonContent
              containerStyle={{ width: 150, marginRight: 10 }}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingDoc}
              layout={[
                { key: 'someId', width: 150, height: 100, marginBottom: 12 },
              ]}
            />
            <SkeletonContent
              containerStyle={{ width: 150, marginRight: 10 }}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingDoc}
              layout={[
                { key: 'someId', width: 150, height: 100, marginBottom: 12 },
              ]}
            />
            <SkeletonContent
              containerStyle={{ width: 150 }}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingDoc}
              layout={[
                { key: 'someId', width: 150, height: 100, marginBottom: 12 },
              ]}
            />
          </View>
        )}
        {!this.state.loadingDoc && (
          <View>
            <FlatList
              key="flatlist"
              extraData={this.state.data}
              data={this.state.data}
              renderItem={({ item, index }) => (
                <CardMenuItems data={item} navigation={this.props.navigation} />
              )}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </Layout>
    );
  }
}
