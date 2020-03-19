import React, { Component } from "react"
import {
  Image,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView, TouchableOpacity
} from "react-native"
import Input from "../../components/componentsYSchool/Input"
import ButtonCom from "../../components/Button/ButtonCom"
import { nstyles } from "../../styles/styles"
import { styles, } from "./styles"
import { colors, sizes } from "../../styles"
import { Images } from "../../images"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { createAccount, onCheckLogin } from "../../apis/apiLogin"
import Utils from "../../app/Utils"
import { nkey } from "../../app/keys/keyStore"
import { isIphoneX } from "react-native-iphone-x-helper"
import Video from "react-native-video"
import { appConfig } from "../../app/Config"
const { width, height } = Dimensions.get("window")
export default class EnterTheInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  hoTen = ""
  email = ""
  _goWelcome = () => {
    Utils.goscreen(this, "sc_EnterStudentInformation")
  }
  _goStudenInformation = () => {
    Utils.goscreen(this, "sc_Welcome")
  }
  _submit = async () => {
    if (this.email != "") {
      if (!Utils.validateEmail(this.email)) {
        Utils.showMsgBoxOK(this, "Thông báo", "Email không hợp lệ", "Đóng")
        return
      }
    }
    if (this.hoTen.length < 1) {
      Utils.showMsgBoxOK(this, "Thông báo","Họ tên không được để trống","Đóng")
      return
    }
    Utils.nsetStore(nkey.Fullname, this.hoTen.toString().trim())
    Utils.setGlobal(nGlobalKeys.Email, this.email.toString().trim())
    var res = await createAccount()
    Utils.nlog('--------- createAccount', res)
    if (res.success == true) {
      let password = await Utils.ngetStore(nkey.password, null)
      let phonenumber = await Utils.ngetStore(nkey.phonenumber, null)
      let res2 = await onCheckLogin(phonenumber, password)
      Utils.nlog('--------------nCheckLogin ', res2)
      if (res2 == true) {
        Utils.showMsgBoxYesNo(
          this,
          "Thông báo",
          "Đăng ký tài khoản thành công, nhấn TIẾP TỤC để chọn học sinh",
          "TIẾP TỤC",
          "KHÔNG",
          this._goWelcome,
          this._goStudenInformation
        )
      }
    }
  }
  onEnd = () => {
    this.setState({ loading: false })
  }

  onTouch = () => {
    this.setState({ loading: true })
  }
  render() {
    return (
      <View>
        <ImageBackground style={{ height: height, width: width }} resizeMode="stretch" source={Images.bgYSchool}>
          <ScrollView>
            <TouchableOpacity onPress={this.onTouch} style={{ position: 'absolute', borderRadius: 6, backgroundColor: colors.colorPink3, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, padding: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: sizes.sizes.sText13, color: 'white', textAlign: "right" }}>HƯỚNG DẪN</Text>
            </TouchableOpacity>
            <View style={([nstyles.ncontainerX], { marginTop: height / 5 })}>
              <View style={{ justifyContent: "center", marginLeft: width / 5, marginRight: width / 5 }}>
                <Text style={[styles.text28, { fontWeight: "800", textAlign: "center" }]}>
                  Nhập thông tin
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Thông tin này dùng để xác thực và bảo vệ tài khoản của bạn tốt hơn
                </Text>
              </View>
              <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10 }} >
                <Input
                  placeholder={"Nhập họ và tên"}
                  onChangeText={text => (this.hoTen = text)}
                  showIcon={false}
                  icon={Images.icLock}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                />
                <Input
                  placeholder={"Nhập email"}
                  onChangeText={text => (this.email = text)}
                  showIcon={false}
                  icon={Images.icLock}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                />
                <ButtonCom
                  onPress={this._submit}
                  style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                  text={"XÁC NHẬN"}
                />
              </View>
            </View>
          </ScrollView>
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
                source={{ uri: appConfig.domainVideo + 'upload/video/ten.mp4' }}
                //source={require('../datatest/mvtest.mp4')} 
                //{{uri: urlTest}}   // Can be a URL or a local file.
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
            : null}

      </View>
    )
  }
}
export const stPlayMedia = StyleSheet.create({
  backgroundVideo: {
    width: width,
    height: height
  },
});