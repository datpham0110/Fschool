import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View, FlatList, Image
} from 'react-native';
import { colors } from '../../styles/color';
import { sizes, isPad } from '../../styles/size';
import { nwidth, nstyles } from '../../styles/styles';
import ButtonCom from '../Button/ButtonCom';
import { Images } from '../../images';
import Utils from '../../app/Utils';
import RankStar from '../ComponentApps/RankStar'
import { RootLang } from '../../app/data/locales';

const FlatListCom = (props) => {
    const { data, onPress, style } = props;

    return (
        <View style={[{ flex: 1 }, { ...style }]}>
            <Text style={[nstyles.ntext, { fontSize: sizes.sText19, marginBottom: 15 }]}>{RootLang.lang.tophotels}</Text>
            <FlatList
                data={data}
                style={{ flex: 1 }}
                renderItem={({ item, index }) =>
                    <View style={[nstyles.ncol, styles.containerItem]}>
                        <Image resizeMode="cover" source={item.imgTitle} style={styles.containerImg} />
                        <View style={styles.containInfo}>
                            <Text style={[nstyles.ntext, { fontSize: sizes.sText24, fontWeight: "500" }]}>{item.name}</Text>
                            <Text style={[nstyles.ntext, { fontSize: sizes.sText16, marginTop: 3, fontWeight: "300" }]}>{item.name}</Text>
                            <View style={[nstyles.nrow, { justifyContent: 'space-between', marginVertical: 3, alignItems: 'center' }]}>
                                <Text style={{ fontSize: sizes.sText12, color: colors.black, fontWeight: "300" }}>From: </Text>
                                <Text style={{ fontSize: sizes.sText13, color: colors.black, fontWeight: "400", marginRight: 13 }}>
                                    VND   <Text style={{ fontWeight: "600", fontSize: sizes.sText22 }}>{Utils.formatMoney(item.price)}</Text>
                                </Text>
                            </View>
                            <ButtonCom text={RootLang.lang.booknow} onPress={onPress}
                                style={styles.btnBook} />
                        </View>
                        <View style={[nstyles.nrow, { position: 'absolute', top: 10, left: 15, alignItems: 'center' }]}>
                            <Text style={{ color: colors.white, fontSize: sizes.sText18, fontWeight: '500' }}>{RootLang.lang.ranking}:  </Text>
                            <RankStar value={item.ranking} starMode={'white'} />
                        </View>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: colors.white
    },
    containerImg: {
        width: '100%',
        height: nwidth * 0.55,
    },
    containInfo: {
        paddingTop: 10,
        paddingHorizontal: 12,
        paddingBottom: 5,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: '#F17825'
    },
    btnBook: {
        width: '40%',
        marginVertical: 5,
        alignSelf: 'flex-end',
        fontSize: sizes.sText14,
        fontWeight: '400',
        height: 34,
        borderRadius: 24
    }
});

export default FlatListCom;