
import React, {Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard,AsyncStorage,NetInfo,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
      try
      {
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
          fetch('http://192.168.42.162:4000/login',{method:'POST',body:JSON.stringify({refid:this.state.referenceid,indexnum:this.state.indexnumber}),headers:{'Content-Type': 'application/json'}})
          .then(res => res.json())
          .then(resp=>
          {
            if(resp.success)
            {
              this.saveCredentials('token_id',resp.token);
              this.saveCredentials('referenceid',refid);
              this.saveCredentials('indexnumber',indexnum);
              this.props.navigation.replace('qrscanner');
            }
            else
            {
              alert(resp.message);
            }

          })
          .catch((error)=>
          {
            alert(error)
          });
      }

    }
    componentWillMount()
    {
      NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange);
      let url = 'http://192.168.42.162:4000/verifytoken';
      if(this.state.isConnected)
      {
        AsyncStorage.getItem('token_id').then(value=>{
          fetch(url,{method:'GET',headers:{Authorization:`bearer ${value}`}})
          .then(()=>{
           this.props.navigation.replace('qrscanner');
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
          this.setState({isConnected:isConnected});
      else
          this.setState({isConnected:isConnected});
    }
    render()
    {
      if(!this.state.isConnected)
      {
      return (
        <ImageBackground source={require('./wallpaper.png')}
                       style={styles.container}>
        <View style={styles.container}>
                <Notification msg="No internet connection" />
                <FontAwesome style = {styles.iconuser} name = "user-o" />
                <TextInput style={styles.textin} defaultValue = {this.state.referenceid}
                placeholder='Reference id' keyboardType={"numeric"}
                 onChangeText = {(newtext)=>{this.setState({referenceid:newtext})}}
                  placeholderTextColor = 'white'
                    underlineColorAndroid="#560027" />

                <FontAwesome style = {styles.iconlock} name = "lock" />
                <TextInput style={styles.textin} placeholder= 'Index Number'
                 defaultValue = {this.state.indexnumber}
                  onChangeText = {(newtext)=>{this.setState({indexnumber:newtext})}}
                   placeholderTextColor = 'white'
                     underlineColorAndroid = "#560027" />

               <TouchableWithoutFeedback onPress={this.handleSubmit}>
                  <View style={styles.loginbutton}>
                      <Text style = {styles.loginbuttontext}>Login</Text>
                  </View>
                </TouchableWithoutFeedback>

              <View style={styles.signupview}>
              <Text style={styles.signuptext, {color: "black", fontSize: 18, textAlign:'center'}}>Do you have an account?</Text>
              <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('register')}}>
                    <Text style = {styles.signuptext}>Signup</Text>
                    </TouchableWithoutFeedback>
                </View>

          </View>
          </ImageBackground>
        )
      }
      else
      {
        return(
          <ImageBackground source={require('./wallpaper.png')}
                         style={styles.container}>
          <View style={styles.container}>
                <FontAwesome style = {styles.iconuser} name = "user-o" />
                <TextInput style={styles.textin} defaultValue = {this.state.referenceid}
                 placeholder='Reference id' keyboardType={"numeric"}
                  onChangeText = {(newtext)=>{this.setState({referenceid:newtext})}}
                  placeholderTextColor = 'white'
                    underlineColorAndroid ="#560027" />

                <FontAwesome style = {styles.iconlock} name = "lock" />
                <TextInput style={styles.textin} placeholder= 'Index number'
                 defaultValue = {this.state.indexnumber}
                 onChangeText = {(newtext)=>{this.setState({indexnumber:newtext})}}
                 placeholderTextColor = 'white'
                   underlineColorAndroid="#560027" />

                <TouchableWithoutFeedback onPress={this.handleSubmit}>
                  <View style={styles.loginbutton}>
                      <Text style = {styles.loginbuttontext}>Login</Text>
                  </View>
                </TouchableWithoutFeedback>

                <View style={styles.signupview}>
                <Text style={styles.signuptext, {color:"black", fontSize:18, textAlign:'center'}}>Do you have an account?</Text>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('register')}}>
                      <Text style = {styles.signuptext}>Signup</Text>
                      </TouchableWithoutFeedback>
                  </View>

          </View>
         </ImageBackground>
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
    //  backgroundColor: '#00539C',
    },
    textin:
    {
      width:wp('80%'),
      position:'relative',
      top:hp('1%'),
      //borderRadius:hp('2.0%'),
      textAlign:'center',
    //  borderColor:'#90a4ae',
      //borderWidth:hp('0.3%'),
    //  borderStyle :'solid',
      fontSize:hp('3.0%'),
      textDecorationLine:'none',
      //marginTop:hp('7%'),
      color:'white',
    //  backgroundColor:'transparent',
    },

    loginbutton:
    {
      width:wp('70%'),
      borderStyle:'solid',
      borderColor:'#004B8D',
      borderWidth:1,
      padding:hp('1%'),
      position:'relative',
      top:hp('10%'),
      backgroundColor:'#3949ab',
      borderRadius:hp('4%'),
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
      flexDirection: 'column',
      justifyContent: 'center',
      width:wp('85%'),
      padding:hp('3.45%'),
      marginTop:hp('5%'),
      //borderColor:'#034F84',
      //borderWidth:2,
      //borderStyle:'solid',
      position:'relative',
      //backgroundColor:'#034F84',
      top:hp('12.5%')

    },
    signuptext:
    {
      color:'white',
      fontSize: 18,
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
