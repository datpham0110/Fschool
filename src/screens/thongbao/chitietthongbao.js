import React, { Component, Fragment } from "react";
import { colors, sizes, nstyles } from "../../styles";
import { Text, View, FlatList, ListEmpty, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { styles } from './styles'
import ButtonCom from "../../components/Button/ButtonCom";
import YouTubePlay from '../../components/YouTubePlay';
import Utils from "../../app/Utils";
import { ThongBao_Detail_V2, ThongBao_Detail_V22222222, ThongBao_Detail_V3 } from '../../apis/thanhtoan'
import { ThongBao_Update, PhanHoiThuMoi } from '../../apis/getNotifycation';
import { notifyParents } from '../../apis/welcome';
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import { appConfig } from "../../app/Config"
import { Images } from "../../images";
import { nGlobalKeys } from "../../app/keys/globalKey";
import { nwidth } from "../../styles/styles";
class ChiTietThongBao extends Component {
  constructor(props) {
    super(props);
    data = Utils.ngetParam(this, "data");
    Utils.nlog('data', data)
    this.goBack = Utils.ngetParam(this, 'goBack', () => { });
    nthischitietthongbao = this;
    this.state = {
      dataLoad: [],
      listImg: [],
      showVideo: false,
      checkDoneKT: false,
      IsCoBaiKiemTra: false,
      dataPhanhoi: 1,
      noidung: ''
    };
    this.noiDung = Utils.ngetParam(this, 'noiDung', null)
    this.type = Utils.ngetParam(this, 'type');
    this.idVideo = '';
    this.dataBaiKT = null;
    this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh');
    this.BaoBaiHinh = false;
  }

  componentDidMount() {
    // if (data.IDLoai == 2 && data.IsCoBaiKiemTra == true) {
    // }
    this.loadData(data);
  }

  onCancel = () => {
    this.goBack();
    Utils.goback(this, null);
  };

  updateStatus = async (data) => {
    let res = await ThongBao_Update(
      data,
    );
    if (res.success == true) {
      this._loadDataInfomation();
    }
  }

  loadData = async (data) => {
    const res = await ThongBao_Detail_V3(data.IDThongBao, Utils.getGlobal(nGlobalKeys.rowId), data.IDHocSinh);
    Utils.nlog('--------------------  ThongBao_Detail_V3-----------------', res, this.IDHocSinh)
    if (res.success == true) {
      this.updateStatus(res.data.IDThongBao);
      //  try {
      //   if (res.data.BaiKiemTra.LoaiBaiKT == 0)
      //     this.BaoBaiHinh = true;
      // } catch (error) {
      // };
      if (res.data.ListImage != undefined) {
        this.setState({ dataLoad: res.data, listImg: res.data.ListImage });
      } else {
        this.setState({ dataLoad: res.data, listImg: [] });
      }

      if (res.data.IDLoai == 2) {
        this._getIDYoutube(res.data.LinkVideo);
        if (res.data.IsCoBaiKiemTra) {
          let checkDoneKT = false;
          if (res.data.BaiKiemTra.LoaiBaiKT == 0) {
            Utils.nlog('----------res.data.BaiKiemTra.data.DaTraLoi', res.data.BaiKiemTra.DaTraLoi)
            checkDoneKT = res.data.BaiKiemTra.DaTraLoi;
            this.BaoBaiHinh = true;
            this.dataBaiKT = res.data.BaiKiemTra; // Load list hình ảnh trong bài kiểm tra hình
          } else {
            this.BaoBaiHinh = false;
            this.dataBaiKT = res.data.BaiKiemTra.data.BaoBai; // Load list hình ảnh trong bài kiểm tra hình
            // if(res.data.BaiKiemTra.data.BaoBai[0].DaTraLoi == true){
            // }
            checkDoneKT = res.data.BaiKiemTra.data.BaoBai[0].DaTraLoi;
          }
          this.setState({ IsCoBaiKiemTra: true, checkDoneKT })
          // if (!this.BaoBaiHinh)
          //   checkDoneKT = this._checkBaiKT();
          // Utils.nlog('-------------------------------------- res.data.IsCoBaiKiemTra', res.data.IsCoBaiKiemTra)
          // this.setState({ IsCoBaiKiemTra: res.data.IsCoBaiKiemTra, checkDoneKT })
        }
      }
    }

    // api lấy chi tiết thông báo khi có báo bài kiểm tra
    // if (data.IDLoai == 2 && data.IsCoBaiKiemTra) {
    //   let checkDoneKT = false;
    //   this._getIDYoutube(data.LinkVideo);
    //   const res1 = await ThongBao_Detail_V3(data.IDThongBao, Utils.getGlobal(nGlobalKeys.rowId), this.IDHocSinh);
    //   Utils.nlog('-------------------ThongBao_Detail_V3', res1)
    //   if (res1.success == true) {
    //     this.dataBaiKT = res1.data.BaoBai;
    //     if (!this.BaoBaiHinh)
    //       checkDoneKT = this._checkBaiKT();
    //     this.setState({ IsCoBaiKiemTra: data.IsCoBaiKiemTra, checkDoneKT })
    //   } else {

    //   };
    // }
  }

  _checkBaiKT = () => {
    Utils.nlog('--------------this.dataBaiKT', this.dataBaiKT)
    let check = false;
    // try{
    // }catch(){}
    for (let index = 0; index < this.dataBaiKT.length; index++) {
      const item = this.dataBaiKT[index];
      if (item.DaTraLoi) {
        check = true;
        break;
      };
    };
    return check;
  }

  ShowModalFunction(visible) {
    this.setState({ isModelVisible: false });
  }


  _loadDataInfomation = async () => {
    this._notifyThongBao();
    this._notifyThuMoiSuKien();
    this._notifyBaoBai();
    this._loadDataNotifyShow();
    this._notifyThongBaoAll();
  }

  _loadDataNotifyShow = async () => {
    // let res = await ThongBao_ListAll_App_V2(0, 0, -1, Utils.ngetParam(this, 'IDChiNhanh'));
    // if (res.success == true) {
    //   this.props.setSumNotifyAllApp(res.CountTT > 100 ? 99 : res.CountTT);
    // } else {
    //   this.props.setSumNotifyAllApp([]);
    // }
    let res = await notifyParents(0); // Thông báo 1
		if (res.success == true && res.data.HocSinh.length > 0) {
			let count = 0;
			for(let i = 0; i < res.data.HocSinh.length; i++){
				count += res.data.HocSinh[i].Soluong;
			}
			this.props.setSumNotifyAllApp(count > 100 ? 99 : count);
		} else {
      this.props.setSumNotifyAllApp([]);
		}
  }

  _notifyThongBaoAll = async () => {
    let res = await notifyParents(0); // Thông báo all
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        this.props.setListChildThongBaoAll(res.data.HocSinh)
      }
      else {
        this.props.setListChildThongBaoAll([]);
      }
    } else {
      this.props.setListChildThongBaoAll([]);
    }
  }

  _notifyThongBao = async () => {
    let res = await notifyParents(1); // Thông báo 1
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        this.props.setSumNotifyThongBao(this._sumNotify(res.data.HocSinh));
        this.props.setListChildThongBao(res.data.HocSinh)
      }
      else {
        this.props.setSumNotifyThongBao(0);
        this.props.setListChildThongBao([])
      }
    } else {
      this.props.setSumNotifyThongBao(0);
      this.props.setListChildThongBao([])
    }
  }
  _notifyThuMoiSuKien = async () => {
    let res = await notifyParents(7); // Thư mời sự kiện 7
    if (res.success == true) {
      if (res.data.HocSinh.length > 0) {
        this.props.setSumNotifyThuMoiSuKien(this._sumNotify(res.data.HocSinh));
        this.props.setListChildThuMoiSuKien(res.data.HocSinh)
      }
      else {
        this.props.setSumNotifyThongBao(0);
        this.props.setListChildThuMoiSuKien([])
      }
    } else {
      this.props.setSumNotifyThongBao(0);
      this.props.setListChildThuMoiSuKien([])
    }
  }
  _notifyBaoBai = async () => {
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
      this.props.setSumNotifyBaoBai(0);
      this.props.setListChildBaoBai([])

    }
  }
  _sumNotify = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count += data[i].Soluong;
    }
    return count;
  }

  _renderImage = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, marginHorizontal: 1, marginVertical: 1 }} onPress={() => Utils.goscreen(this, 'Modal_ShowImgBig', { data: item })
      }>
        <Image
          resizeMode="cover" source={{ uri: appConfig.domainImg + item }}
          tintColorLeft={colors.black_11}
          style={{ width: nstyles.nwidth * 0.25, height: nstyles.nwidth * 0.25 }} />
      </TouchableOpacity>
    )
  }

  _getIDYoutube = (string) => {
    if (string == null) return;
    const index = string.lastIndexOf('=');
    const index1 = string.lastIndexOf('/');
    if (index != -1 || index1 != -1) {
      if (index != -1) {
        const id = string.slice(index + 1);
        this.idVideo = id;
        return;
      };
      if (index1 != -1) {
        const id = string.slice(index1 + 1);
        this.idVideo = id;
        return;
      };
    };
  }
  sendPhanHoi = async () => {
    if (this.state.dataPhanhoi == 0 && this.state.noidung == '') {
      Utils.showMsgBoxOK(this, "Thông báo", "Vui lòng thêm nội dung ý kiến", "Đóng")
      return;
    }
    let res = await PhanHoiThuMoi(data.IDThongBao, Utils.getGlobal(nGlobalKeys.rowId), data.IDHocSinh, this.state.dataPhanhoi, this.state.noidung)
    Utils.nlog('sendPhanHoi', data.IDThongBao, Utils.getGlobal(nGlobalKeys.rowId), data.IDHocSinh, this.state.dataPhanhoi, this.state.noidung, res)
    if (res.success == true) {
      Utils.showMsgBoxOK(this, "Thông báo", "Cảm ơn phụ huynh đã phản hồi", "Đóng", () => this.onCancel())
    }
  }
  _goTraLoi = () => {
    Utils.goscreen(this, 'Modal_WorkBaiKiemTra', {
      data,
      // dataCauHoi: this.BaoBaiHinh ? this.state.dataLoad : this.dataBaiKT,
      dataCauHoi: this.dataBaiKT,
      IDHocSinh: this.IDHocSinh,
      BaoBaiHinh: this.BaoBaiHinh,
      checkDoneKT: this.state.checkDoneKT,
      tieuDeBaiKiemTraTracNghiem: this.state.dataLoad.BaiKiemTra.TieuDeBaiKT
    });
  }
  _clickItem = (val) => () => {
    this.setState({ dataPhanhoi: val });
  }

  render() {
    const { nrow } = nstyles.nstyles;
    const { showVideo } = this.state;
    return (
      <View style={{ backgroundColor: colors.black_50, flex: 1, alignItems: "center", justifyContent: "center" }} >
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 14,
            paddingVertical: 10,
            paddingBottom: 20,
            borderRadius: 10,
            width: nstyles.nwidth * 0.95
          }} >
          <TouchableOpacity
            onPress={this.onCancel}
            style={{
              position: 'absolute', top: -8, right: -8,
              backgroundColor: colors.white, borderRadius: 13
            }}>
            <Image
              style={{ tintColor: colors.colorPink }}
              resizeMode='contain'
              source={Images.icCancelTour}
            />
          </TouchableOpacity>
          {
            this.state.dataLoad != undefined ? <View>
              {this.noiDung != null ? <Text style={{ textAlign: "center", fontSize: sizes.sizes.sText16 }}>{this.noiDung}</Text> :
                <Text
                  style={{ textAlign: "center", fontSize: sizes.sizes.sText16 }}> {this.type == 'ThuMoiSuKien' ? <Text>Giáo viên {data.TenLop} gửi thư mời sự kiện đến {data.TenHocSinh} </Text> :
                    this.type == 'ketquahoctap' ? <Text>Giáo viên {data.TenLop} gửi kết quả học tập đến {data.TenHocSinh} </Text> :
                      <Text>
                        <Text style={{ fontWeight: 'bold' }}>Giáo viên {data.TenLop}</Text> gửi{data.IDLoai == 5 ? <Text>báo bài </Text> : <Text> {data.TenThongBao} </Text>}đến <Text style={{ fontWeight: 'bold' }}>{data.TenHocSinh}</Text>
                      </Text>}
                </Text>
              }
              <Text style={{ textAlign: "left", fontSize: sizes.sizes.sText17, marginTop: 20 }} >
                Nội dung: <Text style={{ fontSize: sizes.sizes.sText17 }}> {this.state.dataLoad.NoiDung ? this.state.dataLoad.NoiDung : data.NoiDung}</Text>
              </Text>
              <Text style={{ textAlign: "right", fontSize: sizes.sizes.sText12, marginVertical: 10 }} >
                {data.NgayGui}
              </Text>
            </View> : null
          }

          {/* show danh sách hình ảnh */}
          {
            this.state.listImg.length > 0 ?
              <View style={{ flexWrap: 'wrap', marginBottom: 10 }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                  data={this.state.listImg}
                  scrollEnabled={false}
                  numColumns={3}
                  renderItem={this._renderImage}
                  extraData={this.state.listImg}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              : null
          }

          {/* show video Youtube */}
          {data.LinkVideo ? <Fragment>
            <View style={{ height: 4, backgroundColor: nstyles.nColors.bgr }} />
            <TouchableOpacity
              onPress={() => { this.setState({ showVideo: !showVideo }) }}
              style={[nrow, { alignItems: 'center', marginVertical: 10 }]}>
              <Image source={Images.icPlayVideo} style={nstyles.nstyles.nIcon30} resizeMode='contain' />
              <Text style={stChiTiettB.text14}>{data.TieuDeVideo}</Text>
            </TouchableOpacity>
          </Fragment> : null}
          {showVideo ? <YouTubePlay idVideo={this.idVideo} /> : null}
          {  // button hiện khi có báo bài kiểm tra  
            this.state.IsCoBaiKiemTra ?
              <Fragment>
                <View style={{ height: 4, backgroundColor: nstyles.nColors.bgr }} />
                <View style={[nrow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                  <TouchableOpacity
                    onPress={this._goTraLoi}
                    style={[nrow, { alignItems: 'center', marginVertical: 10 }]}>
                    <View style={[nrow, { alignItems: 'center' }]}>
                      <Image source={Images.icBaiKiemTra} style={nstyles.nstyles.nIcon30} resizeMode='contain' />
                      <Text style={stChiTiettB.text14}>Bài kiểm tra</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={[nrow, { alignItems: 'center' }]}>
                    <View style={[nstyles.nstyles.nIcon20, nstyles.nstyles.nmiddle, { borderRadius: sizes.reSize(10), backgroundColor: this.state.checkDoneKT ? 'green' : colors.white, borderWidth: 1, borderColor: 'green' }]}>
                      <Image source={Images.icTick} style={[nstyles.nstyles.nIcon11, { tintColor: colors.white }]} resizeMode='contain' />
                    </View>
                    <Text style={stChiTiettB.text14}>Hoàn thành</Text>
                  </View>
                </View>
                <View style={{ height: 4, backgroundColor: nstyles.nColors.bgr }} />
              </Fragment>
              : null
          }
          {
            this.type == 'ThuMoiSuKien' ? <View style={{ marginTop: 10 }}>
              {this.state.dataLoad.TrangThaiTMSK == 1 ? null : <View>
                <Text style={{ textAlign: 'left', textDecorationLine: 'underline', fontStyle: 'italic', fontWeight: '500', fontSize: sizes.fs(16) }}>Phản hồi của phụ huynh:</Text>
                <View style={[nstyles.nstyles.nrow, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, paddingTop: 15 }]}>
                  <TouchableOpacity onPress={this._clickItem(1)} style={[nstyles.nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ borderWidth: 1, borderColor: '#39b44a', justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10 }}>
                      <Image source={this.state.dataPhanhoi == 1 ? Images.KScheck : Images.KSUncheck} resizeMode="contain" />
                    </View>
                    <Text style={{ paddingLeft: 5, fontSize: sizes.fs(16), fontWeight: '700' }}>Đồng ý tham gia</Text>
                  </TouchableOpacity>
                  <View style={{ width: 20 }} />
                  <TouchableOpacity onPress={this._clickItem(0)} style={[nstyles.nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ borderWidth: 1, borderColor: '#39b44a', justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10 }}>
                      <Image source={this.state.dataPhanhoi == 0 ? Images.KScheck : Images.KSUncheck} resizeMode="contain" />
                    </View>
                    <Text style={{ paddingLeft: 5, fontSize: sizes.fs(16), fontWeight: '700' }}>Ý kiến khác</Text>
                  </TouchableOpacity>
                </View>
              </View>}
              {
                this.state.dataPhanhoi == 0 ? <View style={[stChiTiettB.containerInput, { borderColor: '#EE0000' }]}>
                  <TextInput
                    numberOfLines={2}
                    style={{ minHeight: 50 }}
                    onChangeText={text => this.state.noidung = text}
                    placeholder={'Nội dung ý kiến của phụ huynh'} />
                </View> : null
              }

              <ButtonCom
                disabled={this.state.dataLoad.TrangThaiTMSK == 1 ? true : false}
                onPress={this.sendPhanHoi}
                style={{ marginTop: 10, backgroundColor: this.state.dataLoad.TrangThaiTMSK == 1 ? colors.brownishGrey : colors.colorPink }}
                text={this.state.dataLoad.TrangThaiTMSK == 1 ? "ĐÃ PHẢN HỒI" : "PHẢN HỒI"}
              />
            </View> : null
          }
          {/* <ButtonCom
            onPress={this.onCancel}
            style={{ marginTop: 10, backgroundColor: colors.colorPink }}
            text={"ĐÓNG"}
          /> */}
        </View>
      </View>
    );
  }
}

const stChiTiettB = StyleSheet.create({
  text14: {
    ...styles.text14,
    marginLeft: 10
  },
  containerInput: {
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
})



const mapStateToProps = state => ({
  sumNotifyThongBao: state.sumNotifyThongBao,
  sumNotifyThuMoiSuKien: state.sumNotifyThuMoiSuKien,
  sumNotifyBaoBai: state.sumNotifyBaoBai,
  listChildThongBaoAll: state.listChildThongBaoAll,
  listChildThongBao: state.listChildThongBao,
  listChildThuMoiSuKien: state.listChildThuMoiSuKien

});

export default Utils.connectRedux(ChiTietThongBao, mapStateToProps, true);