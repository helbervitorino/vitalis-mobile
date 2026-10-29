import {useCallback,useState} from 'react';
import {ActivityIndicator,FlatList,RefreshControl,StyleSheet,Text,View} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {getAgenda,type EventoAgenda} from '../src/services/agenda';
import {apiMessage} from '../src/services/api';
import {BottomNav} from '../src/components/BottomNav';
import {theme} from '../src/theme';
export default function Agenda(){
 const [rows,setRows]=useState<EventoAgenda[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 const refresh=useCallback(async()=>{setLoading(true);try{setRows(await getAgenda());setError('');}catch(e){setError(apiMessage(e));}finally{setLoading(false);}},[]);
 useFocusEffect(useCallback(()=>{void refresh();},[refresh]));
 return <View style={s.page}><View style={s.content}><Text style={s.heading}>Agenda</Text>{loading&&rows.length===0?<ActivityIndicator color={theme.primary}/>:null}{error?<Text style={s.error}>{error}</Text>:null}
 <FlatList data={rows} keyExtractor={r=>r.id} refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh}/>} ListEmptyComponent={!loading&&!error?<Text style={s.empty}>Nenhum agendamento encontrado.</Text>:null}
 renderItem={({item})=><View style={s.card}><Text style={s.time}>{new Date(item.inicio).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</Text><View style={{flex:1}}><Text style={s.name}>{item.titulo}</Text><Text style={s.detail}>{item.status||'Status não informado'}</Text>{item.local?<Text style={s.detail}>{item.local}</Text>:null}</View></View>}/></View><BottomNav active="agenda"/></View>;
}
const s=StyleSheet.create({page:{flex:1},content:{flex:1,paddingHorizontal:25,paddingTop:58},heading:{fontSize:25,fontWeight:'800',color:theme.ink,marginBottom:25},card:{backgroundColor:'white',borderRadius:24,padding:17,flexDirection:'row',gap:18,marginBottom:12},time:{fontWeight:'700',color:theme.ink},name:{fontWeight:'700',fontSize:16,color:theme.ink},detail:{color:theme.muted,marginTop:4},empty:{color:theme.muted},error:{color:'#b23c54',marginBottom:15}});
