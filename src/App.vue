<template>
  <LayoutHeader />

  <RouterView />

  <LayoutFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from '@/components/layout/Header/index.vue'
import LayoutFooter from '@/components/layout/Footer/index.vue'
</script>
