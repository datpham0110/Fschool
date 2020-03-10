import React, { Component } from "react"
import {
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Linking
} from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { onCheckLogin } from "../apis/apiLogin"

import Utils from "../app/Utils"
import { nkey } from "../app/keys/keyStore"
import { Images } from "../images"
import { sizes } from "../styles"
import { nwidth } from "../styles/styles"
import { infoPhuhuyenh } from "../apis/welcome"
import OneSignal from "react-native-onesignal"
import { appConfig } from "../app/Config"
import { nGlobalKeys } from "../app/keys/globalKey"
const { width, height } = Dimensions.get("window")
// --Màn hình Welcome
class RootScreen extends Component {
  constructor(props) {
    super(props)
    nthisRedux = this;
    this.state = {
      background: ""
    }
  }
  componentDidMount() {
    OneSignal.init(appConfig.onesignalID, { kOSSettingsKeyAutoPrompt: true })
    OneSignal.inFocusDisplaying(0);
    this._checkLogin()
    this.onReceived = this.onReceived.bind(this)
    this.onIds = this.onIds.bind(this)
    this.inAppMessageClicked = this.inAppMessageClicked.bind(this)
    OneSignal.addEventListener("received", this.onReceived)
    OneSignal.addEventListener('inAppMessageClicked', this.inAppMessageClicked);
    OneSignal.addEventListener("ids", this.onIds)
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    };
  }
  handleOpenURL = (event) => {
    Utils.nlog('DeepLink:', event);
  }
  _checkLogin = async () => {
    let phonenumber = await Utils.ngetStore(nkey.phonenumber, null)
    let password = await Utils.ngetStore(nkey.password, null)
    if (phonenumber != null && password != null) {
      const checkToken = await onCheckLogin(phonenumber, password)
      Utils.nlog('---------- checkToken', checkToken)
      if (checkToken) {
        let res = await infoPhuhuyenh()
        Utils.nlog('---------- infoPhuhuyenh', res)
        if (res.success == true) {
        }
        if (res) {
          this.props.setListChild(res.data.HocSinh)
          setTimeout(() => {
            this.setStatusBar(false)
            Utils.goscreen(this, "sc_Welcome")
          }, 600)
        }
      } else {
        Utils.nsetStore(nkey.phonenumber, null)
        Utils.nsetStore(nkey.password, null)
        setTimeout(() => {
          this.setStatusBar(false)
          Utils.goscreen(this, "sc_EnterYourPhoneNumber")
        }, 600)
      }
    } else {
      setTimeout(() => {
        this.setStatusBar(false)
        Utils.goscreen(this, "sc_EnterYourPhoneNumber")
      }, 600)
    }
  }

  onReceived(notification) {
    Utils.nlog("listen Notification: ", notification)
  }
  onIds(device) {
    Utils.nlog("Init Notification: ", device)
    Utils.setGlobal(nGlobalKeys.notification, device)
  }
  inAppMessageClicked(receivedNotif) {
    Utils.nlog("receivedNotif ", receivedNotif)
  }
  // -- NOTIFI END --
  setStatusBar = (val = true) => {
    if (!isIphoneX()) {
      StatusBar.setHidden(val)
    }
  }
  render() {
    return (
      <ImageBackground
        style={{
          height: height,
          width: width,
          alignItems: "center"
        }}
        resizeMode="stretch"
        source={Images.bgYSSplashScreen}
      >
        <Image
          resizeMode="contain"
          source={Images.logoYSchool}
          style={{
            width: width * 0.3,
            height: width * 0.3,
            marginTop: height / 5, tintColor: '#f27972'
          }}
        />
        <Text
          style={{
            fontSize: sizes.sizes.sText28,
            fontWeight: "800",
            textAlign: "center"
          }}  >
          Trường em - Yschool
        </Text>
        <Text style={{ marginTop: 10 }}>Phần mềm tương tác</Text>
        <Text>Phụ huynh - Nhà trường</Text>
      </ImageBackground >
    )
  }
}
export default Utils.connectRedux(RootScreen, null, true)
