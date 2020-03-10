import React, { Component } from "react"
import { View, Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native"
import Utils from "../../app/Utils"
import { nstyles } from "../../styles/styles"
import { colors } from "../../styles/color"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images/index"
import HistoryHocPhi from "./HistoryHocPhi"
import NotifyHocPhi from "./NotifyHocPhi"
import { sizes } from "../../styles"
import Video from "react-native-video"
import { appConfig } from "../../app/Config"
import { isIphoneX } from "react-native-iphone-x-helper"
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
  }

  componentDidMount() {
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
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
        <HeaderCom
          nthis={this}
          iconLeft={Images.icbackspace}
          titleText={"Học phí SSC"}
          iconRight={Images.icPlay}
          onPressRight={this.onTouch}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.setState({ tabNP: 0 })}
            style={{
              width: width / 2,
              paddingVertical: 20,
              alignItems: "center",
              borderBottomWidth: this.state.tabNP == 0 ? 3 : 0,
              borderBottomColor:
                this.state.tabNP == 0
                  ? colors.colorGreenOne1
                  : colors.brownGreyThree
            }}>
            <Text
              style={{
                justifyContent: "center",
                fontSize: sizes.sText15,
                color:
                  this.state.tabNP == 0
                    ? colors.colorGreenOne1
                    : colors.brownGreyThree
              }}  >
              {this.state.date.toString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ tabNP: 1 })}
            style={{
              width: width / 2,
              paddingVertical: 20,
              alignItems: "center",
              borderBottomWidth: this.state.tabNP == 1 ? 3 : 0,
              borderBottomColor:
                this.state.tabNP == 1
                  ? colors.colorGreenOne1
                  : colors.brownGreyThree
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                fontSize: sizes.sText15,
                color:
                  this.state.tabNP == 1
                    ? colors.colorGreenOne1
                    : colors.brownGreyThree
              }}
            >
              Tra cứu lịch sử
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.BackgroundHome }}>
          {this.state.tabNP == 0 ? (
            <NotifyHocPhi abc={this} />
          ) : (
              <HistoryHocPhi />
            )}
        </View>
        {
          this.state.loading ? <View style={{
            position: 'absolute',
            width: width,
            height: height,
            backgroundColor: colors.white,
          }}>

            <Video
              source={{ uri: appConfig.domainVideo + 'upload/video/thanhtoanmot.mp4' }}
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