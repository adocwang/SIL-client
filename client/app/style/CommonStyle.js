/**
 * Created by kiefer on 2017/3/6.
 */
import {
    StyleSheet
} from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    authInput:{
        width:300,
        height:50,
        borderWidth:3,
        borderColor:'#41B0E6',
        borderRadius:25,
        alignSelf:'center',
        backgroundColor:'#ffffff',
        textAlign:'center'
    },
    authInputWrong:{
        width:300,
        height:50,
        borderWidth:3,
        borderColor:'#F21B35',
        borderRadius:25,
        alignSelf:'center',
        backgroundColor:'#ffffff',
        textAlign:'center'
    },
    btnBorderBule: {
        flexDirection: 'row',
        width:244,
        height:36,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#17A3FF',
        borderWidth: 1,
        backgroundColor:'#41B0E6'
    },
    btnBule: {
        flexDirection: 'row',
        width:167,
        height:32,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor:'#3AB0FF'
    },
    textWhite14: {
        fontSize: 14,
        color: '#ffffff',
    },
    textGray14: {
        fontSize: 14,
        color: '#757575',
    },
    textGray10: {
        fontSize: 10,
        color: '#757575',
    },
    textBlue14: {
        fontSize: 14,
        color: '#41B0E6',
    },
    textDark14:{
        fontSize: 14,
        color: '#4A4A4A',
    },
    textYellow:{
        fontSize:12,
        color:'#F8E71C'
    }
});

module.exports = commonStyles