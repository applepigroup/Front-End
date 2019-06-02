import React ,{Component,} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from 'react-native-responsive-screen';

export class Notification extends Component
{
    render()
    {
        return(
            <View style={styles.container}>
                <Text style={styles.text} placeholderTextColor="white">{this.props.msg}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:
    {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#16a085",
      position:'absolute',
      top:0
    },
    text:
    {
        width:hp('100%'),
        padding:hp('2%'),
        backgroundColor:'red',
        color:'white',
        fontSize:hp('3.2%'),
        textAlign:'center'
    }
});
