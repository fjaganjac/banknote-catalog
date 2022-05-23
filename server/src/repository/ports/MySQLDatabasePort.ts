import * as mysql from "promise-mysql";

import { TDatabaseConfiguration } from "../../config";
import { IDataPort } from "./IDataPort";

let database: mysql.Pool;
let options = {};

const MySQLDatabasePort = ({ config }: { config: TDatabaseConfiguration }) => {
  if (!database) {
    database = mysql.createPool({
      host: config.host,
      user: config.user,
      port: config.port,
      password: config.password,
      database: config.database,
      connectionLimit: config.connectionLimit,
      debug: process.env.NODE_ENV === "production" ? false : ["ComQueryPacket"]
    });
  }
  return database as IDataPort;
};

export default MySQLDatabasePort;
