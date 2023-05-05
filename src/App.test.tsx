import React from 'react';
import {act, render, waitFor} from '@testing-library/react';
import App from 'App';
import {MemoryRouter} from 'react-router-dom';
import ApiService from 'utils/apiService';
import axios, {AxiosError, AxiosInstance} from 'axios'
import {apiInstances} from 'utils/api';

describe('App component test', () => {
  test(`JWT token didn't expire`, async () => {
    jest.spyOn(ApiService, 'setAuthorizationBearer')
    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(() => {
      return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTM1NjE4NzIsImV4cCI6NDI2NjkxMTM4NzIsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJHaXZlbk5hbWUiOiJKb2hubnkiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.0HTJnUedw491klJ5RfqAnJD_tmClp0dsq3DjcnRDvls'
    })

    render(<MemoryRouter><App/></MemoryRouter>)

    expect(ApiService.setAuthorizationBearer).toHaveBeenCalled()
  })

  test('JWT token expired', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'removeAccessAndDidTokens')
    jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(() => {
      return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1ODE5MzM0MjcsImV4cCI6MTU4MTkzMzQzNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ARy-8uqRvXTX5-yrZxbMXhth2fm4O4UqHpr6HLZ30pQ'
    })

    const {container} = render(<MemoryRouter><App/></MemoryRouter>)

    await waitFor(() => {}, {container})

    expect(ApiService.removeAccessAndDidTokens).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalled()
  })

  test('test', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'removeAccessAndDidTokens')
    jest.spyOn(ApiService, 'logIn').mockReturnValue(Promise.resolve({
      accessToken: 'accessToken',
      did: 'did'
    }));

    const mockCloudWalletApi: AxiosInstance = axios.create({
      baseURL: 'https://dog.ceo/api/breeds/list/all',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    mockCloudWalletApi.interceptors.request.use(config => {
      if( config.data.mock.reject ) {
        return Promise.reject({
          ...config,
          response: {
            status: config.data.mock.status,
          },
          message: 'error'
        })
      }
      else {
        return config
      }
    })

    apiInstances.push(mockCloudWalletApi)

    const {container} = render(<MemoryRouter><App/></MemoryRouter>)

    await waitFor(() => {}, {container})

    await act(async () => {
      await mockCloudWalletApi.get('https://test.com/api/users', {
        data: {
          mock: {
            reject: true,
            status: 401,
          }
        }
      })
    })

    expect(ApiService.removeAccessAndDidTokens).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalled()

    await act(async () => {
      await mockCloudWalletApi.get('https://test.com/api/users', {
        data: {
          mock: {
            reject: true,
            status: 404
          }
        }
      }).catch((e: AxiosError) => {
        expect(e.message).toEqual('error')
      })
    })

    const client = Object.assign({},apiInstances[0]) as any;

    expect(client.interceptors.response.handlers[0].fulfilled({data: 'foo'})).toStrictEqual({data: 'foo'})
  })

  test('test', async () => {
    jest.spyOn(ApiService,'setAuthorizationBearer')
    jest.spyOn(ApiService,'getDidTokenToLocalStorage').mockReturnValue(null)
    jest.spyOn(ApiService,'getAccessTokenFromLocalStorage').mockReturnValue('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTM1NjE4NzIsImV4cCI6NDI2NjkxMTM4NzIsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJHaXZlbk5hbWUiOiJKb2hubnkiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.0HTJnUedw491klJ5RfqAnJD_tmClp0dsq3DjcnRDvls')

    const {container} = render(<MemoryRouter><App/></MemoryRouter>)

    await waitFor(() => {}, {container})

    expect(ApiService.setAuthorizationBearer).toHaveBeenCalled()
  })
})
