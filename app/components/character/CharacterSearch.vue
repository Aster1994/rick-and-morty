<script lang="ts" setup>
import BaseInput from '~/components/common/BaseInput.vue'
import BaseButton from '~/components/common/BaseButton.vue'
import { trimText } from '~/utils/formatText.ts'

withDefaults(
  defineProps<{
    pending?: boolean
  }>(),
  {
    pending: false,
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
  const name = trimText(searchInput.value, 20)
  await navigateTo({
    path: '/characters',
    query: name ? { name } : {},
  })
}

async function clearSearch() {
  searchInput.value = ''
  await navigateTo('/characters')
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
    <BaseButton :loading="pending" type="submit">
      <Icon name="fig:search-normal" size="20" />
      <span class="hidden lg:inline"> Search</span>
    </BaseButton>
  </form>
</template>
