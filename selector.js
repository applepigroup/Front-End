import React ,{Component,} from 'react';
import {View,StyleSheet,TextInput,TouchableWithoutFeedback,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
export class Selector extends Component
{
    render()
    {
        return(
            <View style={styles.container}>
                <TextInput style={styles.textinput} placeholder="Enter course code" placeholderTextColor="white" />
                <TouchableWithoutFeedback>
                    <View style={styles.coursebutton}>
                        <Text style={styles.coursebuttontext}>Submit</Text>
                    </View>
                </TouchableWithoutFeedback>
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
      backgroundColor: "#632A5D",
    },
    textinput:
    {
        width:wp('80%'),
        position:'relative',
        top:hp('1%'),
        borderRadius:hp('1.5%'),
        textAlign:'center',
        borderColor:'#034F84',
        borderWidth:hp('0.3%'),
        borderStyle :'solid',
        fontSize:hp('3.2%'),
        textDecorationLine:'none',
        color:'white',
        backgroundColor:'black'
    },
    coursebutton:
    {
      width:wp('80%'),
      borderStyle:'solid',
      borderColor:'#004B8D',
      borderWidth:1,
      padding:hp('2%'),
      position:'relative',
      top:hp('10%'),
      backgroundColor:'dodgerblue',
      borderRadius:hp('1%'),
    },
    coursebuttontext:
    {
      color:'white',
      fontSize:hp('3.75%'),
      fontFamily:'verdana',
      alignSelf:'stretch',
      textAlign:'center'
    },
});
