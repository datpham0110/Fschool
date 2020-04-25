import React, { Component } from "react";
import {
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  Dimensions
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { onCheckLogin } from "../apis/apiLogin";
import Utils from "../app/Utils";
import { nkey } from "../app/keys/keyStore";
import { Images } from "../images";
import { sizes, colors } from "../styles";
import { nwidth, nheight } from "../styles/styles";
import OneSignal from "react-native-onesignal";
import { appConfig } from "../app/Config";
import { nGlobalKeys } from "../app/keys/globalKey";
import { reText } from "../styles/size";
import apis from '../apis';
export const db1 = db.database();
import { db } from '../app/Config';

// --Màn hình Welcome
class RootScreen extends Component {
  constructor(props) {
    super(props);
    nthisRedux = this;
    this.state = {
      background: ""
    };
  }

  componentDidMount() {
    OneSignal.init(appConfig.onesignalID);
    OneSignal.inFocusDisplaying(0);
    // this.onReceived = this.onReceived.bind(this);
    this.onIds = this.onIds.bind(this);
    // OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("ids", this.onIds);
    // OneSignal.configure();
    this._checkLogin();
  }

  _checkLogin = async () => {
    let phonenumber = await Utils.ngetStore(nkey.phonenumber, null);
    let password = await Utils.ngetStore(nkey.password, null);
    if (phonenumber != null && password != null) {
      const ref = db1.ref('/Tbl_TaiKhoan');
      ref.orderByChild('phone')
        .equalTo(phonenumber)
        .once('value')
        .then((snapshot) => {
          const value = snapshot.val();
          Utils.nlog('-------------------value',value)
          if (value == null) {
            setTimeout(() => {
              this.setStatusBar(false);
              Utils.goscreen(this, "sc_EnterYourPhoneNumber");
            }, 1000);
          } else {
            const data = value[Object.keys(value)[0]];
            if (data.password == password) {
              setTimeout(() => {
                this.setStatusBar(false);
                Utils.goscreen(this, "sc_Welcome");
              }, 1000);
            } else {
              setTimeout(() => {
                this.setStatusBar(false);
                Utils.goscreen(this, "sc_EnterYourPhoneNumber");
              }, 1000);
            }
          }
        });
        Utils.nlog('------------------- end if')

    } else {
      setTimeout(() => {
        this.setStatusBar(false);
        Utils.goscreen(this, "sc_EnterYourPhoneNumber");
      }, 1000);
    }
    // if (phonenumber)
    //   setTimeout(() => {
    //     this.setStatusBar(false);
    //     Utils.goscreen(this, "sc_Welcome");
    //   }, 1200);
    // else
    //   setTimeout(() => {
    //     this.setStatusBar(false);
    //     Utils.goscreen(this, "sc_EnterYourPhoneNumber");
    //   }, 1200);
  };

  _infomationUser = async () => {
    let res = await apis.Hosonguoidung.NguoiDungContact()
    Utils.nlog('NguoiDung', res)
    if (res.status == 1) {
      res.data.Avatar = res.data.Avatar + "?" + new Date();
      const data = res.data;
      this.props.getInfomation(data);
    };
  }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener("received", this.onReceived);
  //   OneSignal.removeEventListener("opened", this.onOpened);
  //   OneSignal.removeEventListener("ids", this.onIds);
  // }

  onIds(device) {
    Utils.setGlobal(nGlobalKeys.notification, device);
    Utils.nlog("Init Notification: ", device);
  }

  // onReceived(notification) {
  //   Utils.nlog("listen Notification: ", notification);
  // }


  // -- NOTIFI END --

  // ẩn thanh status bar khi Loadding
  setStatusBar = (val = true) => {
    if (!isIphoneX()) {
      StatusBar.setHidden(val);
    }
  };

  render() {
    return (
      <ImageBackground
        style={{
          height: nheight,
          width: nwidth,
          // justifyContent: 'center',
          alignItems: "center"
        }}
        resizeMode="stretch"
        source={Images.bgYSchool}
      >
        <Image
          resizeMode="contain"
          source={Images.Fchool}
          style={{
            width: nwidth * 0.3,
            height: nwidth * 0.3,
            marginTop: nheight / 5
          }}
        />
        <Text
          style={{
            fontSize: reText(30),
            fontWeight: "500",
            textAlign: "center",
            color: colors.darkSkyBlue
          }}
        >
          Trường Mầm Non - Fshool
        </Text>
        <Text style={{ marginTop: 15, fontSize: reText(18), color: colors.greenyBlue }}>Phần mềm tương tác</Text>
        <Text style={{ fontSize: reText(18), color: colors.greenyBlue }}>Phụ huynh - Nhà trường</Text>
        <ActivityIndicator size="large" color={colors.darkGreenBlue} style={{ marginTop: 20 }} />
      </ImageBackground>
    );
  }
}

export default Utils.connectRedux(RootScreen, null, true);
