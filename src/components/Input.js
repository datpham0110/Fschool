import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { colors, sizes } from '../styles';
const Input = (props) => {
	const { onChange, customStyle, placeholderTextColor = 'rgba(0,0,0,0.6)' } = props;
	const handleOnChange = (e) => {
		onChange(e);
	};
	return (
		<TextInput
			{...props}
			underlineColorAndroid={'transparent'}
			style={[styles.viewBorderRadius, customStyle]}
			onChangeText={handleOnChange}
			placeholderTextColor={placeholderTextColor}
		/>
	);
};
const styles = StyleSheet.create({
	viewBorderRadius: {
		borderColor: colors.brownishGrey,
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 24,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		marginTop: 10,
		fontSize: sizes.sizes.sText13,
		color: 'rgba(0,0,0,0.6)',
		...Platform.select({
			ios: {
				paddingVertical: 9
			},
			android: {
				paddingVertical: 9
			}
		})
	}
});
export default Input;
