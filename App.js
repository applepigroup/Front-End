/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {createStackNavigator,DrawerNavigator,createAppContainer} from 'react-navigation';
import { Signup } from './signup';
import {QRScanner} from './qrScanner';
import {Signup_next} from './signup_next'
import {main} from './main'
import {Selector} from './selector'


const stack =
{
    home:{
        screen:main,
    },
    register:
    {
        screen:Signup,
    },
    qrscanner:{
        screen:QRScanner,
    },
    signupnext:{
        screen:Signup_next,
    },
    selector:
    {
        screen:Selector,
    }
}

const AppNavigator = createStackNavigator(stack ,{initialRouteName:'home'});
export default createAppContainer(AppNavigator);
