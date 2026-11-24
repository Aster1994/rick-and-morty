<script lang="ts" setup>
import Header from '~/components/layout/Header.vue'
</script>

<template>
  <Header>
    <CharacterSearch />
  </Header>

  <div class="w-full mx-auto max-w-max-width-container"></div>
</template>

<style scoped>
.header :deep(.blur-circle) {
  @media screen and (max-width: 1024px) {
    background: none;
  }
}
</style>
