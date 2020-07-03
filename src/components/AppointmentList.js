import React, { Component } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { View, StyleSheet, Linking, Alert, FlatList } from 'react-native';
import { Fonts, Colors } from '../themes';
import { mothToText, getDayName, getItem } from '../services';
import { Put } from '../services/API';

import InAppBrowser from 'react-native-inappbrowser-reborn';

import moment from 'moment';

import MyButton from './Button';
import { color } from 'react-native-reanimated';

class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      month: '',
      day: '',
    };
  }

  componentDidMount() {
    const convMonth = moment(this.props.data.appointment_date).format('MM');
    const convDay = moment(this.props.data.appointment_date).format('d');
    const scheduleMonth = mothToText(this.props.data.month);
    const month = mothToText(convMonth);
    const day = getDayName(convDay);
    this.setState({ month: month, scheduleMonth: scheduleMonth });
  }

  updateMeeting() {
    let data = {
      id: this.props.data.id,
      meetingStarted: true,
    };
    Put('edelweiss.encounter', data)
      .then((res) => {
        console.warn('hasil', res);
      })
      .catch((err) => {
        console.warn('err', err);
      });
  }

  editSchedule(id, aktif) {
    let data = {
      id: id,
      aktif: '',
    };
    Put('edelweiss.physician.line', data)
      .then((res) => {
        console.warn('hasil', data);
      })
      .catch((err) => {
        console.warn('err', err);
      });
  }

  updateSchedule(id, aktif) {
    Alert.alert(
      'Non Aktifkan Jadwal ?',
      'Jadwal Akan di Non Aktifkan',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => this.editSchedule(id, aktif),
        },
      ],
      { cancelable: false },
    );
    return true;
  }

  render() {
    return (
      <View>
        {!this.props.schedule && (
          <Layout style={[{ alignItems: 'center' }, styles.CardList]}>
            <View style={styles.CardDate}>
              <Text style={Fonts.style.labelDateAppoinment}>
                {moment(this.props.data.encounter_date).format('DD')}
              </Text>
              <Text style={Fonts.style.labelMonthAppoinment}>
                {this.state.month}
              </Text>
            </View>
            <View style={styles.CardDetail}>
              <Text style={Fonts.style.h6} category="s1">
                {this.props.data.patient[1]}
              </Text>
              <Text style={{ color: Colors.DARK100 }} category="s2">
                {this.props.data.comments}
              </Text>
              <Text
                style={[{ marginTop: 5, color: Colors.DARK100 }]}
                category="p2"
                appearance="hint">
                {moment(this.props.data.encounter_dt).format('dddd')} -{' '}
                {moment(this.props.data.encounter_date).format('HH:mm')}
              </Text>
              <Text style={[{ color: Colors.DARK100 }]} category="p1">
                {this.props.data.poli[1]}
              </Text>
            </View>
            {/* {this.props.data.doctorMeetingUrl && ( */}
            <View
              style={{
                padding: 10,
              }}>
              {this.props.data.state == 'consulting' && (
                <Button
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        this.props.data.state == 'consulting'
                          ? Colors.BLUECOLOR
                          : this.props.data.state == 'finished'
                            ? Colors.DISABLEDCOLOR
                            : Colors.GREENCOLOR,
                    },
                  ]}
                  size="tiny"
                  onPress={() => {
                    this.updateMeeting();
                    this.props.openApp();
                    //on clicking we are going to open the URL using Linking
                    // Linking.openURL(this.props.data.doctorMeetingUrl);
                  }}>
                  Mulai
                </Button>
              )}
              {this.props.data.state != 'consulting' && (
                <Button
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        this.props.data.state == 'finished'
                          ? Colors.MAGENTACOLOR
                          : Colors.GREENCOLOR,
                    },
                  ]}
                  size="tiny"
                  onPress={() => {
                    // this.updateMeeting();
                    //on clicking we are going to open the URL using Linking
                    // Linking.openURL(this.props.data.doctorMeetingUrl);
                  }}>
                  {this.props.data.state}
                </Button>
              )}
            </View>
            {/* )} */}
          </Layout>
        )}
        {this.props.schedule && (
          <Layout style={styles.CardList}>
            <View style={[styles.CardDate, { width: 100 }]}>
              <Text style={Fonts.style.labelMonthAppoinment} category="s2">
                {this.props.data.name}
              </Text>
              <Text style={Fonts.style.labelDateAppoinment} category="h5">
                {this.props.data.day}
              </Text>
              <Text style={Fonts.style.labelMonthAppoinment} category="label">
                {this.state.scheduleMonth}
              </Text>
            </View>
            <View style={[styles.CardDetail, styles.displaySchedule]}>
              {this.props.data.lines.map((item, index) => {
                return (
                  <Button
                    style={([styles.button], { marginRight: 5, marginBottom: 5 })}
                    appearance="outline"
                    size="tiny"
                    onPress={() => {
                      this.updateSchedule(item.id, false);
                      //on clicking we are going to open the URL using Linking
                      // Linking.openURL(this.props.data.doctorMeetingUrl);
                    }}>
                    {item.start_time} - {item.end_time}
                  </Button>
                );
              })}
            </View>
          </Layout>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CardList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  CardDate: {
    width: 70,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDetail: {
    flex: 1,
    paddingVertical: 10,
  },
  displaySchedule: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
});

export default AppointmentList;
