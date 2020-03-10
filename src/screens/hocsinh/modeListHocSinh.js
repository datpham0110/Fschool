import React, { Component } from "react"
import { sizes } from "../../styles"
import { Text, View, Dimensions, TouchableOpacity, FlatList } from "react-native"
import { colors } from "../../styles/color"
import { xacNhanHocSinh } from "../../apis/apiLogin"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { infoPhuhuyenh } from "../../apis/welcome"
import Moment from "moment";
import { DanhSachHocSinh } from '../../apis/chat';
import { notifyParents } from '../../apis/welcome'; import Utils from "../../app/Utils"
const { width, height } = Dimensions.get("window")

class ModelListHocSinh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: Utils.ngetParam(this, "data", () => { }),
      SSCId: 0,
      ObjectHocSinh: [],
      flagScree: Utils.ngetParam(this, "flag", () => { }),
      maTruong: Utils.ngetParam(this, "maTruong", () => { })
    }
    this.goBack = Utils.ngetParam(this, 'goBack', () => { })
  }

  componentDidMount() {
    if (this.state.data.length == 1) {
      this.setState({ SSCId: this.state.data[0].SSCId })
      Utils.setGlobal(nGlobalKeys.ObjectHocSinh, this.state.data[0])
    }

  }
  onCancel = () => {
    Utils.goback(this, null)
  }

  _touchItem = item => () => {
    this.setState({ SSCId: item.SSCId })
    Utils.setGlobal(nGlobalKeys.ObjectHocSinh, item)
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
  _dongY = async () => {
    if (Utils.getGlobal(nGlobalKeys.ObjectHocSinh, '') == '') {
      Utils.showMsgBoxOK(
        this,
        "Thông báo",
        "Bạn phải chọn học sinh để xác nhận",
        "Đóng"
      )
      return;
    }
    let res1 = await xacNhanHocSinh(false, this.state.maTruong)
    if (res1.success == true) {
      let res2 = await infoPhuhuyenh()
      if (res2.success == true) {
        this._loadDataRedux();
        this.props.setListChild(res2.data.HocSinh)
        if (this.state.flagScree == true) {
          this.goBack();
          Utils.goback(this);
        } else {
          Utils.goscreen(this, "sc_Welcome")
        }
      } else {
        Utils.showMsgBoxOK(this, "Thông báo", "Xác nhận không thành công, vui lòng thử lại sau", "Đóng")
      }
    } else {
      if (res1.error.code == 103) {
        Utils.showMsgBoxOK(this, "Thông báo", "Học sinh này đã được liên kết với tài khoản", "Đóng");
      }
      else {
        Utils.showMsgBoxOK(this, "Thông báo", "Bạn không thể liên kết với học sinh này do số điện thoại đăng ký với học sinh không đúng.", "Đóng");
      }
    }
  }
  _renderItemChild = ({ item, index }) => {
    var ColorBrg = colors.BackList;
    if (index % 2 != 0) {
      ColorBrg = '#e3e1e1';
    }
    return (
      <TouchableOpacity
        onPress={this._touchItem(item)}
        style={{
          fontSize: sizes.sizes.sText18,
          borderWidth: 1,
          marginVertical: 5,
          paddingLeft: 10,
          marginHorizontal: 5,
          borderRadius: 5,
          backgroundColor:
            this.state.SSCId == item.SSCId
              ? colors.colorGreenTwo1
              : ColorBrg,
          borderColor: colors.veryLightPinkThree
        }}
      >
        <Text style={{ marginVertical: 5, color: this.state.SSCId == item.SSCId ? colors.white : colors.black, fontWeight: '500' }}>Họ tên: {item.FullName}  </Text>
        <Text style={{ marginVertical: 5, color: this.state.SSCId == item.SSCId ? colors.white : colors.black, fontWeight: '500' }}>Ngày sinh: {Moment(item.Birthday, 'YYYY-MM-DD').format("DD/MM/YYYY")}</Text>
        <Text style={{ marginVertical: 5, color: this.state.SSCId == item.SSCId ? colors.white : colors.black, fontWeight: '500' }}>{item.ClassName} </Text>
        <Text style={{ marginVertical: 5, color: this.state.SSCId == item.SSCId ? colors.white : colors.black, fontWeight: '500' }}>Mã HS: {item.SSCId}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View
        style={{ backgroundColor: colors.black_50, flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ backgroundColor: colors.white, width: width * 0.9, borderRadius: 3, height: height * 0.9 }}>
          <Text
            style={{ textAlign: "center", marginBottom: 10, marginTop: 15, fontSize: sizes.sizes.sText15 }}>Danh sách học sinh</Text>
          <View
            style={{ marginHorizontal: 5, marginBottom: 5, flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              renderItem={this._renderItemChild}
              data={this.state.data}
              extraData={this.state.SSCId}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: colors.black_20, borderRadius: 2, width: width * 0.3, marginLeft: 20 }}
              onPress={() => Utils.goback(this)}>
              <Text
                style={{ marginHorizontal: 5, textAlign: "center", color: "white", marginVertical: 5 }}> HUỶ</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              style={{ backgroundColor: colors.colorPink, borderRadius: 2, width: width * 0.3, alignContent: "flex-end", marginRight: 20 }}
              onPress={this._dongY} >
              <Text style={{ marginHorizontal: 10, marginVertical: 5, textAlign: "center", color: "white" }} >XÁC NHẬN </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(ModelListHocSinh, mapStateToProps, true)
