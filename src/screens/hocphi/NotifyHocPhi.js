import React, { Component } from "react"
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native"
import { Dimensions } from "react-native"
import { colors, sizes } from "../../styles"
import Utils from "../../app/Utils"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { notification } from "../../apis/notifycation"
import ButtonCom from "../../components/Button/ButtonCom"
import { nstyles } from "../../styles/styles"
import { Images } from "../../images"
const { width, height } = Dimensions.get("window")
class NotifyHocPhi extends Component {
  list = []
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      tongtien: "",
      msHocSInh: "",
      childSelected: '',
      flagLoad: false,
      hocsinh: Utils.getGlobal(nGlobalKeys.childSelected, ''),
    };
    this.isNotify = Utils.ngetParam(nthis, 'isNotify', false);
    this.dataNotify = Utils.ngetParam(nthis, 'dataNotify', '');
    this.listChild = props.listchild;
  }
  componentDidMount() {
    if (this.isNotify == true) {
      for (let i = 0; i < this.listChild.length; i++) {
        if (this.listChild[i].IDKhachHang == this.dataNotify.IDHocSinh) {
          this.loadData(this.listChild[i]);
          this.setState({ hocsinh: this.listChild[i] });
          Utils.setGlobal(nGlobalKeys.childSelected, this.listChild[i]);
          return;
        }
      }
    } else {
      if (this.listChild.length > 0) {
        this.setState({ hocsinh: this.listChild[0] });
        this.loadData(this.listChild[0]);
        Utils.setGlobal(nGlobalKeys.childSelected, this.listChild[0]);
      } else {
        Utils.setGlobal(nGlobalKeys.childSelected, null);
      }
    }
  }
  _clickMenu = route => () => {
    Utils.goscreen(nthis, route)
  }
  _renderdata = (item) => {
    this.loadData(item)
  }
  loadData = async (item) => {
    this.setState({ flagLoad: true, hocsinh: item });
    if (this.props.listchild.length > 0) {
      let request = await notification(item.MaKhachHang)
      if (request.success == true && request.data.Bills != null) {
        let tien = 0
        for (let i = 0; i < request.data.Bills.length; i++) {
          tien += request.data.Bills[i].Amount
        }
        this.list = request.data.Bills
        this.setState({
          tongtien: tien,
          data: this.list,
          msHocSInh: request.data.SSCId,
          flagLoad: false,
        })
        Utils.setGlobal(nGlobalKeys.childSelectedHocPhi, request.data)
      } else {
        this.setState({
          data: [],
          flagLoad: false
        })
        Utils.setGlobal(nGlobalKeys.childSelectedHocPhi, '')
      }
    } else {
      this.setState({
        data: [], flagLoad: false
      })
      Utils.showMsgBoxOK(nthis, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(nthis) });
    }
  }
  _renderItemChild = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => Utils.goscreen(nthis, "sc_ChiTietHocPhi", { data: item.Month, ID: this.state.msHocSInh })}
        style={{ backgroundColor: colors.white, padding: 15 }} >
        <Text style={{ borderBottomColor: colors.black_11, marginBottom: 3, fontSize: sizes.sizes.sText15, marginHorizontal: 5 }} >
          {item.Month}
        </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ fontSize: sizes.sizes.sText18, flex: 1 }}>
            Tiền nộp trong tháng:
          </Text>
          <Text style={{ fontSize: sizes.sizes.sText18, alignItems: "flex-end" }} >{Utils.formatMoney(item.Amount) + " đ"} </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={{ backgroundColor: colors.BackgroundHome, flex: 1 }}>
        <View style={{ backgroundColor: colors.BackgroundHome, flex: 1 }}>
          <ScrollView style={{ backgroundColor: colors.BackgroundHome, flex: 1 }} >
            <View style={{ width: width, alignItems: 'center', backgroundColor: 'white' }}>
              <Image resizeMode="contain" source={Images.logoSSC} style={{ width: width * 0.3, height: width * 0.15 }}></Image>
            </View>
            {this.props.listchild.length == 0 ? <Text style={{ textAlign: 'center', marginTop: 20 }}>Tài khoản chưa liên kết với học sinh</Text> :
              <TouchableOpacity
                style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 25, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 4 }]}
                onPress={() => Utils.goscreen(nthis, "Model_SelectHocSinh", { childSelected: this.state.hocsinh, _renderdata: this._renderdata })} >
                <View>
                  <Text style={{ textAlign: "center", paddingTop: 20, fontSize: sizes.sizes.sText14 }} > Chi tiết học phí của </Text>
                  <Text style={{ textAlign: "center", paddingVertical: 7, fontSize: sizes.sizes.sText18, fontWeight: "bold" }} > {this.state.hocsinh.TenKhachHang} </Text>
                </View>
                <View style={{ width: 10 }} />
                <Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nIcon20, { tintColor: colors.black_20 }]} />
              </TouchableOpacity>}
            {this.state.flagLoad == true ?
              <ActivityIndicator style={{ marginTop: 30 }}>
              </ActivityIndicator> :
              this.props.listchild.length > 0 ?
                <View>
                  {this.state.data.length == 0 ? <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có thông tin học phí để hiển thị</Text> :
                    <View>
                      <View style={{ backgroundColor: colors.white, marginVertical: 15, marginHorizontal: 25, paddingHorizontal: 15, borderRadius: 4 }}  >
                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                          <Text style={{ fontSize: sizes.sizes.sText18, color: colors.orange, flex: 1 }}>Tổng tiền phải nộp</Text>
                          <Text style={{ fontSize: sizes.sizes.sText18, color: colors.orange }}>{Utils.formatMoney(this.state.tongtien)} đ</Text>
                        </View>
                        {/* <View style={{ height: 1, backgroundColor: colors.brownishGreyTwo, opacity: 0.3 }} />
                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                          <Text style={{ fontSize: sizes.sizes.sText14, flex: 1 }}>Đã thanh toán</Text>
                          <Text style={{ fontSize: sizes.sizes.sText18 }}>0 đ</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: colors.brownishGreyTwo, opacity: 0.3 }} />
                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                          <Text style={{ fontSize: sizes.sizes.sText14, flex: 1, fontWeight: "bold" }}>  Còn lại  </Text>
                          <Text style={{ fontSize: sizes.sizes.sText18, color: colors.orange }}>{Utils.formatMoney(this.state.tongtien)} đ</Text>
                        </View> */}
                      </View>
                      <View style={{ backgroundColor: colors.white, marginHorizontal: 25, borderTopRightRadius: 4, borderTopLeftRadius: 4, flex: 1, marginBottom: 10 }}>
                        <Text style={{ fontSize: sizes.sizes.sText15, fontWeight: "500", padding: 15, color: "#0099FF" }}>Chi tiết các tiền phải nộp trong tháng</Text>
                        <View style={{ height: 1, backgroundColor: colors.brownishGreyTwo, opacity: 0.3, marginHorizontal: 15 }} />
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          renderItem={this._renderItemChild}
                          data={this.state.data}
                          keyExtractor={(item, index) => index.toString()} />
                      </View>
                    </View>}
                </View>
                : null
            }
          </ScrollView>
          {
            this.state.data.length > 0 && this.props.listchild.length > 0 ? <ButtonCom style={{ marginTop: 10, backgroundColor: colors.colorPink, marginHorizontal: 25, marginBottom: 20 }} onPress={this._clickMenu("sc_ListHocPhi")} text={"THANH TOÁN"} />
              : null
          }
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(NotifyHocPhi, mapStateToProps, true)
