import React, { Component } from "react"
import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native"
import { colors } from "../styles"
import { nstyles, nwidth } from "../styles/styles"
import { sizes } from "../styles/size"
const { width, height } = Dimensions.get("window")
// import ButtonCom from "/Button/ButtonCom"
import ButtonCom from "./Button/ButtonCom"
import Utils from "../app/Utils"
let widthItem = nwidth * 0.94
if (widthItem > 560) widthItem = 560
if (widthItem < 310) widthItem = 310
widthItem = (widthItem - 16) / 7
//styles màn hình popupMore
const stDatePick = StyleSheet.create({
  containMain: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000000",
    width: "94%",
    marginHorizontal: 50,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    elevation: 3,
    paddingBottom: 3
  }
})

export default class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.month = props.month == null ? new Date().getMonth() + 1 : props.month
    this.year = props.year == null ? new Date().getFullYear() : props.year
    this.state = {
      modalVisible: false,
      month: this.month,
      numberYear: 4,
      selectMonth: this.month,
      selectYear: this.year
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    onSelectedDayTu = props.onSelectedDayTu
    listMouth = [
      { id: "1", value: "01" },
      { id: "2", value: "02" },
      { id: "3", value: "03" },
      { id: "4", value: "04" },
      { id: "5", value: "05" },
      { id: "6", value: "06" },
      { id: "7", value: "07" },
      { id: "8", value: "08" },
      { id: "9", value: "09" },
      { id: "10", value: "10" },
      { id: "11", value: "11" },
      { id: "12", value: "12" },
      { id: "13", value: "" },
      { id: "14", value: "" },
      { id: "15", value: "" },
      { id: "16", value: "" }
    ]
    listYear = [
      { id: "1", value: this.year - 4 },
      { id: "2", value: this.year - 3 },
      { id: "3", value: this.year - 2 },
      { id: "4", value: this.year - 1 },
      { id: "5", value: this.year },
      { id: "6", value: "" }
    ]
  }

  show() {
    this.setState({
      modalVisible: true
    })
    setTimeout(() => {
      this.flatlistMonth.scrollToIndex({
        index: this.state.month,
        animated: true,
        viewPosition: 0
      })
      this.flatlistYear.scrollToIndex({
        index: 5,
        animated: true,
        viewPosition: 0
      })
    }, 100)
  }

  hide() {
    this.setState({ modalVisible: false })
  }

  onXacNhan = () => {
    var { onChangeValue = () => { } } = this.props
    var { selectMonth, selectYear } = this.state
    onChangeValue(selectMonth, selectYear)
    this.hide()
  }

  _touchMouth = (item, index) => {
    if (item.id >= 1 && item.id <= 12) {
      this.setState({ selectMonth: item.value })
      this.setState({ month: item.id })
      this.flatlistMonth.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5
      })
    }
  }
  _touchYear = (item, index) => {
    if (item.id >= 1 && item.id <= 5) {
      this.setState({ numberYear: index })
      this.setState({ selectYear: item.value })
      this.flatlistYear.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5
      })
    }
  }

  _renderItemMounth = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._touchMouth(item, index)}>
        <Text
          style={{
            marginHorizontal: 30,
            marginVertical: 10,
            fontSize: sizes.sText30,
            fontWeight: "800",
            color:
              this.state.month == item.id ? colors.colorGreenOne1 : colors.black
          }}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    )
  }

  _renderItemYear = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._touchYear(item, index)}>
        <Text
          style={{
            marginHorizontal: 30,
            marginVertical: 10,
            fontSize: sizes.sText30,
            fontWeight: "800",
            color:
              this.state.numberYear == index
                ? colors.colorGreenOne1
                : colors.black
          }}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    )
  }
  render() {
    let {
      style = {},
      onValueChange,
      format,
      value,
      disableDateOld = false,
      isVisible = false
    } = this.props
    var flatlistMonth = (
      <FlatList
        ref={refs => {
          this.flatlistMonth = refs
        }}
        renderItem={this._renderItemMounth}
        data={listMouth}
        extraData={this.state.month}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => { }}
        style={{
          height: "70%"
        }}
      />
    )
    var flatlistYear = (
      <FlatList
        ref={refs => {
          this.flatlistYear = refs
        }}
        renderItem={this._renderItemYear}
        data={listYear}
        extraData={this.state.numberYear}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => { }}
        style={{
          height: "80%"
        }}
      />
    )

    return (
      <TouchableOpacity
        disabled={isVisible}
        style={
          !isVisible
            ? [{ justifyContent: "center", alignItems: "center" }, style]
            : {}
        }
      >
        {isVisible ? null : (
          <TouchableOpacity
            onPress={this.show}
            style={{
              borderRadius: 100,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              backgroundColor: colors.BackgroundHome,
              width: "100%",
              paddingVertical: 10
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {this.state.selectMonth + "/" + this.state.selectYear}
            </Text>
          </TouchableOpacity>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          style={{}}
          visible={this.state.modalVisible}
          onRequestClose={() => { }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0, backgroundColor: colors.black_16, justifyContent: "center", alignItems: "center"
              }} >
              <View style={[stDatePick.containMain]}>
                <View
                  style={[nstyles.nrow, { justifyContent: "center", alignItems: "center", width: "80%", opacity: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5, marginVertical: 20 }]} >
                  <View
                    style={{ alignItems: "center", height: height * 0.25 }} >
                    <Text>THÁNG</Text>
                    {flatlistMonth}
                  </View>
                  <View style={{ alignItems: "center", height: height * 0.25 }} >
                    <Text>NĂM</Text>
                    {flatlistYear}
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginVertical: 5 }}>
                  <ButtonCom
                    style={{ backgroundColor: colors.colorPink, width: width * 0.4, marginHorizontal: 5 }} onPress={this.hide} text={"ĐÓNG"}></ButtonCom>
                  <ButtonCom
                    style={{ backgroundColor: colors.colorPink, width: width * 0.4, marginHorizontal: 5 }}
                    onPress={this.onXacNhan}
                    text={"XÁC NHẬN"}
                  ></ButtonCom>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}
