import React, {
  Component
} from "react"
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native"
import { nstyles } from "../../styles/styles";
import { colors } from "../../styles/color";
import { Images } from "../../images/index";
import { fs } from "../../styles/size";
import { appConfig } from "../../app/Config";
import { isIphoneX } from "react-native-iphone-x-helper";
import HeaderCom from "../../components/HeaderCom";
import HistoryHocPhi from "./HistoryHocPhi";
import NotifyHocPhi from "./NotifyHocPhi";
import Video from "react-native-video";
import Utils                      from '../../app/Utils';

const { width, height } = Dimensions.get("window")

export default class HocPhi extends Component {
  constructor(props) {
    super(props)
    nthis = this
    this.state = {
      date: "",
      tabNP: 0,
      loading: false,
    }
    this.isNotify = Utils.ngetParam(this, 'isNotify', '');
    this.dataNotify = Utils.ngetParam(this, 'dataNotify', '')
  }

  componentDidMount() {
    Utils.nlog('------------------------------------------------------------ this.isNotify', this.isNotify);
    Utils.nlog('------------------------------------------------------------ this.dataNotify', this.dataNotify);
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    this.setState({ date: "T" + month + "/" + year })

  }
  onEnd = () => {
    this.setState({ loading: false })
  }
  onTouch = () => {
    this.setState({ loading: true })
  }
  onGoback = () =>  {
    if(this.isNotify == true){
      Utils.nlog('----------------------------------------------------------');
      Utils.goscreen(this, 'sc_ThongBaoAll', { IDHocSinh:this.dataNotify.IDHocSinh })
    } else {
      Utils.nlog('-------------- go back----------------------------------------------');
      Utils.goback(this)
    }
   
  }
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
        <HeaderCom
          nthis={this}
          iconLeft={Images.icbackspace}
          titleText={"Học phí SSC"}
          iconRight={Images.icPlay}
          onPressRight={this.onTouch}
          onPressLeft={this.onGoback}
        />
        <View style={nstyles.nrow}>
          <TouchableOpacity
            onPress={() => this.setState({ tabNP: 0 })}
            style={[styTuition.styTab, {
              borderBottomWidth: this.state.tabNP == 0 ? 3 : 0,
              borderBottomColor: this.state.tabNP == 0 ? colors.colorGreenOne1 : colors.brownGreyThree }]}>
            <Text style={[styTuition.titDate, {
              color: this.state.tabNP == 0 ? colors.colorGreenOne1 : colors.brownGreyThree}]}>
              {this.state.date.toString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styTuition.styTab, {
            borderBottomWidth: this.state.tabNP == 1 ? 3 : 0,
            borderBottomColor: this.state.tabNP == 1 ? colors.colorGreenOne1 : colors.brownGreyThree}]}
            onPress={() => this.setState({ tabNP: 1 })}>
            <Text style={[styTuition.titDate, { color: this.state.tabNP == 1 ? colors.colorGreenOne1 : colors.brownGreyThree }]}>
              Tra cứu lịch sử
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: colors.BackgroundHome }}>
          {this.state.tabNP == 0 ? (<NotifyHocPhi abc={this} />) : (<HistoryHocPhi />)}
        </View>

        {this.state.loading ?
            <View style={[styTuition.viwVideo]}>
              <Video
                source={{ uri: appConfig.domainVideo + 'upload/video/thanhtoanmot.mp4' }}
                ref={(ref) => { this.player = ref }}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
                paused={this.state.paused}                                 
                style={styTuition.backgroundVideo}
                repeat={true}
                onError={this.videoError}
                onEnd={this.onEnd}
              />
              <TouchableOpacity onPress={() => this.setState({ loading: false })}
                style={styTuition.touhBtnDong}>
                <Text style={styTuition.texBtnClose}>ĐÓNG</Text>
              </TouchableOpacity>
            </View> : 
            null
          }
      </View>
    )
  }
}
export const styTuition = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  styTab: {
    width: width / 2,
    paddingVertical: 14,
    alignItems: "center",
  },
  titDate: {
    justifyContent: "center",
    fontSize: fs(18),
    fontWeight: 'bold',
  },
  viwVideo: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: colors.white
  },
  touhBtnDong: {
    padding: 5, 
    backgroundColor: 'white', 
    borderRadius: 6, 
    top: 0, 
    right: 0, 
    marginTop: isIphoneX() ? 50 : 25, 
    marginRight: 10, 
    position: 'absolute'
  },
  texBtnClose:{
    fontWeight: 'bold', 
    fontSize: fs(16), 
    color: colors.colorPink3
  }
});