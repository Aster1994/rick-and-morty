<script lang="ts" setup>
import type { Character } from '~/types/character.ts'

defineProps<{ character: Character | undefined }>()
</script>

<template>
  <div
    v-if="character"
    class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 pt-3 pb-2 lg:pt-11 lg:pb-10"
  >
    <NuxtImg
      :alt="character.name"
      :src="character.image"
      class="object-cover rounded-lg"
      fetchpriority="high"
      format="webp"
      height="180"
      loading="eager"
      width="180"
    />

    <div class="flex flex-col gap-4">
      <h1 class="truncate text-2xl lg:text-[2rem] font-medium">
        {{ character.name }}
      </h1>
      <p class="flex items-center gap-2 text-base">
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
          <span>-</span>
          {{ character.species }}
        </span>
      </p>
    </div>
  </div>
</template>
