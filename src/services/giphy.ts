import type { GiphyRequest, GiphyResponse } from '@/types'
import axios, { type AxiosResponse } from 'axios'

const baseURL = 'https://api.giphy.com/v1'

export const giphyService = {
  async get(request: GiphyRequest): Promise<AxiosResponse<{ data: GiphyResponse[] }>> {
    return await axios.get(`${baseURL}/gifs/search`, {
      params: request.params
    })
  }
}
