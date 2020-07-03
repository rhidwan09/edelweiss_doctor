import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-navigation';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {ApplicationStyles, Fonts, Colors} from '../themes';
import {EMPTY_USER_IMAGE, Post, Get} from '../services/API';
import {Message, removeItem, getItem} from '../services';

import HeaderStatusbar from '../components/HeaderStatusbar';
import ListItemProfil from '../components/ListItemProfil';
import HeaderStatusbarIOS from '../components/HeaderStatusbarIOS';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    getItem('code').then((res) => {
      Get(`edelweiss.physician/get?filters=[('related_user','=',${res.uid})]`)
        .then((res) => {
          this.setState({data: res.results, loading: false});
        })
        .catch((err) => {
          console.warn('err', err);
        });
    });
  }

  logout() {
    Alert.alert(
      'Keluar dari akun?',
      'session akan dihapus',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => this.handleLogout(),
        },
      ],
      {cancelable: false},
    );
    return true;
  }

  handleLogout() {
    // Post('auth/delete_tokens')
    //   .then((res) => {
    //     console.warn('logout', res.data.desc);
    removeItem('code');
    removeItem('doctor')
      .then(() => {
        //Message(res.desc, 'success');
        this.props.navigation.navigate('Login');
      })
      .catch((err) => {
        console.warn(err);
      });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  render() {
    return (
      <>
        <HeaderStatusbarIOS />
        <SafeAreaView
          style={[
            ApplicationStyles.screen.mainContainer,
            {backgroundColor: Colors.snow},
          ]}>
          <HeaderStatusbar
            barStyle="light-content"
            background={Colors.PRIMARYCOLOR}
          />
          {/* Header */}
          {this.state.loading && (
            <Layout style={{backgroundColor: Colors.PRIMARYCOLOR}}>
              <View
                style={[
                  ApplicationStyles.screen.container,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <SkeletonContent
                  containerStyle={{width: 100}}
                  animationDirection="horizontalLeft"
                  isLoading={this.state.loading}
                  layout={[
                    {
                      key: 'someId',
                      width: 70,
                      height: 70,
                      borderRadius: 100,
                    },
                  ]}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  <SkeletonContent
                    containerStyle={{width: 150, marginBottom: 10}}
                    animationDirection="horizontalLeft"
                    isLoading={this.state.loading}
                    layout={[
                      {
                        key: 'someId',
                        width: 150,
                        height: 20,
                        alignItems: 'flex-end',
                      },
                    ]}
                  />
                  <SkeletonContent
                    containerStyle={{width: 150}}
                    animationDirection="horizontalLeft"
                    isLoading={this.state.loading}
                    layout={[
                      {
                        key: 'someId',
                        width: 150,
                        height: 20,
                        alignItems: 'flex-end',
                      },
                    ]}
                  />
                </View>
              </View>
            </Layout>
          )}
          {!this.state.loading && (
            <Layout style={{backgroundColor: Colors.PRIMARYCOLOR}}>
              <View
                style={[
                  {position: 'relative', height: 70},
                  ApplicationStyles.screen.container,
                ]}>
                <View style={{position: 'absolute', top: 25}}>
                  <View style={style.header}>
                    <View style={{marginRight: 10}}>
                      <FastImage
                        style={style.imageUser}
                        source={{
                          uri: this.state.data[0].photo
                            ? this.state.data[0].photo
                            : EMPTY_USER_IMAGE,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View>
                      <Text
                        style={[Fonts.style.greetingText, {color: '#e2e8f0'}]}
                        numberOfLines={1}>
                        {this.state.data[0].name}
                      </Text>
                      <Text style={[Fonts.style.medium, {color: '#e2e8f0'}]}>
                        {this.state.data[0].speciality[1]}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{flex: 1, alignItems: 'flex-end'}}
                      onPress={() =>
                        this.props.navigation.navigate('EditProfile')
                      }>
                      <Icon
                        style={style.icon}
                        animation="pulse"
                        fill="#e2e8f0"
                        name="edit-2-outline"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Layout>
          )}
          {/* End Header */}
          {/* Data Profile */}
          <View>
            <View style={[ApplicationStyles.screen.container, {marginTop: 40}]}>
              {this.state.data.map((item, index) => {
                return <ListItemProfil data={item} />;
              })}
            </View>
          </View>
          {/* End Data Profile */}
          {/* Data Akun */}
          <View style={ApplicationStyles.screen.container}>
            <Button size="medium" status="danger" onPress={() => this.logout()}>
              LOGOUT
            </Button>
          </View>
          {/* End Data Akun */}
        </SafeAreaView>
      </>
    );
  }
}

const style = StyleSheet.create({
  header: {
    width: 350,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 15,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
  },
  imageUser: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: Colors.snow,
    borderRadius: 100,
    overflow: 'hidden',
  },
  icon: {
    width: 27,
    height: 27,
  },
});

export default Profile;
