import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const baseURL=process.env.EXPO_PUBLIC_API_URL?.trim();
export const api=axios.create({baseURL,timeout:20000});
api.interceptors.request.use(async config=>{
 if(!baseURL)throw new Error('Configure EXPO_PUBLIC_API_URL.');
 const token=await SecureStore.getItemAsync('vitalis.token');
 const clinicaId=await SecureStore.getItemAsync('vitalis.clinicaId');
 if(token)config.headers.Authorization=`Bearer ${token}`;
 if(clinicaId)config.headers['X-Clinica-Id']=clinicaId;
 return config;
});
export function apiMessage(e:unknown):string{
 if(axios.isAxiosError(e)){const body=e.response?.data as {message?:string;erro?:string}|undefined;
 return body?.message??body?.erro??'Não foi possível acessar a API.';}
 return e instanceof Error?e.message:'Erro inesperado.';
}
