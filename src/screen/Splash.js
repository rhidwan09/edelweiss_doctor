import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Animated } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { getItem } from '../services';
import { Get } from '../services/API';

import { Colors } from '../themes';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.8);

    this.state = {};
  }

  componentDidMount() {
    this.welcomeAnimate();

    getItem('code')
      .then((res) => {
        Get(`edelweiss.physician?filters=[('related_user','=',${res.uid})]`)
          .then((res) => {
            if (res.hasOwnProperty('results')) {
              setTimeout(() => {
                this.props.navigation.navigate('Home');
              }, 1000);
            } else {
              setTimeout(() => {
                this.props.navigation.navigate('Login');
              }, 1000);
            }
          })
          .catch((err) => {
            console.warn('err', err);
          });
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 1000);
      });
  }

  welcomeAnimate() {
    this.springValue.setValue(0.8);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 0.5,
    }).start();
  }

  render() {
    return (
      <Layout
        style={{
          flex: 1,
        }}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  scale: this.springValue,
                },
              ],
            },
          ]}>
          <View style={styles.logoContainer}>
            <View>
              <Text style={styles.textLogo} category="h5">
                Edelweiss
              </Text>
            </View>
            <View>
              <Text
                style={[styles.textLogo, { fontStyle: 'italic' }]}
                category="s1">
                For
              </Text>
            </View>
            <View>
              <Text style={[styles.textLogo]} category="h6">
                Doctor
              </Text>
            </View>
          </View>
        </Animated.View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    //backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  textLogo: {
    color: Colors.DARKCOLOR,
    lineHeight: 40,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
