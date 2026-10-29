import {api} from './api';
export type EventoAgenda={id:string;titulo:string;inicio:string;status?:string;local?:string};
type Item=Record<string,unknown>;
function str(v:unknown){return v==null?'':String(v);}
export async function getAgenda():Promise<EventoAgenda[]>{
 const {data}=await api.get<Item[]|{itens?:Item[];items?:Item[];data?:Item[];results?:Item[]}>('/api/agenda');
 const items=Array.isArray(data)?data:data.itens??data.items??data.data??data.results??[];
 return items.map(e=>({id:str(e.id??e.agendamentoId),titulo:str(e.titulo??e.pacienteNome??e.paciente??'Agendamento'),inicio:str(e.inicio??e.dataInicio??e.start),status:str(e.status??e.situacao),local:str(e.local??e.sala)})).filter(e=>e.id&&Number.isFinite(Date.parse(e.inicio)));
}
