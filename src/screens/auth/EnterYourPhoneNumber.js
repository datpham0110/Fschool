import React, { Component } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView, StyleSheet, Image
} from "react-native"
import Input from "../../components/componentsYSchool/Input"
import ButtonCom from "../../components/Button/ButtonCom"
import { nstyles, sizes } from "../../styles"
import { styles } from "./styles"
import { colors } from "../../styles/color"
import Utils from "../../app/Utils"
import { nkey } from "../../app/keys/keyStore"
import { Images } from "../../images"
import { enterPhoneNumber } from "../../apis/apiLogin"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { appConfig } from "../../app/Config"
import Video from "react-native-video"
import { isIphoneX, ifIphoneX } from "react-native-iphone-x-helper"


const { width, height } = Dimensions.get("window")
export default class EnterYourPhoneNumber extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phonenumber: "",
      loading: false,
    }
  }
  _submit = async () => {
    if (this.state.phonenumber.slice(0, 1) != 0) {
      Utils.showMsgBoxOK(this, "Thông báo", "Số điện thoại hợp lệ bắt đầu bằng số 0", "Đóng");
      return;
    }
    if (this.state.phonenumber.toString().trim().length == 10) {
      Utils.nsetStore(nkey.phonenumber, this.state.phonenumber.toString().trim())
      let res = await enterPhoneNumber(this.state.phonenumber.toString().trim())
      Utils.nlog('enterPhoneNumber', res)
      if (res.success == true) {
        Utils.setGlobal(nGlobalKeys.IdCN, res.data.IdCN)
        Utils.setGlobal(nGlobalKeys.IdUser, res.data.IdUser)
        Utils.setGlobal(nGlobalKeys.OTP, res.data.OTP)
        Utils.setGlobal(nGlobalKeys.OTPTime, res.data.OTPTime)
        Utils.setGlobal(nGlobalKeys.OTPTimeApp, res.data.OTPTimeApp)
        // Utils.goscreen(this, "sc_AccuracyOTP")
        Utils.goscreen(this, "sc_NotifyEnterPhoneNumber")
      } else if (res.success == false && res.error.code == 103) {
        Utils.goscreen(this, "sc_AuthLogin")
      }
      else {
        Utils.showMsgBoxOK(this, "Thông báo", "Server đang bảo trì vui lòng thử lại.", "Đóng")
      }
    }
    else if (this.state.phonenumber.toString().trim().length == 0) {
      Utils.showMsgBoxOK(
        this,
        "Thông báo",
        "Số điện thoại không được để trống",
        "Đóng"
      )
      return;
    } else {
        // if (this.state.phonenumber.slice(0, 1) != 0) {
        //   Utils.showMsgBoxOK(this, "Thông báo", "Số điện thoại hợp lệ bắt đầu bằng số 0", "Đóng");
        //   return;
        // }
        Utils.showMsgBoxOK(this, "Thông báo", "Số điện thoại hợp lệ phải gồm 10 số", "Đóng")
        return;
    }
  }
  _fillPhone = (value) => {
    this.setState({
      phonenumber: value
    })
  }
  onEnd = () => {
    this.setState({ loading: false })
  }
  onTouch = () => {
    this.setState({ loading: true })
  }
  _fillPhone = (item) => {
    // if(item.in){

    // }
    // if (this.state.phonenumber.length == 0) {
    //   if (item.slice(0, 1) != 0) {
    //     Utils.showMsgBoxOK(this, "Thông báo", "Số điện thoại hợp lệ bắt đầu bằng số 0", "Đóng");
    //     return;
    //   }
    // }
    this.setState({ phonenumber: item })
    // this.state.phonenumber = text
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={{ height: height, width: width }} resizeMode="stretch" source={Images.bgYSchool} >
          <ScrollView>
            <TouchableOpacity onPress={this.onTouch} style={{ position: 'absolute', borderRadius: 6, backgroundColor: colors.colorPink3, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, padding: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: sizes.sizes.sText13, color: 'white', textAlign: "right" }}>HƯỚNG DẪN</Text>
            </TouchableOpacity>
            <View style={([nstyles.ncontainerX], { marginTop: height / 5 })}>
              <View style={{ justifyContent: "center", marginLeft: width / 5, marginRight: width / 5 }}>
                <View style={{ alignItems: 'center', marginBottom: 7 }}>
                  <Text style={[styles.text24, { fontWeight: "600", textAlign: "center" }]} > Nhập số điện thoại</Text>
                </View>
                <Text style={[styles.text14, { textAlign: "center" }]}>
                  Dùng số điện thoại để đăng ký hoặc đăng nhập
                </Text>
              </View>
              <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10 }}>
                <Input placeholder={"Nhập số điện thoại"} onChangeText={text => this._fillPhone(text)} keyboardType={"number-pad"} />
                <ButtonCom
                  onPress={this._submit}
                  style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                  text={"TIẾP TỤC"} />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => Utils.goscreen(this, 'Modal_HoTroKhachHang')}>
            <Text style={{
              alignSelf: "center", marginBottom: 40, textDecorationLine: 'underline', fontWeight: 'bold'
            }}>Liên hệ với chăm sóc khách hàng</Text>
          </TouchableOpacity>
        </ImageBackground>
        {
          this.state.loading ?
            <View style={{
              position: 'absolute',
              width: width,
              height: height,
              backgroundColor: colors.white,
            }}>
              <Video
                source={{ uri: appConfig.domainVideo + 'upload/video/dangkiphuhuynh.mp4' }}
                ref={(ref) => {
                  this.player = ref
                }}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
                paused={this.state.paused}                                  // Store reference
                style={stPlayMedia.backgroundVideo}
                repeat={true}
                onError={this.videoError}               // Callback when video cannot be loaded
                onEnd={this.onEnd}
              />
              <TouchableOpacity onPress={() => this.setState({ loading: false })} style={{ padding: 5, backgroundColor: colors.colorPink3, borderRadius: 6, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, position: 'absolute' }}>
                <Text style={{ fontWeight: "600", fontSize: sizes.sizes.sText13, color: 'white' }}>ĐÓNG</Text>
              </TouchableOpacity>
            </View>
            : null
        }
      </View>

    )
  }
}
export const stPlayMedia = StyleSheet.create({
  backgroundVideo: {
    width: width,
    height: height
    // height: height * 0.85,
  },
});