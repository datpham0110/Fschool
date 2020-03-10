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
import { accuracyOTP } from "../../apis/apiLogin";

const { width, height } = Dimensions.get("window");
export default class AccuracyOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      phone: ""
    };
  }
  _next = () => {
    if (this._submit()) {
      Utils.goscreen(this, "sc_CreatePassword");
    }
  };
  _submit = async () => {
    res = await accuracyOTP();
    return res;
  };
  _getData = async () => {
    let phones = await Utils.ngetStore(nkey.phonenumber, undefined);
    this.setState({ phone: phones });
  };
  componentDidMount() {
    this._getData();
    let otp = Utils.getGlobal(nGlobalKeys.OTP, undefined);
    this.setState({ otp: otp });
  }
  render() {
    return (
      <View style={([nstyles.nstyles.ncontainerX], {})}>
        <ImageBackground
          style={{
            height: nstyles.Height(100),
            width: nstyles.Width(100)
          }}
          resizeMode="stretch"
          source={Images.bgYSchool}
        >
          <View
            style={[nstyles.nstyles.nbody, { paddingHorizontal: 30, paddingTop: "25%" }]}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[styles.text24, { fontWeight: "800", textAlign: "center" }]}>
                Xác thực OTP
              </Text>
              <Text style={{}}>Mã xác thực đã được gửi đến</Text>
              <Text style={{}}>{this.state.phone}</Text>
            </View>
            <Input
              placeholder={"Mã xác thực"}
              onChangeText={text => (this.phonenumber = text)}
              value={this.state.otp}
              keyboardType={"number-pad"}
            />
            <ButtonCom
              onPress={this._next}
              style={{ marginTop: 10, backgroundColor: colors.colorPink }}
              text={"TIẾP TỤC"}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>Gửi lại OTP</Text>
              </View>
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
