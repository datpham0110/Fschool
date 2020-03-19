import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Input from "../../components/componentsYSchool/Input";
import ButtonCom from "../../components/Button/ButtonCom";
import { nstyles, colors } from "../../styles";
import { styles } from "./styles";
import { Images } from "../../images";
import { nGlobalKeys } from "../../app/keys/globalKey";
import { nkey } from "../../app/keys/keyStore";
import Utils from "../../app/Utils";
import { wsCpMt } from "../../apis/apiLogin";

const { width, height } = Dimensions.get("window");
export default class AccuracyOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      phone: "",
      intervalId: '',
      timer: 120,
    };
  }
  _next = () => {
    Utils.nlog('-----------this._submit()', this._submit())
    if (this._submit() == true) {
      Utils.goscreen(this, "sc_CreatePassword");
    } else {
      Utils.showMsgBoxOK(
        this,
        "Cảnh báo",
        "Mã OTP không đúng",
        "Đóng"
      )
      return;
    }
  };
  _submit = async () => {
    if (this.state.otp.length < 6) {
      Utils.showMsgBoxOK(
        this,
        "Cảnh báo",
        "OTP phải đủ 6 số!",
        "Đóng"
      )
      return;
    }
    res = await accuracyOTP(this.state.otp);
    return res;
  };
  _getData = async () => {
    let phones = await Utils.ngetStore(nkey.phonenumber, undefined);
    this.setState({ phone: phones });
  };
  componentDidMount() {
    this._getData();
    var intervalId = setInterval(this.timer, 1000)
    this.setState({
      intervalId: intervalId
    })
    // let otp = Utils.getGlobal(nGlobalKeys.OTP, undefined);
    // this.setState({ otp: otp });
  }
  componentWillUnmount() {
    try {
      clearInterval(this.state.intervalId)
    } catch (error) { }
  }
  timer = () => {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 })
    } else {
      try {
        clearInterval(this.state.intervalId)
        Utils.nlog('----------clearInterval')
        // this.setState({ timer: 120 })
      } catch (error) { }
    }
  }
  _fillOTP = (item) => {
    if (item.length > 6) {
      Utils.showMsgBoxOK(
        this,
        "Cảnh báo",
        "OTP tối đa 6 số!",
        "Đóng"
      )
      return;
    }
    this.setState({ otp: item })
    // Utils.setGlobal(nGlobalKeys.OTP, res.data.OTP)
  }

  _touchResendOTP = async () => {
    if (this.state.timer < 120 && this.state.timer != 0) {
      Utils.showMsgBoxOK(
        this,
        "Thông báo",
        'Còn (' + this.state.timer + "s) nữa bạn mới gửi lại được OTP",
        "Đóng"
      )
      return;
    } else {
      let res = await wsCpMt(this.state.phone)
      if (res.success == true) {
        Utils.showMsgBoxOK(
          this,
          "Thông báo",
          'Mã OTP đã được gửi đến số điện thoại ' + this.state.phone,
          "Đóng"
        )
        this.setState({ timer: 120 })
      } else {
        Utils.showMsgBoxOK(
          this,
          "Thông báo",
          'Mã OTP đã được gửi đến số điện thoại ' + this.state.phone,
          "Đóng"
        )
      }
      Utils.nlog('-----------------wsCpMt', res)
    }
  }
  render() {
    return (
      <View style={([nstyles.nstyles.ncontainerX], {})}>
        <ImageBackground
          style={{ height: '100%', width: '100%' }}
          resizeMode="stretch"
          source={Images.bgYSchool}>
          <View style={[nstyles.nstyles.nbody, { paddingHorizontal: 30, paddingTop: "25%" }]}>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text24, { fontWeight: "800", textAlign: "center" }]}>Xác thực OTP</Text>
              {this.state.timer > 0 ?
                <View>
                  <Text style={{}}>Mã xác thực đã được gửi đến</Text>
                  <Text style={{ marginTop: 3 }}>{this.state.phone} tồn tại trong <Text style={{ fontWeight: 'bold' }}>({this.state.timer}s)</Text></Text>
                </View> :
                <View>
                  <Text style={{}}>Mã xác thực được gửi đến</Text>
                  <Text style={{ marginTop: 3 }}>{this.state.phone} đã hết hạn</Text>
                </View>}
            </View>
            <Input
              placeholder={"Mã xác thực"}
              onChangeText={text => (this._fillOTP(text))}
              value={this.state.otp}
              keyboardType={"number-pad"}
            />
            <ButtonCom
              onPress={this._next}
              style={{ marginTop: 10, backgroundColor: colors.colorPink }}
              text={"TIẾP TỤC"}
            />
            <View
              style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                // disabled={this.state.timer != 120 ? true : false}
                onPress={this._touchResendOTP}
                style={{ flex: 1 }}>
                <Text>Gửi lại OTP</Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "flex-start" }}>
                <TouchableOpacity
                  style={{ alignItems: "flex-end" }}
                  onPress={() => Utils.goscreen(this, "sc_EnterYourPhoneNumber")}>
                  <Text style={{ alignSelf: "flex-end" }}>Đổi SĐT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
