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

import ArticleList from '../../components/ArticleList';

class ListArticle extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.getArticle();
  }

  getArticle() {
    Get('edelweiss.web.article/get')
      .then((res) => {
        this.setState({ article: res.results, loading: false });
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
          title="List Article"
          // alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />
        <Layout>
          {this.state.loading && (
            <View style={ApplicationStyles.screen.container}>
              <SkeletonContent
                containerStyle={{ width: 365 }}
                animationDirection="horizontalLeft"
                isLoading={this.state.loading}
                layout={[
                  { key: 'someId', width: 365, height: 100, marginBottom: 12 },
                ]}
              />
            </View>
          )}
          {!this.state.loading && (
            <ScrollView bounces={false}>
              <ArticleList {...this.props} article={this.state.article} />
            </ScrollView>
          )}
        </Layout>
      </SafeAreaView>
    );
  }
}

export default ListArticle;
