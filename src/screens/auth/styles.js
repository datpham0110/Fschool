import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { colors, sizes } from '../../styles';

export const radius = 6;
export const styles = StyleSheet.create({
	btnStyle: {
		height: height * 0.045,
		width: width * 0.28,
		// backgroundColor: isToggle ? colors.btnSoftBlue : 'white',
		borderRadius: height * 0.5 / 2
		// justifyContent: 'center', alignItems: 'center'
	},
	txtStyle: {
		// width: width * 0.7,
		...Platform.select({
			ios: {
				paddingBottom: 0
			},
			android: {
				paddingVertical: 0
			}
		})
	},
	boxSearchHome: {
		borderColor: colors.softBlue,
		borderRadius: 6,
		borderWidth: 1,
		marginBottom: 0
	},
	text14: {
		fontSize: sizes.sizes.sText14
	},
	text12: {
		fontSize: sizes.sizes.sText12,
		color: 'rgb(9, 9, 9)'
	},
	text20: {
		fontSize: sizes.sizes.sText20,
		color: 'rgb(9, 9, 9)'
	},
	text24: {
		fontSize: sizes.sizes.sText24,
		color: 'rgb(9, 9, 9)'
	},
	text28: {
		fontSize: sizes.sizes.sText28,
		color: 'rgb(9, 9, 9)'
	}
});
