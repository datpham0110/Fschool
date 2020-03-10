import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation"
import { Easing, Animated } from "react-native"
// -- Root Screen + Component native custom
import MsgBox from "../components/MsgBox"
import RootScreen from "../screens/RootScreen"
// JeeKit
import Login from "../screens/auth/Login"
import Welcome from "../screens/welcome/Welcome"
import ListTeacher from "../screens/chat/ListTeacher"
import PichChild from "../screens/child/PichChild"
import Chat from "../screens/chat/chat"
import MenuRight from "../screens/welcome/MenuRight"
import NotifyHocPhi from "../screens/hocphi/NotifyHocPhi"
import HocPhi from "../screens/hocphi/HocPhi"
import EnterYourPhoneNumber from "../screens/auth/EnterYourPhoneNumber"
import AccuracyOTP from "../screens/auth/AccuracyOTP"
import CreatePassword from "../screens/auth/CreatePassword"
import EnterTheInformation from "../screens/auth/EnterTheInformation"
import NotifyEnterPhoneNumber from "../screens/auth/NotifyEnterPhoneNumber"
import EnterStudentInformation from "../screens/auth/EnterStudentInformation"
import Setting from "../screens/welcome/Setting"
import { nwidth } from "../styles/styles"
import { isPad } from "../styles/size"
import InfomationAccount from "../screens/welcome/InfomationAccount"
import ThongBao from "../screens/welcome/ThongBao"
import BaoBai from "../screens/welcome/BaoBai"
import ChangePassword from "../screens/profile/changePassword"
import ChiTietHocPhi from "../screens/hocphi/ChiTietHocPhi"
import ChiTietThongBao from "../screens/thongbao/chitietthongbao"
import DropDownChiNhanh from "../screens/chiNhanh/dropdownChiNhanh"
import Diemdanh from "../screens/diemdanh/Diemdanh"
import ModelListHocSinh from "../screens/hocsinh/modeListHocSinh"
import ListHocPhi from "../screens/thanhToanHocPhi/listHocPhi"
import GiaoDichThanhCong from "../screens/thanhToanHocPhi/giaoDichThanhCong"
import ThanhToanWebView from "../screens/thanhToanHocPhi/thanhtoanwebview"
import EnterPassword from "../screens/thanhToanHocPhi/enterPasswork"
import Upload from '../screens/profile/Upload';
import SelectHocSinh from '../screens/hocsinh/selectHocSinh';
import ShowImgBig from '../screens/thongbao/showImgBig';
import ThongBaoAll from '../screens/welcome/ThongBaoAll';
import ThuMoiSuKien from '../screens/welcome/thuMoiSuKien';
import KetQuaHocTap from '../screens/welcome/ketQuaHocTap';
// camera

import MediaPicker from '../components/MediaPicker';
import TakeCamera from '../components/TakeCamera';
// import GochocTapp from "../screens/gochoctap/GochocTapp"
import ModalChiTietGHT from "../screens/gochoctap/ModalChiTietGHT"
import GocHoatDongHome from "../screens/gochoatdong/GocHoatDongHome"

import ViewImageListShow from '../components/ViewImageListShow';
import GochocTapp from '../screens/gochoctap/GochocTapp';
import ChiTietGocHoatDong from '../screens/gochoatdong/ChiTietGocHoatDong';
import KhaosatHome from "../screens/khaosat/KhaosatHome"
import ChiTietKhaoSat from "../screens/khaosat/ChiTietKhaoSat"

import ThoiKhoaBieuHome from '../screens/thoikhoaBieu/ThoiKhoaBieuHome';
import TienichHome from "../screens/Tienich/TienichHome"
import HotroHome from "../screens/Hotro247/HotroHome"
import Thecao from "../screens/Tienich/TheCao/Thecao"
import NapTienDienThoai from "../screens/Tienich/NapTienDienThoai"
import HoaDonHome from "../screens/Tienich/HoaDon/HoaDonHome"
import ChiTietGiaodich from "../screens/Tienich/ChiTietGiaodich"
import ThanhToan from "../screens/Tienich/ThanhToan"
import ChonNhaMang from "../screens/Tienich/TheCao/ChonNhaMang"

import ListChildBaoBai from '../screens/BaoBai/ListChildBaoBai';
import ListBaoBai from '../screens/BaoBai/ListBaoBai';
//deepLink tripu123123://app/root/drawer/hotels/confirm/2
import ThoaThuanNguoiDung from '../screens/welcome/ThoaThuanNguoiDung';
import SelectChildChat from '../screens/chat/SelectChildChat';

import PlayVideo from '../screens/videoYTB/playVideo';
import WorkBaiKiemTra from '../screens/thongbao/workBaiKiemTra';

import ListChildThongBaoAll from '../screens/ThongBaoAll/ListChillThongBaoAll';
import ListChildThongBao from '../screens/thongbao/ListChillThongBao';
import ListChillThuMoiSuKien from '../screens/ThuMoiSuKien/ListChillThuMoiSuKien';
const sc_GocHoatDongStack = createStackNavigator(
  {
    sc_GocHoatDongHome: {
      screen: GocHoatDongHome,
      path: 'GocHoatDongHome'
    },
    sc_ChiTietGocHoatDong: {
      screen: ChiTietGocHoatDong,
      path: 'ChiTietGocHoatDong'
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)


const baoBaiStack = createStackNavigator(
  {
    sc_ListChildBaoBai: {
      screen: ListChildBaoBai,
      path: 'ListChildBaoBai'
    },
    sc_ListBaoBai: {
      screen: ListBaoBai,
      path: 'ListBaoBai'
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)


const thongBaoAllStack = createStackNavigator(
  {
    sc_ListChildThongBaoAll: {
      screen: ListChildThongBaoAll,
      path: 'ListChildThongBaoAll'
    },
    sc_ThongBaoAll: {
      screen: ThongBaoAll,
      path: 'ThongBaoAll'
    }
    // Modal_ThongBaoAll: ThongBaoAll,

  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

const sc_ThongBaoStack = createStackNavigator(
  {
    sc_ListChildThongBao: {
      screen: ListChildThongBao,
      path: 'ListChildThongBao'
    },
    sc_ThongBao: {
      screen: ThongBao,
      path: 'ThongBao'
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)
const sc_DiemDanhStack = createStackNavigator(
  {
    sc_Diemdanh: {
      screen: Diemdanh,
      path: 'DiemDanh'
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

const sc_HocPhiStack = createStackNavigator(
  {
    sc_HocPhi: {
      screen: HocPhi,
      path: 'HocPhi'
    },
    sc_ListHocPhi: {
      screen: ListHocPhi,
      path: 'ListHocPhi'
    },
    sc_ThanhToanWebView: ThanhToanWebView,
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

const sc_ChatStack = createStackNavigator(
  {
    sc_SelectChildChat: {
      screen: SelectChildChat,
      path: 'SelectChildChat'
    },
    sc_listteacher: {
      screen: ListTeacher,
      path: 'ListTeacher'
    },
    sc_Chat: Chat,
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

const sc_ThuMoiSuKienStack = createStackNavigator(
  {
    sc_ListChillThuMoiSuKien: {
      screen: ListChillThuMoiSuKien,
      path: 'ListChillThuMoiSuKien'
    },
    sc_ThuMoiSuKien: {
      screen: ThuMoiSuKien,
      path: 'ThuMoiSuKien'
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)


const sc_KetQuaHocTapStack = createStackNavigator(
  {
    sc_KetQuaHocTap: {
      screen: KetQuaHocTap,
      path: 'KetQuaHocTap'
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)
const stack_TienichKhac = createStackNavigator(
  {
    sc_TienichKhac: {
      screen: TienichHome,
      path: 'TienichHome'
    },
    sc_Thecao: {
      screen: Thecao,
      path: 'Thecao'
    },
    sc_NapTienDienThoai: {
      screen: NapTienDienThoai,
      path: 'NapTienDienThoai'
    },
    sc_HoaDonHome: {
      screen: HoaDonHome,
      path: 'HoaDonHome'
    },
    sc_ChiTietGiaodich: {
      screen: ChiTietGiaodich,
      path: 'sc_ChiTietGiaodich'
    }

  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

const HomeStack = createStackNavigator(
  {
    sc_Home: Welcome,

    thongBaoAllStack: {
      screen: thongBaoAllStack,
      path: 'thongBaoAllStack'
    },
    baoBaiStack: {
      screen: baoBaiStack,
      path: 'baoBaiStack'
    },
    // sc_BaoBai: {
    //   screen: BaoBai
    // },
    //Stack
    //--------Thông báo
    sc_ThongBaoStack: {
      screen: sc_ThongBaoStack,
      path: 'sc_ThongBaoStack'
    },
    //---------Học phí
    sc_HocPhiStack: {
      screen: sc_HocPhiStack,
      path: 'sc_HocPhiStack'
    },
    //---------Điểm danh
    // sc_DiemDanhStack: {
    //   screen: sc_DiemDanhStack,
    //   path: 'sc_DiemDanhStack'
    // },
    sc_Diemdanh: {
      screen: Diemdanh,
      path: 'DiemDanh'
    },
    //---------Góc học tập
    // sc_GocHocTapStack: {
    //   screen: sc_GocHocTapStack
    // },
    sc_GochocTapp: {
      screen: GochocTapp
    },
    //---------Góc hoạt động
    sc_GocHoatDongStack: {
      screen: sc_GocHoatDongStack,
      path: 'sc_GocHoatDongStack'
    },
    //----------Chat
    sc_ChatStack: {
      screen: sc_ChatStack
    },
    //----------Thư mời sự kiện
    sc_ThuMoiSuKienStack: {
      screen: sc_ThuMoiSuKienStack
    },
    //----------Kết quả học tập
    sc_KetQuaHocTapStack: {
      screen: sc_KetQuaHocTapStack
    },
    //----------Khảo soát
    // sc_KhaoSatStack: {
    //   screen: sc_KhaoSatStack
    // },
    sc_KhaosatHome: {
      screen: KhaosatHome,
      path: 'KhaosatHome'
    },
    sc_ChiTietKhaoSat: {
      screen: ChiTietKhaoSat,
      path: 'ChiTietKhaoSat'
    },
    sc_ThoiKhoaBieu: ThoiKhoaBieuHome,
    //Modal
    sc_GiaoDichThanhCong: {
      screen: GiaoDichThanhCong,
      path: 'GiaoDichThanhCong'
    },
    sc_TienichHome: stack_TienichKhac,
    sc_Hotro: {
      screen: HotroHome,
      path: 'HotroHome'
    }


  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)
const DrawerNativatorRight = createDrawerNavigator(
  {
    dr_Home: {
      screen: HomeStack,
      path: 'HomeStack'
    },
    sc_Setting: Setting,
    sc_ThongTinTaiKhoan: InfomationAccount,

  },
  {
    drawerWidth: isPad ? 500 : nwidth * 0.82,
    drawerPosition: "left",
    contentComponent: MenuRight,
    disableGestures: true,
    overlayColor: 0.6
  }
)

const AuthStack = createStackNavigator(
  {
    sc_EnterYourPhoneNumber: EnterYourPhoneNumber,
    sc_AccuracyOTP: AccuracyOTP,
    sc_CreatePassword: CreatePassword,
    sc_EnterTheInformation: EnterTheInformation,
    sc_EnterStudentInformation: EnterStudentInformation,
    sc_AuthLogin: Login
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

/**
 * Router Gốc không thay đổi.
 */

const RootStack = createSwitchNavigator(
  {
    sc_Root: {
      screen: RootScreen,
      navigationOptions: {
        header: null
      }
    },
    sc_Auth: {
      screen: AuthStack,
      navigationOptions: {
        header: null
      }
    },
    sc_Welcome: {
      screen: DrawerNativatorRight,
      path: 'DrawerNativatorRight',
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
)

// - Modal native -- Các screen dạng modal, popup khai báo ở đây
const RootModalStack = createStackNavigator(
  {
    Root: {
      screen: RootStack,
      path: "root"
    },
    // -- Screen Modal, Popup
    sc_NotifyEnterPhoneNumber: NotifyEnterPhoneNumber,
    Modal_EnterStudentInformation: EnterStudentInformation,
    sc_ChangePassword: ChangePassword,
    sc_ChiTietHocPhi: ChiTietHocPhi,
    sc_MediaPicker: MediaPicker,
    Modal_TakeCamera: TakeCamera,
    Modal_ChiTietThongBao: ChiTietThongBao,
    Modal_DDropDownChiNhanh: DropDownChiNhanh,
    Model_ModelListHocSinh: ModelListHocSinh,
    Model_EnterPassword: EnterPassword,
    Model_Upload: Upload,
    Model_SelectHocSinh: SelectHocSinh,
    Modal_ShowImgBig: ShowImgBig,
    // Modal_ThongBaoAll: ThongBaoAll,
    Modal_ModalChiTietGHT: ModalChiTietGHT,
    sc_ViewImageListShow: ViewImageListShow,
    Modal_HoTroKhachHang: HotroHome,
    sc_ThanhToan: ThanhToan,
    Modal_ChonNhaMang: ChonNhaMang,
    Modal_ThoaThuanNguoiDung: ThoaThuanNguoiDung,
    Modal_PlayVideo: PlayVideo,
    Modal_WorkBaiKiemTra: WorkBaiKiemTra
  },
  {
    mode: "modal",
    headerMode: "none",
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "transparent"
      }
    }),
    transparentCard: true,
    cardStyle: {
      backgroundColor: "transparent",
      opacity: 1
    }
  }
)

export const AppStack = createStackNavigator(
  {
    RootMain: {
      screen: RootModalStack,
      path: "app"
    },
    Modal_MsgBox: {
      screen: MsgBox,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "transparent"
      },
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    }),
    transparentCard: true,
    cardStyle: {
      backgroundColor: "transparent",
      opacity: 1
    }
  }
)