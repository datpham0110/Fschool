import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';

import { reSize, reText } from '../../styles/size';
import { nstyles } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ButtonCom from '../../components/Button/ButtonCom';
import moment from 'moment';
const { width } = Dimensions.get('window');

export default class ThanhToan extends Component {
    constructor(props) {
        super(props);
        this.textTitle = ''
        this.state = {
            check: false,
            date: new Date()
        };
    }
    componentDidMount() {

    }


    render() {
        var { check, date } = this.state
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10, backgroundColor: 'white' }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Biên nhận giao dịch'} />
                <View style={[nstyles.nbody, { paddingTop: 40, paddingHorizontal: 30 }]}>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image source={check ? Images.successBB : Images.icWarning} style={nstyles.nIcon48} resizeMode='contain' />
                        <Text style={[styles.sTitle, { paddingVertical: 15, color: check ? '#C62626' : 'black' }]}>{check ? 'NẠP TIỀN THÀNH CÔNG' : 'NẠP TIỀN KHÔNG THÀNH CÔNG'}</Text>
                    </View>
                    {
                        check ? <View>
                            <Text style={[styles.sTitle, { paddingVertical: 10 }]}>THÔNG TIN GIAO DỊCH</Text>
                            <Text style={[styles.text, { alignItems: 'flex-start' }]}>
                                Thẻ TM VCB
                                </Text>
                            <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Số thẻ:
                                     </Text>
                                <Text style={styles.text}>
                                    0987654321
                                    </Text>
                            </View>
                            <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Chủ thẻ:
                                     </Text>
                                <Text style={styles.text}>
                                    Pham Quoc Dat
                                    </Text>
                            </View>
                            <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Ngày giao dịch:
                                     </Text>
                                <Text style={styles.text}>
                                    {moment(this.state.date, 'MM/DD/YYYY h:m:s A').format("DD/MM/YYYY")}
                                </Text>
                            </View>
                            <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Số tiền nạp:
                                     </Text>
                                <Text style={styles.text}>
                                    {'10.000'}
                                </Text>
                            </View>
                            <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Phí giao dịch:
                                     </Text>
                                <Text style={styles.text}>
                                    {'500 VNĐ'}
                                </Text>
                            </View>
                        </View> : null
                    }

                    <View style={{ backgroundColor: colors.black_80, height: 1 }} />
                    <View style={{ paddingVertical: 15 }}>
                        {
                            check ? <View style={[nstyles.nrow, styles.viewContainer]}>
                                <Text style={styles.text}>
                                    Tổng tiền:
                                 </Text>
                                <Text style={styles.text}>
                                    {'10.500'}đ
                                </Text>
                            </View> : <View>
                                    <Text style={styles.sText}>Số dư trong ví không đủ để thực hiện giao dịch. </Text>
                                    <Text style={styles.sText}>Vui lòng kiểm tra và thử lại</Text>
                                </View>
                        }

                    </View>
                </View>
                <ButtonCom
                    colorChange={['#f8b199', '#f27972']}
                    Linear={true}
                    style={{ marginTop: 10 }}
                    text={"Trang chủ"}
                    style={{ marginHorizontal: 50, marginVertical: 10 }}
                />
            </View >
        );
    }
}


const styles = StyleSheet.create({
    sTitle: {
        textAlign: 'center',
        color: colors.blackShadow,
        fontSize: reText(18),
        fontWeight: 'bold',
    },
    viewContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sText: {
        color: colors.blackShadow,
        fontSize: reText(18),
        fontWeight: '400',
        textAlign: 'center'
    },
    text: {
        color: colors.blackShadow,
        fontSize: reText(16),
        fontWeight: '500',
        padding: 5
    },

})
