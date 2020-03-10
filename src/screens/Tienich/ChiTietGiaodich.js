import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';

import { reSize, reText } from '../../styles/size';
import { nstyles } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ButtonCom from '../../components/Button/ButtonCom';
import Utils from '../../app/Utils';
const { width } = Dimensions.get('window');

export default class ChiTietGiaodich extends Component {
    constructor(props) {
        super(props);
        this.textTitle = ''
        this.state = {
        };
    }
    componentDidMount() {

    }


    render() {
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10, backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Nạp tiền điện thoại'} />
                <View style={[nstyles.nbody, { margin: 10, padding: 8 }]}>
                    <Text style={styles.textThuNgayThang1}>
                        Chi tiết giao dịch
                    </Text>
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Số điện thoại nạp:
                        </Text>
                        <Text style={styles.text}>
                            0987654321
                        </Text>
                    </View>
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Nhà mạng:
                        </Text>
                        <Text style={styles.text}>
                            Vettel
                        </Text>
                    </View>
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Mệnh giá:
                        </Text>
                        <Text style={styles.text}>
                            10.000 VNĐ
                        </Text>
                    </View>
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Chiếc khấu:
                        </Text>
                        <Text style={styles.text}>
                            0%
                        </Text>
                    </View>
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Phí giao dịch:
                        </Text>
                        <Text style={styles.text}>
                            500 VNĐ
                        </Text>
                    </View>
                    <View style={{ backgroundColor: colors.black_80, height: 1 }} />
                    <View style={[nstyles.nrow, styles.viewContainer]}>
                        <Text style={styles.text}>
                            Tổng tiền:
                        </Text>
                        <Text style={styles.text}>
                            10.500 VNĐ
                        </Text>
                    </View>
                </View>

                <ButtonCom
                    onPress={() => Utils.goscreen(this, 'sc_ThanhToan')}
                    colorChange={['#f8b199', '#f27972']}
                    Linear={true}
                    style={{ marginTop: 10 }}
                    text={"Thanh toán"}
                    style={{ marginHorizontal: 50, marginVertical: 10 }}
                />
            </View >
        );
    }
}


const styles = StyleSheet.create({
    textNameStudent1: {
        marginTop: 15,
        color: colors.blackShadow,
        fontSize: reText(12),
        textAlign: 'center',
        // paddingHorizontal: 15,
        marginBottom: 10,
        flex: 1,
        width: 100
    },
    viewItemStudent1: {
        // width: '33%',
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'
    },

    viewContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: colors.blackShadow,
        fontSize: reText(16),
        fontWeight: '500',
        textAlign: 'center',
        padding: 10
    },
    textThuNgayThang1: {
        color: colors.blackShadow,
        fontSize: reText(20),
        fontWeight: '500',
        textAlign: 'center'
    },

})
