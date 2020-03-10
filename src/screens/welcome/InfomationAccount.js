import React, { Component, PureComponent } from "react";
import Utils from "../../app/Utils";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import HeaderCom from "../../components/HeaderCom";
import { nkey } from "../../app/keys/keyStore";
import { nstyles, nwidth } from "../../styles/styles";
import { Images } from "../../images";
import { colors } from "../../styles/color";
import { sizes } from "../../styles/size";
import { nGlobalKeys } from "../../app/keys/globalKey";
import { deleteChildToAccount } from '../../apis/child';
import { infoPhuhuyenh, updateinfo } from "../../apis/welcome"
import { avatar } from '../../apis/apiLogin';
import { DanhSachHocSinh } from '../../apis/chat';
import { notifyParents } from '../../apis/welcome';
import ButtonCom from "../../components/Button/ButtonCom"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import IsLoading from "../../components/IsLoading"


class InfomationAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phonenumber: "",
      Strgender: "",
      DiaChi: "",
      Email: '',
      Gender: ''
    };
  }
  componentDidMount() {
    this._getData();
  }
  _getData = async () => {
    let fullname = await Utils.ngetStore(nkey.Fullname, "");
    let phonenumber = await Utils.ngetStore(nkey.phonenumber, "");
    let infomationAccount = Utils.getGlobal(
      nGlobalKeys.informationAccount,
      ''
    )
    this.setState({ phonenumber, fullname, Email: infomationAccount.Email, Strgender: infomationAccount.Strgender, Gender: infomationAccount.Strgender });
  };
  _clickMenu = route => () => {
    Utils.goscreen(this, route);
  };
  _clickChild = () => {
    Utils.goscreen(this, "Modal_EnterStudentInformation", { flag: true });
  };
  onDeleteChlid = (item) => {
    Utils.showMsgBoxYesNo(this, 'Thông Báo', 'Bạn có chắc chắn xoá học sinh ' + item.TenKhachHang + ' khỏi tài khoản', 'Xác Nhận', 'Quay Lại', () => this.deleteChild(item.MaKhachHang))
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
    } else {
      this.props.setListChildChat([]);

    }
  }
  _loadDataRedux = () => {
    this.listChillBaoBai();
    this.listChillChat();
  }
  deleteChild = async (idHS) => {
    let res = await deleteChildToAccount(idHS);
    this.waitting.show();
    if (res.success == true) {
      this._loadDataRedux();
      let res2 = await infoPhuhuyenh()
      Utils.setGlobal(
        nGlobalKeys.informationAccount,
        res.data
      )
      if (res2.success == true) {
        this.props.setListChild(res2.data.HocSinh)
        if (res2.data.HocSinh.length == 0) {
          Utils.setGlobal(nGlobalKeys.IdHocSinh, '');
          Utils.setGlobal(nGlobalKeys.tenKH, '');
          Utils.setGlobal(nGlobalKeys.GioiTinh, '');
          Utils.setGlobal(nGlobalKeys.MaKhachHang, '');
          Utils.setGlobal(nGlobalKeys.IDLopHoc, '');
          Utils.setGlobal(nGlobalKeys.IDKhachHang, '');
          Utils.setGlobal(nGlobalKeys.IDChiNhanhHocSinh, '');
        }
      }
    } else {
      Utils.nlog(this, 'Thông báo', 'Xoá học sinh không thành công, vui lòng liên hệ lại', 'Đóng');
    }
    this.waitting.hide();
  }
  _renderItemChild = ({ item, index }) => {
    return (
      <View key={index}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.veryLightPinkThree
          , borderBottomWidth: 1
        }}>
          <View style={{
            flex: 1
          }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center", borderBottomColor: colors.veryLightPinkThree }} >
              <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText14 }}>
                Mã học sinh {index + 1}
              </Text>
              <Text style={{ marginRight: 20 }}>{item.MaKhachHang}</Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }} >
              <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText14 }}>
                Tên học sinh {index + 1}
              </Text>
              <Text style={{ marginRight: 20 }}>{item.TenKhachHang}</Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }} >
              <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText14 }}>
                Lớp học sinh {index + 1}
              </Text>
              <Text style={{ marginRight: 20 }}>{item.LopHoc}</Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }} >
              <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText14 }}>
                Trường
              </Text>
              <Text style={{ marginRight: 20 }}>{item.TenChiNhanh}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.onDeleteChlid(item)}>
            <Image
              resizeMode="contain"
              source={Images.icDelCard}
              style={{
                width: nwidth * 0.05,
                height: nwidth * 0.05
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _goMediapicker = (optionsCus) => {
    if (optionsCus == undefined || optionsCus == null)
      optionsCus = {};
    response = (res) => {
      if (res.iscancel) {
      }
      else if (res.error) {
      }
      else {
        this.checkChangeAvatar = true;
        this.avatar = res;
        this.setState({ avatar: res[0].uri + '?' + new Date() });
        this.uploadavatar(res);
      }
    };
    let options = {
      assetType: 'Photos', //All,Videos,Photos - default
      multi: false,// chọn 1 or nhiều item
      response: response, // callback giá trị trả về khi có chọn item
      limitCheck: -1, //gioi han sl media chon: -1 la khong co gioi han, >-1 la gioi han sl =  limitCheck
      ...optionsCus
    };
    Utils.goscreen(this, 'sc_MediaPicker', options);
  }

  uploadavatar = async (res) => {
    const resBase64 = await Utils.parseBase64(res[0].uri, res[0].height, res[0].width);
    let ress = await avatar(resBase64, res[0].idItem);
    if (ress.success == true) {
      this._loadAvatar();
    }
  }
  _loadAvatar = async () => {
    let res = await infoPhuhuyenh();
    if (res.success == true) {
      this.props.setAvatar(res.data.Avatar);
    }
  }
  Update = async () => {
    let infomationAccount = Utils.getGlobal(
      nGlobalKeys.informationAccount,
      ''
    )
    if (this.state.fullname.trim().length == 0) {
      Utils.showMsgBoxOK(this, 'Thông báo', 'Họ và tên không được để trống!', 'Đóng');
      return;
    }
    if (!Utils.validateEmail(this.state.Email)) {
      Utils.showMsgBoxOK(this, 'Thông báo', 'Email không hợp lệ!', 'Đóng');
      this.setState({ Email: infomationAccount.Email })
      return;
    }
    this.waitting.show();
    let res = await updateinfo(this.state.fullname, this.state.Email, this.state.Strgender);
    if (res.success == true) {
      let res = await infoPhuhuyenh();
      Utils.showMsgBoxOK(this, 'Thông báo', 'Cập nhật thông tin tài khoản thành công', "Đóng")
    } else {
      let res = await infoPhuhuyenh();
      Utils.showMsgBoxOK(this, 'Thông báo', 'Cập nhật thông tin tài khoản thất bại', "Đóng")
    }
    this.waitting.hide();
  }
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]}>
        <HeaderCom nthis={this} iconLeft={Images.icbackspace} titleText={"Thông tin tài khoản"} />
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={400}
          innerRef={ref => (this.scroll = ref)}>
          <View style={{ marginVertical: nwidth * 0.0625, marginHorizontal: nwidth * 0.05, backgroundColor: colors.white, paddingLeft: 20 }}>
            <View
              style={{ borderBottomWidth: 1, alignItems: "center", borderBottomColor: colors.veryLightPinkThree, paddingVertical: 20 }} >
              <TouchableOpacity onPress={this._goMediapicker}>
                <Image resizeMode="cover" source={Images.imgProfile} tintColorLeft={colors.black_11} style={{ borderRadius: 40, width: nwidth * 0.2, height: nwidth * 0.2 }} />
                <Image resizeMode="cover" source={{ uri: this.props.avatar }} tintColorLeft={colors.black_11} style={{ borderRadius: 40, width: nwidth * 0.2, height: nwidth * 0.2, position: 'absolute' }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this._clickMenu("sc_ChangePassword")}>
              <View style={{ flexDirection: "row", height: nwidth * 0.12, alignItems: "center" }}>
                <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>
                  Đổi mật khẩu
                </Text>
                <Image
                  resizeMode="contain"
                  source={Images.iconNext1}
                  style={{
                    width: nwidth * 0.04,
                    height: nwidth * 0.04,
                    marginRight: 20
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: nwidth * 0.05,
              backgroundColor: colors.white,
              paddingLeft: 20
            }}
          >
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={this._renderItemChild}
              data={this.props.listchild}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{ flexDirection: "column", marginHorizontal: nwidth * 0.05, backgroundColor: colors.white, paddingLeft: 20, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                height: nwidth * 0.12,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: colors.veryLightPinkThree
              }}>
              <Text style={{ marginLeft: 5, fontSize: sizes.sText17 }}>Số điện thoại</Text>
              <Text style={{ marginRight: 20, flex: 1, textAlign: 'right' }}>{this.state.phonenumber}</Text>
            </View>
            <View style={{ flexDirection: "row", height: nwidth * 0.12, alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.veryLightPinkThree }}>
              <Text style={{ marginLeft: 5, fontSize: sizes.sText17 }}>
                Họ và tên
              </Text>
              <TextInput
                multiline={true}
                style={[nstyles.ntextinput, { maxHeight: 100, flex: 1, textAlign: 'right' }]}
                onChangeText={(fullname) => this.setState({ fullname })}
              >{this.state.fullname}</TextInput>
            </View>
            <View
              style={{ flexDirection: "row", height: nwidth * 0.12, alignItems: "center" }}>
              <Text style={{ marginLeft: 5, fontSize: sizes.sText17 }}>Email</Text>
              <TextInput
                multiline={true}
                style={[nstyles.ntextinput, { maxHeight: 100, flex: 1, textAlign: 'right' }]}
                onChangeText={(Email) => this.setState({ Email })}
              >{this.state.Email}</TextInput>
            </View>
            {/* <View style={{ flexDirection: "row", height: nwidth * 0.12, alignItems: "center", marginBottom: 5, }}>
              <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Giới tính</Text>
              <Text style={{ marginRight: 20 }}>{this.state.Strgender}</Text>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: nwidth * 0.05,
              backgroundColor: colors.white,
              paddingLeft: 20,
              marginTop: 20
            }}
          >
          </View>
          <View style={[nstyles.nrow, { height: 55, justifyContent: 'center' }]}>
            <ButtonCom
              colorChange={['#f8b199', '#f27972']}
              onPress={this.Update}
              Linear={true}
              text={"Xác nhận"}
              style={{ paddingHorizontal: 50, marginTop: 10 }}
            />
          </View>
        </KeyboardAwareScrollView>
        <IsLoading ref={refs => this.waitting = refs} />

      </View >
    );
  }
}

const mapStateToProps = state => ({
  listchild: state.listchild,
  avatar: state.avatar
});

export default Utils.connectRedux(InfomationAccount, mapStateToProps, true);
