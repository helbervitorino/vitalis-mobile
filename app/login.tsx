import {useState} from 'react';
import {ActivityIndicator,Alert,KeyboardAvoidingView,Platform,Pressable,StyleSheet,Text,TextInput,View} from 'react-native';
import {router} from 'expo-router';
import {login} from '../src/services/auth';
import {apiMessage} from '../src/services/api';
import {theme} from '../src/theme';
export default function Login(){
 const [email,setEmail]=useState('');const [senha,setSenha]=useState('');const [busy,setBusy]=useState(false);
 async function enter(){if(!email.trim()||!senha){Alert.alert('Informe e-mail e senha');return;}setBusy(true);try{await login(email,senha);router.replace('/home');}catch(e){Alert.alert('Não foi possível entrar',apiMessage(e));}finally{setBusy(false);}}
 return <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={s.page}>
 <View style={s.brand}><Text style={s.logo}>Vitalis</Text><Text style={s.subtitle}>Registro clínico de sessões</Text></View>
 <View style={s.form}><TextInput style={s.input} placeholder="E-mail" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail}/><TextInput style={s.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha}/><Pressable style={s.button} onPress={enter} disabled={busy}>{busy?<ActivityIndicator color="white"/>:<Text style={s.buttonText}>Entrar</Text>}</Pressable></View>
 <Text style={s.foot}>Conexão necessária no primeiro acesso</Text></KeyboardAvoidingView>;
}
const s=StyleSheet.create({page:{flex:1,padding:32,justifyContent:'space-between',backgroundColor:theme.background},brand:{alignItems:'center',marginTop:85},logo:{fontSize:48,fontWeight:'800',color:theme.primary},subtitle:{color:theme.muted,marginTop:8},form:{gap:14},input:{borderWidth:1,borderColor:theme.border,borderRadius:25,backgroundColor:'white',height:52,paddingHorizontal:18,color:theme.ink},button:{marginTop:35,borderRadius:24,backgroundColor:theme.primary,padding:17,alignItems:'center'},buttonText:{fontWeight:'700',color:'white'},foot:{alignSelf:'center',fontSize:12,color:theme.muted,marginBottom:12}});
