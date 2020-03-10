import React, { Component, PureComponent } from "react"
import Utils from "../../app/Utils"
import {
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  Switch
} from "react-native"
// import HeaderCom from '../../components/HeaderCom';
import HeaderCom from "../../components/HeaderCom"
import { nkey } from "../../app/keys/keyStore"
import { nstyles } from "../../styles/styles"
import { Images } from "../../images"
import { colors } from "../../styles/color"
import { sizes } from "../../styles"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { ThongBaoInsertUpdate } from "../../apis/getNotifycation"
import { DeleteToken } from '../../apis/getNotifycation';
const { width, height } = Dimensions.get("window")
import { appConfig } from '../../app/Config';

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sound: false,
      notifi: true,
      datacheck: 0
    }
  }
  onLogout = () => {
    Utils.showMsgBoxYesNo(this, 'Thông báo', 'Bạn có chắc chắn muốn đăng xuất?', 'Đăng xuất', 'Xem lại', this._logout);
  }
  _logout = async () => {
    Utils.nsetStore(nkey.token, null)
    Utils.nsetStore(nkey.phonenumber, null)
    Utils.nsetStore(nkey.password, null)
    Utils.setGlobal(nGlobalKeys.informationAccount, [])
    this.props.setListChild([])
    let res = await DeleteToken();
    Utils.goscreen(this, "sc_EnterYourPhoneNumber")
  }
  componentDidMount() {
    this.postNotification()
  }
  postNotification = async () => {
    let device = Utils.getGlobal(nGlobalKeys.notification, '')
    Utils.nlog('Utils.getGlobal(nGlobalKeys.notification  settting', device)
    let rowId = Utils.getGlobal(nGlobalKeys.rowId, "")
    let res = await ThongBaoInsertUpdate(
      device.userId,
      rowId,
      Platform.OS
    )
    var datacheck = res.data.Status
    this.setState({ datacheck })
    Utils.nlog("postNotification", datacheck)
    Utils.setGlobal(nGlobalKeys.dataNotifycation, res.data)
  }

  onChangeActive = id => () => {
    // let valtemp = false
    // if (id == 1) {
    //   valtemp = !this.state.notifi
    //   this.setState({ notifi: valtemp })
    // }
  }
  render() {
    var { datacheck } = this.state
    return (
      <View
        style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]}
      >
        <HeaderCom
          nthis={this}
          titleText={"Cài đặt"}
          iconLeft={Images.icbackspace}
        />

        <View
          style={{
            flexDirection: "column",
            marginLeft: width * 0.0625,
            marginRight: width * 0.0625,
            marginTop: width * 0.05,
            backgroundColor: colors.white,
            paddingVertical: 20
          }}
        >
          {/* <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              height: width * 0.12,
              alignItems: "center",
              marginHorizontal: 20,
              borderBottomColor: colors.veryLightPinkThree
            }}
          >
            <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>
              Nhận thông báo
            </Text>
            <Switch
              trackColor={{ true: "#29A9E0" }}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }] }}
              onValueChange={this.onChangeActive(datacheck)}
              value={this.state.notifi}
            />
          </View> */}

          {/* <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              height: width * 0.12,
              alignItems: "center",
              marginHorizontal: 20,
              borderBottomColor: colors.veryLightPinkThree
            }}
          >
            <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>
              Âm thanh
            </Text>
            <Switch
              trackColor={{ true: "#29A9E0" }}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }] }}
              onValueChange={this.onChangeActive()}
              value={this.state.sound}
            />
          </View> */}

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              alignItems: "center",
              marginHorizontal: 20, paddingVertical: 20, borderBottomColor: colors.veryLightPinkThree
            }}>
            <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.fs(20) }}>
              Điều khoản sử dụng
            </Text>
            <TouchableOpacity onPress={() => Utils.goscreen(this, 'Modal_ThoaThuanNguoiDung')} style={{ marginLeft: 5, fontSize: sizes.fs(17) }}>
              <Text style={{ color: 'blue' }}>
                Xem chi tiết
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", paddingVertical: 20, alignItems: "center", marginHorizontal: 20 }} >
            <Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.fs(20) }}>
              Phiên bản
            </Text>
            <Text style={{ marginLeft: 5, fontSize: sizes.fs(17) }}>
              {appConfig.version}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={this.onLogout}
          style={{ backgroundColor: colors.white, marginHorizontal: 25, paddingVertical: 15, marginTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 15,
              fontSize: sizes.fs(20),
              color: colors.colorPink,
              fontWeight: '400'
            }}
          >
            Đăng xuất tài khoản
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(Setting, mapStateToProps, true)
