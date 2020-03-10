import React, { Component } from 'react';
import {
    Image, View, StyleSheet, Text, Platform, Alert, TouchableOpacity, ScrollView, TextInput, FlatList,
} from 'react-native';

import Utils from '../../app/Utils';
import { Images } from '../../images/index';
import HeaderCom from '../../components/HeaderCom';
import ButtonCom from '../../components/Button/ButtonCom';
import DatePick from '../../components/DatePick';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { RootLang } from '../../app/data/locales';
import DatePickList from '../../components/DatePickList';
import { ROOTGlobal } from '../../app/data/dataGlobal';
import RootScreen from '../RootScreen';
import API from '../../apis';
import { colors, sizes, nstyles } from '../../styles';
import styles from './styles';
import ListEmpty from '../../components/ListEmpty'
import Input from '../../components/Input';
import { WebView } from 'react-native-webview';

export default class FAQItemMenu extends Component {
    constructor(props) {
        super(props);
        paddinggeneral = 22;
        this.pageTitle = Utils.ngetParam(this, 'pageTitle');
        this.slug = Utils.ngetParam(this, 'slug');
        this.email = null;
        this.state = {
            data: [],
            indexSelect: null
        }
        // let date = new Date();
    }
    _contactUS = () => {
        Utils.goscreen(this, 'sc_FAQContact');
    }

    componentDidMount() {
        this._getVT_ContentFAQ()
    }
    _getVT_ContentFAQ = async () => {
        let res = await API.Content.VT_ContentFAQ(this.slug);
        Utils.nlog(res)
        if (res.data.length > 0 && res.status == 1)
            this.setState({ data: res.data });
        Utils.nlog(res)
    }
    _renderItem = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => this._selectItem(item)}
                style={[nstyles.nstyles.nrow, { paddingVertical: 12, alignItems: 'center', backgroundColor: this.state.indexSelect == item.idFAQ ? 'rgba(79, 128 ,255,0.1)' : 'white', paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: colors.colorSapphireTwo }]}>
                <Image source={Images.icShowLessDown} style={[nstyles.nstyles.nIcon8, { tintColor: colors.colorSapphireTwo, transform: [{ rotate: '-90deg' }] }]} resizeMode='contain' />
                <Text style={[styles.text, { marginLeft: 10, color: colors.colorSapphireTwo }]}>{item.question}</Text>
            </TouchableOpacity>
        )
    }
    _selectItem = (item, index) => {
        Utils.goscreen(this, 'sc_FAQItemDetailQuestion', { item })
        this.setState({ indexSelect: item.idFAQ })
    }

    _handleOnChangeText = (txt) => {
        this.email = txt;
    }
    _handleSubscribe = async () => {
        if (this.email != null) {
            const res = await API.User.VT_CusAccounts_SubscribeEmail(this.email);
            if (res.status == 1)
                Utils.showMsgBoxOK(this, RootLang.lang.notification, res.error.message, RootLang.lang.ok);
            Utils.nlog('register', res)
        } else Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.emailcannotempty, RootLang.lang.ok);
    }
    render() {
        const menugr = false;

        return (
            // ncontainerX support iPhoneX, ncontainer + nfooter mới sp iphoneX 
            <View style={nstyles.nstyles.ncontainer}>
                {/* Header  */}
                <HeaderCom iconLeft={Images.icBackWhite}  nthis={this} />
                {/* BODY */}
                <View style={nstyles.nstyles.nbody}>
                    <ScrollView>
                        <Image source={Images.hotel} style={{ width: nstyles.Width(100), height: nstyles.Height(20) }} resizeMode='cover' />
                        <View style={{ flex: 1, paddingHorizontal: paddinggeneral }}>
                            <View style={[nstyles.nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, }]}>
                                <Text style={[styles.title, { fontWeight: "500" }]}>{RootLang.lang.wereheretohelp}.</Text>
                                <Text style={[styles.text2, { color: 'black' }]}>{RootLang.lang.browsehelptopics}</Text>
                            </View>
                            <View style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: colors.brownishGrey, borderTopColor: colors.brownishGrey, borderTopWidth: 0.5 }}>
                                <View style={{ marginHorizontal: 60 }}>
                                    <Text style={{ fontSize: sizes.sText12, fontWeight: '600', textAlign: 'center' }}>{RootLang.lang.find24assistanceonsocical}</Text>
                                    <View style={[nstyles.nstyles.nrow, { marginTop: 15, justifyContent: 'space-between' }]}>
                                        <TouchableOpacity>
                                            <Image source={Images.btnFacebook} style={{ width: sizes.sizes.nImgSize90, height: sizes.sizes.nImgSize28, }} resizeMode='contain' />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Image source={Images.btnTwitter} style={{ width: sizes.sizes.nImgSize75, height: sizes.sizes.nImgSize28 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <ButtonCom
                                onPress={() => this._contactUS()}
                                text={'Contact Us'} style={{ marginTop: nstyles.Height(3) }} />

                            <Text style={[styles.title, { color: colors.softBlue, marginTop: 15 }]}>{this.pageTitle}</Text>
                            <FlatList
                                ListEmptyComponent={<ListEmpty textempty={'No Question'} />}
                                data={this.state.data}
                                style={{ paddingVertical: 10 }}
                                renderItem={({ item, index }) => this._renderItem(item, index)}
                                keyExtractor={(item, index) => item.idFAQ.toString()}
                            />

                        </View>
                        <Image source={Images.hotel} style={{ width: nstyles.Width(100), height: nstyles.Height(20), marginTop: 10 }} resizeMode='cover' />
                        <View style={{ paddingHorizontal: paddinggeneral }}>
                            <Text style={[styles.title, { fontWeight: "normal", marginTop: 10 }]}>Save time and save money</Text>
                            <Text style={[styles.text2, { color: 'black', fontWeight: "300", marginTop: 10 }]}>Sed non mauris vitae erat consequat auctor eu in elit</Text>
                            <Input
                                customStyle={[styles.title, { fontWeight: '300', borderColor: colors.softBlue }]}
                                placeholder={RootLang.lang.email}
                                onChange={text => this._handleOnChangeText(text)}
                            />

                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: paddinggeneral }}>
                            <ButtonCom
                                onPress={() => this._handleSubscribe()}
                                text={RootLang.lang.Subscribe}
                                style={{ marginTop: nstyles.Height(3), backgroundColor: colors.softBlue, paddingHorizontal: 40, marginBottom: 20 }} />
                        </View>

                    </ScrollView>




                </View>
                {/* <ScrollView> */}
                {/* <FlatList
                        data={data}
                        style={{ paddingVertical: 10 }}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        keyExtractor={(item, index) => item.idFAQ.toString()}
                    /> */}



                {/* </ScrollView> */}

            </View >
        );
    }

}
