import { TouchableOpacity, Text, Image, View } from 'react-native';
import React from 'react';
import Utils from '../../../app/Utils';
import { colors, sizes, nstyles } from '../../../styles';
import { Images } from '../../../images/index';
import styles from '../styles';
//type ==1 tương ưngs với màu softBlue, 2 tương ứng với màu xám
const ChooseItem = (props) => {
    const { customStyle = {}, customtxtStyle = {}, touch = false, type = 1, textChange = '', urlImg = '' } = props;
    return <TouchableOpacity
        {...props}
        style={[nstyles.nstyles.nrow, styles.viewBorderRadius, { borderColor: type == 1 ? colors.softBlue : 'rgba(0,0,0,0.6)' }, customStyle]}>
        {
            urlImg != '' ? <Image source={urlImg} style={nstyles.nstyles.nIcon16} resizeMode="contain" /> : null
        }
        {
            urlImg != '' ? < Text style={[styles.text1, { color: 'rgba(0,0,0,0.6)' }]}>{Utils.formatPhoneCode(textChange)} </Text>
                : <Text style={[styles.text1, { color: type == 1 ? colors.softBlue : 'rgba(0,0,0,0.6)' }, customtxtStyle]}>{textChange}</Text>
        }
        {
            touch ? <Image source={Images.icShowLessUp} style={nstyles.nIcon10} resizeMode='contain' />
                : <Image source={Images.icShowLessDown} style={[nstyles.nIcon10, { marginLeft: 5, tintColor: type == 1 ? colors.softBlue : 'gray' }]} resizeMode='contain' />
        }
    </TouchableOpacity >
};
export default ChooseItem;