

import React,{Component} from 'react';
import { StyleSheet, Text, View,ImageBackground} from 'react-native';
import login from './src/pages/login';

export default class App extends Component {
  render() {
    return (
      <ImageBackground source={require('./app/img/sch.jpg')}
                     style={styles.container}>
        <View style ={styles.inner}></View>
          <Text style={{colour='#442ce',fontSize=20}}>'welcome'</Text>
      </ImageBackground>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
  inner:{
     width:'80%',
     height:'80%',
     backgroundColor:'rgba(255,255,255,.7)'
  }
});
 