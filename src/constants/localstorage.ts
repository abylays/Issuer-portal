/**
 * File containing various localstorage name references used by this app.
 * */

interface Constants {
  ACCESS_TOKEN: string,
  DID_TOKEN: string
}

const LOCAL_STORAGE_KEY: Constants = {
  ACCESS_TOKEN: 'affinidi:accessToken',
  DID_TOKEN: 'affinidi:didToken'
}

export default LOCAL_STORAGE_KEY
