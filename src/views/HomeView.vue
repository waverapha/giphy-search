<template>
  <main>
    <input type="search" v-model="searchGif" />
    <button type="button" @click="clearResults">Clear results</button>

    <div class="gif-list">
      <img
        v-for="gif in gifList"
        :key="gif.id"
        :src="gif.images.preview_gif.url"
        :width="gif.images.preview_gif.width"
        :height="gif.images.preview_gif.height"
        :alt="gif.alt_text"
        class="gif-list__item"
      />
    </div>

    <div v-show="gifList.length" ref="loadingMoreTrigger" class="loading-more">Loading more...</div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { giphyService } from '@/services/giphy'

const loadingMoreTrigger = ref<Element>()
const searchGif = ref('')
const gifList = ref([])
const pagination = ref({
  DEFAULT_OFFSET: 50,
  page: 1
})

const params = computed(() => ({
  api_key: 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa',
  q: searchGif.value,
  limit: 50,
  offset: 0
}))

const searchGifs = async () => {
  const { data } = await giphyService.get({
    params: params.value
  })

  gifList.value = data.data
}

const clearResults = () => {
  searchGif.value = ''
  gifList.value = []
  pagination.value.page = 1
}

onMounted(() => {
  const observerOptions = {
    rootMargin: '100px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        params.value.offset += pagination.value.page * pagination.value.DEFAULT_OFFSET

        const response = await giphyService.get({
          params: params.value
        })

        gifList.value = [...gifList.value, ...response.data.data]
      }
    })
  }, observerOptions)

  observer.observe(loadingMoreTrigger.value)
})

watch(searchGif, (newValue) => {
  if (newValue.length >= 3) {
    searchGifs()
  }
})
</script>

<style lang="scss" scoped>
.gif-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 3rem;
  margin-top: 2rem;

  &__item {
    width: 100px;
    height: 100px;
    object-fit: contain;
    object-position: center;
  }
}
</style>
