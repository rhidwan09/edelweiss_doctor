import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  Input,
  Icon,
} from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

// Service
import {PostLogin} from '../services/API';
import {saveItem, Message} from '../services';

// Action
import {setIsLoggedIn} from '../actions/auth/authActions';

// Theme
import {ApplicationStyles, Fonts, Colors} from '../themes';

// Components
import Button from '../components/Button';
import Loading from '../components/Loading';

class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
      loadingPost: false,
    };
  }

  // componentDidMount() {
  //   this.props.navigation.navigate('Home');
  // }

  login = () => {
    let data = {
      username: this.state.email,
      password: this.state.password,
      db: 'edelweis',
    };
    this.setState({loadingPost: true});
    PostLogin('auth/get_tokens', data)
      .then((res) => {
        console.warn('login', res);
        if (res.data.hasOwnProperty('uid')) {
          Message(null, 'Selamat datang di RS Edelweiss 😊', 'info');
          saveItem('code', {...res.data, passed: true}).then(() => {
            this.props.setIsloggedId(true);
            this.props.navigation.navigate('Home');
          });
          this.setState({loadingPost: false});
        } else {
          Message('Opps!', 'Email atau password Anda salah', 'danger');
          this.props.navigation.navigate('Login');
          this.setState({loadingPost: false});
        }
      })
      .catch((err) => {
        if (err.hasOwnProperty('data')) {
          Message('Opps!', 'Email atau password Anda salah', 'danger');
        }
        this.setState({loadingPost: false});
      });
  };

  render() {
    const {secureTextEntry, loadingPost} = this.state;

    const onIconPress = () => {
      this.setState({secureTextEntry: !this.state.secureTextEntry});
    };

    const renderIconEye = (style) => (
      <TouchableWithoutFeedback onPress={onIconPress}>
        <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    );

    const image = require('../../assets/images/logo/01-Primary-logo.png');

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ApplicationProvider {...eva} theme={eva.light}>
          {loadingPost && <Loading label="Mohon tunggu ..." />}
          <Layout
            style={
              (ApplicationStyles.screen.container,
              {
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                padding: 30,
              })
            }>
            <View
              style={{
                width: 250,
                height: 80,
              }}>
              {/* <Image style={{width: 120, height: 70}} source={image} /> */}
              <FastImage
                style={{width: '100%', height: 70}}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[Fonts.style.normal, {textAlign: 'right'}]}>
                For Doctor
              </Text>
            </View>
            <Layout style={{width: '100%'}}>
              <Layout>
                <Input
                  size="large"
                  placeholder="Masukan Email"
                  value={this.state.email}
                  onChangeText={(val) => this.setState({email: val})}
                  labelStyle={Fonts.style.label}
                  keyboardType="email-address"
                  autoCapitalize={false}
                  returnKeyType="next"
                />
              </Layout>
              <Layout style={{marginTop: 5}}>
                <Input
                  size="large"
                  placeholder="Masukan Password"
                  value={this.state.password}
                  onChangeText={(val) => this.setState({password: val})}
                  accessoryRight={renderIconEye}
                  secureTextEntry={secureTextEntry}
                  labelStyle={styles.label}
                  returnKeyType="done"
                  onIconPress={onIconPress}
                />
              </Layout>
              <Layout>
                <Button
                  disabled={
                    this.state.email.length > 4 &&
                    this.state.password.length > 3
                      ? false
                      : true
                  }
                  label="Masuk"
                  onPress={() => this.login()}
                />
              </Layout>
            </Layout>
          </Layout>
        </ApplicationProvider>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsloggedId: (status) => dispatch(setIsLoggedIn(status)),
  };
};

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  imageUser: {
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARYCOLOR,
  },
  headerText: {
    fontSize: Fonts.size.h5,
    color: Colors.snow,
    fontWeight: Fonts.Weight.medium,
  },
  label: {color: Colors.DARK100, fontWeight: '700', marginBottom: 8},
});
