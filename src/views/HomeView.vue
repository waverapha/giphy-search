<template>
  <main>
    <form action="">
      <input type="text" name="" v-model="searchGif" />
    </form>

    <div class="gif-list">
      <div v-for="gif in gifList" :key="gif.id">
        <img
          :src="gif.images.preview_gif.url"
          :width="gif.images.preview_gif.width"
          :height="gif.images.preview_gif.height"
          :alt="gif.alt_text"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { giphyService } from '@/services/giphy'

const searchGif = ref('')
const gifList = ref([])

const params = new URLSearchParams({
  api_key: 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa',
  q: 'cat'
})

onBeforeMount(async () => {
  const response = await giphyService.get({
    params
  })

  gifList.value = response.data.data
})
</script>

<style lang="scss">
.gif-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
