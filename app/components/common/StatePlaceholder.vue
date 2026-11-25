<script lang="ts" setup>
import BaseButton from '~/components/common/BaseButton.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    actionLabel?: string
  }>(),
  {
    description: '',
    icon: 'lucide:info',
    actionLabel: '',
  },
)

defineEmits<{ action: [] }>()
</script>

<template>
  <section
    class="surface-card flex min-h-64 flex-col items-center justify-center rounded-3xl px-6 py-12 text-center"
  >
    <div class="flex items-center gap-4">
      <span class="grid size-10 place-items-center rounded-full bg-white/5 text-primary">
        <Icon :name="icon" size="20" />
      </span>
      <h2 class="text-xl font-bold">{{ title }}</h2>
    </div>
    <p v-if="description" class="mt-2 max-w-md text-sm leading-6 text-muted-text]">
      {{ description }}
    </p>
    <BaseButton
      v-if="actionLabel"
      class="mt-4 !min-w-64"
      variant="secondary"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </BaseButton>
  </section>
</template>
