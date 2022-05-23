export interface TStorageConfiguration {
  id: string;
  path: string;
  maxFileSize: number;
}

export interface TStorageCollectionConfiguration {
  image: TStorageConfiguration;
  document: TStorageConfiguration;
}

export interface TServerConfiguration {
  host: string;
  port: number;
  routePrefix: string;
  plugins: string[];
  cookieSecret: string;
  cookieName: string;
  cookieTtl: number;
  storage: TStorageCollectionConfiguration;
  supportEmail: string;
}
