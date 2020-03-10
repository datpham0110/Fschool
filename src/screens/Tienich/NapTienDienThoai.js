import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import { reSize, reText } from '../../styles/size';
import Utils from '../../app/Utils';
import { nstyles, Height, nwidth } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonCom from '../../components/Button/ButtonCom';
const { width } = Dimensions.get('window');

export default class NapTienDienThoai extends Component {
    constructor(props) {
        super(props);
        dataMoney = ['10.000', '20.000', '30.000', '50.000', '100.000', '200.000', '300.000', '500.000']
        this.textTitle = ''
        this.state = {
            itemClick: []
        };
    }
    componentDidMount() {

    }
    _onChangeText = (text) => {
        this.textTitle = text;
    }

    _clickItem = (id) => () => {
        this.setState({ itemClick: [id] });
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Nạp tiền điện thoại'} />
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    extraHeight={50}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={[nstyles.nbody, { paddingTop: 10, paddingHorizontal: 20 }]}>
                        <Text style={styles.textThuNgayThang1}>
                            Số điện thoại nạp
                    </Text>
                        <View style={[nstyles.nrow, { alignItems: 'center', marginVertical: 15 }]}>
                            <View style={{ flex: 1, borderBottomColor: colors.black_20, borderBottomWidth: 0.5, paddingBottom: 3, marginTop: 10 }}>
                                <TextInput
                                    ref={ref => this.INPUT = ref}
                                    keyboardType='numeric'
                                    placeholder={'Số điện thoại'}
                                    style={{ paddingVertical: 0, fontSize: sizes.reText(18) }}
                                    onChangeText={this._onChangeText}
                                >{this.textTitle}</TextInput>
                            </View>
                            <View style={{ width: 5 }} />
                            <TouchableOpacity>
                                <Image source={Images.icDanhBa} resizeMode='contain' style={nstyles.nIcon21} />
                            </TouchableOpacity>
                        </View>
                        <View style={[nstyles.nrow, { marginBottom: 20, justifyContent: 'space-between' }]}>
                            <Text style={stHoctap.stext}>Nhà mạng: </Text>
                            <Text style={stHoctap.stext}>Mobilefone</Text>
                        </View>
                        <View style={{ backgroundColor: colors.black_80, height: 1 }} />
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
                    </View>
                    <View style={[nstyles.nrow, { height: 55, justifyContent: 'center' }]}>
                        <ButtonCom
                            onPress={() => Utils.goscreen(this, 'sc_ChiTietGiaodich')}
                            colorChange={['#f8b199', '#f27972']}
                            Linear={true}
                            style={{ marginTop: 10 }}
                            text={"Tiếp tục"}
                            style={{ paddingHorizontal: 50, marginTop: 10 }}
                        />
                    </View>
                </KeyboardAwareScrollView>
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
        marginVertical: 8
    },
})

const styles = StyleSheet.create({
    textThuNgayThang1: {
        color: colors.blackShadow,
        fontSize: reText(20),
        fontWeight: '500',
        textAlign: 'center'
    },
})
