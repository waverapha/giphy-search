<template>
  <BaseHeader />

  <RouterView />

  <BaseFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/Base/Header/index.vue'
import BaseFooter from '@/components/Base/Footer/index.vue'
</script>
