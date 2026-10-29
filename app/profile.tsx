import {useCallback,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import {router,useFocusEffect} from 'expo-router';
import {currentUser,logout} from '../src/services/auth';
import {BottomNav} from '../src/components/BottomNav';
import {theme} from '../src/theme';
export default function Profile(){
 const [name,setName]=useState('');const [email,setEmail]=useState('');
 useFocusEffect(useCallback(()=>{currentUser().then(u=>{setName(u?.nome??'');setEmail(u?.email??'');});},[]));
 return <View style={s.page}><View style={s.content}><Text style={s.heading}>Perfil</Text><View style={s.card}><Text style={s.name}>{name}</Text><Text style={s.email}>{email}</Text></View><Pressable style={s.signout} onPress={async()=>{await logout();router.replace('/login');}}><Text style={{color:'#DB4255',fontWeight:'700'}}>Sair</Text></Pressable></View><BottomNav active="profile"/></View>;
}
const s=StyleSheet.create({page:{flex:1},content:{flex:1,padding:27,paddingTop:58},heading:{fontSize:25,fontWeight:'800',marginBottom:20,color:theme.ink},card:{borderRadius:25,backgroundColor:'white',padding:27},name:{fontSize:18,fontWeight:'700',color:theme.ink},email:{color:theme.muted,marginTop:8},signout:{backgroundColor:'white',borderColor:theme.border,borderWidth:1,padding:16,borderRadius:26,alignItems:'center',marginTop:25}});
