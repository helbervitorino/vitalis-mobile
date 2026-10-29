import {useState} from 'react';
import {ActivityIndicator,Image,KeyboardAvoidingView,Platform,Pressable,ScrollView,StyleSheet,Text,TextInput,View,useWindowDimensions} from 'react-native';
import {router} from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import {login} from '../src/services/auth';
import {api,apiMessage} from '../src/services/api';
import {theme} from '../src/theme';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [notice, setNotice] = useState<{text:string;ok:boolean}|null>(null);
  const { height } = useWindowDimensions();

 async function enter(){
  if(!email.trim()||!senha){setNotice({text:'Informe seu e-mail e senha.',ok:false});return;}
  setNotice(null);
  setBusy(true);
  try{await login(email,senha);router.replace('/home');}
  catch(e){setNotice({text:apiMessage(e),ok:false});}
  finally{setBusy(false);}
 }
 async function recover(){
  if(!email.trim()){setNotice({text:'Informe seu e-mail para receber o código de recuperação.',ok:false});return;}
  setNotice(null);
  setResetBusy(true);
  try{
   await api.post('/api/autenticacao/recuperar-senha',{email:email.trim()});
   setNotice({text:'Se o e-mail estiver cadastrado, você receberá um código. A etapa de redefinição ainda será integrada.',ok:true});
  }catch(e){setNotice({text:apiMessage(e),ok:false});}
  finally{setResetBusy(false);}
 }
 return <KeyboardAvoidingView style={styles.root} behavior={Platform.OS==='ios'?'padding':undefined}>
  <ScrollView contentContainerStyle={[styles.content,{minHeight:height}]} keyboardShouldPersistTaps="handled">
   <View style={styles.brand}>
    <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" accessibilityLabel="Vitalis"/>
    <Text style={styles.subtitle}>Registro clínico de sessões</Text>
   </View>
   <View style={styles.form}>
    {notice?<View style={[styles.notice,notice.ok?styles.noticeOk:styles.noticeError]}><Text style={styles.noticeText}>{notice.text}</Text></View>:null}
    <View style={styles.field}><Feather name="mail" size={17} color="#657185" style={styles.fieldIcon}/><TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#718096" autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} accessibilityLabel="E-mail"/></View>
    <View style={styles.field}><Feather name="lock" size={17} color="#657185" style={styles.fieldIcon}/><TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#718096" secureTextEntry autoComplete="password" value={senha} onChangeText={setSenha} accessibilityLabel="Senha"/></View>
    <Pressable style={styles.forgot} onPress={recover} disabled={resetBusy}><Text style={styles.forgotText}>{resetBusy?'Enviando...':'Esqueci a senha'}</Text></Pressable>
    <Pressable style={[styles.enter,busy&&styles.disabled]} onPress={enter} disabled={busy} accessibilityRole="button"><LinearGradient colors={['#7445B9','#A080D0']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.gradient}>{busy?<ActivityIndicator color="#fff"/>:<Text style={styles.enterText}>Entrar</Text>}</LinearGradient></Pressable>
    <Pressable style={styles.biometric} onPress={()=>setNotice({text:Platform.OS==='web'?'Biometria disponível somente no aplicativo instalado em dispositivo compatível.':'O desbloqueio biométrico ainda precisa ser configurado após o primeiro login.',ok:false})} accessibilityRole="button"><Feather name="shield" size={17} color="#7446B6"/><Text style={styles.biometricText}>Entrar com biometria</Text></Pressable>
   </View>
   <View style={styles.footerArea}><Text style={styles.footer}>Funciona offline após o primeiro acesso</Text></View>
  </ScrollView>
 </KeyboardAvoidingView>;
}
const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:'#F3EFF8'},
 content:{flexGrow:1,paddingHorizontal:21,paddingBottom:25,alignItems:'stretch'},
 brand:{alignItems:'center',marginTop:Platform.OS==='web'?42:54},
 logo:{width:245,height:97},
 subtitle:{marginTop:-7,color:'#5C6B85',fontSize:13,textAlign:'center'},
 form:{marginTop:53},
 field:{height:51,borderRadius:28,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#DED8EB',flexDirection:'row',alignItems:'center',marginBottom:12,paddingHorizontal:17},
 fieldIcon:{marginRight:12},
 input:{flex:1,fontSize:14,color:'#24323C',height:'100%',paddingVertical:0,outlineStyle:'none'} as any,
 forgot:{alignSelf:'flex-end',marginTop:1,marginBottom:29,paddingVertical:4,paddingLeft:12},
 forgotText:{color:'#7040BA',fontSize:12},
 enter:{height:56,borderRadius:24,overflow:'hidden'},
 gradient:{flex:1,alignItems:'center',justifyContent:'center'},
 enterText:{fontSize:16,fontWeight:'700',color:'#FFFFFF'},
 disabled:{opacity:0.65},
 biometric:{height:50,borderRadius:28,borderWidth:1,borderColor:'#DED8EB',backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:13,gap:10},
 shield:{fontSize:23,color:'#7446B6'},
 biometricText:{fontSize:14,color:'#1D2834'},
 footerArea:{flex:1,minHeight:85,justifyContent:'flex-end'},
 footer:{textAlign:'center',fontSize:12,color:'#6B7590'},
 notice:{padding:12,borderRadius:12,marginBottom:12,borderWidth:1},
 noticeOk:{backgroundColor:'#E8F6F0',borderColor:'#9AD2BE'},
 noticeError:{backgroundColor:'#FDECEE',borderColor:'#EFB6BC'},
 noticeText:{fontSize:13,color:'#29333B',lineHeight:19}
});
