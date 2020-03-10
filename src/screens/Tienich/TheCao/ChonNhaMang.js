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
var data = [
    {
        icon: Images.icMobifone,
        name: 'Mobifone'
    },
    {
        icon: Images.icVinaphone,
        name: 'Vinaphone'
    },
    {
        icon: Images.icViettel,
        name: 'Viettel'
    },
    {
        icon: Images.icVietnammobile,
        name: 'Vietnammobile'
    },
    {
        icon: Images.icGmobile,
        name: 'Gmobile'
    },
]
export default class ChonNhaMang extends Component {
    constructor(props) {
        super(props);
        nthis = this
        this.state = {
            itemClick: []
        };
    }
    _clickItem = (id) => () => {
        this.setState({ itemClick: [id] });
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} onPress={this._clickItem(index)}
                style={[nstyles.nrow, {
                    marginBottom: 14, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15,
                    paddingLeft: 23, paddingRight: 10, backgroundColor: colors.whitegay, borderRadius: 4
                }]}>
                <View style={[nstyles.nrow, { alignItems: 'center' }]}>
                    <Image source={item.icon} resizeMode='contain' />
                    <View style={{ width: 15 }} />
                    <Text style={{ fontSize: reSize(16), fontWeight: '500' }}>{item.name}</Text>
                </View>
                {
                    this.state.itemClick.includes(index) ? <Image resizeMode="contain" source={Images.icTick} style={{ width: nwidth * 0.04, height: nwidth * 0.04 }} /> : null
                }


            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10, backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Chọn nhà mạng'} />
                <View style={[nstyles.nbody, { marginHorizontal: 20, marginTop: 15 }]}>
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        extraData={this.state.itemClick}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

