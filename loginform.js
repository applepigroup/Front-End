import React, {Component} from 'react';
import{View, Text,TextInput,TouchableOpacity,Alert,Button,StyleSheet,StatusBar}from 'react-native';
   class loginform extends Component{
         render(){
             return(<View style={StyleSheet.container}>
                    <TextInput styles={styles.input}
                        autoCapitalize= "none"
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        autoCorrect={false}
                        keyboardType='string'
                        returnKeyType="next"
                        placeholder='Username'
                        placeholderTextColor='rgba(225,225,225,0.7)'/>


                    <TextInput styles={styles.input}
                               returnKeyType="go"
                               ref={(input)=>this.passwordInput=input}
                               placeholder='Password'
                               placeholderTextColor='rgba(225,225,225,0.7)'
                               secureTextEntry/>

                    <TouchableOpacity style ={styles.buttonContainer}
                                      onPress={onButtonPress}>
                            <Text style ={style.buttonText}>login</Text>

                    </TouchableOpacity>
             </View>
             );
         }
        }

        const styles=StyleSheet.create({
              constant: {
                  padding :20
              },
              input:{
                  height:40,
                  backgroundColor:'rgba(225,225,225,0.2)',
                  marginBottom:10,
                  padding:10,
                  color:'#fff'
              },
              buttonContainer:{
                  backgroundColor:'#1b5e20',
                  paddingVertical:15,
    
              },
               buttonText:{
                   backgroundColor:'#fff',
                   textAlign:'center',
                   fontWeight:'700'

               }

        });