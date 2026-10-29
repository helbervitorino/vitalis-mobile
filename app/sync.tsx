import {useCallback,useState} from 'react';
import {ActivityIndicator,Pressable,StyleSheet,Text,View} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {currentUser} from '../src/services/auth';
import {pendingCount} from '../src/database';
import {BottomNav} from '../src/components/BottomNav';
import {theme} from '../src/theme';
export default function Sync(){
 const [count,setCount]=useState<number|null>(null);const [error,setError]=useState('');
 const refresh=useCallback(async()=>{try{const u=await currentUser();setCount(u?await pendingCount(u.clinicaId,u.usuarioId):0);setError('');}catch(e){setError(e instanceof Error?e.message:'Erro local');}},[]);
 useFocusEffect(useCallback(()=>{void refresh();},[refresh]));
 return <View style={s.page}><View style={s.main}><Text style={s.title}>Sincronização</Text><View style={s.card}><Text style={s.cloud}>☁</Text>{count===null?<ActivityIndicator/>:<Text style={s.count}>{count} registros pendentes</Text>}<Text style={s.detail}>A sincronização automática será liberada após validação dos contratos idempotentes na API.</Text><Pressable onPress={refresh} style={s.button}><Text style={s.buttonText}>Atualizar contagem</Text></Pressable>{error?<Text>{error}</Text>:null}</View></View><BottomNav active="sync"/></View>;
}
const s=StyleSheet.create({page:{flex:1},main:{flex:1,padding:27,paddingTop:58},title:{fontWeight:'800',fontSize:25,color:theme.ink,marginBottom:20},card:{backgroundColor:'white',padding:25,borderRadius:25,alignItems:'center',gap:20},cloud:{fontSize:54,color:theme.primary},count:{fontWeight:'800',fontSize:21,color:theme.ink},detail:{color:theme.muted,textAlign:'center'},button:{backgroundColor:theme.primary,borderRadius:24,padding:16,width:'100%',alignItems:'center'},buttonText:{color:'white',fontWeight:'700'}});
