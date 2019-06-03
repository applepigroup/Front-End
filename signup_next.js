import React, {Component} from 'react';
import {TextInput,StyleSheet,TouchableWithoutFeedback,Text,View,Keyboard, Picker,NetInfo,ImageBackground} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Signup } from './signup';
import {Notification} from './notification';
//import {createStackNavigator,DrawerNavigator,createAppContainer} from 'react-navigation'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


export class Signup_next extends Component
{
    constructor()
    {
        super();
        this.state = {programme:'',indexnumber:'',pickervalue:'',isConnected:true};
    }
    Signup = () =>
    {
        var fname =  this.props.navigation.state.params.fname
        var lname =  this.props.navigation.state.params.lname;
        var refid =  this.props.navigation.state.params.refid;
        let year = parseInt(this.state.pickervalue);

        if(this.state.isConnected)
        {
            fetch("http://192.168.42.162:4000/register",{method:'POST',body:JSON.stringify({firstname:fname,surname:lname,programme:this.state.programme,indexnumber:this.state.indexnumber,referenceid:refid,year:year}),headers:{'Content-Type':'application/json'}})
            .then((res)=>res.text())
            .then((res)=>{alert(res)})
            .catch((error)=>{alert(error)});
            this.setState({lectureid:'',indexnumber:''});
            fname = '';
            lname = '';
            refid = '';
        }
        else
        {
            alert("Check your internet connection");
        }
    }
    componentWillMount()
    {
        NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange);
    }
    componentWillUnmount()
    {
      NetInfo.isConnected.removeEventListener('connectionChange',this.handleConnectivityChange);
    }
    handleConnectivityChange = isConnected =>
    {
      console.log(isConnected);
      if(isConnected)
          this.setState({isConnected:isConnected});
      else
          this.setState({isConnected:isConnected});
    }
    render()
    {
        if(!this.state.isConnected)
        {
        return(
            <View style={styles.container}>
                <Notification msg="No internet connection" />
                <TextInput placeholder="indexnumber" defaultValue={this.state.indexnumber}
                keyboardType={"numeric"} placeholderTextColor="white" style = {[styles.textInput,{top:hp('-5%')}]}
                onChangeText = {(indexno)=>{this.setState({indexnumber:indexno})}}
                underlineColorAndroid="#560027"/>

                <TextInput placeholder="lecture id" defaultValue={this.state.programme}
                placeholderTextColor="white" style = {[styles.textInput,{top:hp('2%')}]}
                onChangeText = {(programme)=>{this.setState({programme:programme})}}
                underlineColorAndroid="#560027"/>

                <Picker style={{top:hp('8%'),width:wp('80%'),backgroundColor:'white',color:'black'}}
                selectedValue={this.state.pickervalue} onValueChange={(itemvalue,itemindex)=> this.setState({pickervalue:itemvalue})}>
                   <Picker.Item label = "year 1" value= "1"/>
                   <Picker.Item label = "year 2" value= "2"/>
                   <Picker.Item label = "year 3" value= "3"/>
                   <Picker.Item label = "year 4" value= "4"/>
                   <Picker.Item label = "year 5" value= "5"/>
                   <Picker.Item label = "year 6" value= "6"/>
               </Picker>
                <TouchableWithoutFeedback onPress = {this.Signup}>
                    <View style = {styles.button}>
                        <Text style = {{textAlign:'center'}}><FontAwesome style ={{fontSize:hp('9%'),color:'white'}}
                         name = "sign-in" /></Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
        }
        else
        {
            return(
              <ImageBackground source={require('./wallpaper.png')}
                             style={styles.container}
                             blurRadius={1}>

                <View style={styles.container}>
                    <TextInput placeholder="indexnumber" defaultValue={this.state.indexnumber}
                     keyboardType={"numeric"} placeholderTextColor="white" style = {[styles.textInput,{top:hp('-5%')}]}
                      onChangeText = {(indexno)=>{this.setState({indexnumber:indexno})}}
                      underlineColorAndroid="#560027"/>

                    <TextInput placeholder="lecture id" defaultValue={this.state.programme}
                    placeholderTextColor="white" style = {[styles.textInput,{top:hp('2%')}]}
                     onChangeText = {(programme)=>{this.setState({programme:programme})}}
                     underlineColorAndroid="#560027"/>

                   <Picker style={{top:hp('8%'),width:wp('80%'),backgroundColor:'#e6ceff',color:'black',fontSize:10}}
                    selectedValue={this.state.pickervalue}
                    onValueChange={(itemvalue,itemindex)=> this.setState({pickervalue:itemvalue})}>
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
                </ImageBackground>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:
    {
        //backgroundColor:'#282c34',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'#00539C',
    },
    textInput:
    {
        width:wp('80%'),
        textAlign:'center',
        //borderColor:'white',
        //borderWidth:1,
        //borderStyle:'solid',
        position:'relative',
        fontSize:hp('3.0%'),
        textDecorationLine:'none',
        color:'white',
        //borderRadius:hp('1.5%'),
        //backgroundColor:'#034F84',
        //borderColor:'#034F84',
    },
    button:
    {
        width:wp('80%'),
        borderColor:'#034F84',
        borderWidth: 2,
        borderStyle: 'solid',
        padding:hp('0.5%'),
        backgroundColor:'#3949ab',
        position:'relative',
        top:hp('14%'),
        borderRadius:hp('4.0%')
    }
});
