import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Pusher from 'pusher-js/react-native';

import { PusherConf } from '../services';
import { EMPTY_USER_IMAGE, Get } from '../services/API';

import { ApplicationStyles } from '../themes';

import CardMenuItems from './CardMenuItems';
import { connect } from 'react-redux';

class CardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    var pusher = new Pusher(PusherConf.key, PusherConf.options);
    var chanel = pusher.subscribe('edelweiss');
    let self = this;
    chanel.bind('telehealth-finished', function (data) {
      let encount = self.props.authReducer.inboxLength - 1;
      if (encount > 0) {
        self.props.setInboxLength(encount);
      } else {
        self.props.setInboxLength(0);
      }
    });

    this.getEncounter();
  }

  getEncounter() {
    this.setState({
      loadingNews: false,
      data: [
        {
          imageUrl: 'http://via.placeholder.com/160x160',
          title: 'Appointment',
          color: '#11a0db',
          task: true,
          link: 'ListAppointment',
        },
        {
          imageUrl: 'http://via.placeholder.com/160x160',
          title: 'Schedule',
          color: '#ed1d85',
          task: false,
          link: 'ListSchedule',
        },
        {
          imageUrl: 'http://via.placeholder.com/160x160',
          title: 'Patients',
          color: '#5b388c',
          task: false,
          link: 'PatientFavorit',
        },
      ],
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
          <View style={{ marginTop: 10 }}>
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

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInboxLength: (length) =>
      dispatch({
        type: 'SET_INBOX_LENGTH',
        payload: length,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMenu);
