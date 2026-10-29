import {getSecret,setSecret,deleteSecret} from './secureStorage';
import {api} from './api';

export type AuthUser={usuarioId:number;clinicaId:number;nome:string;email:string;perfil?:string;expiraEmUtc?:string};
type Clinica={id?:number|string;clinicaId?:number|string};
type LoginResult=Partial<AuthUser>&{
 tokenAcesso?:string;success?:boolean;requerSegundoFator?:boolean;
 desafioSegundoFator?:string;clinica?:Clinica;tenant?:Clinica;message?:string;
 mustChangePassword?:boolean;senhaProvisoria?:boolean;senhaExpirada?:boolean;
};
function numericId(value:unknown):number|null{
 if(typeof value==='number'&&Number.isSafeInteger(value)&&value>0)return value;
 if(typeof value==='string'&&/^\d+$/.test(value.trim())){
  const n=Number(value);return Number.isSafeInteger(n)&&n>0?n:null;
 }
 return null;
}
export async function login(email:string,senha:string):Promise<AuthUser>{
 const {data}=await api.post<LoginResult>('/api/autenticacao/login',{email:email.trim(),senha});
 if(data.success===false)throw new Error(data.message||'Falha na autenticação.');
 if(data.requerSegundoFator)throw new Error('Sua conta exige autenticação de dois fatores. A tela de verificação ainda precisa ser implementada.');
 if(data.mustChangePassword||data.senhaProvisoria||data.senhaExpirada)
  throw new Error('É necessário atualizar sua senha no Vitalis Web antes de acessar o aplicativo.');
 const clinicaId=numericId(data.clinica?.clinicaId??data.clinica?.id??data.tenant?.clinicaId??data.tenant?.id??data.clinicaId);
 const usuarioId=numericId(data.usuarioId);
 if(!data.tokenAcesso||!clinicaId||!usuarioId)throw new Error('Resposta de autenticação sem token, usuário ou clínica válidos.');
 const user:AuthUser={usuarioId,clinicaId,nome:data.nome??'',email:data.email??email,perfil:data.perfil,expiraEmUtc:data.expiraEmUtc};
 await setSecret('vitalis.token',data.tokenAcesso);
 await setSecret('vitalis.clinicaId',String(clinicaId));
 await setSecret('vitalis.user',JSON.stringify(user));
 return user;
}
export async function currentUser():Promise<AuthUser|null>{
 const [raw,token]=await Promise.all([getSecret('vitalis.user'),getSecret('vitalis.token')]);
 if(!raw||!token)return null;
 const user=JSON.parse(raw) as AuthUser;
 if(user.expiraEmUtc&&Date.parse(user.expiraEmUtc)<=Date.now())return null;
 return user;
}
export async function logout(){await Promise.all(['vitalis.token','vitalis.clinicaId','vitalis.user'].map(k=>deleteSecret(k)));}
