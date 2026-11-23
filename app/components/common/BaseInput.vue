<script lang="ts" setup>
interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  type?: string
  id?: string
  name?: string
  prependIcon?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  type: 'text',
  id: undefined,
  name: undefined,
  prependIcon: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div
    class="base-input group flex h-12 items-center gap-2 rounded-sm bg-surface px-4 transition-colors focus-within:border focus-within:border-primary"
  >
    <Icon v-if="prependIcon" :name="prependIcon" :size="14" class="shrink-0" />

    <span v-if="prependIcon" aria-hidden="true" class="h-4 w-px shrink-0 bg-main-text/50" />

    <input
      :id="id"
      :disabled="disabled"
      :inputmode="type === 'number' ? 'numeric' : 'text'"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="h-full w-full bg-transparent text-sm leading-6 outline-none disabled:cursor-not-allowed"
      @input="onInput"
    />

    <button
      v-if="clearable && modelValue"
      aria-label="clear Text"
      class="shrink-0 flex items-center justify-center cursor-pointer"
      type="button"
      @click="onClear"
    >
      <Icon :size="14" name="lucide:x" />
    </button>
  </div>
</template>
