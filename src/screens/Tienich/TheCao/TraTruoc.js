import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../../styles';

import { reSize, reText } from '../../../styles/size';
import Utils from '../../../app/Utils';
import { nstyles, Height, nwidth } from '../../../styles/styles';
import HeaderCom from '../../../components/HeaderCom';
import { Images } from '../../../images';
import ButtonCom from '../../../components/Button/ButtonCom';

export default class TraTruoc extends Component {
    constructor(props) {
        super(props);
        this.nthis = this.props.nthis;
        dataMoney = ['10.000', '20.000', '30.000', '50.000', '100.000', '200.000', '300.000', '500.000']
        this.state = {
            itemClick: [],
            number: 1
        };
    }
    _clickItem = (id) => () => {
        this.setState({ itemClick: [id] });
    }
    _clickNumb = (inum) => {
        var { number } = this.state
        if (inum == false) {
            if (this.state.number > 1) {
                this.setState({ number: number - 1 })
            }
        } else if (this.state.number < 5) {
            this.setState({ number: number + 1 })
        }

    }
    render() {
        return (
            <View style={{ paddingVertical: 10, marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => Utils.goscreen(this.nthis, 'Modal_ChonNhaMang')}
                    style={[nstyles.nrow, {
                        alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15,
                        paddingLeft: 23, paddingRight: 10, backgroundColor: colors.whitegay, borderRadius: 4
                    }]}>
                    <View style={[nstyles.nrow, { alignItems: 'center' }]}>
                        <Image source={Images.icMobifone} resizeMode='contain' />
                        <View style={{ width: 15 }} />
                        <Text style={{ fontSize: reSize(16), fontWeight: '500' }}>{'Mobiphone'}</Text>
                    </View>
                    <Image resizeMode="contain" source={Images.iconNext1} style={{ width: nwidth * 0.04, height: nwidth * 0.04 }} />
                </TouchableOpacity>
                <View style={{ marginVertical: 10 }}>
                    <Text style={stHoctap.stext}>Chọn mệnh giá nạp tiền</Text>
                    <View style={{ padding: 5, backgroundColor: colors.whitegay, borderRadius: 6, marginVertical: 10 }}>
                        <View style={[nstyles.nrow, { flexWrap: 'wrap' }]}>
                            {dataMoney.map((item, index) => <ButtonCom key={index} onPress={this._clickItem(index)}
                                style={stHoctap.butom}
                                styleTouchable={stHoctap.shadow}
                                txtStyle={[stHoctap.stext, { paddingHorizontal: 13 }]}
                                text={item}
                                colorChange={this.state.itemClick.includes(index) ? ['#f8b199', '#f27972'] : ['#e0dede', '#e0dede']}
                                Linear={true}
                            />)}
                        </View>
                    </View>
                </View>

                <View style={[nstyles.nrow, { borderRadius: 4, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, backgroundColor: colors.whitegay }]}>
                    <Text style={{ fontSize: reSize(16), fontWeight: '500' }}>Chọn số lượng mua</Text>
                    <View style={[nstyles.nrow, { alignItems: 'center', }]}>
                        <TouchableOpacity disabled={this.state.number == 1 ? true : false} onPress={() => this._clickNumb(false)}>
                            <Image source={Images.icMinus} resizeMode='contain' />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 8, paddingVertical: 4, marginHorizontal: 8, borderWidth: 1, borderRadius: 6, borderColor: '#2FBACF' }}>
                            <Text>{this.state.number}</Text>
                        </View>
                        <TouchableOpacity disabled={this.state.number == 5 ? true : false} onPress={() => this._clickNumb(true)}>
                            <Image source={Images.icPlus} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
                <ButtonCom
                    colorChange={['#f8b199', '#f27972']}
                    Linear={true}
                    style={{ marginTop: 10 }}
                    text={"Tiếp tục"}
                    style={{ paddingHorizontal: 50, marginHorizontal: 60, marginTop: 10 }}
                />
            </View >
        );
    }
}

const stHoctap = StyleSheet.create({
    stext: {
        fontSize: sizes.reText(15),
        fontWeight: 'bold',
        color: 'black'
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
    butom: {
        borderRadius: 4,
        width: nwidth / 3 - 30,
        borderColor: '#e3e1e1',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 8,

    },
})