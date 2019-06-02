import React, {Component} from 'react';
import {Text,StyleSheet,Linking,View,AsyncStorage} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {createStackNavigator,DrawerNavigator,createAppContainer} from 'react-navigation'

export class QRScanner extends Component
{
    onSuccess = e =>
    {
        var referenceid = AsyncStorage.getItem('referenceid');
        var indexnumber = AsyncStorage.getItem('indexnumber')
        
        fetch("http://172.20.10.3:3000/scanner",{method:'POST',body:JSON.stringify({qrval:e.data,referenceid:referenceid,lectureid:indexnumber}),headers:{'Content-Type':'application/json'}}).
        then((res)=>res.text()).then(res=>{alert(res)});
    }
    render()
    {
        return(
             <View style = {styles.container}>
                 <View style = {styles.toptextcontainer}><Text style = {styles.toptext}>Scan your lecture's qr code to take attendance</Text></View>
                <QRCodeScanner onRead={this.onSuccess} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    toptextcontainer:
    {
        position:'absolute',
        backgroundColor: 'dodgerblue',
        left:0,
        right:0,
        width:'100%',
    },
    toptext:{
        fontSize:17,
        color:'white',
        position:'absolute',
        top:0,
    }
}
)