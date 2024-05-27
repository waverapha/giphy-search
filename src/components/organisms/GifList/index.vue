<template>
  <div class="gif-list">
    <img
      v-for="gif in list"
      :key="gif.id"
      :src="gif.images.preview_gif.url"
      :width="gif.images.preview_gif.width"
      :height="gif.images.preview_gif.height"
      :alt="gif.alt_text"
      class="gif-list__item"
    />
  </div>

  <div v-show="list.length" ref="loadingMoreTrigger" class="loading-more">Loading more...</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import useGif from './composables/useGif'

const { list, loadMore } = useGif()

const loadingMoreTrigger = ref<Element>()

/* const loadMoreGifs = (entries, observer) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      params.value.offset += pagination.value.page * pagination.value.DEFAULT_OFFSET

      const response = await giphyService.get({
        params: params.value
      })

      gifList.value = [...gifList.value, ...response.data.data]
    }
  })
} */

onMounted(() => {
  if (!loadingMoreTrigger.value) {
    return
  }

  const observerOptions = {
    rootMargin: '25px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver(loadMore, observerOptions)

  observer.observe(loadingMoreTrigger.value)
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
