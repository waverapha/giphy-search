<template>
  <div class="gif-form">
    <input type="search" v-model="term" class="gif-form__input" />
    <button type="button" class="gif-form__button" @click="clear">Clear results</button>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import useGif from './../GifList/composables/useGif'

const { term, search, clear } = useGif()

watch(term, (newValue) => {
  if (newValue.length >= 3) {
    search()
  }
})
</script>

<style lang="scss" scoped>
.gif-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  &__input,
  &__button {
    padding: 0.625rem 0.25rem;
  }
}
</style>
