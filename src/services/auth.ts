import * as SecureStore from 'expo-secure-store';
import {api} from './api';
export type AuthUser={usuarioId:number;clinicaId:number;nome:string;email:string;perfil?:string;expiraEmUtc?:string};
type LoginResult=Partial<AuthUser>&{tokenAcesso?:string;success?:boolean;requerSegundoFator?:boolean;tenant?:{id?:number;clinicaId?:number};message?:string};
export async function login(email:string,senha:string):Promise<AuthUser>{
 const {data}=await api.post<LoginResult>('/api/autenticacao/login',{email:email.trim(),senha});
 if(data.requerSegundoFator)throw new Error('Esta conta exige segundo fator. Implementação pendente antes da homologação.');
 const clinicaId=data.tenant?.clinicaId??data.tenant?.id??data.clinicaId;
 if(data.success===false||!data.tokenAcesso||!clinicaId||!data.usuarioId)throw new Error(data.message||'Sessão incompleta retornada pela API.');
 const user:AuthUser={usuarioId:data.usuarioId,clinicaId,nome:data.nome??'',email:data.email??email,perfil:data.perfil,expiraEmUtc:data.expiraEmUtc};
 await SecureStore.setItemAsync('vitalis.token',data.tokenAcesso);
 await SecureStore.setItemAsync('vitalis.clinicaId',String(user.clinicaId));
 await SecureStore.setItemAsync('vitalis.user',JSON.stringify(user));
 return user;
}
export async function currentUser():Promise<AuthUser|null>{
 const [raw,token]=await Promise.all([SecureStore.getItemAsync('vitalis.user'),SecureStore.getItemAsync('vitalis.token')]);
 if(!raw||!token)return null;
 const u=JSON.parse(raw) as AuthUser;
 if(u.expiraEmUtc&&Date.parse(u.expiraEmUtc)<=Date.now())return null;
 return u;
}
export async function logout(){await Promise.all(['vitalis.token','vitalis.clinicaId','vitalis.user'].map(k=>SecureStore.deleteItemAsync(k)));}
