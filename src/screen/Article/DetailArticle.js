import React, { Component } from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
  Button,
  Text
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-navigation';
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import HTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import 'moment/locale/id';

import { ApplicationStyles, Colors, Fonts } from '../../themes';
import { Get } from '../../services/API';

export default class DetailArticle extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.dataArtikel = this.props.navigation.getParam('data');
  }

  // componentWillMount() {
  //   this.getArticle();
  // }

  // getArticle() {
  //   Get(`edelweiss.web.article/get?filters=[('id','=',${this.dataArtikel.id})]`)
  //     .then((res) => {
  //       this.setState({ article: res.results, loading: false });
  //     })
  //     .catch((err) => {
  //       console.warn('err', err);
  //     });
  // }

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
          title="Detail Article"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />
        <Layout style={{ flex: 1 }}>
          <ScrollView>
            <FastImage
              source={{
                // uri: IMAGE_URL + 'news/' + this.props.data.image,
                uri:
                  this.dataArtikel.photo == null
                    ? 'https://picsum.photos/200/200'
                    : this.dataArtikel.photo,
              }}
              style={{
                width: '100%',
                height: 250,
              }}
              // defaultSource={}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Layout
              style={{
                paddingTop: 16,
                paddingHorizontal: 16,
                paddingBottom: 24,
              }}>
              <Text category="h5">{this.dataArtikel.name}</Text>
            </Layout>

            <Layout
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingBottom: 32,
              }}>
              <HTML
                html={this.dataArtikel.content}
                tagsStyles={{
                  p: {
                    lineHeight: 28,
                    // paddingVertical: 3,
                    marginBottom: 10,
                  },
                }}
                //   ignoredTags={['p']}
                ignoredStyles={[
                  'font-family',
                  'font-weight',
                  'line-height',
                  'border-style',
                ]}
                imagesMaxWidth={Dimensions.get('window').width}
              />
            </Layout>
            <Layout
              style={{
                paddingHorizontal: 16,
                paddingBottom: 24,
              }}>
              <Text category="s1">
                Publish berita {moment(this.dataArtikel.create_date).fromNow()}
              </Text>
            </Layout>
          </ScrollView>

        </Layout>
      </SafeAreaView>
    );
  }
}
