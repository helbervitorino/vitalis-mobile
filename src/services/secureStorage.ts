import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';

// No navegador, credenciais duram somente a sessão da aba; em Android/iOS usamos Keychain/Keystore.
export async function getSecret(key:string):Promise<string|null>{
 if(Platform.OS==='web'){
  try{return typeof sessionStorage==='undefined'?null:sessionStorage.getItem(key);}catch{return null;}
 }
 return SecureStore.getItemAsync(key);
}
export async function setSecret(key:string,value:string):Promise<void>{
 if(Platform.OS==='web'){
  if(typeof sessionStorage==='undefined')throw new Error('Armazenamento de sessão indisponível.');
  sessionStorage.setItem(key,value);
  return;
 }
 await SecureStore.setItemAsync(key,value);
}
export async function deleteSecret(key:string):Promise<void>{
 if(Platform.OS==='web'){try{sessionStorage.removeItem(key);}catch{}return;}
 await SecureStore.deleteItemAsync(key);
}
