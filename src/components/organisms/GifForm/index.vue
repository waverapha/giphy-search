<template>
  <input type="search" v-model="term" />
  <button type="button" @click="clear">Clear results</button>
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

<style lang="scss"></style>
