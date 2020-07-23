import React, { Component } from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
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
    this.setState({
      loading: true,
    });
    Get('edelweiss.physician.favorite/get')
      .then((res) => {
        res.results.reduce((r, a) => {
          let arrayData = [a.patient]
          console.warn('data', arrayData)
          this.setState({
            data: arrayData,
            loading: false,
          });
        }, {});
      })
      .catch((err) => {
        console.warn('err', err);
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
          title="Pasien Favorit"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />

        {this.state.data.length == 0 && (
          <View style={{ flex: 1, alignItems: 'center' }} >
            <Empty
              // img={require('../../assets/images/empty-and-lost.json')}
              text="Tidak ada Pasien Favorit saat ini"
              size={20}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={[ApplicationStyles.screen.container]}>
            <FlatList
              refreshing={this.state.loading}
              onRefresh={this.getPatient.bind(this)}
              extraData={this.state.data}
              key="flatlist"
              data={this.state.data}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity>
                    <Layout style={[{ padding: 10 }, styles.CardList]}>
                      <View style={{ marginRight: 10 }}>
                        <FastImage
                          style={styles.imageUser}
                          source={{
                            uri: item.photo
                              ? item.photo
                              : EMPTY_USER_IMAGE,
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                      <View>
                        <View>
                          <Text style={Fonts.style.labelMonthAppoinment} category="h6">{item.name}</Text>
                        </View>
                        <View>
                          <Text style={Fonts.style.labelMonthAppoinment} category="label">{item.phone}</Text>
                        </View>
                        <View>
                          <Text style={Fonts.style.labelMonthAppoinment} category="label">{item.email}</Text>
                        </View>
                        <View>
                          <Text style={Fonts.style.labelMonthAppoinment} category="label">{item.general_info}</Text>
                        </View>
                      </View>
                    </Layout>
                  </TouchableOpacity>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  CardList: {
    flex: 1,
    flexDirection: 'row',
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
  imageUser: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: Colors.BLUECOLOR,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
