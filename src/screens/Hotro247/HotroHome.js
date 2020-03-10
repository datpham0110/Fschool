import React, { Component } from "react"
import { View, Dimensions, TouchableOpacity, Text, Image, Linking } from "react-native"
import Utils from "../../app/Utils"
import { nstyles } from "../../styles/styles"
import { colors } from "../../styles/color"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images/index"
import { reText } from "../../styles/size"
const dataImages = [
    Images.icViber, Images.icZalo, Images.icSkype, Images.icFacebook
]
export default class HotroHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    makeCall = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1900 6474}';
        } else {
            phoneNumber = 'telprompt:${1900 6474}';
        }
        Linking.openURL(phoneNumber);

    }
    touchItem = (nameIcon) => {
        if (nameIcon == 'viber') {
            Linking.openURL('viber:chat?number=+84986238393').catch((err) => Utils.showMsgBoxOK(this, 'Thông báo', 'Bạn phải cài đặt ứng dụng Viber trên điện thoại để sử dụng chức năng này!', 'Đóng'));
        }
        if (nameIcon == 'zalo') {
            Linking.openURL('https://zalo.me/0838201003').catch((err) => Utils.showMsgBoxOK(this, 'Thông báo', 'Bạn phải cài đặt ứng dụng Zalo trên điện thoại để sử dụng chức năng này!', 'Đóng'));
        }
        if (nameIcon == 'mes') {
            Linking.openURL('http://m.me/WebMoney.Vietnam').catch((err) => Utils.showMsgBoxOK(this, 'Thông báo', 'Bạn phải cài đặt ứng dụng Messenger trên điện thoại để sử dụng chức năng này!', 'Đóng'));
        }
        if (nameIcon == 'skype') {
            Linking.openURL('skype://webmoneyvn.hotro?chat').catch((err) => Utils.showMsgBoxOK(this, 'Thông báo', 'Bạn phải cài đặt ứng dụng Skype trên điện thoại để sử dụng chức năng này!', 'Đóng'));
        }
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX,]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Hỗ trợ 24/7"} />
                <View style={[nstyles.nbody, { margin: 10, backgroundColor: 'white', padding: 10 }]}>
                    <Text style={{ fontSize: reText(18), fontWeight: '500' }}>
                        Hỗ trợ 24/7
                    </Text>
                    <TouchableOpacity onPress={this.makeCall}>
                        <View style={[nstyles.nrow, { alignItems: 'center', paddingVertical: 15 }]}>
                            <Image source={Images.icCall} resizeMode='contain' style={nstyles.nIcon40} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: reText(14), fontWeight: '500' }}>
                                    Liên lạc tổng đài
                            </Text>
                                <Text style={{ fontSize: reText(12), fontWeight: '300' }}>
                                    Cước phí 1000đ/phút
                            </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: colors.black_80, height: 1 }} />
                    <View style={{ paddingVertical: 15 }}>
                        <Text style={{ fontSize: reText(14), fontWeight: '500' }}>
                            Hỗ trợ trực tuyến
                        </Text>

                        <View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <TouchableOpacity onPress={() => this.touchItem('viber')} style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={dataImages[0]} resizeMode='contain' style={nstyles.nIcon40} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.touchItem('zalo')} style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={dataImages[1]} resizeMode='contain' style={nstyles.nIcon40} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.touchItem('skype')} style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={dataImages[2]} resizeMode='contain' style={nstyles.nIcon40} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.touchItem('mes')} style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={dataImages[3]} resizeMode='contain' style={nstyles.nIcon40} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View >
        )
    }
}
