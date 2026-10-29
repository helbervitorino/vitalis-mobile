import {Pressable,StyleSheet,Text,View} from 'react-native';
import {router} from 'expo-router';
import {BottomNav} from '../src/components/BottomNav';
import {theme} from '../src/theme';
export default function Home(){return <View style={s.page}><View style={s.body}><Text style={s.title}>Vitalis</Text><Text style={s.subtitle}>Atendimentos e registros clínicos</Text><Pressable style={s.tile} onPress={()=>router.push('/agenda')}><Text style={s.tileText}>Consultar agenda</Text><Text>›</Text></Pressable><Pressable style={s.tile} onPress={()=>router.push('/sync')}><Text style={s.tileText}>Sincronização</Text><Text>›</Text></Pressable><Text style={s.notice}>Nenhum registro fictício será exibido.</Text></View><BottomNav active="home"/></View>}
const s=StyleSheet.create({page:{flex:1},body:{flex:1,padding:30,paddingTop:65},title:{fontSize:28,fontWeight:'800',color:theme.ink},subtitle:{color:theme.muted,marginBottom:30},tile:{padding:22,backgroundColor:'white',borderRadius:24,marginBottom:12,flexDirection:'row',justifyContent:'space-between'},tileText:{fontSize:16,color:theme.ink},notice:{marginTop:16,fontSize:12,color:theme.muted}});
