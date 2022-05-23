import { Connection, Pool } from "promise-mysql";

export type IDataPort = Pool | Connection;
