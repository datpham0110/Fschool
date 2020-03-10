import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../styles/color';
import { sizes, reText, fs } from '../../styles/size';
import { nColors, nstyles } from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

/*
    - style:
      + ...style Dùng cho contain button
      + color, fontSize, fontWeight dùng cho Text.
    - shadow (bool):
      + true: button có đổ bóng
      + false: button không có đổ bóng
*/

const ButtonCom = (props) => {
	let {
		onPress,
		text = 'Button',
		shadow = true,
		disabled = false,
		Linear = false,
		txtStyle = {},
		style = {},
		styleTouchable = {},
		colorChange = true
	} = props;
	let { backgroundColor = colors.white } = style;
	let shadowStyle = {};
	if (shadow == true) {
		shadowStyle = stButtonCom.containShadow;
	}

	return (
		<TouchableOpacity disabled={disabled} style={{ ...styleTouchable }} onPress={onPress}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={
					Linear && colorChange == true ? (
						[colors.greenyBlue, colors.darkSkyBlue]
					) : colorChange != true ? (
						colorChange
					) : (
								[backgroundColor, backgroundColor]
							)
				}
				style={[stButtonCom.containerBtn, shadowStyle, style]}
			>
				<Text
					style={[
						nstyles.ntitle,
						{ color: colors.white, fontSize: fs(16), lineHeight: 19, fontWeight: '600' },
						txtStyle
					]}
				>
					{text}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};
const stButtonCom = StyleSheet.create({
	containerBtn: {
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 24
	},
	containShadow: {
		shadowColor: 'rgba(0, 0, 0, 0.2)',
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 9,
		shadowOpacity: 1,
		elevation: Platform.OS == 'android' ? 3 : 0
	}
});

export default ButtonCom;