import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { EMPTY_IMAGE } from '../services/helpers';
import { EMPTY_USER_IMAGE } from '../services/API';
import { Fonts } from '../themes';

export default class CardArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingNews: true,
    };
  }

  render() {
    return (
      <Layout>
        <View
          style={{
            paddingHorizontal: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: '#E8E9ED',
            paddingVertical: 12,
          }}>
          <TouchableOpacity
            key={this.props.data.id}
            style={styles.itemList}
            onPress={() =>
              this.props.navigation.navigate('DetailArticle', {
                data: this.props.data
              })
            }>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={2} style={Fonts.style.articleSubTitle}>
                {this.props.data.name}
              </Text>
            </View>

            <FastImage
              style={styles.image}
              source={{
                uri:
                  this.props.data.photo == null
                    ? EMPTY_USER_IMAGE
                    : this.props.data.photo,
              }}
              defaultSource={EMPTY_IMAGE}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  itemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    resizeMode: 'cover',
  },
});
