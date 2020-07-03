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
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Linking,
    Alert,
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Modal from 'react-native-modal';

import { ApplicationStyles, Colors, Fonts } from '../../themes';
import { EMPTY_USER_IMAGE, Get, Put } from '../../services/API';
import { getItem, saveItem, PusherConf } from '../../services';

import AppointmentList from '../../components/AppointmentList';
import Empty from '../../components/Empty';

import Pusher from 'pusher-js/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class ListAppointment extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataOnsite: [],
            dataTelehealth: [],
            disableBtn: true,
            loading: true,
            tabs: false,
            type: 'onsite',
            isModalVisible: false,
            favorit: false,
            note: '',
        };
    }

    componentDidMount() {
        var pusher = new Pusher(PusherConf.key, PusherConf.options);
        // console.warn('key', PusherConf.key, '====', 'options', PusherConf.options)
        var chanel = pusher.subscribe('edelweiss');
        let self = this;
        chanel.bind('telehealth-waiting', function (data) {
            self.getTelehealth();
            self.getOnsite();
        });
        chanel.bind('telehealth-consulting', function (data) {
            self.getTelehealth();
            self.getOnsite();
        });
        chanel.bind('telehealth-finished', function (data) {
            self.setState({ isModalVisible: true });
            self.getOnsite();
            self.getTelehealth();
        });

        this.getOnsite();
        this.getTelehealth();
    }

    async OpenMeeting(data) {
        try {
            const url = data;
            if (await InAppBrowser.isAvailable()) {
                console.warn('available');
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,

                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right',
                    },
                });
            } else {
                console.warn('not available');
                Linking.openURL(url);
            }
        } catch (error) { }
    }

    getOnsite() {
        InAppBrowser.close();
        this.setState({
            loading: true,
        });
        Get(
            "edelweiss.encounter?filters=[('encounter_type','=','onsite'),('state','in',['waiting','consulting'])]",
        )
            .then((res) => {
                if (res.hasOwnProperty('results')) {
                    console.warn('resgetOnsite', res)
                    this.setState({
                        dataOnsite: res.results,
                        sumOnsite: res.count,
                        loading: false,
                        tabs: false,
                    });
                } else {
                    this.setState({
                        dataOnsite: [],
                        loading: false,
                        tabs: false,
                    });
                }
                this.setState({
                    loading: false,
                });
            })
            .catch((err) => {
                this.setState({
                    dataOnsite: [],
                    loading: false,
                });
            });
    }

    getTelehealth() {
        InAppBrowser.close();
        this.setState({
            loading: true,
        });
        Get(
            "edelweiss.encounter?filters=[('encounter_type','=','telehealth'),('state','in',['waiting','consulting'])]&order=id desc",
        )
            .then((res) => {
                if (res.hasOwnProperty('results')) {
                    console.warn('resgetTelehealth', res)
                    this.setState({
                        sumTelehealth: res.count,
                        dataTelehealth: res.results,
                        loading: false,
                    });
                } else {
                    this.setState({
                        dataTelehealth: [],
                        loading: false,
                    });
                }
                this.setState({
                    loading: false,
                });
            })
            .catch((err) => {
                this.setState({
                    dataTelehealth: [],
                    loading: false,
                });
            });
    }

    changeState(tipe, status) {
        this.setState({ type: tipe, tabs: status });
    }

    toggleModal(status) {
        this.setState({ isModalVisible: status });
    }

    addFavorit(add) {
        this.setState({ favorit: add });
    }

    handleOnTypingNote(val) {
        if (val.length >= 10) {
            this.setState({ disableBtn: false, note: val });
        } else {
            this.setState({ disableBtn: true, note: val });
        }
    }

    sendNote() {
        let data = {
            id: 36,
            doctor_comments: this.state.note,
            save_favorite: this.state.favorit,
        };

        Put('edelweiss.encounter', data)
            .then((res) => {
                console.warn('response', res);
                this.setState({ isModalVisible: false });
                this.getOnsite();
                this.getTelehealth();
                // let data = res.data;
            })
            .catch((err) => {
                this.setState({ loading: false });
            });

        console.warn('data', data);
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
                    title="Appoinment"
                    // alignment="center"
                    accessoryLeft={BackAction}
                />
                <Divider />

                {/* Modal */}
                <Modal
                    isVisible={this.state.isModalVisible}
                    onSwipeComplete={() => this.setState({ isModalVisible: false })}
                    backdropColor={'rgba(0, 0, 0, 0.5)'}
                    backdropOpacity={1}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    onModalHide={() => this.setState({ note: null })}
                    swipeDirection="down"
                    transparent={true}>
                    <View style={styles.modalContent}>
                        <Text style={[Fonts.style.normal, { marginBottom: 10 }]}>
                            Note Pasien
            </Text>
                        <View
                            style={{
                                borderColor: '#d6d6e2',
                                borderWidth: 1,
                                borderRadius: 4,
                            }}>
                            <TextInput
                                placeholder="Ketik keterangan..."
                                selectionColor={Colors.PRIMARYCOLOR}
                                onChangeText={(val) => this.handleOnTypingNote(val)}
                                style={[styles.textInput]}
                                minLength={10}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                autoFocus={true}
                                multiline={true}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                            <Text style={[Fonts.style.normal]}>Tambahkan Pasien Favorit</Text>
                            {this.state.favorit && (
                                <Button
                                    style={{
                                        backgroundColor: Colors.DISABLEDCOLOR,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                    }}
                                    size="tiny"
                                    onPress={() => {
                                        this.addFavorit(false);
                                    }}>
                                    Add
                                </Button>
                            )}
                            {!this.state.favorit && (
                                <Button
                                    style={{
                                        backgroundColor: Colors.PRIMARYCOLOR,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                    }}
                                    size="tiny"
                                    onPress={() => {
                                        this.addFavorit(true);
                                    }}>
                                    Add
                                </Button>
                            )}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.buttonSend,
                                this.state.disableBtn
                                    ? styles.disabledBtn
                                    : { backgroundColor: Colors.PRIMARYCOLOR },
                                ,
                            ]}
                            onPress={() => {
                                this.sendNote();
                            }}
                            disabled={this.state.disableBtn}>
                            {!this.state.loading && (
                                <Text style={[styles.buttonSendText]}>Kirim</Text>
                            )}

                            {this.state.loading && (
                                <ActivityIndicator size="small" color={'white'} />
                            )}
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* End Modal */}

                {/* Skeleton */}
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
                {/* End Skeleton */}

                {!this.state.loading && (
                    <View style={{ flex: 1 }}>
                        {/* Tabs Filter */}
                        <Layout
                            style={[
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                },
                            ]}>
                            <Button
                                appearance="ghost"
                                status={this.state.tabs ? 'basic' : 'danger'}
                                style={{
                                    width: '50%',
                                    borderBottomColor: this.state.tabs
                                        ? 'white'
                                        : Colors.DANGERCOLOR,
                                }}
                                onPress={() => {
                                    this.changeState('onsite', false);
                                }}>
                                ON SITE ({this.state.sumOnsite ? this.state.sumOnsite : 0})
              </Button>
                            <Button
                                appearance="ghost"
                                status={this.state.tabs ? 'danger' : 'basic'}
                                style={{
                                    width: '50%',
                                    borderBottomColor: this.state.tabs
                                        ? Colors.DANGERCOLOR
                                        : 'white',
                                }}
                                onPress={() => {
                                    this.changeState('telehealth', true);
                                }}>
                                TELEHEALTH (
                {this.state.sumTelehealth ? this.state.sumTelehealth : 0})
              </Button>
                        </Layout>
                        {/* End TAbs Filter */}
                        <View style={{ flex: 1 }}>
                            <View style={[ApplicationStyles.screen.container]}>
                                {/* {this.state.sumOnsite == 0 && (
                  <View style={{flex: 1, alignItems: 'center', borderWidth: 1}}>
                    <Empty
                      // img={require('../../assets/images/empty-and-lost.json')}
                      text="Belum Ada History Konsultasi"
                      size={250}
                    />
                  </View>
                )} */}

                                {/* Data Onsite */}
                                {this.state.tabs == false && (
                                    <FlatList
                                        refreshing={this.state.loading}
                                        onRefresh={this.getOnsite.bind(this)}
                                        extraData={this.state.dataOnsite}
                                        key="flatlist"
                                        data={this.state.dataOnsite}
                                        renderItem={({ item, index }) => (
                                            <AppointmentList
                                                data={item}
                                                schedule={false}
                                            />
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index}
                                    />
                                )}
                                {/* End Data Onsite */}

                                {/* Data Telehealth */}
                                {this.state.tabs == true && (
                                    <FlatList
                                        refreshing={this.state.loading}
                                        onRefresh={this.getTelehealth.bind(this)}
                                        key="flatlist"
                                        extraData={this.state.dataTelehealth}
                                        data={this.state.dataTelehealth}
                                        renderItem={({ item, index }) => (
                                            <AppointmentList
                                                data={item}
                                                schedule={false}
                                                openApp={() =>
                                                    this.OpenMeeting(item.doctorMeetingUrl)
                                                }
                                            />
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index}
                                    />
                                )}
                                {/* End Data Telehealth */}
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    textInput: {
        borderRadius: 4,
        paddingLeft: 10,
        fontFamily: Colors.PRIMARYFONTBOLD,
        height: 100,
        textAlignVertical: 'top',
    },
    buttonSend: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    buttonSendText: {
        color: Colors.SECONDARYCOLOR,
        fontFamily: Colors.PRIMARYFONTBOLD,
        fontSize: 14,
        textAlign: 'center',
    },
    disabledBtn: {
        backgroundColor: '#d8dde3',
    },
});
