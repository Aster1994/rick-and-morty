<script lang="ts" setup>
import BaseInput from '~/components/common/BaseInput.vue'
import BaseButton from '~/components/common/BaseButton.vue'

withDefaults(
  defineProps<{
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
  },
)
const route = useRoute()
const searchInput = ref(typeof route.query.name === 'string' ? route.query.name : '')

watch(
  () => route.query.name,
  (value) => {
    searchInput.value = typeof value === 'string' ? value : ''
  },
)

async function submitSearch() {
  const name = searchInput.value.trim().slice(0, 20)
  await navigateTo({ path: '/', query: name ? { name } : {} })
}

async function clearSearch() {
  searchInput.value = ''
  await navigateTo('/')
}
</script>

<template>
  <form
    class="character--search bg-main-bg p-4 h-20 rounded-lg flex items-center gap-4"
    role="search"
    @submit.prevent="submitSearch"
  >
    <BaseInput
      v-model="searchInput"
      :maxlength="20"
      class="flex-1"
      clearable
      placeholder="Search for characters..."
      @clear="clearSearch"
    />
    <BaseButton :loading="isLoading" append-icon="lucide:search" type="submit">
      <span class="hidden lg:inline"> Search</span>
    </BaseButton>
  </form>
</template>
