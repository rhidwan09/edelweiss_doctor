import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import CardArticle from './CardArticle';

import { ApplicationStyles, Fonts } from '../themes';

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getarticle: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    if (this.props.article) {
      this.setState({
        loadingNews: false,
      });
    }
  }

  render() {
    const { article, navigation, label } = this.props;
    return (
      <Layout>
        {this.state.loadingNews && (
          <View style={ApplicationStyles.screen.container}>
            <SkeletonContent
              containerStyle={{ width: 365 }}
              animationDirection="horizontalLeft"
              isLoading={this.state.loadingNews}
              layout={[
                { key: 'someId', width: 365, height: 100, marginBottom: 12 },
              ]}
            />
          </View>
        )}
        <Layout>
          {!this.state.loadingNews && (
            <View style={ApplicationStyles.screen.container}>
              <View>
                {article.map((item, index) => {
                  return (
                    <CardArticle
                      data={item}
                      navigation={this.props.navigation}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </Layout>
      </Layout>
    );
  }
}
