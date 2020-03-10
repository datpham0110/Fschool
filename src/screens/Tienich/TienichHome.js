import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import ListEmpty from "../../components/ListEmpty";

import { reSize, reText } from '../../styles/size';
import Utils from '../../app/Utils';
import { nstyles, Height, nwidth } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';

const { width } = Dimensions.get('window');

export default class TienichHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    _clickMenu = (route: String, param: Object) => () => {
        if (param) Utils.goscreen(this, route, param);
        else Utils.goscreen(this, route);
    };
    renderItemMenuBot = (icon, routerName = '', name = '', param = false) => {
        let sizeImg = nwidth * 0.09;
        return (
            <TouchableOpacity style={{ borderColor: '#e3e1e1', borderWidth: 0.5, width: nwidth / 3, alignItems: 'center' }}
                // onPress={this._clickMenu(routerName, param)}>
                onPress={() => Utils.showMsgBoxOK(this, 'Thông báo', 'Tính năng đang cập nhật', 'Đóng')}>
                <Image resizeMode="contain" source={icon}
                    style={[nstyles.nIcon56, { margin: 10 }]} />
                <Text style={{ textAlign: 'center', flex: 1, marginRight: 7, fontSize: reSize(16) }}>{name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Tiện ích'} />
                <View style={nstyles.nbody}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                        {this.renderItemMenuBot(Images.icBook, '', 'Nhà sách')}
                        {this.renderItemMenuBot(Images.icHoaDon, 'sc_HoaDonHome', 'Hoá đơn')}
                        {this.renderItemMenuBot(Images.icNapTien, 'sc_NapTienDienThoai', 'Nạp tiền điện thoại')}
                        {this.renderItemMenuBot(Images.icTheCao, 'sc_Thecao', 'Mua thẻ cào')}
                        {this.renderItemMenuBot(Images.icMuaSam, '', 'Mua sắm')}
                        {this.renderItemMenuBot(Images.icGiaiTri, '', 'Giải trí')}
                    </View>
                </View>
                {/* <View style={{ flex: 1, alignItems: 'center', top: -50 }}>
                    <Image source={Images.icnapas} resizeMode='cover' style={{ width: nwidth }} />
                </View> */}
            </View>
        );
    }
}

