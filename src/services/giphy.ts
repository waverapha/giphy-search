import type { GiphyRequest, GiphyResponse } from '@/types'
import axios from 'axios'

const baseURL = 'https://api.giphy.com/v1'

export const giphyService = {
  async get(request: GiphyRequest) {
    return await axios.get<GiphyResponse>(`${baseURL}/gifs/search`, {
      params: request.params
    })
  }
}
