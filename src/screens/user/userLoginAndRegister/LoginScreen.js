import React, { Component } from 'react';
import {
    Image, View, StyleSheet, Text,
    Alert, TouchableOpacity, KeyboardAvoidingView, TextInput,
    ScrollView, Platform
} from 'react-native';

import { nstyles, nwidth, stUser } from '../../../styles/styles';
import Utils from '../../../app/Utils';
import { Images } from '../../../images/index';
import { sizes } from '../../../styles/size';
import { colors } from '../../../styles/color';
import ButtonCom from '../../../components/Button/ButtonCom';
import apis from "../../../apis";
import { nkey } from '../../../app/keys/keyStore';
import { nGlobalKeys } from '../../../app/keys/globalKey';
import { RootLang } from '../../../app/data/locales';
import { onCheckLogin, VT_CusAccounts_ForgetPass } from '../../../apis/users';
import ReCaptchaView from '../../../components/ReCaptchaView';
import { appConfig } from '../../../app/Config';
import HeaderCom from '../../../components/HeaderCom';
import IsLoading from '../../../components/IsLoading';
import LoginWithFacebookGoogle from './LoginWithFacebookGoogle';

const LOGIN_BY_EMAIL = 1, LOGIN_BY_PHONE = 2, LOGIN_BY_SOCIAL_NETWORK = 3;

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        // RootLang.lang = Utils.getGlobal(nGlobalKeys.lang, {});
        nthis = this;
        this.state = {
            //data globle
            isLoading: false,
            //-data local

            // 0: Email, 1: SDT
            //isTabLoginByPhone: 0,
            showForgetPassword: false,

            // login Account

            loginPhoneNumber: '',
            loginPasswordPhone: '',

            // phoneCode
            dataSearch: '+84',
            img: ''
        }
        this.CaptchaCode = '';
        this.loginEmail = '';
        this.loginPassword = '';
    }

    // Hàm Reset mật khẩu.
    onForgotPassword = async () => {
        if (this.loginEmail == '') {
            Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.PleaseEnterYourEmail);
            return;
        }
        this.waitting.show();
        let res = await VT_CusAccounts_ForgetPass(this.loginEmail);
        this.waitting.hide();

        let title = RootLang.lang.fail;
        let { error = {} } = res;
        if (res.status == 1) {
            title = RootLang.lang.success;
        } else if (res.status == 0) {
            title = RootLang.lang.fail;
        }
        // thành công hay thất bại đều trả thông báo về error.message
        Utils.showMsgBoxOK(this, title, error.message);
    }

    onLogin = async () => {
        // var { isTabLoginByPhone } = this.state
        // if (isTabLoginByPhone == 0) {
        // if (this.CaptchaCode == '') {

        //     Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.pleaseSelectTheCaptchaCode);
        //     return;
        // }
        if (this.loginEmail == '') {
            Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.PleaseEnterYourEmail);
            return;
        }
        // email hợp lệ d@a.c
        if (!Utils.validateEmail(this.loginEmail)) {
            Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.emailIncorrect);
            return;
        }
        if (this.loginPassword == '') {
            Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.PleaseEnterYourPassword);
            return;
        }
        this.waitting.show();
        let isLogin = await onCheckLogin(this, LOGIN_BY_EMAIL, this.loginEmail, this.loginPassword, 'password');

        this.waitting.hide();
        if (isLogin) {
            this.setState({
                loginEmail: '',
                loginPassword: ''
            });
        }

        // CODE LOGIN BY PHONE KHONG DUOC XOA

        // let strBody = {
        //     'Username': this.state.loginEmail,
        //     'Password': this.state.loginPassword,
        //     'grant_type': 'password'
        // };

        // var res = await apis.User.loginByOuthToken(strBody, LOGIN_BY_EMAIL);
        // Utils.nlog('login Email', res);
        // if (res.error_description == undefined) {
        //     Utils.showMsgBoxOK(this, RootLang.lang.notification, 'Login successful !', 'OK', () => Utils.goscreen(this, 'sc_Hotels'));
        //     await Utils.nsetStore(nkey.token, res.access_token);
        //     this.setState({
        //         loginEmail: '',
        //         loginPassword: '',
        //     })
        // } else {
        //     Utils.showMsgBoxOK(this, RootLang.lang.notification, 'Password is not correct or Email is not exist');
        // }


        // } else {
        //     if (this.state.loginPhoneNumber.length < 9) {
        //         Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.PleaseEnterYourPhone, RootLang.lang.ok, () => this.setState({ loginPhoneNumber: '' }));
        //         return;
        //     }
        //     if (this.state.loginPasswordPhone == '') {
        //         Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.PleaseEnterYourPassword);
        //         return;
        //     }

        //     let phoneNumber = this.state.dataSearch + this.state.loginPhoneNumber
        //     let strBody = {
        //         'username': phoneNumber,
        //         'Password': this.state.loginPasswordPhone,
        //         'grant_type': 'password'
        //     };
        //     let result = await apis.User.loginByOuthToken(strBody, LOGIN_BY_PHONE);
        //     if (result.error == undefined) {
        //         Utils.nlog('[API][login] success');
        //         // access_token
        //         await Utils.nsetStore(nkey.token, result.access_token);
        //         Utils.showMsgBoxOK(this,
        //             RootLang.lang.notification,
        //             RootLang.lang.LoginSuccesful,
        //             RootLang.lang.ok,
        //             Utils.goback());
        //     } else {
        //         Utils.nlog('[API][login] fail');
        //         Utils.showMsgBoxOK(this, RootLang.lang.notification, result.error_description);
        //     }
        // }
    }

    render() {
        var { showForgetPassword } = this.state;

        var tabLoginByEmail = (
            <View style={nstyles.ncol}>
                <View style={[stUser.containerInput, { marginTop: 35 }]}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={stUser.txtInput}
                        returnKeyType={"next"}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        placeholderTextColor={colors.dark_30}
                        placeholder={RootLang.lang.enteryourEmail}
                        onChangeText={(text) => this.loginEmail = text}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                </View>
                <View style={[stUser.containerInput, { marginTop: 12 }]}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        value={this.state.loginPassword}
                        style={stUser.txtInput}
                        returnKeyType={"done"}
                        autoCorrect={false}
                        placeholderTextColor={colors.dark_30}
                        placeholder={RootLang.lang.password}
                        onChangeText={(text) => this.loginPassword = text}
                        ref={(input) => { this.secondTextInput = input; }}
                        secureTextEntry={true}
                    />
                </View>
            </View>
        );

        // var tabLoginByPhone = (
        //     <View style={nstyles.ncol}>
        //         <Text style={stUser.labelTitle}>
        //             {RootLang.lang.phoneNumber}:</Text>
        //         <View style={[stUser.containerInput, nstyles.nrow, { alignItems: 'center' }]}>
        //             <TouchableOpacity style={[nstyles.nrow, { paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: colors.black }]}
        //                 onPress={() => Utils.goscreen(this, 'Modal_SelectCountry', { setdataSearch: (data) => this.setState({ dataSearch: data.phoneCode, img: data.flag }), isVisiblePhoneCode: false })}>
        //                 <Image source={this.state.img == '' ? require('../../images/country/vn.png') : this.state.img} style={{ width: sizes.nImgSize16, height: sizes.nImgSize16 }} resizeMode="contain" />
        //                 <Text style={{ paddingHorizontal: 5 }}>{Utils.formatPhoneCode(this.state.dataSearch)} </Text>
        //                 <Image source={Images.icDropDown} style={{ width: sizes.nImgSize16, height: sizes.nImgSize16 }} resizeMode="contain" />
        //             </TouchableOpacity>
        //             <TextInput
        //                 underlineColorAndroid='transparent' value={this.state.loginPhoneNumber} style={{ padding: 10 }}
        //                 returnKeyType={"next"} autoCorrect={false} placeholderTextColor={colors.colorGrayText}
        //                 placeholder={RootLang.lang.enteryourPhone} onChangeText={(text) => this.setState({ loginPhoneNumber: text })}
        //                 keyboardType="numeric" onSubmitEditing={() => { this.secondTextInput.focus(); }}
        //             />
        //         </View>

        //         <Text style={stUser.labelTitle}>{RootLang.lang.password}:</Text>
        //         <View style={stUser.containerInput}>
        //             <TextInput
        //                 underlineColorAndroid='transparent' value={this.state.loginPasswordPhone} style={{ padding: 10 }}
        //                 returnKeyType={"done"} autoCorrect={false} placeholderTextColor={colors.colorGrayText}
        //                 placeholder={RootLang.lang.enteryourPass} onChangeText={(text) => this.setState({ loginPasswordPhone: text })}
        //                 ref={(input) => { this.secondTextInput = input; }} secureTextEntry={true}
        //             />
        //         </View>
        //     </View>
        // )

        let viewForgetPassword = (
            <View style={nstyles.ncol}>
                {/* <Text style={stUser.labelTitle}>
                    {RootLang.lang.yourEmail}
                </Text> */}
                <View style={stUser.containerInput}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={stUser.txtInput}
                        returnKeyType={"next"}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        placeholder={RootLang.lang.yourEmail}
                        onChangeText={(text) => this.loginEmail = text}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ padding: 20 }}
                    onPress={() => {
                        this.loginEmail = '';
                        this.setState({ showForgetPassword: false })
                    }}>
                    <Text style={stUser.txtForgot}>{RootLang.lang.back}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    <ButtonCom
                        shadow={false}
                        Linear={true}
                        text={RootLang.lang.submit}
                        style={{
                            backgroundColor: colors.softBlue, fontSize: sizes.sText17,
                            borderRadius: 6
                        }}
                        onPress={this.onForgotPassword}
                    />
                </View>
            </View>
        )
        return (
            <View style={nstyles.ncontainer}>
                {/* Header  */}
                <HeaderCom
                    iconLeft={Images.icbackspace}
                    tintColorLeft={colors.white}
                    iconRight={Images.icbaselineNotificationsNone24Px}
                    notification={12}
                    titleText={RootLang.lang.singin} />
                <KeyboardAvoidingView
                    style={[nstyles.nbody]}
                    behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                    <ScrollView style={[nstyles.nbody, { backgroundColor: colors.white, paddingHorizontal: 13 }]}>
                        {/* <View style={[nstyles.nrow, { marginTop: 15 }]}>
                        <TouchableOpacity
                            style={[stUser.containerTab, nstyles.nrow, stUser.containerTabSignIn,
                            { borderBottomColor: isTabLoginByPhone == 0 ? colors.softBlue : colors.white }]}
                            onPress={() => this.setState({ isTabLoginByPhone: 0 })}>
                            <Image
                                style={[sizes.nImgSize16, { marginRight: 10 }]}
                                source={isTabLoginByPhone == 0 ? Images.icEmail : Images.icEmailGrey}
                                resizeMode="contain" />
                            <Text style={[stUser.txtTab, { color: isTabLoginByPhone == 0 ? colors.softBlue : colors.grey }]}>
                                {'EMAIL'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[stUser.containerTab, nstyles.nrow, stUser.containerTabSignIn, { borderBottomColor: isTabLoginByPhone == 1 ? colors.softBlue : colors.white }]}
                            onPress={() => this.setState({ isTabLoginByPhone: 1 })}>
                            <Image
                                style={[sizes.nImgSize16, { marginRight: 10 }]}
                                source={isTabLoginByPhone == 1 ? Images.icPhone : Images.icPhoneGrey}
                                resizeMode="contain" />
                            <Text style={[stUser.txtTab, { color: isTabLoginByPhone == 1 ? colors.softBlue : colors.grey }]}>
                                {RootLang.lang.phone}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                        {showForgetPassword == true ? viewForgetPassword :
                            <View style={nstyles.nbody}>
                                {/* {isTabLoginByPhone == 0 ? tabLoginByEmail : tabLoginByPhone} */}
                                {tabLoginByEmail}
                                <TouchableOpacity activeOpacity={0.5}
                                    style={{ margin: 16 }}
                                    onPress={() => {
                                        this.loginEmail = '';
                                        this.setState({ showForgetPassword: true });
                                    }}>
                                    <Text style={stUser.txtForgot}>{RootLang.lang.forgotYourPass}?</Text>
                                </TouchableOpacity>
                                {/* <View style={{ marginTop: 32 }}>
                                    <ReCaptchaView
                                        defaultHeight={100}
                                        siteKey="6LeVKXwUAAAAANMPpX8WnIbX82of5yoNw-H8kedu"
                                        url="http://bookve.com.vn"
                                        onSuccess={code => this.CaptchaCode = code}
                                    // onError={() => {}}
                                    // onExpired={() => {}}
                                    />
                                </View> */}
                                <ButtonCom
                                    shadow={false}
                                    text={RootLang.lang.singin}
                                    style={{ borderRadius: 6, paddingVertical: 12, marginTop: 32 }}
                                    txtStyle={{ fontSize: sizes.sText14, fontWeight: '600', color: colors.white }}
                                    Linear={true}
                                    onPress={() => this.onLogin()}
                                />
                                <LoginWithFacebookGoogle />
                            </View>}
                    </ScrollView>
                    <IsLoading ref={refs => this.waitting = refs} />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default Utils.connectRedux(LoginScreen, null, true);




