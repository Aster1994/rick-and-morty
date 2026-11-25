<script lang="ts" setup>
import type { Character, Episode, Location } from '~/types/character'
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

const { data: location, error: locationError } = await useAsyncData<Location | null>(
  `character-location-${id.value}`,
  async () => {
    if (!character.value || !character.value.location) return null
    const locationId = extractResourceId(character.value?.location?.url)
    if (!locationId) return null
    return await $api<Location>(`/location/${locationId}`)
  },
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
      <div class="flex items-center gap-3">
        <Icon class="text-primary" name="fig:featured-play-list" size="20" />
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
    <section class="flex flex-col gap-5 lg:gap-6">
      <div class="flex items-center gap-3">
        <Icon class="text-primary" name="fig:location-on" size="20" />
        <h2 class="text-2xl font-medium">Locations</h2>
      </div>

      <div
        v-if="locationError"
        class="rounded-2xl border border-dead/20 bg-dead/5 p-4 text-sm text-soft-text"
      >
        Location information is temporarily unavailable.
      </div>
      <StatePlaceholder
        v-else-if="!location"
        description="There are no episode appearances available for this character."
        icon="lucide:clapperboard"
        title="No episode data"
      />
      <!--there was just one location for each character-->
      <div v-else class="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-4">
        <CharacterFeatureCard
          :first="location.name"
          :second="location.type"
          :third="location.dimension"
          tag-el="h4"
        />
      </div>
    </section>
  </div>
</template>
