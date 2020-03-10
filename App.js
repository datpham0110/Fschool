import React, { Component } from "react"
import {
  Platform,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Vibration
} from "react-native"
import { AppStack } from "./src/routers/screen"
// -- end --
import { nColors, nstyles } from "./src/styles/styles"
import { createAppContainer } from "react-navigation"
import codePush from "react-native-code-push"
//---
import { Provider } from "react-redux"
import store from "./src/srcRedux/store"
import OneSignal from 'react-native-onesignal';
const prefix = "jeekidstudent://"
const AppContainer = createAppContainer(AppStack)
import { Images } from "./src/images"
import { ifIphoneX } from "react-native-iphone-x-helper"
import Utils from "./src/app/Utils"
import { nGlobalKeys } from "./src/app/keys/globalKey"
import { notifyParents } from './src/apis/welcome';
import { DanhSachHocSinh } from './src/apis/chat';
import { ThongBao_ListAll_App, ThongBao_ListAll_App_V2 } from './src/apis/notifycation';

const { width, height } = Dimensions.get("window")
const DURATION = 1000;
class App extends Component {
  constructor(props) {
    super(props);
    nthisApp = undefined;
    nthisRedux = undefined;
    nthisListTeacher = undefined;
    nthisAppNotifyAll = undefined;
    this.state = {
      snoti: '',
      stitle: '',
      sType: '',
      topnotifi: new Animated.Value(-100),
    }
    this.dataNotify = '',
      this.deedlink = ''
  }

  componentDidMount() {
    this.onReceived = this.onReceived.bind(this);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.inFocusDisplaying(0);
  }


  //---Envent One Signal
  onReceived(notification) {
    if (notification.payload.additionalData.data.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ListTeacher') {
      if (notification.payload.additionalData.data.LoaiChat == '1') {
        // Chat only
        if (notification.payload.additionalData.data.IdKhachHang == Utils.getGlobal(nGlobalKeys.isFocusChatSimpleIdKhachHang, '') && notification.payload.additionalData.data.IdTaiKhoan == Utils.getGlobal(nGlobalKeys.isFocusChatSimpleIdTaiKhoan, '')) {
          Utils.setGlobal(nGlobalKeys.flagDataChat, true)
          return;
        }
      } else {
        //Chat group
        if (notification.payload.additionalData.data.IdGroup == Utils.getGlobal(nGlobalKeys.isFocusGroupChatID, '')) {
          Utils.setGlobal(nGlobalKeys.flagDataChat, true)
          return;
        }
      }
      if (nthisListTeacher != undefined && nthisListTeacher.props.isFocused) {
        nthisListTeacher._loadData();
      }
    }
    if (nthisAppNotifyAll != undefined && nthisAppNotifyAll.props.isFocused) {
      nthisAppNotifyAll._getData(0);
    }

    this.dataNotify = notification.payload
    if (nthisRedux != undefined) {
      try {
        this._reloadDataNotify();
      } catch (error) { }
    }
    this.openNotifiCus(notification.payload);
  }
  openNotifiCus = async (notifi) => {
    strTitle = notifi.title;
    strThongBao = notifi.body;
    this.dataNotify = notifi
    this.deedlink = notifi.additionalData.data.deeplink
    this.setState({ stitle: strTitle, snoti: strThongBao });
    Vibration.vibrate(DURATION);
    Animated.timing(
      this.state.topnotifi,
      {
        toValue: 0,
        duration: 800
      }
    ).start();
    setTimeout(() => {
      Animated.timing(
        this.state.topnotifi,
        {
          toValue: -100,
          duration: 450
        }
      ).start();
      this.setState({ stitle: '' });
    }, 4500);
  }
  _reloadDataNotify = async () => {
    let dataNotifycation1 = this.dataNotify.additionalData.data;
    if (dataNotifycation1.TypeNew == 'GhiChu' || dataNotifycation1.TypeNew == 'BaoBai') {
      this._loadDataNotifyBaoBai();
    }
    if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ThongBao') {
      this._loadDataNotifyThongBao();
    }
    if (dataNotifycation1.TypeNew == 'ThuMoiSuKien') {
      this._loadDataNotifyThuMoiSuKien();
    }
    if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ListTeacher') {
      this._reloadListChillRedux();
    }
    this._loadDataNotifyShow();
    this._notifyThongBaoAll();
  }
  _reloadListChillRedux = async () => {
    let res = await DanhSachHocSinh();
    if (res.success == true) {
      nthisRedux.props.setListChildChat(res.data);
    }
  }

  // load data notify báo bài
  _loadDataNotifyBaoBai = async () => {
    let res = await notifyParents(2); // Báo bài 2
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        nthisRedux.props.setSumNotifyBaoBai(this._sumNotify(res.data.HocSinh));
        nthisRedux.props.setListChildBaoBai(res.data.HocSinh)
      }
      else {
        nthisRedux.props.setSumNotifyBaoBai(0);
        nthisRedux.props.setListChildBaoBai([])
      }
    } else {
      nthisRedux.props.setListChildBaoBai([]);
      nthisRedux.props.setSumNotifyBaoBai(0);
    }
  }
  // Load data notify thông báo all
  _notifyThongBaoAll = async () => {
    let res = await notifyParents(0); // Thông báo all
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        nthisRedux.props.setListChildThongBaoAll(res.data.HocSinh)
      }
      else {
        nthisRedux.props.setListChildThongBaoAll([]);
      }
    } else {
      nthisRedux.props.setListChildThongBaoAll([]);
    }
  }
  // Load data notify thông báo
  _loadDataNotifyThongBao = async () => {
    let res = await notifyParents(1); // Thông báo 1
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        nthisRedux.props.setSumNotifyThongBao(this._sumNotify(res.data.HocSinh));
        // nthisRedux.props.setListChildBaoBai(res.data.HocSinh)
      }
      else {
        nthisRedux.props.setSumNotifyThongBao(0);
        // nthisRedux.props.setListChildBaoBai([])
      }
    } else {
      // nthisRedux.props.setListChildBaoBai([]);
      nthisRedux.props.setSumNotifyThongBao(0);
    }
  }

  // Load data notify thư mời sự kiện
  _loadDataNotifyThuMoiSuKien = async () => {
    let res = await notifyParents(7); // Thư mời sự kiện
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        nthisRedux.props.setSumNotifyThuMoiSuKien(this._sumNotify(res.data.HocSinh));
        nthisRedux.props.setListChildThuMoiSuKien(res.data.HocSinh)

      }
      else {
        nthisRedux.props.setSumNotifyThuMoiSuKien(0);
        nthisRedux.props.setListChildThuMoiSuKien([])

      }
    } else {
      nthisRedux.props.setSumNotifyThuMoiSuKien(0);
      nthisRedux.props.setListChildThuMoiSuKien([])
    }
  }

  _loadDataNotifyShow = async () => {
    // let res = await ThongBao_ListAll_App(0, 0);
    let res = await ThongBao_ListAll_App_V2(0, 0);
    if (res.success == true) {
      nthisRedux.props.setSumNotifyAllApp(res.CountTT > 100 ? 99 : res.CountTT);
    } else {
      nthisRedux.props.setSumNotifyAllApp([]);
    }
  }

  _sumNotify = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count += data[i].Soluong;
    }
    return count;
  }

  onnotiClick = () => {
    Animated.timing(
      this.state.topnotifi,
      {
        toValue: -100,
        duration: 450
      }
    ).start();
    if (!nthisApp)
      return;
    let dataNotifycation1 = this.dataNotify.additionalData.data;
    if (dataNotifycation1.TypeNew == 'KetQuaHocTap') {
      Utils.goscreen(nthisApp, 'sc_KetQuaHocTap')
      return;
    }
    if (dataNotifycation1.TypeNew == 'ThuMoiSuKien') {
      Utils.goscreen(nthisApp, 'sc_ThuMoiSuKien', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
      return;
    }
    if (dataNotifycation1.TypeNew == 'ThoiKhoaBieu') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'ThoiKhoaBieu') {
        Utils.goback(nthisApp)
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_ThoiKhoaBieu', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
        }, 200);
        return;
      } else {
        Utils.goscreen(nthisApp, 'sc_ThoiKhoaBieu', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
        return;
      }
    }
    if (dataNotifycation1.TypeNew == 'GocHoatDong') {
      Utils.goscreen(nthisApp, 'sc_GocHoatDongHome', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
      return;
    }
    if (dataNotifycation1.TypeNew == 'KhaoSat') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'KhaoSat') {
        Utils.goback(nthisApp)
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_KhaosatHome', { flagNotify: true })
        }, 200);
        return;
      } else {
        Utils.goscreen(nthisApp, 'sc_KhaosatHome')
        return;
      }
    }
    if (dataNotifycation1.type == 'KetQuaHocTap') {
      Utils.goscreen(nthisApp, 'sc_KetQuaHocTap')
      return;
    }
    if (dataNotifycation1.TypeNew == 'GhiChu') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'sc_ListBaoBai') {
        Utils.goback(nthisApp)
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifi: true })
        }, 200);
        return;
      }
      else {
        Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifi: true })
        return;
      }
    }
    if (dataNotifycation1.TypeNew == 'BaoBai') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'sc_ListBaoBai') {
        Utils.goback(nthisApp)
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifi: true })
        }, 200);
        return;
      }
      else {
        Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifi: true })
        return;
      }
    }
    if (dataNotifycation1.TypeNew == 'DiemDanh') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'DiemDanh') {
        Utils.goback(nthisApp)
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_Diemdanh', { IDHocSinh: dataNotifycation1.IDHocSinh })
        }, 200);
        return;
      } else {
        Utils.goscreen(nthisApp, 'sc_Diemdanh', { IDHocSinh: dataNotifycation1.IDHocSinh })
      }
      return;
    }
    if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ThongBao') {
      Utils.goscreen(nthisApp, 'sc_ThongBao')
      return;
    }
    if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ListTeacher') {
      Utils.nlog('-------------------------------------dataNotifycation1', dataNotifycation1)

      if (dataNotifycation1.LoaiChat == '1') {
        //Chat one-one
        if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
          Utils.goback(nthisApp)
          setTimeout(() => {
            Utils.goscreen(nthisApp, "sc_Chat", {
              IDGiaoVien: dataNotifycation1.IdTeacher,
              IdTaiKhoan: dataNotifycation1.IdTaiKhoan,
              FullName: this.dataNotify.title,
              isGroup: false,
              flagChatGroup: false,
              flagNotify: true,
              dataChatSimpleNotify: dataNotifycation1.GhiChu,
              dataAll: dataNotifycation1
            })
          }, 200);
          return;
        } else {
          Utils.goscreen(nthisApp, "sc_Chat", {
            IDGiaoVien: dataNotifycation1.IdTeacher,
            IdTaiKhoan: dataNotifycation1.IdTaiKhoan,
            FullName: this.dataNotify.title,
            isGroup: false,
            flagChatGroup: false,
            flagNotify: true,
            dataChatSimpleNotify: dataNotifycation1.GhiChu,
            dataAll: dataNotifycation1
          })
          return;
        }
      } else {
        // Group chat lớp TỰ TẠO 
        if (dataNotifycation1.LoaiChat == '3') {
          if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
            Utils.goback(nthisApp)
            setTimeout(() => {
              Utils.goscreen(nthisApp, "sc_Chat", {
                IdGroup: dataNotifycation1.IdGroup,
                LoaiChat: dataNotifycation1.LoaiChat,
                TenGroup: dataNotifycation1.TenGroup,
                flagChatGroup: true,
                flagNotify: true,
                dataChatGroupNotify: dataNotifycation1
              })
            }, 200);
            return;
          } else {
            Utils.goscreen(nthisApp, "sc_Chat", {
              IdGroup: dataNotifycation1.IdGroup,
              LoaiChat: dataNotifycation1.LoaiChat,
              TenGroup: dataNotifycation1.TenGroup,
              flagChatGroup: true,
              flagNotify: true,
              dataChatGroupNotify: dataNotifycation1
            })
          }
        } else {
          if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
            Utils.goback(nthisApp)
            setTimeout(() => {
              Utils.goscreen(nthisApp, "sc_Chat", {
                IdGroup: dataNotifycation1.IdGroup,
                LoaiChat: dataNotifycation1.LoaiChat,
                TenGroup: dataNotifycation1.TenGroup,
                flagChatGroup: true,
                flagNotify: true,
                dataChatGroupNotify: dataNotifycation1
              })
            }, 200);

            return;
          } else {
            Utils.goscreen(nthisApp, "sc_Chat", {
              IdGroup: dataNotifycation1.IdGroup,
              LoaiChat: dataNotifycation1.LoaiChat,
              TenGroup: dataNotifycation1.TenGroup,
              flagChatGroup: true,
              flagNotify: true,
              dataChatGroupNotify: dataNotifycation1
            })
            return;
          }
        }
      }
    }

    if (dataNotifycation1.TypeNew == 'GochocTap') {
      if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'gochoctap') {
        Utils.goback(nthisApp);
        setTimeout(() => {
          Utils.goscreen(nthisApp, 'sc_GochocTapp', { flagNoyify: true, data: dataNotifycation1 })
        }, 200);
        return;
      } else {
        Utils.goscreen(nthisApp, 'sc_GochocTapp', { flagNoyify: true, data: dataNotifycation1 })
      }
    }
    if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/HocPhi') {
      Utils.goscreen(nthisApp, 'sc_ListChildThongBaoAll', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifi: true })
      return;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer
          uriPrefix={prefix}
          ref={nav => {
            this.navigator = nav
          }}
        >
          <StatusBar
            backgroundColor={nColors.main}
            barStyle="light-content"
            translucent={true}
          />
        </AppContainer>
        <Animated.View style={{
          position: 'absolute', left: 0, top: this.state.topnotifi,
          right: 0, ...ifIphoneX({
            height: 94,
            paddingTop: 30
          }, {
            height: 94
          }),
          backgroundColor: '#FFFFFF',
          shadowColor: "#000000",
          shadowOpacity: 0.3,
          shadowRadius: 1,
          shadowOffset: {
            height: 0.5,
            width: 0
          },
          elevation: 2,
          borderRadius: 10,
        }}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={this.onnotiClick}>
            <Image style={{ width: 40, height: 40, resizeMode: 'contain', marginRight: 12, borderRadius: 5 }} source={Images.logoYSchool} />
            <View style={{ flex: 1 }} >
              {
                this.state.stitle == '' ? null :
                  <Text style={{ color: '#193B57', fontWeight: '800' }}>{this.state.stitle}</Text>
              }
              <Text numberOfLines={1} style={{ color: '#193B57' }}>{this.state.snoti}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Provider>
    )
  }
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART
}

export default codePush(codePushOptions)(App)