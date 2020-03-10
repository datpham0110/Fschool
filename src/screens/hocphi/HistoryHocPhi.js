import React, { Component } from "react";
import { Text, View, Dimensions, Image } from "react-native";
import { colors } from "../../styles/color";
import { TouchableOpacity } from "react-native-gesture-handler"
import { nstyles } from "../../styles/styles"
import { getchiethocphi } from "../../apis/chitiethocphi"
import Utils from "../../app/Utils"
import { nGlobalKeys } from "../../app/keys/globalKey"
import NotifyLichsu from "./NotifyLichsu"
import DatePicker from "../../components/DatePicker";
const { width, height } = Dimensions.get("window")
import { Images } from "../../images"
import IsLoading from '../../components/IsLoading';
import { sizes } from "../../styles"

export default class HistoryHocPhi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      CTlichSu: null,
      tuThang: new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1),
      tuNam: new Date().getFullYear(),
      denThang: new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1),
      denNam: new Date().getFullYear()
    }
    this.childSelected = null;
  }
  componentDidMount() {
    this.getchitiet()
  }
  getchitiet = async () => {
    this.waitting.show();
    let IDkH = Utils.getGlobal(nGlobalKeys.childSelected, null)
    this.childSelected = IDkH;
    if (IDkH == null) {
      this.waitting.hide();
      return;
    }
    if (IDkH.MaKhachHang != null) {
      let res = await getchiethocphi(
        this.state.tuThang,
        this.state.tuNam,
        this.state.denThang,
        this.state.denNam,
        IDkH.IDKhachHang
      )
      if (res.success == true) {
        this.setState({ CTlichSu: res.data })
      }
    } else {
      Utils.showMsgBoxOK(nthis, 'Thông Báo', 'Không có học sinh để hiển thị');
      this.waitting.hide();
    }
    this.waitting.hide();
  }
  swapThangNam = (tuThang, tuNam, denThang, denNam) => {
    Utils.nlog('---------------------- swapThangNam')
    if (tuNam > denNam) {
      this.setState({ tuThang: new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1), tuNam: new Date().getFullYear(), denThang: new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1), denNam: new Date().getFullYear() })
      Utils.showMsgBoxOK(nthis, 'Thông báo', 'Từ năm không được lớn hơn đến năm', 'Đóng');
      return;
      // this.setState({ tuNam: denNam, denNam: tuNam })
    } else if (tuNam == denNam) {
      if (tuThang > denThang) {
        this.setState({
          tuThang: denThang,
          tuNam: tuNam,
          denThang: tuThang,
          denNam: denNam
        })
      } else {
        this.setState({
          tuThang: tuThang,
          tuNam: tuNam,
          denThang: denThang,
          denNam: denNam
        })
      }
    } else {
      this.setState({
        tuThang: tuThang,
        tuNam: tuNam,
        denThang: denThang,
        denNam: denNam
      })
    }
  }
  render() {
    return (
      <View style={nstyles.nbody}>
        <View style={{ width: width, alignItems: 'center', backgroundColor: 'white' }}>
          <Image resizeMode="contain" source={Images.logoSSC} style={{ width: width * 0.3, height: width * 0.15 }}></Image>
        </View>
        {this.childSelected != null ?
          < View >
            <Text style={{ textAlign: "center", paddingTop: 20, fontSize: sizes.sizes.sText14 }} >Lịch sử học phí của </Text>
            <Text style={{ textAlign: "center", paddingVertical: 7, fontSize: sizes.sizes.sText18, fontWeight: "bold" }} > {this.childSelected.TenKhachHang} </Text>
          </View> : null
        }

        <View
          style={[nstyles.nrow, {
            marginHorizontal: 20,
            marginVertical: 10,
            backgroundColor: colors.white,
            borderRadius: 5
          }]}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ textAlign: "center" }}>Từ tháng</Text>
            <DatePicker
              onChangeValue={(month, year) => {
                this.swapThangNam(
                  month,
                  year,
                  this.state.denThang,
                  this.state.denNam
                )
              }}
              month={this.state.tuThang}
              year={this.state.tuNam}
            />
          </View>
          <View style={{ flex: 1, marginVertical: 10 }}>
            <Text style={{ textAlign: "center" }}>Đến tháng</Text>
            <DatePicker
              onChangeValue={(month, year) => {
                this.swapThangNam(
                  this.state.tuThang,
                  this.state.tuNam,
                  month,
                  year
                )
              }}
              month={this.state.denThang}
              year={this.state.denNam}
            />
          </View>
          <View style={{ justifyContent: "flex-end", marginVertical: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.bgYSchoold,
                borderRadius: 6,
                marginHorizontal: 10
              }} onPress={this.getchitiet}>
              <Text style={{
                color: colors.white,
                marginHorizontal: 20,
                paddingVertical: 10
              }}
              >
                TRA CỨU
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <NotifyLichsu CTlichSu={this.state.CTlichSu} />
        </View>
        <IsLoading ref={refs => this.waitting = refs} />
      </View >
    )
  }
}
