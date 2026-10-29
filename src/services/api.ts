import axios from 'axios';
import {getSecret} from './secureStorage';
const baseURL=process.env.EXPO_PUBLIC_API_URL?.trim();
export const api=axios.create({baseURL,timeout:20000});
api.interceptors.request.use(async config=>{
 if(!baseURL)throw new Error('Configure EXPO_PUBLIC_API_URL.');
 const token=await getSecret('vitalis.token');
 const clinicaId=await getSecret('vitalis.clinicaId');
 if(token)config.headers.Authorization=`Bearer ${token}`;
 if(clinicaId)config.headers['X-Clinica-Id']=clinicaId;
 return config;
});
export function apiMessage(e:unknown):string{
 if(axios.isAxiosError(e)){const body=e.response?.data as {message?:string;erro?:string}|undefined;
 return body?.message??body?.erro??(e.response?.status===401?'E-mail ou senha inválidos.':e.response?.status===403?'Acesso não autorizado.':e.code==='ERR_NETWORK'?'Não foi possível conectar à API. Verifique a URL, a rede e a configuração de CORS.':'Não foi possível acessar a API.');}
 return e instanceof Error?e.message:'Erro inesperado.';
}
