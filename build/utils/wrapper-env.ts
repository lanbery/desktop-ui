export function wrapperEnv(envConf: Recordable): ImportMetaEnv {
  const ret: any = {}
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')

    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT')
      realName = Number(realName)

    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      }
      catch (_error) {}
    }
    ret[envName] = realName
    // eslint-disable-next-line n/prefer-global/process
    process.env[envName] = realName
  }

  return ret
}
