<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    appendIcon?: string
    prependIcon?: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    ariaLabel?: string
    block?: boolean
    rounded?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    loading: false,
    disabled: false,
    block: false,
    rounded: false,
    appendIcon: '',
    prependIcon: '',
    ariaLabel: '',
  },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`,
      block ? 'w-full' : '',
      rounded ? 'rounded-full' : 'rounded-sm',
    ]"
    :disabled="disabled || loading"
    :type="type"
    class="base-button inline-flex shrink-0 items-center justify-center gap-2 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
    @click="$emit('click', $event)"
  >
    <Icon
      v-if="loading"
      aria-hidden="true"
      class="animate-spin"
      name="lucide:loader-circle"
      size="16"
    />
    <Icon v-else-if="appendIcon" :name="appendIcon" aria-hidden="true" size="20" />
    <span v-if="$slots.default" class="font-medium"><slot /></span>
    <Icon v-if="prependIcon && !loading" :name="prependIcon" aria-hidden="true" size="20" />
  </button>
</template>

<style scoped>
.base-button--primary {
  color: var(--color-deep-teal);
  background: var(--color-primary);
}

.base-button--primary:hover:not(:disabled),
.base-button--secondary:hover:not(:disabled) {
  filter: brightness(1.08);
}

.base-button--secondary {
  color: var(--color-deep-teal);
  background: var(--color-secondary);
}

.base-button--ghost {
  color: var(--color-soft-text);
  background: transparent;
}

.base-button--ghost:hover:not(:disabled) {
  color: var(--color-primary);
  background: rgb(255 255 255 / 5%);
}

.base-button--sm {
  min-height: 1.5rem;
  min-width: 1.5rem;
  padding: 0 0.25rem;
  font-size: 0.75rem;
}

.base-button--md {
  min-height: 3rem;
  min-width: 3rem;
  padding: 0 1rem;
  font-size: 0.875rem;
}

.base-button--lg {
  min-height: 3.5rem;
  min-width: 3.5rem;
  padding: 0 1.25rem;
  font-size: 1rem;
}
</style>
