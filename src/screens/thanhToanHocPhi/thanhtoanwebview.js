import React, { Component, PureComponent } from "react"
import Utils from "../../app/Utils"
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native"
import HeaderCom from "../../components/HeaderCom"
import { nstyles } from "../../styles/styles"
import { Images } from "../../images"
import { colors } from "../../styles/color"
import { hocSinh_CreateOrders, XemChiTietOrder } from "../../apis/thanhtoan"
import WebView from "react-native-webview"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { thanhtoanssc } from '../../apis/hocphi'
import IsLoading from '../../components/IsLoading';
import Video from "react-native-video"
import { isIphoneX } from "react-native-iphone-x-helper"
import { sizes } from "../../styles/size"
import { appConfig } from "../../app/Config"
const { width, height } = Dimensions.get("window")

class ThanhToanWebView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isThanhToanSuccees: false,
      linkWebview: "",
      resultURL: "",
      isInWebview: false,
      flatGetmTransactionID: false,
      TransactionID: '',
      flagGetTransaction: false,
      hocSinhThanhToan: Utils.getGlobal(nGlobalKeys.childSelectedHocPhi, ''),
      loading: false,
    }
    this.tien = Utils.ngetParam(this, "tongtien"),
      this.msHocSinh = Utils.ngetParam(this, "msHocSinh"),
      this.flag = false
    this.publicIPip = '',
      this.allBill,
      this.dataError = ''
  }
  _subThanhToan = async () => {
    Utils.nlog('msHocSinh', this.msHocSinh.SSCId)
    Utils.nlog('tien', this.tien)
    let res = await hocSinh_CreateOrders(this.msHocSinh.SSCId, this.tien)
    if (res.status == 1) {
      let ob = JSON.parse(res.error.message)
      var intervalId = setInterval(this.timer, 2000)
      this.dataError = ob.Data;
      this.setState({
        isThanhToanSuccees: true,
        linkWebview: res.data.redirectURL.toString(),
        resultURL: ob.resultURL,
        isInWebview: true,
        intervalId: intervalId
      })
      this._checkStatusReturnWebview()

    }
  }

  _tiepTuc = async () => {
    let MaHocSinh = Utils.getGlobal(nGlobalKeys.IdHocSinh, null)
    let ipppppp = Utils.getGlobal(nGlobalKeys.ipPublic, '');
    let res = await hocSinh_CreateOrders(MaHocSinh, this.tien, ipppppp)
    if (res.status == 1) {
      let ob = JSON.parse(res.error.message);
      var intervalId = setInterval(this.timer, 2000);
      this.setState({
        isThanhToanSuccees: true,
        linkWebview: res.data.redirectURL.toString(),
        resultURL: ob.resultURL,
        isInWebview: true,
        intervalId: intservalId
      })
    }
  }

  componentDidMount() {
    this._subThanhToan()
  }
  componentWillUnmount() {
    try {
      clearInterval(this.state.intervalId)
    } catch (error) { }
  }
  timer = () => {
    if (this.state.isInWebview == true) {
      this._checkStatusReturnWebview()
    }
  }
  _checkStatusReturnWebview = async () => {
    let res = await XemChiTietOrder(this.state.resultURL)
    if (res.status == 1) {
      if (this.state.flagGetTransaction == false) {
        this.setState({ TransactionID: res.data._hocSinh.mTransactionID, flagGetTransaction: true })
      }
      if (res.data._hocSinh.IDTrangThai == 0) {
        //0: chưa thanh toán;
      } else if (res.data._hocSinh.IDTrangThai == 1) {
        //1: Đang xử lý;
      } else if (res.data._hocSinh.IDTrangThai == 2) {
        //2: thanh toán thành công;
        this.setState({ isInWebview: false, TransactionID: res.data._hocSinh.mTransactionID });
        this._capNhatThanhToan();
        this.waitting.show();
      } else if (res.data._hocSinh.IDTrangThai == 3) {
        //3: thanh toán thất bại,
        this.setState({ isInWebview: false })
        Utils.showMsgBoxOK(this, 'Thông Báo', 'Thanh toán thất bại', 'Trở về ', () => Utils.goback(this)
        )
      } else {
        this.setState({ isInWebview: false })
        Utils.goback(this)
        //4: hủy thanh toán
      }
    } else {
      Utils.nlog('------------------------------------------ else', res)

    }
  }

  _capNhatThanhToan = async () => {
    let hocsinhThanhToan = Utils.getGlobal(nGlobalKeys.childSelectedHocPhi, '')
    let objBills = [];
    let tong = 0;
    for (let i = 0; i < hocsinhThanhToan.Bills.length; i++) {
      if (tong < this.tien) {
        objBills.push(hocsinhThanhToan.Bills[i]);
        tong += hocsinhThanhToan.Bills[i].Amount
      }
    }
    this.allBill = tong;
    let res = await thanhtoanssc(
      hocsinhThanhToan.SSCId,
      hocsinhThanhToan.StudentCode,
      hocsinhThanhToan.StudentName,
      hocsinhThanhToan.Address,
      hocsinhThanhToan.SchoolCode,
      hocsinhThanhToan.SchoolName,
      hocsinhThanhToan.ClassCode,
      hocsinhThanhToan.ClassName,
      this.state.TransactionID,
      objBills
    )
    Utils.nlog('Cập nhật thanh toán', res)
    if (res.success == true) {
      this.waitting.hide();
      Utils.goscreen(this, "sc_GiaoDichThanhCong", { hocSinhThanhToan: this.state.hocSinhThanhToan, TransactionID: this.state.TransactionID, allBill: this.allBill })
    } else {
      this.setState({ isInWebview: false })
      Utils.showMsgBoxOK(this, 'Thông Báo', 'Thanh toán thất bại', 'Trở về ', () => Utils.goback(this)
      )
    }
    this.setState({ flatGetmTransactionID: false })
  }
  onEnd = () => {
    this.setState({ loading: false })
  }
  onTouch = () => {
    this.setState({ loading: true })
  }
  render() {
    return (
      <View
        style={[
          nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome, height: "100%" }]}  >
        <HeaderCom
          nthis={this}
          iconLeft={Images.icbackspace}
          titleText={"Thanh toán"}
          iconRight={Images.icPlay}
          onPressRight={this.onTouch}
        />
        {this.state.isThanhToanSuccees == true ? (
          <View
            style={[nstyles.nbody, { backgroundColor: colors.white, marginBottom: 20, height: "100%" }]} >
            <WebView
              nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
              startInLoadingState={true}
              useWebKit={true}
              ref={refs => this.webCus = refs}
              source={{ uri: this.state.linkWebview }}
              onNavigationStateChange={event => {
                Utils.nlog('------------------------------------------event', event.url)
                if (event.url.includes('https://e-invoicing.webmoney.ru/error.aspx')) {
                  Utils.nlog('------------------------------------------', this.dataError)
                  this.setState({ linkWebview: this.dataError }, () => {
                    // if (this.webCus)
                    //   this.webCus.reload()
                  })
                }
                else {
                }
              }}
            />
          </View>
        ) : null}
        <IsLoading ref={refs => this.waitting = refs} />
        {
          this.state.loading ? <View style={{
            position: 'absolute',
            width: width,
            height: height,
            backgroundColor: colors.white,
          }}>

            <Video
              source={{ uri: appConfig.domainVideo + 'upload/video/thanhtoanwebmoney.mp4' }}
              ref={(ref) => {
                this.player = ref
              }}
              onLoad={this.onLoad}
              onBuffer={this.onBuffer}
              onProgress={this.onProgress}
              paused={this.state.paused}                                  // Store reference
              style={stPlayMedia.backgroundVideo}
              repeat={true}
              onError={this.videoError}               // Callback when video cannot be loaded
              onEnd={this.onEnd}
            />
            <TouchableOpacity onPress={() => this.setState({ loading: false })}
              style={{ padding: 5, backgroundColor: colors.colorPink3, borderRadius: 6, top: 0, right: 0, marginTop: isIphoneX() ? 50 : 25, marginRight: 10, position: 'absolute' }}>
              <Text style={{ fontWeight: "600", fontSize: sizes.sText13, color: 'white' }}>ĐÓNG</Text>
            </TouchableOpacity>
          </View> : null}
      </View>
    )
  }
}
export const stPlayMedia = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});

const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(ThanhToanWebView, mapStateToProps)
