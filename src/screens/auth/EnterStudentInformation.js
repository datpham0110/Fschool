import React, { Component } from "react"
import {
  Image,
  View,
  Platform,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput, StyleSheet
} from "react-native"
import Input from "../../components/componentsYSchool/Input"
import ButtonCom from "../../components/Button/ButtonCom"
import { nstyles } from "../../styles/styles"
import { styles } from "./styles"
import { colors } from "../../styles/color"
import { infoPhuhuyenh } from "../../apis/welcome"

import { Images } from "../../images"
import Utils from "../../app/Utils"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { traCuuMaHocSinh, xacNhanHocSinh } from "../../apis/apiLogin"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { findfindstufindstuden } from "../../apis/hocphi"
import { TimHocSinh } from "../../apis/notifycation"
import { reText, sizes } from "../../styles/size"
import IsLoading from "../../components/IsLoading"
import { DanhSachHocSinh } from '../../apis/chat';
import { notifyParents } from '../../apis/welcome';
import { appConfig } from "../../app/Config"
import Video from "react-native-video"
import { isIphoneX } from "react-native-iphone-x-helper"

const { width, height } = Dimensions.get("window")
class EnterStudentInformation extends React.Component {
  constructor(props) {
    super(props)
    this.flagSua = Utils.ngetParam(this, "flag", false)
    this.getYear = new Date().getFullYear();
    this.countApi = 0;
    this.state = {
      flag: true,
      hoten: "",
      hinhthuc: false,
      matruong: "",
      tenTruong: "Chọn trường",
      TenHocSinh: "",
      NamSinh: "",
      isSearch: false,
      msHocSinhOld: '',
      msHocSinhNew: '',
      loading: false,
    }
    this.goBackAddChild = Utils.ngetParam(this, 'goBackAddChild', () => { })
  }
  _submit = async () => {
    if (this.state.hinhthuc == true) {
      if (this.state.isSearch == false) {
        this.setState({ msHocSinhOld: this.state.msHocSinhNew })
        if (this.state.msHocSinhNew.length == 0) {
          Utils.showMsgBoxOK(this, 'Thông báo', 'Mã số học sinh không được để trống', 'Đóng');
          return;
        }
        this.waitting.show();
        let res = await TimHocSinh(this.state.msHocSinhNew);
        if (res.success == true) {
          Utils.setGlobal(nGlobalKeys.ObjectHocSinh, res.data)
          this.setState({
            hoten: res.data.FullName,
            isSearch: true
          })
        } else {
          Utils.showMsgBoxOK(
            this,
            "Thông báo",
            "Mã số học sinh không tồn tại",
            "Đóng"
          )
          this.setState({ hoten: 'Họ và Tên học sinh', isSearch: false });
        }
        this.waitting.hide();
      } else {
        msTruong = Utils.getGlobal(nGlobalKeys.ObjectHocSinh, '');
        let res = await xacNhanHocSinh(true, msTruong.SchoolCode)
        if (res.success == true) {
          this._loadDataRedux();
          let res2 = await infoPhuhuyenh()
          if (res2.success == true) {
            this.props.setListChild(res2.data.HocSinh)
            let count = this.props.listchild.length
            if (count == 1) {
              // Utils.setGlobal(
              //   nGlobalKeys.IdHocSinh,
              //   this.props.listchild[0].MaKhachHang
              // )
              // Utils.setGlobal(
              //   nGlobalKeys.tenKH,
              //   this.props.listchild[0].TenKhachHang
              // )
              // Utils.setGlobal(
              //   nGlobalKeys.GioiTinh,
              //   this.props.listchild[0].GioiTinh
              // )
              // Utils.setGlobal(
              //   nGlobalKeys.IDKhachHang,
              //   this.props.listchild[0].IDKhachHang
              // )
              // Utils.setGlobal(
              //   nGlobalKeys.IDChiNhanhHocSinh,
              //   this.props.listchild[0].IDChiNhanh
              // )
              Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);
            }
          }
          if (this.flagSua == true) {
            this.goBackAddChild();
            Utils.goback(this)
          } else {
            Utils.goscreen(this, "sc_Welcome")
          }
        } else {
          if (res.error.code == -5) {
            Utils.showMsgBoxOK(this, res.error.message, "Đóng")
          }
          if (res.error.code == 103) {
            if (res.error.message = 'Tài khoản đã liên kết với học sinh này') {
              Utils.showMsgBoxOK(this, "Thông báo", 'Tài khoản của bạn đã liên kết với học sinh này', "Đóng")

            } else {
              Utils.showMsgBoxOK(this, "Thông báo", 'Xác nhận học sinh thất bại', "Đóng")

            }
          } else {
            Utils.showMsgBoxOK(this, "Thông báo", res.error.message, "Đóng")
          }
        }
      }
    } else {
      if (this.state.TenHocSinh.toString().trim().length == 0 || this.state.matruong.toString() == "matruong" || this.state.NamSinh.toString().trim().length < 0) {
        Utils.showMsgBoxOK(
          this,
          "Thông báo",
          "Xác nhận học sinh không thành công",
          "Đóng"
        )
      } else if (this.state.NamSinh.toString().trim().length < 4) {
        Utils.showMsgBoxOK(this, "Thông báo", "Năm sinh phải đủ 4 số", "Đóng")
        return
      } else {
        this._checkInfoHocSinh()
      }
    }
  }

  listChillBaoBai = async () => {
    let res = await notifyParents(2); // Báo bài 2
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        this.props.setSumNotifyBaoBai(this._sumNotify(res.data.HocSinh));
        this.props.setListChildBaoBai(res.data.HocSinh)
      }
      else {
        this.props.setSumNotifyBaoBai(0);
        this.props.setListChildBaoBai([])

      }
    } else {
      this.props.setListChildBaoBai([]);
      this.props.setSumNotifyBaoBai(0);
    }
  }
  _sumNotify = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count += data[i].Soluong;
    }
    return count;
  }
  listChillChat = async () => {
    let res = await DanhSachHocSinh();
    if (res.success == true) {
      this.props.setListChildChat(res.data);
    }
  }
  _loadDataRedux = () => {
    this.listChillBaoBai();
    this.listChillChat();
  }



  _loadInfoHocSinh = async (ms) => {
    this.setState({ msHocSinhNew: ms })
    if (ms != this.state.msHocSinhOld) {
      this.setState({ isSearch: false, hoten: 'Họ và Tên học sinh' })
    } else {
      this.setState({ isSearch: true })
    }
  }
  _checkInfoHocSinh = async () => {
    this.waitting.show();
    let res = await findfindstufindstuden(
      this.state.TenHocSinh.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      this.state.NamSinh.toString(),
      this.state.matruong.toString()
    )
    this.waitting.hide();
    if (res.success) {
      if (res.data.Count == 0) {
        Utils.showMsgBoxOK(this, "Thông báo", "Học sinh không tồn tại", "Đóng")
      } else {
        Utils.goscreen(this, "Model_ModelListHocSinh", {
          data: res.data.Students,
          flag: this.flagSua,
          maTruong: this.state.matruong.toString(),
          goBack: this.gobackhome
        })
      }
    } else {
      Utils.showMsgBoxOK(this, "Thông báo", "Học sinh không tồn tại", "Đóng")
    }
  }
  gobackhome = () => {
    Utils.nlog('---------------------   goBackAddChild')
    // Util.goback();
    this.goBackAddChild();
    Utils.goback(this)
  }
  getMaTruong = (matruong, tenTruong) => {
    this.setState({
      matruong: matruong,
      tenTruong: tenTruong
    })
  }
  checkYear = year => {
    if (year > this.getYear) {
      // Lớn hơn năm hiện hành
      Utils.showMsgBoxOK(this, "Thông báo", "Năm sinh không hợp lệ", "Đóng")
      this.setState({
        NamSinh: this.getYear
      })
    } else if (year.toString().length == 4) {
      // console.log(this.getYear - year > 18)
      if (
        Math.sqrt(this.getYear - year) > 18 ||
        Math.sqrt(this.getYear - year) < 0
      ) {
        Utils.showMsgBoxOK(this, "Thông báo", "Năm sinh không hợp lệ", "Đóng")
        this.setState({
          NamSinh: this.getYear
        })
      } else {
        this.setState({
          NamSinh: year
        })
      }
    } else {
      this.setState({
        NamSinh: year
      })
    }
  }
  goBack = () => {
    if (this.flagSua == true) {
      Utils.goback(this, null)
    } else {
      Utils.goscreen(this, "sc_Welcome")
    }
  }
  _clickItem = (val) => {
    Utils.setGlobal(nGlobalKeys.ObjectHocSinh, '')
    this.setState({ hinhthuc: val, matruong: "", hoten: "", msHocSinhNew: '', tenTruong: 'Chọn trường', NamSinh: '', TenHocSinh: '', isSearch: false, msHocSinhOld: '' });
  }
  onEnd = () => {
    this.setState({ loading: false })
  }
  onTouch = () => {
    this.setState({ loading: true })
  }
  render() {
    var videoTen = 'upload/video/tmkiemhstheoten.mp4'
    var videoMaso = 'upload/video/tmkiemhstheoma.mp4'
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]} >
        <ImageBackground
          style={{ height: height, width: width }}
          resizeMode="stretch"
          source={Images.bgYSchool}>
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={300}
            innerRef={ref => (this.scroll = ref)}>
            <TouchableOpacity onPress={this.onTouch} style={{ position: 'absolute', borderRadius: 6, backgroundColor: colors.colorPink3, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, padding: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: sizes.sText13, color: 'white', textAlign: "right" }}>HƯỚNG DẪN</Text>
            </TouchableOpacity>
            <View style={([nstyles.ncontainerX], { marginTop: height / 5, marginBottom: 30 })} >
              <View style={{ justifyContent: "center", marginLeft: width / 5, marginRight: width / 5 }}>
                <Text style={[styles.text28, { fontWeight: "800", textAlign: "center" }]}>
                  Nhập thông tin học sinh
                </Text>
                <Text style={{ textAlign: "center" }}>Nhập thông tin chính xác theo mã nhà trường cung cấp</Text>
              </View>
              <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10, backgroundColor: colors.backgroundHistory, borderRadius: 5, marginTop: 20, padding: 10 }}>
                <Text style={{ textAlign: "center", color: colors.colorPink }}  >
                  CHỌN HÌNH THỨC TRA CỨU THÔNG TIN
                </Text>
                <View style={{ alignItems: "center", backgroundColor: colors.backgroundHistory, marginHorizontal: 5, marginVertical: 15 }} >
                  <TouchableOpacity style={[nstyles.nrow, styless.touchView, { backgroundColor: this.state.hinhthuc ? '#9dc7bf' : '#dae3e1' }]}
                    onPress={() => this._clickItem(true)} >
                    <Text style={{ flex: 1, color: colors.white, fontWeight: 'bold', fontSize: sizes.sText14, color: this.state.hinhthuc ? 'white' : colors.gunmetal, marginRight: 7 }}>Tìm kiếm theo mã số học sinh</Text>
                    {this.state.hinhthuc ? <Image source={Images.icCheck} style={nstyles.nIcon16} resizeMode='contain' /> : null}
                  </TouchableOpacity>
                  <View style={{ height: 1, width: '100%', margin: 7 }} />
                  <TouchableOpacity style={[nstyles.nrow, styless.touchView, { flex: 1, backgroundColor: this.state.hinhthuc ? '#dae3e1' : '#9dc7bf' }]}
                    onPress={() => this._clickItem(false)} >
                    <Text style={{
                      flex: 1, color: colors.white, fontWeight: 'bold', fontSize: sizes.sText14,
                      color: this.state.hinhthuc ? colors.gunmetal : 'white', marginRight: 7
                    }}>Tìm kiếm theo tên học sinh</Text>
                    {this.state.hinhthuc ? null : <Image source={Images.icCheck} style={nstyles.nIcon16} resizeMode='contain' />}
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.hinhthuc == true ? (
                <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10, }} >
                  <Input
                    keyboardType={"number-pad"}
                    placeholder={"Mã số học sinh"}
                    onChangeText={text => this._loadInfoHocSinh(text)}
                    iconStyle={{ marginRight: 10, tintColor: "gray" }}
                    ref={input => (this.mahocsinh = input)}
                    value={this.state.msHocSinhNew}
                  />
                  <Input
                    placeholder={"Họ và Tên học sinh"}
                    onChangeText={text => (this.pass2 = text)}
                    editable={false}
                    value={this.state.hoten}
                    iconStyle={{ marginRight: 10, tintColor: "gray" }}
                    ref={input => (this.hotenhocsinh = input)}
                  />
                </View>
              ) : (
                  <View style={{ marginLeft: width / 10, marginRight: width / 10, marginTop: 10 }} >
                    <Input
                      placeholder={"Họ và Tên học sinh"}
                      onChangeText={text => this.setState({ TenHocSinh: text })}
                      iconStyle={{ marginRight: 10, tintColor: "gray" }}
                      ref={input => (this.tenhocsinh = input)}
                      value={this.state.TenHocSinh}
                    />
                    <TextInput
                      keyboardType={"number-pad"}
                      placeholder={"Năm sinh"}
                      maxLength={4}
                      onChangeText={text => this.checkYear(text)}
                      value={`${this.state.NamSinh}`}
                      underlineColorAndroid={"transparent"}
                      placeholderTextColor={"rgba(0,0,0,0.6)"}
                      style={[styless.inputText]}
                    />
                    <TouchableOpacity
                      onPress={() => Utils.goscreen(this, "Modal_DDropDownChiNhanh", { getMaTruong: this.getMaTruong })} activeOpacity={0.9} >
                      <Text style={[styless.inputText]}>
                        {this.state.tenTruong}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              <View
                style={{ marginLeft: width / 10, marginRight: width / 10, marginBottom: 20 }} >
                <ButtonCom
                  disabled={this.state.flag == true ? false : this.state.hinhthuc == false ? false : true}
                  onPress={this._submit}
                  style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                  text={this.state.hinhthuc == true ? this.state.isSearch == false ? "TÌM KIẾM" : "XÁC NHẬN" : "TÌM KIẾM"} />
                <ButtonCom
                  style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                  onPress={this.goBack}
                  text={this.flagSua == true ? "QUAY LẠI" : "BỎ QUA"}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
        <IsLoading ref={refs => this.waitting = refs} />
        {
          this.state.loading ?
            <View style={{
              position: 'absolute',
              width: width,
              height: height,
              backgroundColor: colors.white,
            }}>

              <Video
                source={{ uri: appConfig.domainVideo + (this.state.hinhthuc == true ? videoMaso : videoTen) }}
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
                <Text style={{ fontWeight: "600", fontSize: sizes.sText13, color: 'white' }}>ĐÓNG</Text>
              </TouchableOpacity>
            </View> : null}
      </View>
    )
  }
}
export const stPlayMedia = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});
const styless = StyleSheet.create({
  inputText: {
    borderRadius: 24,
    textAlign: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.BackgroundHome,
    marginTop: 10,
    fontSize: reText(16),
    color: "rgba(0,0,0,0.6)",
    ...Platform.select({
      ios: {
        paddingVertical: 13
      },
      android: {
        paddingVertical: 9
      }
    })
  },
  touchView: {
    padding: 10, justifyContent: 'space-between', alignItems: "center", borderRadius: 6
  }
})

const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(
  EnterStudentInformation,
  mapStateToProps,
  true
)
