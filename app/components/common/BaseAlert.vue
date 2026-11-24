<template>
  <div
    v-if="styles[variant]"
    :class="[styles[variant].bg, styles[variant].text]"
    class="base-alert flex items-center gap-4 rounded-xl ps-3 pe-6 py-2.5 text-sm"
    role="alert"
  >
    <Icon :name="styles[variant].icon" aria-hidden="true" class="shrink-0" size="24" />

    <div class="flex-1">
      <p v-if="title" class="font-bold">{{ title }}</p>
      <p class="leading-5">
        <slot />
      </p>
    </div>

    <button
      v-if="dismissible"
      aria-label="close"
      class="shrink-0 opacity-70 transition-opacity hover:opacity-100 flex items-center cursor-pointer ms-4"
      type="button"
      @click="emit('dismiss')"
    >
      <Icon :size="16" name="lucide:x" />
    </button>
  </div>
</template>

<script lang="ts" setup>
type Variant = 'error' | 'success' | 'warning' | 'info'

interface Props {
  variant?: Variant
  title?: string
  dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'info',
  title: undefined,
  dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()

const styles: Record<Variant, { bg: string; text: string; icon: string }> = {
  error: { bg: 'bg-red-50', text: 'text-red-900', icon: 'lucide:skull' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-800', icon: 'lucide:circle-check' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'lucide:triangle-exclamation-point' },
  info: { bg: 'bg-sky-50', text: 'text-sky-800', icon: 'lucide:circle-exclamation-point' },
}
</script>
