<script lang="ts" setup>
import Header from '~/components/layout/Header.vue'
import Pagination from '~/components/common/Pagination.vue'
import CharacterSkeleton from '~/components/common/CharacterSkeleton.vue'
import StatePlaceholder from '~/components/common/StatePlaceholder.vue'
import type { ApiResponse } from '~/types/api.ts'
import type { Character } from '~/types/character.ts'
import { trimText } from '~/utils/formatText.ts'

const route = useRoute()
const { $api } = useNuxtApp()

const searchTerm = computed(() =>
  typeof route.query.name === 'string' ? trimText(route.query.name, 20) : '',
)
const page = computed({
  get: () => {
    const raw = route.query.page
    const n = typeof raw === 'string' ? Number(raw) : 1
    return Number.isSafeInteger(n) && n > 0 ? n : 1
  },
  set: async (value: number) => {
    await navigateTo(
      {
        path: '/characters',
        query: {
          ...route.query,
          ...(value > 1 ? { page: String(value) } : {}),
          ...(value === 1 ? { page: undefined } : {}),
        },
      },
      { replace: true },
    )
  },
})

const apiQuery = computed(() => ({
  page: page.value,
  ...(searchTerm.value ? { name: searchTerm.value } : {}),
}))
const { data, error, pending, refresh } = await useAsyncData(
  'character-list',
  () =>
    $api<ApiResponse<Character>>('character', {
      method: 'GET',
      params: { ...apiQuery.value },
    }),
  { immediate: true, dedupe: 'defer', watch: [apiQuery] },
)

const characters = computed(() => data.value?.results ?? [])
const totalPages = computed(() => data.value?.info.pages ?? 0)
const resultCount = computed(() => data.value?.info.count ?? 0)

const isNotFound = computed(
  () => (error.value as { statusCode?: number } | null)?.statusCode === 404,
)
const isEmptySearch = computed(
  () => !!searchTerm.value && !pending.value && isNotFound.value && characters.value.length === 0,
)

watchEffect(async () => {
  const raw = route.query.page
  if (raw === undefined) return
  const valid =
    typeof raw === 'string' && /^[1-9]\d*$/.test(raw) && Number.isSafeInteger(Number(raw))
  if (!valid) {
    const query = { ...route.query }
    delete query.page
    await navigateTo({ path: '/characters', query }, { replace: true })
  }
})

// Out-of-range page (404 from API) — reset to page 1
watch(error, async (currentError) => {
  const statusCode = (currentError as { statusCode?: number } | null)?.statusCode
  if (statusCode === 404 && page.value > 1) {
    const query = { ...route.query }
    delete query.page
    await navigateTo({ path: '/characters', query }, { replace: true })
  }
})

useSeoMeta({
  title: 'Rick & Morty Characters',
  description: 'Search and explore characters from the Rick and Morty universe.',
  ogTitle: 'Rick & Morty Characters',
  ogDescription: 'Search and explore characters from the Rick and Morty universe.',
})
</script>

<template>
  <Header>
    <CharacterSearch :pending="pending" />
  </Header>

  <div class="w-full mx-auto max-w-max-width-container px-4 py-8 lg:py-16 flex flex-col gap-6">
    <p v-if="searchTerm && data && !pending" class="mb-4 text-sm text-muted-text">
      {{ resultCount }} {{ resultCount === 1 ? 'result' : 'results' }} for
      <span class="font-semibold">“{{ searchTerm }}”</span>
    </p>

    <div
      v-if="pending && !data"
      class="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4"
    >
      <CharacterSkeleton v-for="index in 12" :key="index" />
    </div>

    <StatePlaceholder
      v-else-if="error && !isNotFound"
      action-label="Try again"
      description="The character service could not be reached. Check your connection and try again."
      icon="lucide:cloud-off"
      title="Something went wrong"
      @action="refresh"
    />

    <StatePlaceholder
      v-else-if="isEmptySearch"
      description="Try another character name."
      icon="lucide:scan-search"
      title="No characters found"
    />

    <div
      v-if="!!data && characters.length > 0"
      class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-7"
    >
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>

    <Pagination v-model="page" :disabled="pending" :total-pages="totalPages" class="mt-9" />
  </div>
</template>

<style scoped>
.header :deep(.blur-circle) {
  @media screen and (max-width: 1024px) {
    background: none;
  }
}
</style>
