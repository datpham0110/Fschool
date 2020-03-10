import React, { Component, PureComponent } from "react"
import Utils from "../../app/Utils"
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native"
import HeaderCom from "../../components/HeaderCom"
import ButtonCom from "../../components/Button/ButtonCom"
import { nstyles } from "../../styles/styles"
import { Images } from "../../images"
import { sizes } from "../../styles/size"
import { colors } from "../../styles/color"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { notification } from "../../apis/notifycation"
const { width, height } = Dimensions.get("window")

class ListHocPhi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isThanhToanSuccees: false,
      linkWebview: "",
      tenHocSinh: "",
      data: [],
      checked: 0,
      tongTien: 0,
      tongTienAll: 0,
      conLai: 0,
      tienflag: 0,
      isSelect: false,
      listChecker: [],
    },
      this.HocSinh
  }
  _subThanhToan = async () => {
    if (this.state.tongTien > 0) {
      if (this.state.isSelect == false) {
        Utils.goscreen(this, "sc_ThanhToanWebView", {
          tongtien: this.state.tongTien, msHocSinh: this.HocSinh
        })
      } else {
        Utils.goscreen(this, "sc_ThanhToanWebView", {
          tongtien: this.state.tongTien, msHocSinh: this.HocSinh
        })
      }
    } else {
      Utils.showMsgBoxOK(this, 'Thông báo', 'Bạn chọn tháng để thanh toán', 'Đóng');
    }
  }

  handleMessage = event => {
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    if (this.props.listchild.length > 0) {
      let hocSinh = Utils.getGlobal(nGlobalKeys.childSelected, null)
      Utils.nlog('----------------------------hocSinh', hocSinh)
      let request
      if (hocSinh == null) {
        request = await notification(this.props.listchild[0].MaKhachHang)
      } else {
        request = await notification(hocSinh.MaKhachHang)
      }
      Utils.nlog('----------------------------hocSinh', request)

      if (request.success == true) {
        let tien = 0
        this.setState({ checked: request.data.Bills.length - 1 })
        for (let i = 0; i < request.data.Bills.length; i++) {
          tien += request.data.Bills[i].Amount;
        }
        this.list = request.data.Bills
        this.setState({
          tenHocSinh: request.data.StudentName,
          data: this.list,
          tongTien: tien,
          tongTienAll: tien
        })
        this.HocSinh = request.data;
      }
    }
  }
  _check = (index, item) => {
    this.setState({ isSelect: true })
    const { checked, data } = this.state;
    Utils.nlog('---------------------- index', index)
    Utils.nlog('---------------------- checked', checked)
    // let tempIndex = checked == index ? index - 1 : index;
    let tempIndex = checked == index ? index : index;
    let tongSelect = 0;
    for (let i = 0; i <= tempIndex; i++) {
      tongSelect += data[i].Amount;
    }
    this.setState({ checked: tempIndex, tongTien: tongSelect })
  }

  _renderItemChild = ({ item, index }) => {
    return (
      <View style={{ paddingVertical: 10, paddingRight: 14 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text
            style={{ borderBottomColor: colors.black_11, marginBottom: 3, fontSize: sizes.sText15, flex: 1, marginHorizontal: 5, fontWeight: "bold" }}>
            Tháng {item.Month}
          </Text>
          <Text style={{ fontSize: sizes.sText18, alignItems: "flex-end" }}>
            {Utils.formatMoney(item.Amount) + "đ"}
          </Text>
          <View style={{ width: 20 }} />
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this._check(index, item)} >
            <Image
              resizeMode="contain"
              source={index <= this.state.checked ? Images.CheckTour : Images.unCheckTour}
              style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]}>
        <HeaderCom
          nthis={this}
          iconLeft={Images.icbackspace}
          titleText={"Thanh toán học phí"} />
        <ScrollView style={nstyles.nbody}>
          <View style={{ width: width, alignItems: 'center', backgroundColor: 'white' }}>
            <Image resizeMode="contain" source={Images.logoSSC} style={{ width: width * 0.3, height: width * 0.15 }}></Image>
          </View>
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: sizes.sText14 }}> Chi tiết học phí của </Text>
          <Text style={{ textAlign: "center", marginTop: 5, fontSize: sizes.sText18, fontWeight: "bold" }} >{this.state.tenHocSinh} </Text>
          <View
            style={{ flex: 1, backgroundColor: "white", margin: 15, paddingLeft: 14, paddingVertical: 10 }} >
            <TouchableOpacity style={{ alignItems: "flex-end", flex: 1, paddingRight: 14 }} onPress={() => this._check(this.state.data.length - 1, 0)} >
              <Text style={{ fontSize: 14, marginVertical: 8 }}>Chọn tất cả</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: colors.colorBrownishGrey, opacity: 0.3 }} />
            <View style={{ marginBottom: 5, flex: 1 }}>
              <FlatList showsVerticalScrollIndicator={false} renderItem={this._renderItemChild} data={this.state.data} extraData={this.state.checked} keyExtractor={(item, index) => index.toString()} />
            </View>
            <View
              style={{ backgroundColor: colors.whitegay, marginVertical: 10, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, color: "#0099FF", paddingTop: 10 }}>
                Tổng thanh toán:
                <Text style={{ fontSize: 20, color: "#0099FF" }}>
                  {Utils.formatMoney(this.state.tongTien) + " đ"}
                </Text>
              </Text>
              <Text style={{ fontSize: 13, color: colors.dark, paddingBottom: 10 }}>
                Còn lại: {Utils.formatMoney(this.state.tongTienAll - this.state.tongTien) + " đ"}
              </Text>
            </View>
          </View>
          <ButtonCom
            text={"Tiếp tục"}
            onPress={() => this._subThanhToan()}
            style={{ backgroundColor: colors.bgYSchoold, marginHorizontal: 30, marginBottom: 15 }}
            txtStyle={{ fontSize: 18, fontWeight: "bold" }}
          />
        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(ListHocPhi, mapStateToProps)
