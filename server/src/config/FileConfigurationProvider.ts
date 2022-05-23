import * as nconf from 'nconf';

import {IConfigurationProvider} from 'config';

let configs:IConfigurationProvider;

const FileConfigurationProvider = <IConfigurationProvider>({filePath}:{filePath:string})=>{
  configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
      type: 'file',
      file: filePath
    }
  });

  return configs;
}

export default FileConfigurationProvider;