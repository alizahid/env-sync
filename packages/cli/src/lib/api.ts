import axios, { AxiosRequestConfig, AxiosError } from 'axios'

import { WEB_URL, config } from './config'

export const api = async <T>(
  url: string,
  method: 'get' | 'post' | 'delete' = 'get',
  options: Pick<AxiosRequestConfig, 'params' | 'data'> = {}
): Promise<T> => {
  try {
    const { data } = await axios.request<T>({
      ...options,
      url,
      baseURL: `${WEB_URL}/api`,
      method,
      headers: {
        authorization: config.get('token')
      }
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}
