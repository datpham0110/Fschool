import { StyleSheet, Platform } from 'react-native';
import { colors, sizes, nstyles } from '../../styles';

const styles = StyleSheet.create({
    title: {
        fontSize: sizes.sizes.sText16,
        fontWeight: '600'
    },
    text: {
        fontSize: sizes.sizes.sText14
    },
    text1: {
        fontSize: sizes.sizes.sText13
    },
    text2: {
        fontSize: sizes.sizes.sText12,
        color: colors.colorSapphireTwo
    },
    viewBorderRadius: {
        borderColor: colors.colorSoftBlue,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        // width: '100%'
    },
    containerInput: {
        borderRadius: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: "#2041B7",
        padding: 10
    },
    containerMenugroup: {
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 2,
                shadowOpacity: 0.5
            },
            android: {
                elevation: 3
            }
        }),
        flexDirection: 'row'
    },
})
export default styles;