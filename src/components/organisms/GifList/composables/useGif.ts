import { computed, ref } from 'vue'
import { giphyService } from '@/services/giphy'
import type { GiphyResponse } from '@/types'

const term = ref('')
const list = ref<GiphyResponse[]>([])
const pagination = ref({
  DEFAULT_OFFSET: 50,
  page: 1
})

export default function useGif() {
  const params = computed(() => ({
    api_key: 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa',
    q: term.value,
    limit: 50,
    offset: 0
  }))

  const search = async () => {
    const { data } = await giphyService.get({
      params: params.value
    })

    list.value = data.data
  }

  const loadMore = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        params.value.offset += pagination.value.page * pagination.value.DEFAULT_OFFSET

        const response = await giphyService.get({
          params: params.value
        })

        list.value = [...list.value, ...response.data.data]
      }
    })
  }

  const clear = () => {
    term.value = ''
    list.value = []
    pagination.value.page = 1
  }

  return {
    term,
    list,
    params,
    pagination,
    loadMore,
    search,
    clear
  }
}
