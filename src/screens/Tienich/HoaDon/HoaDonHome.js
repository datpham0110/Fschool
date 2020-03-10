import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../../styles';

import { reSize, reText } from '../../../styles/size';
import Utils from '../../../app/Utils';
import { nstyles, Height, nwidth, nheight } from '../../../styles/styles';
import HeaderCom from '../../../components/HeaderCom';
import { Images } from '../../../images';

var data = [
    {
        icon: Images.icTTDienThoai,
        title: '0901234567',
        noidung: 'Mobi trả sau',
        total: '215.000'
    },
    {
        icon: Images.icTTTienNuoc,
        title: 'PE 01234567892',
        noidung: 'Hóa đơn nước',
        total: '65.000'
    },
    {
        icon: Images.icTTInternet,
        title: 'ISO 456878932',
        noidung: 'Hóa đơn Internet',
        total: '245.000'
    },
    {
        icon: Images.icTTDien,
        title: 'ISO 456878932',
        noidung: 'Hóa đơn Internet',
        total: '245.000'
    },
]
export default class HoaDonHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={{ paddingBottom: 8 }}>
                <View style={[nstyles.nrow, { alignItems: 'center', paddingVertical: 10 }]}>
                    <Image source={item.icon} />
                    <View style={{ width: 20 }} />
                    <View style={[nstyles.nrow, { flex: 1, justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={Styles.stext}>{item.title}</Text>
                            <Text style={{ fontSize: sizes.reText(12) }}>{item.noidung}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: sizes.reText(14), paddingBottom: 5 }}>{item.total}</Text>
                            <Text style={{ fontSize: sizes.reText(12), color: '#1f68e8' }}>Thanh toán</Text>
                        </View>
                    </View>
                </View>
                {
                    index == data.length - 1 ? null : <View style={{ backgroundColor: '#b5b3b3', height: 1 }} />
                }

            </View>

        )
    }
    _clickMenu = (route: String, param: Object) => () => {
        if (param) Utils.goscreen(this, route, param);
        else Utils.goscreen(this, route);
    };
    renderItemMenuBot = (icon, routerName = '', name = '', param = false) => {
        return (
            <TouchableOpacity style={{ alignItems: 'center', width: nwidth / 3 - 30, height: nheight * 0.13 }}
                onPress={this._clickMenu(routerName, param)}>
                <Image resizeMode="contain" source={icon}
                    style={[nstyles.nIcon48, { margin: 10 }]} />
                <Text style={{ paddingHorizontal: 15, textAlign: 'center', fontSize: reSize(14) }}>{name}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10, backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Thanh toán hoá đơn'} />
                <View style={[nstyles.nbody, { marginHorizontal: 30 }]}>
                    <Text style={[Styles.stextTitle, { paddingTop: 20 }]}>{'Hóa đơn đã lưu :'}</Text>
                    <View style={{ flex: 1, maxHeight: nheight * 0.3 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ flex: 1, paddingTop: 10 }}>
                        <Text style={Styles.stextTitle}>{'Thêm hóa đơn mới :'}</Text>
                        <View style={[nstyles.nrow, { flex: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }]}>
                            {this.renderItemMenuBot(Images.icTTDien, '', 'Điện')}
                            {this.renderItemMenuBot(Images.icTTTienNuoc, '', 'Nước')}
                            {this.renderItemMenuBot(Images.icTTInternet, '', 'Internet')}
                            {this.renderItemMenuBot(Images.icTruyenHinh, '', 'Truyền hình')}
                            {this.renderItemMenuBot(Images.icPhoneCoDinh, '', 'Điện thoại cố định')}
                            {this.renderItemMenuBot(Images.icVayTieuDung, '', 'Vay tiêu dùng')}
                            {this.renderItemMenuBot(Images.icChungcu, '', 'Chung cư')}
                            {this.renderItemMenuBot(Images.icThuHocPhi, '', 'Thanh toán học phí')}
                            {this.renderItemMenuBot(Images.icTTKhac, '', 'Khác')}
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

const Styles = StyleSheet.create({
    stext: {
        fontSize: sizes.reText(16),
        fontWeight: 'bold',
        paddingBottom: 5
    },
    stextTitle: {
        fontSize: sizes.reText(18),
        fontWeight: '500',
        paddingBottom: 10
    },
    containerTabSignIn: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 3,
        alignItems: 'center',
    },
    shadow: {
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: 'black'
    },
})