import React , {Component} from 'react'
import {View,TextInput,StyleSheet,TouchableWithoutFeedback,Text,KeyBoard} from 'react-native'
import {createStackNavigator,createAppContainer} from 'react-navigation'
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class Signup extends Component
{
    constructor()
    {
        super();
        this.state = {firstname:'',surname:'',referenceid:''};
    }
    render()
    {
        return(
            <View style={style.container}>
                <TextInput placeholder="first name" defaultValue={this.state.firstname} placeholderTextColor="#002f6c" style = {style.textInput} onChangeText = {(newtext)=>{this.setState({firstname:newtext})}}/>
                <TextInput placeholder="surname" defaultValue={this.state.surname} placeholderTextColor="#002f6c" style = {style.textInput} onChangeText = {(newtext)=>{this.setState({surname:newtext})}}/>
                <TextInput placeholder="reference id" keyboardType={'numeric'} defaultValue={this.state.referenceid} placeholderTextColor="#002f6c" style = {style.textInput} onChangeText = {(newtext)=>{this.setState({referenceid:newtext})}}/>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('signupnext',{fname:this.state.firstname,lname:this.state.surname,refid:this.state.referenceid}); this.setState({firstname:'',surname:'',referenceid:''})}}>
                    <View style = {style.Signup}>
                        <Text style = {style.signuptext}>
                            <FontAwesome style ={{fontSize:hp('8%'),color:'white'}} name = "arrow-circle-o-right" />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:
    {
        backgroundColor:"#632A5D",
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:
    {
        width: wp('80%'),
        textAlign:'center',
        backgroundColor:'black',
        borderWidth:1,
        marginBottom:hp('5%'),
        borderRadius:hp('1.5%'),
        borderColor:'#034F84',
        borderStyle:'solid',
        fontSize:18,
        textDecorationLine:'none',
        position:'relative',
        top:hp('0.5%'),
        color:'white',
       // marginBottom:hp('2%'),
    },
    Signup:{
        width:wp('80%'),
        padding:hp('1%'),
        borderWidth:1,
        borderColor:'#034F84',
        backgroundColor:'dodgerblue',
        borderStyle:'solid',
        position:'relative',
        top:'9%',
        borderRadius:hp('1.5%')
    },
    signuptext:
    {
        color:'white',
        fontSize: hp('3.75%'),
        textAlign:'center',
        fontFamily:'verdana',
    }

});
