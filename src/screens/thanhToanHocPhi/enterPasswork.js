import React, { Component } from "react"
import { colors, sizes } from "../../styles"
import { Text, View, Dimensions, TouchableOpacity } from "react-native"
import { Images } from "../../images"
import ButtonCom from "../../components/Button/ButtonCom"
import { styles } from "./styles"
import Utils from "../../app/Utils"
import Input from "../../components/componentsYSchool/Input"

const { width } = Dimensions.get("window")
export default class EnterPassword extends Component {
  constructor(props) {
    super(props)
    // data = Utils.ngetParam(this, "data");
    this.state = {}
  }

  onCancel = () => {
    Utils.goback(this, null)
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.black_16,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: "100%"
          }}
        >
          <Text
            style={{
              marginHorizontal: 20,
              paddingVertical: 20,
              borderBottomWidth: 1,
              //   marginVertical: 30,
              textAlign: "center"
            }}
          >
            Nhập mật khẩu
          </Text>
          <View
            style={{
              marginHorizontal: width * 0.2,
              marginTop: 30,
              marginBottom: 50
            }}
          >
            <Input
              placeholder={"Nhập mật khẩu"}
              secureTextEntry={true}
              onChangeText={text => (this.pass2 = text)}
              showIcon={true}
              icon={Images.icLock}
              keyboardType={"number-pad"}
              iconStyle={{ marginRight: 10, tintColor: "gray" }}
            />
          </View>
          <View style={{ marginBottom: 20, textAlign: "center" }}>
            <Text style={{ textAlign: "center" }}>Quên mật khẩu?</Text>
          </View>
        </View>
      </View>
    )
  }
}
