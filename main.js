
import React, {Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard,AsyncStorage,NetInfo} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Entypo from 'react-native-vector-icons/Entypo';
import {Notification} from './notification';

export class main extends Component
{
    constructor()
    {
      super();
      this.state = {referenceid:'',indexnumber:'',message:'',isConnected:true};
    }
    async saveCredentials (item,value)
    {
      try{
        await AsyncStorage.setItem(item,value);
      }
      catch(error)
      {
        alert('AsyncStorage error ',error.message);
      }
    }
    handleSubmit = () =>
    {
        let refid = this.state.referenceid;
        let indexnum = this.state.indexnumber;

        Keyboard.dismiss();
        if(this.state.isConnected)
        {
          fetch('http://172.20.10.4:3000/login',{method:'POST',body:JSON.stringify({refid:this.state.referenceid,indexnum:this.state.indexnumber}),headers:{'Content-Type': 'application/json'}}).
          then(res => res.json())
          .then(resp=>
          {
            if(resp.success)
            {
            this.saveCredentials('token_id',resp.token);
            this.saveCredentials('referenceid',refid);
            this.saveCredentials('indexnumber',indexnum);
            this.props.navigation.replace('selector');
            this.setState({referenceid:'',lectureid:''});
            }
            else
            {
              alert("Wrong credentials");
            }

          })
          .catch(()=>{
            this.setState({message:'Please Check your internet connection'})
            this.setState({referenceid:'',lectureid:''});
          })
      }

    }
    componentWillMount()
    {
      NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange);
      let url = 'http://172.20.10.4:3000/verifytoken';
      if(this.state.isConnected)
      {
        AsyncStorage.getItem('token_id').then(value=>{
          fetch(url,{method:'GET',headers:{Authorization:`bearer ${value}`}})
          .then(()=>{
            this.props.navigation.replace('selector');
          })
          .catch((error)=>{ alert(error) });
          }).catch(()=>{this.setState({message:error})});
       }
    }
    componentWillUnmount()
    {
      NetInfo.isConnected.removeEventListener('connectionChange',this.handleConnectivityChange);
    }
    handleConnectivityChange = isConnected =>
    {
      console.log(isConnected);
      if(isConnected)
        this.setState({isConnected:isConnected})
      else
      {
        this.setState({isConnected:isConnected})
      }
    }
    render()
    {
      if(!this.state.isConnected)
      {
      return (
        <View style={styles.container}>
                <Notification msg="No internet connection" />
                <FontAwesome style = {styles.iconuser} name = "user-o" />
                <TextInput style={styles.textin} defaultValue = {this.state.referenceid}  placeholder='Reference id' keyboardType={"numeric"}  onChangeText = {(newtext)=>{this.setState({referenceid:newtext})}} placeholderTextColor = "#002f6c" />
                <FontAwesome style = {styles.iconlock} name = "lock" />
                <TextInput style={styles.textin} placeholder= 'Lectureid'  defaultValue = {this.state.lectureid} onChangeText = {(newpass)=>{this.setState({lectureid:newpass})}} placeholderTextColor = "#002f6c"/>
               <TouchableWithoutFeedback onPress={this.handleSubmit}>
                  <View style={styles.loginbutton}>
                      <Text style = {styles.loginbuttontext}>LOGIN</Text>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('register')}}>
                  <View style={styles.signupview}>
                      <Text style = {styles.signuptext}>Don't have an account?</Text>
                  </View>
              </TouchableWithoutFeedback>
          </View>
        )
      }
      else
      {
        return(
          <View style={styles.container}>
                <FontAwesome style = {styles.iconuser} name = "user-o" />
                <TextInput style={styles.textin} defaultValue = {this.state.referenceid}  placeholder='Reference id' keyboardType={"numeric"}  onChangeText = {(newtext)=>{this.setState({referenceid:newtext})}} placeholderTextColor = "#002f6c"/>
                <FontAwesome style = {styles.iconlock} name = "lock" />
                <TextInput style={styles.textin} placeholder= 'Lectureid'  defaultValue = {this.state.lectureid} onChangeText = {(newpass)=>{this.setState({lectureid:newpass})}} placeholderTextColor = "#002f6c"/>
               <TouchableWithoutFeedback onPress={this.handleSubmit}>
                  <View style={styles.loginbutton}>
                      <Text style = {styles.loginbuttontext}>LOGIN</Text>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('register')}}>
                  <View style={styles.signupview}>
                      <Text style = {styles.signuptext}>Don't have a student account?</Text>
                  </View>
              </TouchableWithoutFeedback>
          </View>
        )
      }
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
    textin:
    {
      width:wp('80%'),
      position:'relative',
      top:hp('1%'),
      borderRadius:hp('1.5%'),
      textAlign:'center',
      borderColor:'#034F84',
      borderWidth:hp('0.3%'),
      borderStyle :'solid',
      fontSize:18,
      textDecorationLine:'none',
      //marginTop:hp('7%'),
      color:'white',
      backgroundColor:'black'
    },

    loginbutton:
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
    loginbuttontext:
    {
      color:'white',
      fontSize:hp('3.75%'),
      fontFamily:'verdana',
      alignSelf:'stretch',
      textAlign:'center'
    },
    signupview:
    {
      width:wp('85%'),
      padding:hp('3.45%'),
      marginTop:hp('5%'),
      borderColor:'#034F84',

      borderWidth:2,
      borderStyle:'solid',
      position:'relative',
      backgroundColor:'black',
      top:hp('12.5%')

    },
    signuptext:
    {
      color:'white',
      fontSize: hp('2.4%'),
      textAlign:'center',
    },
    iconuser:
    {
      color:'white',
      fontSize:hp('6%'),
      position:'relative',
      top:hp('7.7%'),
      zIndex:1,
      right:wp('35%')
    },
    iconlock:
    {
      color:'white',
      fontSize:hp('6.5%'),
      position:'relative',
      top:hp('8.5%'),
      right:wp('35%'),
      zIndex:1,
    }
  });
