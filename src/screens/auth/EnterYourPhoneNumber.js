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
export const db1 = db.database();
import { db } from '../../app/Config';

const { width, height } = Dimensions.get("window")
export default class EnterYourPhoneNumber extends React.Component {
  constructor(props) {
    super(props)
    this.password = ""
    this.phonenumber = ""
    this.state = {
      loading: false,
    }
  }
  _submit = () => {
    if (!this.phonenumber.trim()) {
      Utils.showMsgBoxOK(this, 'Thông báo', 'Vui lòng nhập tên đăng nhập', 'Đóng');
      return;
    };
    const ref = db1.ref('/Tbl_TaiKhoan')
    ref.orderByChild('phone')
      .equalTo(this.phonenumber)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (value == null) {
          Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản không tồn tại')
        } else {
          const data = value[Object.keys(value)[0]];
          if (data.password == this.password.trim()) {
            Utils.nsetStore(nkey.phonenumber, this.phonenumber);
            Utils.nsetStore(nkey.password, this.password);
            Utils.goscreen(this, "sc_Welcome");
          } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Mật khẩu không đúng', 'Đóng')
          };
        };
      })
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={{ height: height, width: width }} resizeMode="stretch" source={Images.bgYSchool} >
          <ScrollView>
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
                <Input
                 showIcon={true}
                 icon={Images.icUser}
                  placeholder={"Nhập số điện thoại"}
                  onChangeText={text => (this.phonenumber = text)}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                  keyboardType={"number-pad"} />
                <Input
                  secureTextEntry={true}
                  placeholder={"Nhập mật khẩu"}
                  onChangeText={text => (this.password = text)}
                  showIcon={true}
                  icon={Images.icLock}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                  keyboardType={"number-pad"}
                />
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