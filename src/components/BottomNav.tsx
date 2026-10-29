import {Pressable,StyleSheet,Text,View} from 'react-native';
import {router} from 'expo-router';
import {theme} from '../theme';
const links=[{key:'home',label:'Início',icon:'⌂'},{key:'agenda',label:'Agenda',icon:'▦'},{key:'sync',label:'Sincronizar',icon:'↻'},{key:'profile',label:'Perfil',icon:'♙'}] as const;
export function BottomNav({active}:{active:typeof links[number]['key']}){
 return <View style={s.nav}>{links.map(x=><Pressable key={x.key} style={s.item} onPress={()=>router.replace(('/'+x.key) as '/home')}><Text style={[s.icon,active===x.key&&s.selected]}>{x.icon}</Text><Text style={[s.label,active===x.key&&s.selected]}>{x.label}</Text></Pressable>)}</View>;
}
const s=StyleSheet.create({nav:{flexDirection:'row',backgroundColor:'#fff',paddingVertical:14,borderTopColor:theme.border,borderTopWidth:1},item:{flex:1,alignItems:'center',gap:4},icon:{fontSize:23,color:theme.muted},label:{fontSize:11,color:theme.muted},selected:{color:theme.primary,fontWeight:'700'}});
