import { format } from 'date-fns'
import pkg from '../../package.json'
import { wrapperEnv } from './wrapper-env'

export function buildRuntimeAppInfo(env: ImportMetaEnv): ImportMetaEnv {
  const { name = 'ts-dui', version = '0.1.0' } = pkg

  return {
    ...wrapperEnv(env),
    VITE_GLOB_APP_INFO: {
      name,
      version,
      lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    },
  }
}
