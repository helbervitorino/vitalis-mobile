import {useEffect} from 'react';
import {ActivityIndicator,View} from 'react-native';
import {router} from 'expo-router';
import {currentUser} from '../src/services/auth';
import {theme} from '../src/theme';
export default function Index(){
 useEffect(()=>{currentUser().then(u=>router.replace(u?'/home':'/login')).catch(()=>router.replace('/login'));},[]);
 return <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator color={theme.primary}/></View>;
}
