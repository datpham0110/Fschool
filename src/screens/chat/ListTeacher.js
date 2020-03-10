import React, { Component } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ListEmpty
} from "react-native"
import HeaderCom from "../../components/HeaderCom"
import { nstyles } from "../../styles/styles"
import Utils from "../../app/Utils"
import { Images } from "../../images"
import { loadListTeacher } from "../../apis/chat"
import { nGlobalKeys } from "../../app/keys/globalKey"
const { width, height } = Dimensions.get("window")
import { colors, } from "../../styles";
import { sizes, reSize } from "../../styles/size";
import moment from 'moment'
import { withNavigationFocus } from 'react-navigation';




function handleTime(second) {
  if (second < 60) return { value: second, name: 'giây' };
  if (second >= 60 && second < 3600) return { value: Math.round(second / 60), name: 'phút' };
  if (second >= 3600 && second < 86400) return { value: Math.round(second / 3600), name: 'giờ' };
  if (second >= 86400) return { value: Math.round(second / 86400), name: 'ngày' };
}
class ListTeacher extends Component {
  constructor(props) {
    super(props)
    nthisListTeacher = this;
    this.state = {
      data: [],
      childSelected: Utils.getGlobal(nGlobalKeys.childSelected, undefined),
      refreshing: true,
      showload: false,
    }
    this.dataNotifycation1 = Utils.ngetParam(this, 'dataNotifycation1', null);
    this.itemChill = Utils.ngetParam(this, 'itemChill', '');
    this.ChillSelect = '';
    this.reloadDataGoBack = Utils.ngetParam(this, 'reloadData', () => { });
  }
  componentDidMount() {
    Utils.setGlobal(nGlobalKeys.screenSelected, 'listTeacher')
    if (this.dataNotifycation1 != null) {
      if (this.props.listchild.length > 0) {
        if (this.dataNotifycation1.IdKhachHang != undefined) {
          for (let i = 0; i < this.props.listchild.length; i++) {
            if (this.dataNotifycation1.IdKhachHang == this.props.listchild[i].IDKhachHang) {
              this.setState({ childSelected: this.props.listchild[i] })
              Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
              this._loadData(this.state.dateFocus, this.dataNotifycation1.IdKhachHang)
              break;
            }
          }
        } else {
          this._loadData(this.state.dateFocus, this.props.listchild[0].IDKhachHang)
          this.setState({ childSelected: this.props.listchild[0] })
        }
      } else {
        Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
      }
    } else {
      for (let i = 0; i < this.props.listchild.length; i++) {
        if (this.itemChill.IDHocSinh == this.props.listchild[i].IDKhachHang) {
          this.ChillSelect = this.props.listchild[i];
          this._loadListChat(this.props.listchild[i].IDKhachHang)
          return;
        }
      }
    }
    this.loadMesInterval()
    var intervalId = setInterval(this.timer, 1000000)
    this.setState({ intervalId: intervalId })

  }
  componentWillUnmount() {
    Utils.setGlobal(nGlobalKeys.screenSelected, '')
    try {
      clearInterval(this.state.intervalId)
    } catch (error) { }
  }
  timer = () => {
    // this.loadMesInterval();
  }
  loadMesInterval = async => {
    // this._loadData();
  }

  _loadListChat = async (IDKhachHang) => {
    if (this.state.childSelected != undefined) {
      let res = await loadListTeacher(IDKhachHang)
      if (res.success == true) {
        this.setState({ data: res.data.GhiChuData })
      } else {
        this.setState({ data: [] })
      }
    }
    this.setState({ refreshing: false, showload: false });
  }

  _ClickTeacher = (item, IDGiaoVien, FullName) => () => {
    if (item.IdLop != 0 || item.IdChatGroup != 0) {
      Utils.goscreen(this, "sc_Chat", {
        IDGiaoVien: IDGiaoVien,
        FullName: FullName,
        isGroup: true,
        _reloadDataBack: this._reloadDataBack,
        flagChatGroup: true,
        IdLop: item.IdLop,
        TenLop: item.TenLop,
        DataGroupChat: item
      })
    } else {
      Utils.goscreen(this, "sc_Chat", {
        IDGiaoVien: IDGiaoVien,
        FullName: FullName,
        isGroup: false,
        _reloadDataBack: this._reloadDataBack,
        flagChatGroup: false,
        dataChatSimple: item,
        flagNotify: false
      })
    }
  }

  _reloadDataBack = (flag) => {
    if (flag == true) {
      this.setState({ childSelected: Utils.getGlobal(nGlobalKeys.childSelected, undefined) })
      this._loadData()
    }
  }

  _loadData = async () => {
    let res = await loadListTeacher(this.ChillSelect.IDKhachHang)
    if (res.success == true) {
      this.setState({ data: res.data.GhiChuData })
    } else {
      this.setState({ data: [] })
    }
    this.setState({ refreshing: false, showload: false });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true }, () => this._loadData());
  }


  renderItemUser = ({ item, index }) => {
    const time = handleTime(Utils.datesDiff(new Date(), moment(item.CreatedDate, 'YYYY/MM/DD HH:mm'), true));
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._ClickTeacher(item, item.IdTeacher, item.TenKH)}  >
          <View style={styles.viewRowItemChatUser}>
            {item.TenLop == null ? <Image
              source={Images.imgProfile}
              resizeMode="contain"
              style={styles.imgaeAvatar}
            /> :
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={Images.imgProfile}
                    resizeMode="contain"
                    style={styles.imgaeAvatarGroup}
                  />
                  <Image
                    source={Images.imgProfile}
                    resizeMode="contain"
                    style={styles.imgaeAvatarGroup}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={Images.imgProfile}
                    resizeMode="contain"
                    style={styles.imgaeAvatarGroup}
                  />
                  <Image
                    source={Images.imgProfile}
                    resizeMode="contain"
                    style={styles.imgaeAvatarGroup}
                  />
                </View>
              </View>}

            <View style={{ marginLeft: 5, flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[styles.textMessage, { fontWeight: '600' }]}>
                {item.IdLop == 0 && item.IdChatGroup != 0 ? item.TenChatGroup : item.IdLop != 0 && item.IdChatGroup == 0 ? item.TenLop : item.TenKH}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.textMessage, { marginTop: 5, opacity: item.NumberMgsUnread == 0 ? 0.5 : 1 }]}>
                {<Text style={{ fontWeight: 'bold', }}>{item.NoiDung}</Text>}
              </Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <View style={{ alignItems: 'flex-end' }}>
                {
                  item.NumberMgsUnread == 0 ? null :
                    <View style={styles.viewNumberOldMessage}>
                      <Text style={styles.textNumberOldMessage}>
                        {item.NumberMgsUnread == 0 ? '' : 'N'}
                      </Text>
                    </View>
                }
                <Text style={styles.textMessage}>
                  {time ? time.name == 'giây' ? 'now' : (`${time.value} ${time.name} trước`) : ''}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  _renderdata = (item) => {
    this.setState({ childSelected: item });
    this._loadListChat(item.IDKhachHang)
  }
  _renderItemMenu = ({ item, index }) => {
    var { data } = this.state
    var BorderTop = 0
    var BorderBottom = 0
    var BackgroundColor = colors.black_11
    if (index == 0) {
      BorderTop = 6
    }
    if (index % 2 != 0) {
      BackgroundColor = colors.white;
    }
    if (index == data.length - 1) {
      BorderBottom = 6;
    }
    return (
      <TouchableOpacity style={
        [nstyles.nrow, {
          padding: 10, borderTopRightRadius: BorderTop, borderTopLeftRadius: BorderTop,
          borderBottomLeftRadius: BorderBottom, borderBottomRightRadius: BorderBottom, backgroundColor: BackgroundColor
        }]}
        onPress={this._ClickTeacher(item.Id, item.FullName)} >
        <Image
          resizeMode="contain"
          source={Images.imgProfile}
          tintColorLeft={colors.black_11}
          style={{ width: width * 0.15, height: width * 0.15 }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.text16, { justifyContent: "center", marginLeft: 10, paddingTop: 5 }]} >  {item.TenGiaoVien}</Text>
          <Text style={[styles.text16, { justifyContent: "center", marginLeft: 10, paddingTop: 5 }]} >  {item.NoiDung}</Text>
        </View>
        <View>
        </View>
      </TouchableOpacity>
    )
  }

  _goBack = () => {
    this.reloadDataGoBack();
    Utils.goback(this)
  }
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
        <HeaderCom
          iconLeft={Images.icbackspace}
          nthis={this}
          titleText={"Chọn giáo viên"}
          onPressLeft={this._goBack}
        />
        <View style={{ backgroundColor: colors.BackgroundHome, flex: 1 }} >
          {this.state.childSelected == undefined ? <Text Text style={{ textAlign: 'center', marginTop: 20 }}>Tài khoản chưa liên kết với học sinh</Text> :
            <View style={nstyles.nbody}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 20, backgroundColor: 'white' }}
                renderItem={this.renderItemUser}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            </View>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text16: {
    fontSize: sizes.sText16
  },
  textMessage: {
    flex: 1,
    fontSize: sizes.sText12,
    color: colors.blackShadow,
    justifyContent: "center",
    marginLeft: 10,
  },
  viewNumberOldMessage: {
    backgroundColor: colors.colorRed,
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNumberOldMessage: {
    fontSize: sizes.sText10,
    color: colors.white,
    fontWeight: 'bold'
  },

  viewRowItemChatUser: {
    ...nstyles.nrow,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  imgaeAvatar: {
    width: reSize(48),
    height: reSize(48),
    borderColor: colors.paleGrey,
    borderWidth: 0.5,
    borderRadius: reSize(24)
  },
  imgaeAvatarGroup: {
    width: reSize(24),
    height: reSize(24),
    borderColor: colors.paleGrey,
    // borderWidth: 0.5,
    borderRadius: reSize(24)
  },
});

const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(withNavigationFocus(ListTeacher), mapStateToProps, false)
