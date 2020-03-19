import React, { Component } from "react";
import { colors, sizes } from "../../styles";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import Input from "../../components/componentsYSchool/Input";
import { Images } from "../../images";
import ButtonCom from "../../components/Button/ButtonCom";
import { nkey } from "../../app/keys/keyStore"
import Utils from "../../app/Utils";
import { postChangePassword } from "../../apis/profile";
const { width } = Dimensions.get("window");
export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: ""
        };
    }

    onCancel = () => {
        Utils.goback(this, null);
    };
    _onSubmit = async () => {
        let password = await Utils.ngetStore(nkey.password, null)
        //    let password = await Utils.ngetStore(nkey.password, null)
        if (this.state.OldPassword != password) {
            Utils.showMsgBoxOK(
                this,
                "Thông báo",
                "Mật khẩu cũ của bạn không đúng",
                "Đóng"
            );
            return;
        }

        if (this.state.OldPassword.toString().trim().length < 1) {
            Utils.showMsgBoxOK(
                this,
                "Thông báo",
                "Mật khẩu cũ không được để trống",
                "Đóng"
            );
            return;
        } else if (
            this.state.NewPassword.toString().trim().length < 6
        ) {
            Utils.showMsgBoxOK(
                this,
                "Thông báo",
                "Mật khẩu mới phải 6 ký tự trở lên",
                "Đóng"
            );
            return;
        }
        else if (this.state.ConfirmPassword.toString().trim().length < 6) {
            Utils.showMsgBoxOK( this, "Thông báo","Nhập lại mật khẩu mới phải 6 ký tự trở lên","Đóng");
            return;
        }
        else if (this.state.NewPassword != this.state.ConfirmPassword) {
            Utils.showMsgBoxOK(this,"Thông báo","Mật khẩu mới và nhập lại mật khẩu mới phải trùng nhau","Đóng");
            return;
        } else {

            if (this.state.NewPassword != password) {
                let res = await postChangePassword(
                    this.state.OldPassword,
                    this.state.NewPassword,
                    this.state.ConfirmPassword
                );
                if (res.success == true) {
                    Utils.showMsgBoxOK(this, "Thông báo", "Đổi mật khẩu thành công","Đóng",this.onCancel);
                } else {
                    Utils.showMsgBoxOK(this,"Thông báo", "Đổi mật khẩu không thành công","Đóng",this.onCancel);
                }
            } else {
                Utils.showMsgBoxOK(this,"Thông báo","Mật khẩu mới không được trùng với mật khẩu cũ","Đóng");
            }

        }
    };
    render() {
        return (
            <View style={{ backgroundColor: colors.black_16, flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: colors.white, width: width * 0.9, padding: width * 0.1, borderRadius: 10 }}>
                    <Text style={{ fontWeight: "800", textAlign: "center", marginBottom: 20, fontSize: sizes.sizes.sText24 }}> Đổi mật khẩu </Text>
                    <Input secureTextEntry={true}
                        keyboardType={"number-pad"}
                        placeholder={"Nhập mật khẩu cũ"}
                        onChangeText={text => this.setState({ OldPassword: text })}
                        iconStyle={
                            { marginRight: 10, tintColor: "gray" }}
                    />
                    <Input secureTextEntry={true}
                        keyboardType={"number-pad"}
                        placeholder={"Nhập mật khẩu mới"}
                        onChangeText={text => this.setState({ NewPassword: text })}
                        iconStyle={
                            { marginRight: 10, tintColor: "gray" }}
                    />
                    <Input secureTextEntry={true}
                        keyboardType={"number-pad"}
                        placeholder={"Nhập lại mật khẩu mới"}
                        onChangeText={text => this.setState({ ConfirmPassword: text })}
                        iconStyle={
                            { marginRight: 10, tintColor: "gray" }}
                    />
                    <ButtonCom onPress={this._onSubmit} style={{ marginTop: 10, backgroundColor: colors.colorPink }}
                        text={"Đổi mật khẩu"}
                    />
                    <ButtonCom onPress={this.onCancel} style={{ marginTop: 10, backgroundColor: colors.colorGrayText }} text={"Đóng"} />
                </View>
            </View>
        );
    }
}