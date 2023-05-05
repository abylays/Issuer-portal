import {cloudWalletApi, issuerApi, verifierApi} from 'utils/api';
import {endpoints} from 'constants/endpoints';
import ApiService from 'utils/apiService';
import {employmentVcData, signedEmploymentVC, unsignedEmploymentVC} from 'utils/vc-data-examples/employment';

let mockCloudWalletApiPost: jest.SpyInstance
let mockCloudWalletApiGet: jest.SpyInstance
let mockCloudWalletApiDelete: jest.SpyInstance
let mockIssuerApiPost: jest.SpyInstance
let mockVerifierApiPost: jest.SpyInstance

beforeEach(() => {
  mockCloudWalletApiPost = jest.spyOn(cloudWalletApi, 'post');
  mockCloudWalletApiGet = jest.spyOn(cloudWalletApi, 'get');
  mockCloudWalletApiDelete = jest.spyOn(cloudWalletApi, 'delete');
  mockIssuerApiPost = jest.spyOn(issuerApi, 'post');
  mockVerifierApiPost = jest.spyOn(verifierApi, 'post');
});

describe('ApiService methods', () => {
  const username = 'test';
  const password = 'test';
  const accessToken = 'accessToken';
  const did = 'did';

  test('signUp method', async () => {
    mockCloudWalletApiPost.mockImplementation(() => Promise.resolve({
      accessToken,
      did
    }));

    await ApiService.signUp(username,password)

    expect(mockCloudWalletApiPost).toHaveBeenCalledWith(endpoints.SIGNUP, {username, password})
  })

  test('logIn method', async () => {
    mockCloudWalletApiPost.mockImplementation(() => Promise.resolve({
      accessToken,
      did
    }));

    await ApiService.logIn(username,password)

    expect(mockCloudWalletApiPost).toHaveBeenCalledWith(endpoints.LOGIN, {username, password})
  })

  test('logout method', async () => {
    mockCloudWalletApiPost.mockImplementation(() => Promise.resolve());

    await ApiService.logout()

    expect(mockCloudWalletApiPost).toHaveBeenCalledWith(endpoints.LOGOUT)
  })

  test('issueUnsignedVC method', async () => {
    const example = {...employmentVcData}
    example.holderDid = '';

    mockIssuerApiPost.mockImplementation(() => Promise.resolve({
      unsignedVC: unsignedEmploymentVC
    }));

    await ApiService.issueUnsignedVC(employmentVcData)

    expect(mockIssuerApiPost).toHaveBeenCalledWith(endpoints.VC_BUILD_UNSIGNED, example)
  })

  test('signVC method', async () => {
    mockCloudWalletApiPost.mockImplementation(() => Promise.resolve({
      unsignedVC: unsignedEmploymentVC
    }));

    const input = {
      unsignedCredential: unsignedEmploymentVC
    }

    await ApiService.signVC(input)

    expect(mockCloudWalletApiPost).toHaveBeenCalledWith(endpoints.WALLET_SIGN_CREDENTIALS, input)
  })

  test('verifyVC method', async () => {
    mockVerifierApiPost.mockImplementation(() => Promise.resolve({
      errors: [],
      isValid: true
    }));

    const input = {
      verifiableCredentials: [signedEmploymentVC]
    }

    await ApiService.verifyVC(input)

    expect(mockVerifierApiPost).toHaveBeenCalledWith(endpoints.VERIFIER_VERIFY_VCS, input)
  })

  test('storeSignedVCs method', async () => {
    mockCloudWalletApiPost.mockImplementation(() => Promise.resolve({
      errors: [],
      isValid: true
    }));

    const input = {
      data: [signedEmploymentVC]
    }

    await ApiService.storeSignedVCs(input)

    expect(mockCloudWalletApiPost).toHaveBeenCalledWith(endpoints.WALLET_CREDENTIALS, input)
  })

  test('getSavedVCs method', async () => {
    mockCloudWalletApiGet.mockImplementation(() => [signedEmploymentVC]);

    await ApiService.getSavedVCs();

    expect(mockCloudWalletApiGet).toHaveBeenCalledWith(endpoints.WALLET_CREDENTIALS)
    expect(mockCloudWalletApiGet.mock.results[0].value).toStrictEqual([signedEmploymentVC])
  })

  test('deleteStoredVC method', async () => {
    mockCloudWalletApiDelete.mockImplementation(() => Promise.resolve());
    const vcId = '1';

    await ApiService.deleteStoredVC(vcId);

    expect(mockCloudWalletApiDelete).toHaveBeenCalledWith(`${endpoints.WALLET_CREDENTIALS}/${vcId}`)
  })

  test('saveAccessTokenToLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.saveAccessTokenToLocalStorage(accessToken)

    expect(console.error).toHaveBeenCalled()
  })

  test('getAccessTokenFromLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.getAccessTokenFromLocalStorage()

    expect(console.error).toHaveBeenCalled()
  })

  test('removeAccessTokenFromLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'removeItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.removeAccessTokenFromLocalStorage()

    expect(console.error).toHaveBeenCalled()
  })

  test('saveDidTokenToLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.saveDidTokenToLocalStorage('test')

    expect(console.error).toHaveBeenCalled()
  })

  test('getDidTokenToLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.getDidTokenToLocalStorage()

    expect(console.error).toHaveBeenCalled()
  })

  test('removeDidTokenFromLocalStorage method', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global.localStorage.__proto__, 'removeItem').mockImplementation(() => {
      throw new Error('No reason')
    })

    ApiService.removeDidTokenFromLocalStorage()

    expect(console.error).toHaveBeenCalled()
  })
})

export {}
