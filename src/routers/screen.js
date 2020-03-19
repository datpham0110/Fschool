//------------------------------------------- React Native --------------------------------------------
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation"
import { Easing, Animated } from "react-native"
//------------------------------------------- Component -----------------------------------------------
import MsgBox from "../components/MsgBox"
import MediaPicker from '../components/MediaPicker';
import TakeCamera from '../components/TakeCamera';
import ViewImageListShow from '../components/ViewImageListShow';

//------------------------------------------- Style ---------------------------------------------------
import { nwidth } from "../styles/styles"
import { isPad } from "../styles/size"

//------------------------------------------- Screen --------------------------------------------------
//---- Góc hoạt động ----------------------------------------------------------------------------------
import ListStudentBustle from '../screens/gochoatdong/ListStudentBustle';
import GocHoatDongHome from "../screens/gochoatdong/GocHoatDongHome";
import ChiTietGocHoatDong from '../screens/gochoatdong/ChiTietGocHoatDong';

//---- Góc học tập ----------------------------------------------------------------------------------
import ListStudentStudy from "../screens/gochoctap/ListStudentStudy";
import StudySpace from '../screens/gochoctap/StudySpace';
import ModalChiTietGHT from "../screens/gochoctap/ModalChiTietGHT";

//---- Báo bài ----------------------------------------------------------------------------------------
import ListChildBaoBai from '../screens/BaoBai/ListChildBaoBai';
import ListBaoBai from '../screens/BaoBai/ListBaoBai';

//---- Thông báo All ----------------------------------------------------------------------------------
import ListChildThongBaoAll from '../screens/ThongBaoAll/ListChillThongBaoAll';
import ThongBaoAll from '../screens/welcome/ThongBaoAll';

//---- Thông báo --------------------------------------------------------------------------------------
import ListChildThongBao from '../screens/thongbao/ListChillThongBao';

//---- Thư mời sự kiện --------------------------------------------------------------------------------
import ListChillThuMoiSuKien from '../screens/ThuMoiSuKien/ListChillThuMoiSuKien';
import ThuMoiSuKien from '../screens/welcome/thuMoiSuKien';

//---- Kết quả học tập --------------------------------------------------------------------------------
import KetQuaHocTap from '../screens/welcome/ketQuaHocTap';

//---- Điểm danh --------------------------------------------------------------------------------------
import Diemdanh from "../screens/diemdanh/Diemdanh";
import ListStudentAttendance from '../screens/diemdanh/ListStudentAttendance';

//---- Học phí ----------------------------------------------------------------------------------------
import HocPhi from "../screens/hocphi/HocPhi";
import ListHocPhi from "../screens/thanhToanHocPhi/listHocPhi";
import ListStudentTuition from '../screens/hocphi/ListStudentTuition';

//---- Chat -------------------------------------------------------------------------------------------
import SelectChildChat from '../screens/chat/SelectChildChat';
import ListTeacher from "../screens/chat/ListTeacher";
import Chat from "../screens/chat/chat";

//---- Tiện ích khác ----------------------------------------------------------------------------------
import TienichHome from "../screens/Tienich/TienichHome";
import Thecao from "../screens/Tienich/TheCao/Thecao";
import NapTienDienThoai from "../screens/Tienich/NapTienDienThoai";
import HoaDonHome from "../screens/Tienich/HoaDon/HoaDonHome";
import ChiTietGiaodich from "../screens/Tienich/ChiTietGiaodich";

//---- Khảo sát ---------------------------------------------------------------------------------------
import ListStudenSurvey from '../screens/khaosat/ListStudenSurvey';
import KhaosatHome from "../screens/khaosat/KhaosatHome";
import ChiTietKhaoSat from "../screens/khaosat/ChiTietKhaoSat";

//---- DrawerNativatorRight ---------------------------------------------------------------------------
import Setting from "../screens/welcome/Setting";

//---- Authencation -----------------------------------------------------------------------------------
import EnterYourPhoneNumber from "../screens/auth/EnterYourPhoneNumber";
import AccuracyOTP from "../screens/auth/AccuracyOTP";
import Login from "../screens/auth/Login";
import NotifyEnterPhoneNumber from "../screens/auth/NotifyEnterPhoneNumber";
import EnterStudentInformation from "../screens/auth/EnterStudentInformation";
import CreatePassword from "../screens/auth/CreatePassword";

//---- Thời khoá biểu  --------------------------------------------------------------------------------
import ListStudenTimetable from "../screens/Timetable/ListStudenTimetable";
import ThoiKhoaBieuHome from '../screens/Timetable/ThoiKhoaBieuHome';

//---- AppStack ---------------------------------------------------------------------------------------

//---- Modal ---------------------------------------------------------------------------------------
import WorkBaiKiemTra from '../screens/thongbao/workBaiKiemTra';
import PlayVideo from '../screens/videoYTB/playVideo';
import ThoaThuanNguoiDung from '../screens/welcome/ThoaThuanNguoiDung';
import ChonNhaMang from "../screens/Tienich/TheCao/ChonNhaMang";
import ThanhToan from "../screens/Tienich/ThanhToan";
import HotroHome from "../screens/Hotro247/HotroHome";
import RootScreen from "../screens/RootScreen";
import Welcome from "../screens/welcome/Welcome";
import MenuRight from "../screens/welcome/MenuRight";
import EnterTheInformation from "../screens/auth/EnterTheInformation";
import InfomationAccount from "../screens/welcome/InfomationAccount";
import ThongBao from "../screens/welcome/ThongBao";
import ChangePassword from "../screens/profile/changePassword";
import ChiTietHocPhi from "../screens/hocphi/ChiTietHocPhi"
import ChiTietThongBao from "../screens/thongbao/chitietthongbao"
import DropDownChiNhanh from "../screens/chiNhanh/dropdownChiNhanh"
import ModelListHocSinh from "../screens/hocsinh/modeListHocSinh"
import GiaoDichThanhCong from "../screens/thanhToanHocPhi/giaoDichThanhCong"
import ThanhToanWebView from "../screens/thanhToanHocPhi/thanhtoanwebview"
import EnterPassword from "../screens/thanhToanHocPhi/enterPasswork"
import Upload from '../screens/profile/Upload';
import SelectHocSinh from '../screens/hocsinh/selectHocSinh';
import ShowImgBig from '../screens/thongbao/showImgBig';


// Góc học tập stack
const StudySpaceStack = createStackNavigator(
  {
    sc_ListStudentStudy: {
      screen: ListStudentStudy
    },
    sc_StudySpace: {
      screen: StudySpace
    },
    Modal_ModalChiTietGHT: {
      screen: ModalChiTietGHT
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

// Góc hoạt động stack
const sc_GocHoatDongStack = createStackNavigator(
  {
    sc_ListStudentBustle: {
      screen: ListStudentBustle
    },
    sc_GocHoatDongHome: {
      screen: GocHoatDongHome
    },
    sc_ChiTietGocHoatDong: {
      screen: ChiTietGocHoatDong
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

// Báo bài stack
const baoBaiStack = createStackNavigator(
  {
    sc_ListChildBaoBai: {
      screen: ListChildBaoBai
    },
    sc_ListBaoBai: {
      screen: ListBaoBai
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

// Thông báo all stack
const thongBaoAllStack = createStackNavigator(
  {
    sc_ListChildThongBaoAll: {
      screen: ListChildThongBaoAll
    },
    sc_ThongBaoAll: {
      screen: ThongBaoAll
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
// Thông báo stack
const sc_ThongBaoStack = createStackNavigator(
  {
    sc_ListChildThongBao: {
      screen: ListChildThongBao
    },
    sc_ThongBao: {
      screen: ThongBao
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
// Điểm danh stack
const attendance_Stack = createStackNavigator(
  {
    sc_ListStudentAttendance: {
      screen: ListStudentAttendance
    },
    sc_Diemdanh: {
      screen: Diemdanh
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

// Khảo sát stack
const survey_Stack = createStackNavigator(
  {
    sc_ListStudenSurvey: {
      screen: ListStudenSurvey
    },
    sc_KhaosatHome: {
      screen: KhaosatHome
    },
    sc_ChiTietKhaoSat: {
      screen: ChiTietKhaoSat
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

// Thời khoá hiểu stack
const timetable_Stack = createStackNavigator(
  {
    sc_ListStudenTimetable: {
      screen: ListStudenTimetable
    },
    sc_ThoiKhoaBieu: {
      screen: ThoiKhoaBieuHome
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
const sc_HocPhiStackTwo = createStackNavigator(
  {
    sc_HocPhi_Two: {
      screen: HocPhi
    },
    sc_ListHocPhi: {
      screen: ListHocPhi
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
// Học phí stack
const sc_HocPhiStack = createStackNavigator(
  {
    sc_ListStudentTuition: {
      screen: ListStudentTuition
    },
    sc_HocPhi: {
      screen: HocPhi
    },
    sc_ListHocPhi: {
      screen: ListHocPhi
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
      screen: SelectChildChat
    },
    sc_listteacher: {
      screen: ListTeacher
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
      screen: ListChillThuMoiSuKien
    },
    sc_ThuMoiSuKien: {
      screen: ThuMoiSuKien
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
      screen: TienichHome
    },
    sc_Thecao: {
      screen: Thecao
    },
    sc_NapTienDienThoai: {
      screen: NapTienDienThoai
    },
    sc_HoaDonHome: {
      screen: HoaDonHome
    },
    sc_ChiTietGiaodich: {
      screen: ChiTietGiaodich
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
    // ------------------------------------- Điểm danh
    sc_Home: Welcome,
    thongBaoAllStack: {
      screen: thongBaoAllStack,
      path: 'thongBaoAllStack'
    },
    // ------------------------------------- Bái bài
    baoBaiStack: {
      screen: baoBaiStack,
    },
    // ------------------------------------- Thông báo
    sc_ThongBaoStack: {
      screen: sc_ThongBaoStack,
    },
    // ------------------------------------- Học phí
    sc_HocPhiStack: {
      screen: sc_HocPhiStack,
    },
    sc_HocPhiStackTwo: {
      screen: sc_HocPhiStackTwo
    },
    // ------------------------------------- Điểm danh
    attendance_Stack: {
      screen: attendance_Stack,
    },
    // ------------------------------------- Góc hoạt động
    sc_GocHoatDongStack: {
      screen: sc_GocHoatDongStack,
    },
    // ------------------------------------- Chat
    sc_ChatStack: {
      screen: sc_ChatStack
    },
    // ------------------------------------- Thư mời sự kiện
    sc_ThuMoiSuKienStack: {
      screen: sc_ThuMoiSuKienStack
    },
    // ------------------------------------- Kết quả học tập
    sc_KetQuaHocTapStack: {
      screen: sc_KetQuaHocTapStack
    },
    // ------------------------------------- Khảo soát
    sc_surveyStack: {
      screen: survey_Stack
    },
    // ------------------------------------- Góc học tập
    sc_StudySpaceStack: {
      screen: StudySpaceStack,
      path: 'StudySpaceStack'
    },
    // ------------------------------------- Thời khoá biểu
    // sc_ThoiKhoaBieu: ThoiKhoaBieuHome,
    sc_timetable_Stack: {
      screen: timetable_Stack
    },
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