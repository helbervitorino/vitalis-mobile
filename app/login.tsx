import {useState} from 'react';
import {ActivityIndicator,Alert,Image,KeyboardAvoidingView,Platform,Pressable,ScrollView,StyleSheet,Text,TextInput,View,useWindowDimensions} from 'react-native';
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
  const { height } = useWindowDimensions();

 async function enter(){
  if(!email.trim()||!senha){Alert.alert('Atenção','Informe seu e-mail e senha.');return;}
  setBusy(true);
  try{await login(email,senha);router.replace('/home');}
  catch(e){Alert.alert('Não foi possível entrar',apiMessage(e));}
  finally{setBusy(false);}
 }
 async function recover(){
  if(!email.trim()){Alert.alert('Recuperar senha','Informe seu e-mail no campo acima para receber o código de recuperação.');return;}
  setResetBusy(true);
  try{
   await api.post('/api/autenticacao/recuperar-senha',{email:email.trim()});
   Alert.alert('Recuperação de senha','Se o e-mail estiver cadastrado, você receberá um código. A etapa de redefinição será integrada à próxima tela.');
  }catch(e){Alert.alert('Recuperação de senha',apiMessage(e));}
  finally{setResetBusy(false);}
 }
 return <KeyboardAvoidingView style={styles.root} behavior={Platform.OS==='ios'?'padding':undefined}>
  <ScrollView contentContainerStyle={[styles.content,{minHeight:height}]} keyboardShouldPersistTaps="handled">
   <View style={styles.brand}>
    <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" accessibilityLabel="Vitalis"/>
    <Text style={styles.subtitle}>Registro clínico de sessões</Text>
   </View>
   <View style={styles.form}>
    <View style={styles.field}><Feather name="mail" size={17} color="#657185" style={styles.fieldIcon}/><TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#718096" autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} accessibilityLabel="E-mail"/></View>
    <View style={styles.field}><Feather name="lock" size={17} color="#657185" style={styles.fieldIcon}/><TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#718096" secureTextEntry autoComplete="password" value={senha} onChangeText={setSenha} accessibilityLabel="Senha"/></View>
    <Pressable style={styles.forgot} onPress={recover} disabled={resetBusy}><Text style={styles.forgotText}>{resetBusy?'Enviando...':'Esqueci a senha'}</Text></Pressable>
    <Pressable style={[styles.enter,busy&&styles.disabled]} onPress={enter} disabled={busy} accessibilityRole="button"><LinearGradient colors={['#7445B9','#A080D0']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.gradient}>{busy?<ActivityIndicator color="#fff"/>:<Text style={styles.enterText}>Entrar</Text>}</LinearGradient></Pressable>
    <Pressable style={styles.biometric} onPress={()=>Alert.alert('Biometria','Disponível após a configuração de autenticação biométrica segura no dispositivo.')} accessibilityRole="button"><Feather name="shield" size={17} color="#7446B6"/><Text style={styles.biometricText}>Entrar com biometria</Text></Pressable>
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
 footer:{textAlign:'center',fontSize:12,color:'#6B7590'}
});
