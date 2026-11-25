<script lang="ts" setup>
withDefaults(
  defineProps<{
    first?: string
    second?: string
    third?: string
    tagEl?: string
  }>(),
  {
    first: '',
    second: '',
    third: '',
    tagEl: 'span',
  },
)
</script>

<template>
  <article class="flex flex-col gap-4 bg-card rounded-2xl p-4">
    <component :is="tagEl" class="text-xl font-bold">
      {{ first }}
    </component>
    <span v-if="second" class="text-base font-medium text-secondary">{{ second }}</span>

    <span v-if="third" class="text-base text-muted-text">{{ third }}</span>
  </article>
</template>
