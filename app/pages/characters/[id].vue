<script lang="ts" setup>
import type { Character, Episode } from '~/types/character'
import { extractResourceId, normalizeToArray } from '~/utils/api'
import Header from '~/components/layout/Header.vue'
import CharacterHero from '~/components/character/CharacterHero.vue'
import StatePlaceholder from '~/components/common/StatePlaceholder.vue'
import CharacterFeatureCard from '~/components/character/characterFeatureCard.vue'

const route = useRoute()
const { $api } = useNuxtApp()

const id = computed(() => String(route.params.id))

const { data: character } = await useAsyncData(
  `character-${id.value}`,
  () => $api<Character>(`/character/${id.value}`),
  { immediate: true, dedupe: 'defer' },
)
const episodeIds = computed(() =>
  (character.value?.episode ?? [])
    .map(extractResourceId)
    .filter((episodeId): episodeId is number => episodeId !== null),
)

const { data: episodes, error: episodeError } = await useAsyncData<Episode[]>(
  `character-episodes-${id.value}`,
  async () => {
    if (!episodeIds.value.length) return []
    const response = await $api<Episode | Episode[]>(`/episode/${episodeIds.value.join(',')}`)
    return normalizeToArray(response)
  },
  { default: () => [] },
)
</script>

<template>
  <Header>
    <CharacterHero :character="character" />
  </Header>
  <div
    v-if="character"
    class="character-info w-full mx-auto max-w-max-width-container px-4 py-8 lg:py-16 flex flex-col gap-6"
  >
    <section class="flex flex-col gap-5 lg:gap-6">
      <div>
        <Icon class="text-primary" name="fig:featured_play_list" />
        <h2 class="text-2xl font-medium">Episodes</h2>
      </div>

      <div
        v-if="episodeError"
        class="rounded-2xl border border-dead/20 bg-dead/5 p-4 text-sm text-soft-text"
      >
        Episode information is temporarily unavailable.
      </div>
      <StatePlaceholder
        v-else-if="!episodes.length"
        description="There are no episode appearances available for this character."
        icon="lucide:clapperboard"
        title="No episode data"
      />
      <div v-else class="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-4">
        <CharacterFeatureCard
          v-for="episode in episodes"
          :key="episode.id"
          :first="episode.name"
          :second="episode.episode"
          :third="episode.air_date"
          tag-el="h3"
        />
      </div>
    </section>
  </div>
</template>
