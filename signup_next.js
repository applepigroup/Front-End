import React, {Component} from 'react';
import {TextInput,StyleSheet,TouchableWithoutFeedback,Text,View,Keyboard, Picker} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Signup } from './signup';
import {createStackNavigator,DrawerNavigator,createAppContainer} from 'react-navigation'
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen'


export class Signup_next extends Component
{
    constructor()
    {
        super();
        this.state = {programme:'',indexnumber:'',pickervalue:''};
    }
    componentDidMount()
    {
        lor(this);
    }
    componentWillUnmount()
    {
        rol();
    }
    Signup = () =>
    {
        var fname =  this.props.navigation.state.params.fname
        var lname =  this.props.navigation.state.params.lname;
        var refid =  this.props.navigation.state.params.refid;
        let year = parseInt(this.state.pickervalue);
        fetch("http://172.20.10.3:3000/register",{method:'POST',body:JSON.stringify({firstname:fname,surname:lname,programme:this.state.programme,indexnumber:this.state.indexnumber,referenceid:refid,year:year}),headers:{'Content-Type':'application/json'}})
        . then((res)=>res.text())
        .then((res)=>{alert(res)})
        .catch((error)=>{alert(error)});

        this.setState({lectureid:'',indexnumber:''});
        fname = '';
        lname = '';
        refid = '';
    }
    render()
    {

        return(
            <View style={styles.container}>
                <TextInput placeholder="indexnumber" defaultValue={this.state.indexnumber} keyboardType={"numeric"} placeholderTextColor="#002f6c"style = {[styles.textInput,{top:hp('-5%')}]} onChangeText = {(indexno)=>{this.setState({indexnumber:indexno})}}/>
                <TextInput placeholder="lecture id" defaultValue={this.state.programme} placeholderTextColor="#002f6c" style = {[styles.textInput,{top:hp('2%')}]} onChangeText = {(programme)=>{this.setState({programme:programme})}}/>
               <Picker style={{top:hp('8%'),width:wp('80%'),backgroundColor:'black',color:"#002f6c",  borderRadius:hp('1.5%'),
                 textAlign:'center', borderColor:'#034F84', borderWidth:hp('0.3%'), borderStyle :'solid',}} selectedValue={this.state.pickervalue} onValueChange={(itemvalue,itemindex)=> this.setState({pickervalue:itemvalue})}>
                   <Picker.Item label = "year 1" value= "1"/>
                   <Picker.Item label = "year 2" value= "2"/>
                   <Picker.Item label = "year 3" value= "3"/>
                   <Picker.Item label = "year 4" value= "4"/>
                   <Picker.Item label = "year 5" value= "5"/>
                   <Picker.Item label = "year 6" value= "6"/>
               </Picker>
                <TouchableWithoutFeedback onPress = {this.Signup}>
                    <View style = {styles.button}>
                        <Text style = {{textAlign:'center'}}><FontAwesome style ={{fontSize:hp('9%'),color:'white'}} name = "sign-in" /></Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:'#282c34',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#632A5D",
    },
    textInput:
    {
        width:wp('80%'),
        textAlign:'center',
        borderColor:'white',
        borderWidth:1,
        borderStyle:'solid',
        position:'relative',
        fontSize:18,
        textDecorationLine:'none',
        color:'white',
        borderRadius:hp('1.5%'),
        backgroundColor:'black',
        borderColor:'#034F84',
    },
    button:
    {
        width:wp('80%'),
        borderColor:'#034F84',
        borderWidth: 2,
        borderStyle: 'solid',
        padding:hp('0.5%'),
        backgroundColor:'dodgerblue',
        position:'relative',
        top:hp('14%'),
        borderRadius:hp('1.5%')
    }
});
