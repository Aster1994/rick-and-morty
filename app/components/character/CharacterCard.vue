<script lang="ts" setup>
import type { Character } from '~/types/character.ts'

defineProps<{ character: Character }>()
</script>

<template>
  <article
    class="character-card min-w-0 rounded-2xl p-4 transition-colors duration-200 border border-card-border hover:border-2 hover:bg-white/5"
  >
    <NuxtLink
      :aria-label="`View ${character.name} details`"
      :to="`/characters/${character.id}`"
      class="group block"
    >
      <NuxtImg
        :alt="character.name"
        :src="character.image"
        class="aspect-square w-full rounded-lg object-cover transition duration-300 group-hover:brightness-110"
        format="webp"
        height="420"
        loading="lazy"
        sizes="sm:50vw md:33vw lg:25vw"
        width="420"
      />
      <h2 class="mt-4 truncate text-xl font-bold transition group-hover:text-primary">
        {{ character.name }}
      </h2>
      <p class="mt-4 flex items-center gap-2 text-base">
        <span
          :class="
            character.status === 'Alive'
              ? 'bg-alive'
              : character.status === 'Dead'
                ? 'bg-dead'
                : 'bg-muted-text'
          "
          aria-hidden="true"
          class="size-3 shrink-0 rounded-full"
        />
        <span>
          {{ character.status }}
          <span class="text-muted-text">-</span>
          {{ character.species }}
        </span>
      </p>
    </NuxtLink>
  </article>
</template>

<style scoped></style>
