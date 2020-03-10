import React, { Component } from "react"
import {
  Image,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Platform
} from "react-native"
import { nstyles } from "../../styles/styles"
import { sizes } from "../../styles"
import { colors } from "../../styles/color"
import { Images } from "../../images"
const { width, height } = Dimensions.get("window")
import ButtonCom from "../../components/Button/ButtonCom"
import Utils from "../../app/Utils"

export default class GiaoDichThanhCong extends React.Component {
  constructor(props) {
    super(props)
    this.hocSinh
    // this.state = {
    //   hocsinhThanhToan: Utils.getGlobal(nGlobalKeys.childSelectedHocPhi, '')
    // }
    this.hocSinhThanhToan = Utils.ngetParam(this, "hocSinhThanhToan")
    this.TransactionID = Utils.ngetParam(this, "TransactionID");
    this.allBill = Utils.ngetParam(this, "allBill");

    //allBill
  }

  _clickMenu = route => () => {
    Utils.goscreen(this, "sc_Home")
  }
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome, alignItems: "center" }]} >
        <Image resizeMode="contain" source={Images.cCheck} style={{ width: width * 0.15, height: width * 0.15, marginTop: height * 0.15 }} />
        <Text style={{ fontSize: sizes.sizes.sText20, fontWeight: "700", textAlign: "center" }}>Giao dịch thành công</Text>
        <View
          style={{
            marginTop: 20,
            paddingVertical: 5,
            backgroundColor: colors.white,
            width: width * 0.8,
            alignItems: "center",
            borderRadius: 5,
            paddingHorizontal: 30
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.veryLightPinkThree,
              width: "100%",
              alignItems: "center"
            }}
          >
            <Text>
              Đã thanh toán thành công tiền học phí {this.allBill} VNĐ của học sinh {this.hocSinhThanhToan.StudentName}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              width: "100%",
              alignItems: "center"
            }}
          >
            <Text>Mã giao dịch: {this.TransactionID}</Text>
          </View>
        </View>
        <ButtonCom
          style={{
            marginTop: 10,
            backgroundColor: colors.colorGreen,
            marginHorizontal: 25,
            marginBottom: 20,
            marginTop: 20,
            width: width * 0.5
          }}
          onPress={this._clickMenu("sc_Home")}
          text={"MÀN HÌNH CHÍNH"}
        />
      </View>
    )
  }
}
