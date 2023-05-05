import axios, {AxiosInstance} from 'axios';
import config from 'utils/config';
const {accessApiKey, env} = config
const cloudWalletBaseUrl: string  = `https://cloud-wallet-api.${env}.affinity-project.org/api/v1`
const issuerBaseUrl: string       = `https://affinity-issuer.${env}.affinity-project.org/api/v1`
const verifierBaseUrl: string     = `https://affinity-verifier.${env}.affinity-project.org/api/v1`

/**
 * Create multiple axios instances with different base URLs for easier
 * communication with different services.
 * Base URLs are dependent on current environment.
 * */

export const cloudWalletApi: AxiosInstance = axios.create({
  baseURL: cloudWalletBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const issuerApi: AxiosInstance = axios.create({
  baseURL: issuerBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const verifierApi: AxiosInstance = axios.create({
  baseURL: verifierBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const apiInstances = [cloudWalletApi, issuerApi, verifierApi];
