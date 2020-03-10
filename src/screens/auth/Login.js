import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { colors } from "../../styles/color";
import { nstyles } from "../../styles/styles";
import Input from "../../components/componentsYSchool/Input";
import ButtonCom from "../../components/Button/ButtonCom";
import { onCheckLogin } from "../../apis/apiLogin";
import Utils from "../../app/Utils";
import { Images } from "../../images";
import { nkey } from "../../app/keys/keyStore";
import { infoPhuhuyenh } from "../../apis/welcome";

import { styles } from "./styles";
const { width, height } = Dimensions.get("window");
class Login extends Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.state = {
      sodienthoai: ""
    };
  }
  componentDidMount() {
    this._getData();
  }
  _getData = async () => {
    let phone = await Utils.ngetStore(nkey.phonenumber);
    if (phone != null) {
      this.setState({ sodienthoai: phone });
    }
  };
  _submit = async () => {
    let ps = this.password.toString().trim();
    if (ps.length < 1) {
      Utils.showMsgBoxOK(this, "Thông báo", "Password không được để trống!", "Đóng");
      return;
    }
    let res = await onCheckLogin(this.state.sodienthoai, ps);
    if (res == true) {
      let res2 = await infoPhuhuyenh();
      if (res2.success == true) {
        this.props.setListChild(res2.data.HocSinh);
        this.props.setAvatar(res2.data.Avatar)
        Utils.goscreen(this, "sc_Welcome");
      } else {
        Utils.showMsgBoxOK(this, "Thông báo", "Server đang bảo trì vui lòng thử lại", "Đóng");
      }
    } else {
      Utils.showMsgBoxOK(
        this,
        "Thông báo",
        "Sai tài khoản hoặc mật khẩu vui lòng nhập lại.",
        "Đóng"
      );
    }
  };
  render() {
    return (
      <ImageBackground
        style={{ height: height, width: width }}
        resizeMode="stretch"
        source={Images.bgLogin}>
        <ScrollView style={nstyles.nbody}>
          <View style={([nstyles.ncontainerX], { marginTop: height / 5 })}>
            <View
              style={{ justifyContent: "center", marginLeft: width / 5, marginRight: width / 5 }}>
              <Text style={[styles.text24, { fontWeight: "800", textAlign: "center" }]}>  Xin chào  </Text>
              <Text style={{ textAlign: "center" }}>{this.state.sodienthoai}</Text>
            </View>
            <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10 }} >
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
                text={"ĐĂNG NHẬP"}
              />
              <View
                style={{ flexDirection: "row", marginTop: 20, width: width - (width / 10) * 2 }}  >
                <View style={{ width: (width - (width / 10) * 2) / 2 }}>
                  <TouchableOpacity onPress={() => {
                    Utils.showMsgBoxOK(this, 'Thông báo', 'Vui lòng liên hệ với chăm sóc khách hàng để lấy lại mật khẩu', 'Đóng')
                  }}>
                    <Text>Quên mật khẩu</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Utils.goscreen(this, "sc_EnterYourPhoneNumber");
                  }}
                  style={{ justifyContent: "flex-start", width: (width - (width / 10) * 2) / 2 }} >
                  <Text style={{ alignSelf: "flex-end" }}>Đổi SĐT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => Utils.goscreen(this, 'Modal_HoTroKhachHang')}>
          <Text style={{
            alignSelf: "center", marginBottom: 40, textDecorationLine: 'underline', fontWeight: 'bold'
          }}>Liên hệ với chăm sóc khách hàng</Text>
        </TouchableOpacity>
      </ImageBackground >
    );
  }
}

const mapStateToProps = state => ({
  listchild: state.listchild,
  avatar: state.avatar
});

export default Utils.connectRedux(Login, mapStateToProps, true);
