import * as SQLite from 'expo-sqlite';
let instance:ReturnType<typeof SQLite.openDatabaseAsync>|undefined;
export async function localDb(){
 instance??=SQLite.openDatabaseAsync('vitalis-mobile.db');
 const db=await instance;
 await db.execAsync(`PRAGMA journal_mode=WAL;
 CREATE TABLE IF NOT EXISTS sync_outbox(id TEXT PRIMARY KEY NOT NULL,clinica_id INTEGER NOT NULL,usuario_id INTEGER NOT NULL,tipo TEXT NOT NULL,payload TEXT NOT NULL,criado_em_utc TEXT NOT NULL,tentativas INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'pendente',ultimo_erro TEXT);
 CREATE INDEX IF NOT EXISTS idx_sync_outbox ON sync_outbox(clinica_id,usuario_id,status);`);
 return db;
}
export async function pendingCount(clinicaId:number,usuarioId:number){
 const db=await localDb();
 const row=await db.getFirstAsync<{total:number}>("SELECT COUNT(*) total FROM sync_outbox WHERE clinica_id=? AND usuario_id=? AND status IN ('pendente','erro')",[clinicaId,usuarioId]);
 return row?.total??0;
}
