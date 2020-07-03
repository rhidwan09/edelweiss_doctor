import React, {Component} from 'react';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Button,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-navigation';
import {View, ScrollView, FlatList, Alert, StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '../../themes';
import {EMPTY_USER_IMAGE, Get, Put} from '../../services/API';
import {getItem, saveItem, mothToText, getDayName} from '../../services';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import moment from 'moment';

import AppointmentList from '../../components/AppointmentList';

class ListSchedule extends Component {
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
    this.getSchedule();
  }

  getSchedule() {
    this.setState({
      loading: true,
    });
    getItem('doctor').then((res) => {
      Get('edelweiss.physician.line/get')
        .then((res) => {
          res.results.reduce((r, a) => {
            this.setState({
              data: a.schedule,
              loading: false,
            });
          }, {});
        })
        .catch((err) => {
          console.warn('err', err);
        });
    });
  }

  editSchedule(x, id, state) {
    if (state == true) {
      var status = '';
    } else {
      var status = true;
    }
    let data = {
      id: id,
      aktif: status,
    };
    this.updateLocalSchedule(x, id, state);

    console.warn('data', data);
    Put('edelweiss.physician.line', data)
      .then((res) => {
        console.warn('hasil', res);
      })
      .catch((err) => {
        console.warn('err', err);
      });
  }

  updateLocalSchedule(x, id, state) {
    this.state.data.map((res, i) => {
      res.lines.map((ret, indexLine) => {
        if (ret.id == id) {
          if (state == true) {
            ret.aktif = false;
          } else {
            ret.aktif = true;
          }
        }
      });
    });
    let newArray = [...this.state.data];
    console.warn('newArray', newArray);
    this.setState({data: newArray});
  }

  updateSchedule(x, id, state) {
    Alert.alert(
      'Update Jadwal ?',
      'Jadwal Akan di Non Aktifkan',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => this.editSchedule(x, id, state),
        },
      ],
      {cancelable: false},
    );
    return true;
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
          title="Schedule"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />
        {this.state.loading && (
          <View style={ApplicationStyles.screen.container}>
            <SkeletonContent
              containerStyle={{width: 365}}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingNews}
              layout={[
                {key: 'someId', width: 365, height: 100, marginBottom: 8},
                {key: 'someId', width: 200, height: 20, marginBottom: 8},
                {key: 'someId', width: 165, height: 10, marginBottom: 8},
              ]}
            />
          </View>
        )}
        {!this.state.loading && (
          <View style={ApplicationStyles.screen.container}>
            <FlatList
              refreshing={this.state.loading}
              onRefresh={this.getSchedule.bind(this)}
              key="flatlist"
              data={this.state.data}
              extraData={this.state}
              renderItem={({item, index}) => (
                <Layout style={styles.CardList}>
                  <View style={[styles.CardDate, {width: 100}]}>
                    <Text
                      style={Fonts.style.labelMonthAppoinment}
                      category="s2">
                      {item.name}
                    </Text>
                    <Text style={Fonts.style.labelDateAppoinment} category="h5">
                      {item.day}
                    </Text>
                    <Text
                      style={Fonts.style.labelMonthAppoinment}
                      category="label">
                      {mothToText(item.month)}
                    </Text>
                  </View>
                  <View style={[styles.CardDetail, styles.displaySchedule]}>
                    {item.lines.map((x, index) => {
                      return (
                        <Button
                          style={
                            ([styles.button],
                            {
                              marginRight: 5,
                              marginBottom: 5,
                              borderWidth: 1,
                              borderColor: x.aktif
                                ? Colors.BLUECOLOR
                                : Colors.DISABLEDCOLOR,
                              backgroundColor: x.aktif
                                ? Colors.WHITECOLOR
                                : Colors.DISABLEDCOLOR,
                            })
                          }
                          appearance="outline"
                          size="tiny"
                          onPress={() => {
                            this.updateSchedule(index, x.id, x.aktif);
                            // this.updateSchedule(item.id);
                            //on clicking we are going to open the URL using Linking
                            // Linking.openURL(this.props.data.doctorMeetingUrl);
                          }}>
                          {x.start_time} - {x.end_time}
                        </Button>
                      );
                    })}
                  </View>
                </Layout>
                // <AppointmentList
                //   data={item}
                //   schedule={true}
                //   onPress={() => {
                //     this.updateSchedule(item.id);
                //     //on clicking we are going to open the URL using Linking
                //     // Linking.openURL(this.props.data.doctorMeetingUrl);
                //   }}
                // />
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </SafeAreaView>
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

export default ListSchedule;
