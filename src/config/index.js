import BaseConfig from './base-config';
import dbBackup from './db-backup';
import SqlDb  from './sql-db';
// import RedisCache from './redis';


//basic env and express config
export const config = new BaseConfig();
//basic sql db's
export const sql = new SqlDb()
//db backup config
export const backup = new dbBackup();
// //redis cache server
// export const redis = new RedisCache();
