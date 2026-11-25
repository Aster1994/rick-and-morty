<script lang="ts" setup>
import BaseButton from '~/components/common/BaseButton.vue'

defineProps<{ error: { statusCode?: number; statusMessage?: string; message?: string } }>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="page-shell flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
    <p class="text-sm font-bold uppercase tracking-[0.2em] text-primary">
      {{ error.statusCode || 500 }} · ERROR
    </p>
    <h1 class="mt-3 text-3xl font-black sm:text-5xl">
      {{ error.statusCode === 404 ? 'Lost in the multiverse?' : 'Something went wrong' }}
    </h1>
    <p class="mt-4 max-w-lg text-sm leading-7 text-[#989A9C]">
      {{
        error.statusCode === 404
          ? 'The page or character you are looking for could not be found.'
          : 'An unexpected error occurred. Please try again.'
      }}
    </p>
    <BaseButton class="mt-7" icon="lucide:home" @click="goHome">Back home</BaseButton>
  </main>
</template>
