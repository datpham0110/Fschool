import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../../styles';

import { reSize, reText } from '../../../styles/size';
import Utils from '../../../app/Utils';
import { nstyles, Height, nwidth } from '../../../styles/styles';
import HeaderCom from '../../../components/HeaderCom';
import { Images } from '../../../images';
import TraTruoc from './TraTruoc';
import MuaMaThe from './MuaMaThe';
import TraSau from './TraSau';

export default class Thecao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
        };
    }

    tab_menu = (check) => {
        this.setState({ tab: check })
    }
    renderTabMenu = () => {
        var { tab } = this.state
        switch (tab) {
            case 0:
                return <TraTruoc nthis={this} />
            case 1:
                return <MuaMaThe />
            case 2:
                return <TraSau />
        };
    }
    render() {

        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10, backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Mua mã thẻ điện thoại'} />
                <View style={nstyles.nbody}>
                    <View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                            style={[Styles.containerTab, nstyles.nrow, Styles.containerTabSignIn, { borderBottomColor: this.state.tab == 0 ? '#5ca178' : colors.white }]}
                            onPress={() => this.tab_menu(0)}>
                            <Text style={{ color: this.state.tab == 0 ? '#5ca178' : colors.black_80, fontWeight: this.state.tab == 0 ? 'bold' : '300', fontSize: reSize(15) }}>{'Trả trước'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.containerTab, nstyles.nrow, Styles.containerTabSignIn, { borderBottomColor: this.state.tab == 1 ? '#5ca178' : colors.white }]}
                            onPress={() => this.tab_menu(1)}>
                            <Text style={{ color: this.state.tab == 1 ? '#5ca178' : colors.black_80, fontWeight: this.state.tab == 1 ? 'bold' : '300', fontSize: reSize(15) }}>{'Mua mã thẻ'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.containerTab, nstyles.nrow, Styles.containerTabSignIn, { borderBottomColor: this.state.tab == 2 ? '#5ca178' : colors.white }]}
                            onPress={() => this.tab_menu(2)}>
                            <Text style={{ color: this.state.tab == 2 ? '#5ca178' : colors.black_80, fontWeight: this.state.tab == 2 ? 'bold' : '300', fontSize: reSize(15) }}>{'Mobiphone trả sau'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            this.renderTabMenu()
                        }
                    </View>
                </View>

            </View >
        );
    }
}

const Styles = StyleSheet.create({
    containerTab: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTabSignIn: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 3,
        alignItems: 'center',
    },
})