
import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text, Image, Platform, TextInput
} from 'react-native';
import { colors } from '../../styles/color';
import { sizes } from '../../styles/size';
import { nColors, nstyles } from '../../styles/styles';
import { Images } from '../../images';
import Utils from '../../app/Utils';
import { CheckBox } from 'native-base'

const stContactInformation = StyleSheet.create({
    containerInput: {
        borderRadius: 18,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.softBlue,
        padding: Platform.OS == 'ios' ? 10 : 0, paddingHorizontal: 15,
        marginTop: 20,
    },
    viewRow: {
        ...nstyles.nrow,
        justifyContent: 'space-between',
        marginTop: 15
    },
    textTitle: {
        fontSize: sizes.sText12,
        color: colors.black,
    },
    textContent: {
        fontSize: sizes.sText15,
        color: colors.black,
    }
});

const ContactInformation = (props) => {
    var {
        showViewInput = true,
        contactEmail = '',
        contactCountry = '',
        contactPhone = '' } = props;

    const layoutResult = <View style={{
        backgroundColor: 'white', elevation: 6, shadowColor: 'black', shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 3 }, padding: 15, paddingBottom: 20, margin: 10, marginVertical: 5
    }}>
        <View style={nstyles.nrow}>
            <Image source={Images.icMail} style={{ tintColor: colors.colorSapphireTwo }} resizeMode='contain' />
            <Text style={{ color: colors.black, fontSize: sizes.sText14, marginLeft: 10 }}>CONTACT DETAILS</Text>
        </View>
        <View style={stContactInformation.viewRow}>
            <Text style={stContactInformation.textTitle}>Email</Text>
            <Text style={stContactInformation.textContent}>{contactEmail}</Text>
        </View>
        <View style={stContactInformation.viewRow}>
            <Text style={stContactInformation.textTitle}>Nationality</Text>
            <Text style={stContactInformation.textContent}>{contactCountry}</Text>
        </View>
        {contactPhone ? <View style={stContactInformation.viewRow}>
            <Text style={stContactInformation.textTitle}>Mobile Phone</Text>
            <Text style={stContactInformation.textContent}>{contactPhone}</Text>
        </View> : null}

    </View>;

    const layoutInput = <View style={{ flex: 1, margin: 15 }}>
        <View style={nstyles.nrow}>
            <Image source={Images.icMail} style={{ tintColor: colors.colorSapphireTwo }} resizeMode='contain' />
            <Text style={{ color: colors.black, fontSize: sizes.sText14, marginLeft: 10 }}>CONTRACT INFORMATION FOR ALL CLIENT</Text>
        </View>
        <View style={[stContactInformation.containerInput, { borderColor: '#EE0000' }]}>
            <TextInput
                numberOfLines={1}
                keyboardType={'email-address'}
                onChangeText={text => contactEmail = text}
                placeholder={'youremail@mail.com'} />
        </View>
        <View style={nstyles.nrow}>
            <TouchableOpacity activeOpacity={0.5}
                style={{ flex: 1 }}
                onPress={nthis.openModal_SelectCountry('contactCountry', true)}>
                <View style={[stContactInformation.containerInput, nstyles.nrow, { marginRight: 5, alignItems: 'center', flex: 1 }]}>
                    <Text style={{ flex: 1 }} numberOfLines={1}>{contactCountry.name}</Text>
                    <Image source={Images.icShowLessDown} style={[nstyles.nIcon12, { tintColor: colors.colorCharcoalGrey, marginHorizontal: 5 }]} resizeMode='contain' />
                </View>
            </TouchableOpacity>
            <View style={[stContactInformation.containerInput, nstyles.nrow, { flex: 1, marginLeft: 5, borderWidth: 2, alignItems: 'center' }]}>
                <Text>{contactCountry.phoneCode} | </Text>
                <TextInput
                    numberOfLines={1}
                    style={{ flex: 1 }}
                    keyboardType={'numeric'}
                    placeholder={'1234567890'}
                    onChangeText={text => holderPhone = contactCountry.phoneCode + text} />
            </View>
        </View>
        <View style={nstyles.nrow}>
            <CheckBox color={colors.softBlue} checked={true} style={{ marginRight: 15, marginVertical: 10 }} />
            <Text style={{ fontSize: sizes.sText12, color: colors.black, flex: 1, paddingVertical: 5 }}>I do not want to receive newsletter about cheap air tickets or other promotions</Text>
        </View>
    </View>;
    return showViewInput ? layoutInput : layoutResult;
}

export default ContactInformation;

