import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView
} from "react-native";
import Input from "../../components/componentsYSchool/Input";
import ButtonCom from "../../components/Button/ButtonCom";
import { nstyles, sizes } from "../../styles";
import { styles } from "./styles";
import { colors } from "../../styles/color";
import { Images } from "../../images";
import { nkey } from "../../app/keys/keyStore";
import Utils from "../../app/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Video from "react-native-video";
import { appConfig } from "../../app/Config";
import { isIphoneX } from "react-native-iphone-x-helper"
const { width, height } = Dimensions.get("window");
export default class CreatePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  pass1 = "";
  pass2 = "";
  _submit = () => {
    if (this.pass1.toString().trim().length > 0 && this.pass2.toString().trim().length > 0) {
      if (this.pass1.toString() == this.pass2.toString()) {
        if (this.pass1.toString().trim().length > 5) {
          Utils.nsetStore(nkey.password, this.pass1.toString().trim());
          Utils.goscreen(this, "sc_EnterTheInformation");
        } else {
          Utils.showMsgBoxOK(
            this,
            "Thông báo",
            "Mật khẩu phải tối thiểu 6 ký tự",
            "Đóng"
          );
        }
      } else {
        Utils.showMsgBoxOK(this, "Thông báo", "Mật khẩu và Xác nhận lại mật khẩu phải trùng nhau", "Đóng");
      }
    } else {
      if (this.pass1.toString().trim().length == 0) {
        Utils.showMsgBoxOK(this, "Thông báo", "Mật khẩu không được để trống", "Đóng");
        return;
      }
      if (this.pass2.toString().trim().length == 0) {
        Utils.showMsgBoxOK(this, "Thông báo", "Xác nhận lại mật khẩu không được để trống", "Đóng");
        return;
      }
    }
  };
  onEnd = () => {
    this.setState({ loading: false })
  }
  onTouch = () => {
    this.setState({ loading: true })
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={{ height: height, width: width }}
          resizeMode="stretch" source={Images.bgYSchool}>

          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={400}
            innerRef={ref => (this.scroll = ref)}>
            <TouchableOpacity onPress={this.onTouch} style={{ position: 'absolute', borderRadius: 6, backgroundColor: colors.colorPink3, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, padding: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: sizes.sizes.sText13, color: 'white', textAlign: "right" }}>HƯỚNG DẪN</Text>
            </TouchableOpacity>
            <View style={([nstyles.ncontainerX], { marginTop: height / 5 })}>
              <View style={{ justifyContent: "center", marginLeft: width / 5, marginRight: width / 5 }} >
                <Text style={[styles.text28, { fontWeight: "800", textAlign: "center" }]}>
                  Tạo mật khẩu
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Tạo mật khẩu 6 số để bảo vệ an toàn cho tài khoản YSchool của bạn
                 </Text>
              </View>
              <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10 }} >
                <Input
                  secureTextEntry={true}
                  keyboardType={"number-pad"}
                  placeholder={"Nhập mật khẩu"}
                  onChangeText={text => (this.pass1 = text)}
                  showIcon={true}
                  icon={Images.icLock}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                />
                <Input
                  placeholder={"Xác nhận lại mật khẩu"}
                  secureTextEntry={true}
                  onChangeText={text => (this.pass2 = text)}
                  showIcon={true}
                  icon={Images.icLock}
                  keyboardType={"number-pad"}
                  iconStyle={{ marginRight: 10, tintColor: "gray" }}
                />
                <ButtonCom
                  onPress={this._submit}
                  style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                  text={"XÁC NHẬN"}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
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
                source={{ uri: appConfig.domainVideo + 'upload/video/taomk.mp4' }}
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
    );
  }
}
export const stPlayMedia = StyleSheet.create({
  backgroundVideo: {
    width: width,
    height: height
  },
});