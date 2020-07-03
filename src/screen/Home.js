import React, { Component } from 'react';
import { Layout, Text, Divider } from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, ScrollView } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import Moment from 'react-moment';
import 'moment/locale/id';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Pusher from 'pusher-js/react-native';

import CardMenu from '../components/CardMenu';
import HeaderStatusbar from '../components/HeaderStatusbar';
import ArticleList from '../components/ArticleList';

import { EMPTY_USER_IMAGE, Get } from '../services/API';
import { getItem, saveItem } from '../services';
import { ApplicationStyles, Fonts, Colors } from '../themes';
import HeaderStatusbarIOS from '../components/HeaderStatusbarIOS';

export default class Home extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      name: '',
      photo: '',
      taskAppoinment: '',
      loading: true,
      loadingDoc: true,
    };
  }

  componentDidMount() {
    this.getDoctor();
    this.getArticle();
  }

  getDoctor() {
    getItem('code').then((res) => {
      console.warn('res', res);
      Get(`edelweiss.physician/get?filters=[('related_user','=',${res.uid})]`)
        .then((res) => {
          const parsed = res.results;
          saveItem('doctor', parsed).then(() => {
            this.setState({
              loadingDoc: false,
              name: parsed[0].name,
              photo: parsed[0].photo,
            });
          });
        })
        .catch((err) => {
          this.setState({
            loadingDoc: false,
          });
          console.warn('err', err);
        });
    });
  }

  getArticle() {
    Get('edelweiss.web.article/get?limit=5')
      .then((res) => {
        this.setState({ article: res.results, loading: false });
      })
      .catch((err) => {
        this.setState({ article: [], loading: false });
        console.warn('err', err);
      });
  }

  render() {
    const GreetingComponent = (props) => (
      <>
        <HeaderStatusbarIOS />
        <Layout style={{ backgroundColor: Colors.PRIMARYCOLOR }}>
          <View style={ApplicationStyles.screen.container}>
            <View>
              <Text style={[Fonts.style.h2, { color: Colors.snow }]}>
                Dashboard
              </Text>
            </View>
            <View style={style.header}>
              <View style={{ marginRight: 15 }}>
                <FastImage
                  style={style.imageUser}
                  source={{
                    uri:
                      this.state.photo == null
                        ? EMPTY_USER_IMAGE
                        : this.state.photo,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View>
                {!this.state.loadingDoc && (
                  <Text
                    style={[Fonts.style.greetingText, { color: Colors.snow }]}
                    numberOfLines={1}>
                    {this.state.name}
                  </Text>
                )}
                <Moment
                  style={style.dateText}
                  format="dddd, D MMMM"
                  locale="id"
                  element={Text}>
                  {new Date()}
                </Moment>
              </View>
            </View>
          </View>
          <Divider />
        </Layout>
      </>
    );

    return (
      <SafeAreaView
        style={[
          { backgroundColor: 'white' },
          ApplicationStyles.screen.mainContainer,
        ]}>
        <ScrollView bounces={false}>
          <HeaderStatusbar />
          <GreetingComponent />
          <CardMenu {...this.props} />
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
          {!this.state.loading && (
            <View>
              <View style={ApplicationStyles.screen.container}>
                <View style={style.flexRow}>
                  <Text style={Fonts.style.greetingText}> Article </Text>
                  <TouchableOpacity
                    style={{ padding: 6 }}
                    onPress={() =>
                      this.props.navigation.navigate('ListArticle')
                    }>
                    <Text style={[Fonts.style.labelBerita, { color: 'red' }]}>
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ArticleList
                {...this.props}
                article={this.state.article}
                label={false}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  dateText: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: 14,
  },
  card: {
    width: 72,
    resizeMode: 'stretch',
    height: 72,
    borderRadius: 6,
    marginRight: 16,
  },
  cardMenu: {
    borderRadius: 6,
    width: '45%',
    height: 100,
    marginBottom: 20,
    justifyContent: 'flex-end',
    padding: 12,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  imageUser: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: Colors.snow,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
